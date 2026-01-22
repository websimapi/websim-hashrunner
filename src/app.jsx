import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { GameEngine, GAME_CONSTANTS } from "./engine.js";
import { SeededRNG } from "./rng.js";
import { sha256, serializeStateForHashing, getDifficulty } from "./crypto.js";
import { Menu } from "./components/Menu.jsx";
import { HUD } from "./components/HUD.jsx";
import { ResultScreen } from "./components/ResultScreen.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { Verifier } from "./components/Verifier.jsx";
import { mineProofOfWork, terminateMiningWorker } from "./mining.js";
const GAME_VERSION = "1.1.0";
function App() {
  const [view, setView] = useState("menu");
  const [score, setScore] = useState(0);
  const [finalProof, setFinalProof] = useState(null);
  const [verificationProof, setVerificationProof] = useState(null);
  const [lastHash, setLastHash] = useState(null);
  const [isHashing, setIsHashing] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(0);
  const inputsRef = useRef([]);
  const keys = useRef({ jump: false });
  const viewRef = useRef("menu");
  const lastHashRef = useRef(null);
  const codeHashRef = useRef(null);
  const commitmentPromiseChain = useRef(Promise.resolve(null));
  const replayProofRef = useRef(null);
  useEffect(() => {
    window.room = new window.WebsimSocket();
  }, []);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);
  useEffect(() => {
    const calcCodeHash = async () => {
      codeHashRef.current = await sha256(GameEngine.toString() + SeededRNG.toString());
    };
    calcCodeHash();
  }, []);
  const startGame = async () => {
    let username = "anonymous";
    try {
      const user = await window.websim.getCurrentUser();
      if (user) username = user.username;
    } catch (e) {
      console.warn("No user found");
    }
    const seed = username + "_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    engineRef.current = new GameEngine(seed);
    inputsRef.current = [];
    const initialHash = await sha256(seed);
    lastHashRef.current = initialHash;
    setLastHash(initialHash);
    commitmentPromiseChain.current = Promise.resolve(initialHash);
    startTimeRef.current = Date.now();
    setView("game");
    setScore(0);
    setIsHashing(false);
    setFinalProof(null);
    keys.current.jump = false;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(gameLoop);
  };
  const startReplay = (proof = null) => {
    const p = proof || finalProof;
    if (!p) return;
    replayProofRef.current = p;
    engineRef.current = new GameEngine(p.seed);
    setView("replay");
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(replayLoop);
  };
  const gameLoop = async () => {
    const engine = engineRef.current;
    if (!engine) return;
    const input = { jump: keys.current.jump };
    const newState = engine.tick(input);
    render(newState);
    const tickCount = engine.tickCount;
    const difficulty = getDifficulty(newState);
    const serialized = serializeStateForHashing(tickCount, input, newState);
    const codeHash = codeHashRef.current;
    const prevPromise = commitmentPromiseChain.current;
    const thisPromise = prevPromise.then((prevHash) => {
      return sha256(prevHash + "|" + codeHash + "|" + serialized);
    });
    commitmentPromiseChain.current = thisPromise;
    thisPromise.then((hash) => {
      if (engineRef.current && !engineRef.current.gameOver) {
        lastHashRef.current = hash;
        setLastHash(hash);
      }
    });
    const miningPromise = thisPromise.then(async (commitment) => {
      return mineProofOfWork(commitment, difficulty);
    });
    inputsRef.current.push({
      input,
      difficulty,
      commitmentPromise: thisPromise,
      miningPromise,
      state: JSON.parse(JSON.stringify(newState))
      // Store state for debugging/replay if needed
    });
    setScore(newState.score);
    if (engine.gameOver) {
      endGame();
    } else {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };
  const replayLoop = () => {
    const engine = engineRef.current;
    const proof = replayProofRef.current;
    if (!engine || !proof) return;
    if (engine.tickCount >= proof.inputs.length) {
      if (proof === finalProof) {
        setView("result");
      } else {
        setView("leaderboard");
      }
      return;
    }
    const inputRecord = proof.inputs[engine.tickCount];
    if (!inputRecord) {
      setView("menu");
      return;
    }
    const newState = engine.tick(inputRecord.input);
    render(newState);
    setScore(newState.score);
    requestRef.current = requestAnimationFrame(replayLoop);
  };
  const render = (state) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const c = GAME_CONSTANTS;
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    if (lastHashRef.current) {
      ctx.fillStyle = "#10b981";
      ctx.font = '10px "Space Mono"';
      ctx.textAlign = "right";
      ctx.globalAlpha = 0.05;
      const hash = lastHashRef.current;
      for (let i = 0; i < 12; i++) {
        ctx.fillText(hash.substring(i * 4, i * 4 + 64), canvas.width - 20, 80 + i * 20);
      }
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, c.GROUND_Y, canvas.width, canvas.height - c.GROUND_Y);
    ctx.fillStyle = "#10b981";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#10b981";
    ctx.fillRect(0, c.GROUND_Y, canvas.width, 2);
    ctx.shadowBlur = 0;
    const p = state.player;
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(255,255,255,0.4)";
    ctx.beginPath();
    ctx.roundRect(c.PLAYER_X, p.y - p.height, p.width, p.height, 4);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#09090b";
    ctx.fillRect(c.PLAYER_X + 20, p.y - p.height + 12, 6, 4);
    state.obstacles.forEach((obs) => {
      const isFlying = obs.type === "flying";
      ctx.shadowBlur = 15;
      ctx.shadowColor = isFlying ? "rgba(236, 72, 153, 0.5)" : "rgba(245, 158, 11, 0.5)";
      ctx.fillStyle = isFlying ? "#db2777" : "#d97706";
      ctx.beginPath();
      ctx.roundRect(obs.x, obs.y - obs.h, obs.w, obs.h, 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(obs.x + 4, obs.y - obs.h + 4, obs.w - 8, obs.h - 8);
    });
  };
  const endGame = () => {
    cancelAnimationFrame(requestRef.current);
    finalizeGame();
    setView("result");
  };
  const finalizeGame = async () => {
    setIsHashing(true);
    setMiningProgress(0);
    const engine = engineRef.current;
    const initialHash = await sha256(engine.seed);
    const committedInputs = await Promise.all(inputsRef.current.map(async (item) => ({
      ...item,
      commitment: await item.commitmentPromise
    })));
    const minedInputs = [];
    let finalPoWHash = "";
    for (let i = 0; i < committedInputs.length; i++) {
      const item = committedInputs[i];
      const minedResult = await item.miningPromise;
      finalPoWHash = minedResult.hash;
      minedInputs.push({
        input: item.input,
        hash: minedResult.hash,
        nonce: minedResult.nonce,
        difficulty: item.difficulty
      });
      setLastHash(minedResult.hash);
      setMiningProgress((i + 1) / committedInputs.length);
    }
    terminateMiningWorker();
    let username = "anonymous";
    try {
      const user = await window.websim.getCurrentUser();
      if (user) username = user.username;
    } catch (e) {
      console.warn("No user found");
    }
    const proof = {
      version: GAME_VERSION,
      username,
      timestamp: Date.now(),
      startTimestamp: startTimeRef.current,
      endTimestamp: Date.now(),
      seed: engine.seed,
      finalScore: engine.state.score,
      initialHash,
      finalHash: finalPoWHash,
      codeHash: codeHashRef.current,
      inputs: minedInputs
    };
    setFinalProof(proof);
    setIsHashing(false);
  };
  const submitScore = async () => {
    if (!finalProof) return;
    try {
      const currentUser = await window.websim.getCurrentUser();
      const username = currentUser.username;
      const records = await window.room.collection("player_records_v1").filter({ username }).getList();
      if (records.length > 0) {
        const record = records[0];
        const updatedProofs = [...record.proofs || [], finalProof];
        await window.room.collection("player_records_v1").update(record.id, {
          proofs: updatedProofs
        });
      } else {
        await window.room.collection("player_records_v1").create({
          proofs: [finalProof]
        });
      }
      alert("Score secured on ledger!");
      setView("menu");
    } catch (e) {
      console.error(e);
      alert("Submission error");
    }
  };
  useEffect(() => {
    const handleJump = (active, e) => {
      if (viewRef.current === "replay") {
        if (active && e && (e.type === "mousedown" || e.type === "touchstart" || e.code === "Space")) {
          const wasLocal = replayProofRef.current === finalProof;
          setView(wasLocal ? "result" : "leaderboard");
          if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return;
      }
      if (viewRef.current !== "game") return;
      if (e && (e.type === "mousedown" || e.type === "touchstart")) {
        if (e.target.closest("button") || e.target.closest("input") || e.target.closest("textarea")) {
          return;
        }
        if (e.cancelable) e.preventDefault();
      }
      keys.current.jump = active;
    };
    const down = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        handleJump(true, e);
      }
    };
    const up = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        handleJump(false, e);
      }
    };
    const touchStart = (e) => handleJump(true, e);
    const touchEnd = (e) => handleJump(false, e);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("touchstart", touchStart, { passive: false });
    window.addEventListener("touchend", touchEnd);
    window.addEventListener("mousedown", touchStart);
    window.addEventListener("mouseup", touchEnd);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("mousedown", touchStart);
      window.removeEventListener("mouseup", touchEnd);
    };
  }, []);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        width: 800,
        height: 400
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 436,
        columnNumber: 13
      },
      this
    ),
    view === "menu" && /* @__PURE__ */ jsxDEV(
      Menu,
      {
        onStart: startGame,
        onLeaderboard: () => setView("leaderboard"),
        onVerify: () => {
          setVerificationProof(null);
          setView("verify");
        },
        gameVersion: GAME_VERSION
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 443,
        columnNumber: 33
      },
      this
    ),
    (view === "game" || view === "replay") && /* @__PURE__ */ jsxDEV(
      HUD,
      {
        score,
        hash: lastHash,
        isVerified: true,
        tick: engineRef.current?.tickCount || 0,
        isReplay: view === "replay"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 453,
        columnNumber: 56
      },
      this
    ),
    view === "result" && /* @__PURE__ */ jsxDEV(
      ResultScreen,
      {
        score,
        proof: finalProof,
        isHashing,
        hashProgress: miningProgress,
        onSave: submitScore,
        onRestart: startGame,
        onHome: () => setView("menu"),
        onReplay: () => startReplay(finalProof),
        onVerify: () => {
          setVerificationProof(finalProof);
          setView("verify");
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 461,
        columnNumber: 35
      },
      this
    ),
    view === "leaderboard" && /* @__PURE__ */ jsxDEV(
      Leaderboard,
      {
        onClose: () => setView("menu"),
        onReplay: startReplay
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 476,
        columnNumber: 40
      },
      this
    ),
    view === "verify" && /* @__PURE__ */ jsxDEV(
      Verifier,
      {
        onClose: () => setView("menu"),
        initialProof: verificationProof,
        gameVersion: GAME_VERSION
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 481,
        columnNumber: 35
      },
      this
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 435,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 491,
  columnNumber: 13
}));
