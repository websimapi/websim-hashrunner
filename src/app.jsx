import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { GameEngine, GAME_CONSTANTS } from "./engine.js";
import { SeededRNG } from "./rng.js";
import { sha256, serializeStateForHashing, getDifficulty, createMiningWorker } from "./crypto.js";
import { verifyProof } from "./verifier.js";
import { Play, ShieldCheck, Trophy, RotateCcw, Save, Loader2, AlertTriangle, FileJson, X, Eye, Home } from "lucide-react";
const GAME_VERSION = "1.1.0";
const Menu = ({ onStart, onLeaderboard, onVerify }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-700", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center w-full max-w-md", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "mb-16 text-center space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] tracking-widest font-mono uppercase", children: [
      /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 12 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 21
      }),
      " Cryptographically Verified"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("h1", { className: "text-7xl md:text-8xl font-black tracking-tighter text-white leading-none drop-shadow-2xl", children: [
      "HASH",
      /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-700", children: "RUNNER" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 30
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 16,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-4", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onStart, className: "group relative w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl py-6 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "tracking-tight", children: "INITIATE RUN" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 28,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(Play, { className: "transition-transform group-hover:translate-x-1", size: 28, fill: "currentColor" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 29,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 27,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 31,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 26,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onLeaderboard, className: "bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-3 transition-all hover:border-white/20 group", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { className: "text-zinc-500 group-hover:text-yellow-500 transition-colors", size: 24 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 36,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-zinc-400 tracking-wider", children: "LEADERBOARD" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-3 transition-all hover:border-white/20 group", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-zinc-500 group-hover:text-emerald-500 transition-colors", size: 24 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-zinc-400 tracking-wider", children: "VERIFIER" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 39,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 34,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 25,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "mt-16 text-[10px] text-zinc-600 font-mono", children: [
    "PROTOCOL v",
    GAME_VERSION
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 46,
    columnNumber: 13
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 15,
  columnNumber: 9
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 14,
  columnNumber: 5
});
const HUD = ({ score, hash, isVerified, tick, isReplay }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-8", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-bold text-zinc-500 tracking-wider mb-1", children: "SCORE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 57,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-4xl md:text-6xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg", children: score.toString().padStart(6, "0") }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 58,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 56,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-end", children: isReplay ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-red-500/20 backdrop-blur px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 mb-2 animate-pulse", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-1.5 h-1.5 rounded-full bg-red-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 66,
        columnNumber: 25
      }),
      "REPLAY MODE"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 65,
      columnNumber: 21
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-zinc-300 mb-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-1.5 h-1.5 rounded-full ${isVerified ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-amber-400 animate-pulse"}` }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 71,
        columnNumber: 25
      }),
      isVerified ? "VERIFIED" : "SYNCING"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 70,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 63,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 55,
    columnNumber: 9
  }),
  !isReplay && /* @__PURE__ */ jsxDEV("div", { className: "self-end max-w-[200px] md:max-w-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-black/60 backdrop-blur px-3 py-2 rounded border border-white/5", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-500 font-bold uppercase mb-1 flex justify-between", children: [
      /* @__PURE__ */ jsxDEV("span", { children: [
        "BLOCK ",
        tick
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 82,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-500", children: "SHA-256" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 83,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 81,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] text-emerald-500/60 break-all leading-tight", children: hash || "INIT_GENESIS..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 85,
      columnNumber: 21
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 80,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 79,
    columnNumber: 13
  }),
  isReplay && /* @__PURE__ */ jsxDEV("div", { className: "self-center mt-auto mb-12", children: /* @__PURE__ */ jsxDEV("div", { className: "text-white/50 text-xs font-mono tracking-widest uppercase", children: "Tap to cancel replay" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 94,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 93,
    columnNumber: 14
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 54,
  columnNumber: 5
});
const ResultScreen = ({ score, proof, onVerify, onSave, onRestart, onHome, onReplay, isHashing, hashProgress }) => {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hashrunner_${proof.timestamp}.json`;
    a.click();
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-12 relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-emerald-500 tracking-[0.4em] mb-2 uppercase", children: "Run Complete" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 113,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]", children: score }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 17
      }),
      proof && !isHashing && /* @__PURE__ */ jsxDEV("div", { className: "absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-900/90 border border-white/10 p-3 rounded-lg backdrop-blur text-left", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-500 font-bold mb-1", children: "FINAL HASH" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 120,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] text-zinc-400 w-32 truncate", children: proof.finalHash }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 121,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 119,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 118,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 112,
      columnNumber: 13
    }),
    isHashing ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-6 w-full max-w-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between w-full text-[10px] font-bold tracking-wider text-emerald-500", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "MINING PROOF OF WORK" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 131,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            Math.floor(hashProgress * 100),
            "%"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 132,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 130,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 shadow-[0_0_15px_#10b981]", style: { width: `${hashProgress * 100}%` } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 135,
          columnNumber: 29
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 134,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 129,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-500 font-mono animate-pulse text-center", children: [
        "SOLVING CRYPTOGRAPHIC PUZZLES...",
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 139,
          columnNumber: 57
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] opacity-50", children: "This proves you played legitimately" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 140,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 138,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 128,
      columnNumber: 17
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 w-full max-w-xs animate-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onReplay, className: "bg-white hover:bg-zinc-200 text-black p-4 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsxDEV(Eye, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 147,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-wide", children: "REPLAY" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 147,
            columnNumber: 47
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 146,
          columnNumber: 26
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onRestart, className: "bg-emerald-500 hover:bg-emerald-400 text-black p-4 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]", children: [
          /* @__PURE__ */ jsxDEV(RotateCcw, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 150,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-wide", children: "RETRY" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 150,
            columnNumber: 53
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 149,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 145,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg flex flex-col items-center gap-1.5 transition-colors border border-white/5", children: [
          /* @__PURE__ */ jsxDEV(Trophy, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 156,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold", children: "SUBMIT" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 156,
            columnNumber: 50
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 155,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: downloadJson, className: "bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg flex flex-col items-center gap-1.5 transition-colors border border-white/5", children: [
          /* @__PURE__ */ jsxDEV(FileJson, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 159,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold", children: "JSON" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 159,
            columnNumber: 52
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 158,
          columnNumber: 26
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg flex flex-col items-center gap-1.5 transition-colors border border-white/5", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 162,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold", children: "VERIFY" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 162,
            columnNumber: 55
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 161,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 154,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onHome, className: "mt-4 text-zinc-500 hover:text-white text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxDEV(Home, { size: 14 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 167,
          columnNumber: 25
        }),
        " RETURN TO MENU"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 166,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 144,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 111,
    columnNumber: 9
  });
};
const Leaderboard = ({ onClose, onReplay }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const records = await window.room.collection("high_scores").getList();
        const sorted = records.sort((a, b) => b.score - a.score).slice(0, 50);
        setScores(sorted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);
  const verifyScore = async (record) => {
    const newScores = scores.map((s) => s.id === record.id ? { ...s, verifying: true } : s);
    setScores(newScores);
    try {
      const result = await verifyProof(record.proof, null, record.username);
      if (!result.valid) {
        alert(`Verification Failed: ${result.reason}`);
      }
      setScores((current) => current.map(
        (s) => s.id === record.id ? { ...s, verifying: false, verified_local: result.valid } : s
      ));
    } catch (e) {
      console.error(e);
      setScores((current) => current.map((s) => s.id === record.id ? { ...s, verifying: false } : s));
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-zinc-900/90 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[80vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-white/5 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-black flex items-center gap-3 tracking-tight text-white", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { className: "text-yellow-500", size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 219,
          columnNumber: 25
        }),
        " HALL OF FAME"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 218,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 221,
        columnNumber: 143
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 221,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 217,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-auto flex-1 custom-scrollbar", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-black/20 sticky top-0 text-[10px] font-bold text-zinc-500 uppercase tracking-widest backdrop-blur-md z-10", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium", children: "Rank" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 228,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium", children: "Runner" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 229,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium text-right", children: "Score" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 230,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium text-center", children: "Actions" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 231,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 227,
        columnNumber: 29
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 226,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-white/5", children: loading ? /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 4, className: "p-12 text-center text-zinc-600 font-mono text-xs animate-pulse", children: "SYNCING LEDGER..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 236,
        columnNumber: 37
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 236,
        columnNumber: 33
      }) : scores.map((s, i) => /* @__PURE__ */ jsxDEV("tr", { className: "group hover:bg-white/[0.02] transition-colors", children: [
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-mono text-zinc-500 text-sm w-16", children: i < 3 ? /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-500 font-bold", children: [
          "#",
          i + 1
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 240,
          columnNumber: 50
        }) : `#${i + 1}` }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 239,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-white/5", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 245,
            columnNumber: 49
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 244,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-zinc-300 text-sm truncate max-w-[120px]", children: s.username }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 247,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 243,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 242,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-lg", children: s.score }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 251,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 250,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-center w-32", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => onReplay(s.proof),
              className: "p-2 bg-zinc-800 hover:bg-emerald-500 hover:text-black text-zinc-400 rounded-lg transition-all",
              title: "Watch Replay",
              children: /* @__PURE__ */ jsxDEV(Eye, { size: 14 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 260,
                columnNumber: 49
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 255,
              columnNumber: 45
            }
          ),
          s.verified_local ? /* @__PURE__ */ jsxDEV("div", { className: "p-2 text-emerald-500", title: "Verified Locally", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 14 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 264,
            columnNumber: 112
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 264,
            columnNumber: 49
          }) : /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => verifyScore(s),
              disabled: s.verifying,
              className: "p-2 bg-zinc-800 hover:bg-white hover:text-black text-zinc-400 rounded-lg transition-all disabled:opacity-50",
              title: "Verify Proof",
              children: s.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 14, className: "animate-spin" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 272,
                columnNumber: 68
              }) : /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 14 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 272,
                columnNumber: 117
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 266,
              columnNumber: 49
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 254,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 253,
          columnNumber: 37
        })
      ] }, s.id, true, {
        fileName: "<stdin>",
        lineNumber: 238,
        columnNumber: 33
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 234,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 225,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 224,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 216,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 215,
    columnNumber: 9
  });
};
const Verifier = ({ onClose, initialProof }) => {
  const [jsonInput, setJsonInput] = useState(initialProof ? JSON.stringify(initialProof, null, 2) : "");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (initialProof) {
      runVerify();
    }
  }, []);
  const runVerify = async () => {
    try {
      const proof = typeof jsonInput === "object" ? jsonInput : JSON.parse(jsonInput);
      setStatus("verifying");
      setTimeout(async () => {
        const res = await verifyProof(proof, (p) => setProgress(p));
        setResult(res);
        setStatus(res.valid ? "success" : "fail");
      }, 100);
    } catch (e) {
      setStatus("fail");
      setResult({ reason: "Invalid JSON format" });
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-xl bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[70vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-white/5 flex justify-between items-center bg-black/20", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-sm font-bold flex items-center gap-2 text-white", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 322,
          columnNumber: 25
        }),
        " CLIENT-SIDE VERIFIER"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 321,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-1 text-zinc-500 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 324,
        columnNumber: 112
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 324,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 320,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col relative", children: [
      /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          className: "flex-1 bg-transparent border-none p-4 font-mono text-[10px] md:text-xs text-zinc-400 resize-none focus:ring-0 focus:outline-none custom-scrollbar",
          placeholder: "Paste JSON proof object here...",
          value: jsonInput,
          onChange: (e) => setJsonInput(e.target.value),
          spellCheck: "false"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 328,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-black/20 border-t border-white/5 p-4", children: [
        status === "verifying" && /* @__PURE__ */ jsxDEV("div", { className: "mb-3 animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] text-zinc-400 font-bold mb-1", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "REPLAYING INPUTS" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 340,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("span", { children: [
              Math.floor(progress * 100),
              "%"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 341,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 339,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all", style: { width: `${progress * 100}%` } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 344,
            columnNumber: 37
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 343,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 338,
          columnNumber: 29
        }),
        status === "success" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 351,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-emerald-400", children: "VALID PROOF" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 353,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-500/60 font-mono", children: [
              "Matches Protocol v",
              GAME_VERSION,
              " \u2022 Score: ",
              result.score
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 354,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 352,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 350,
          columnNumber: 29
        }),
        status === "fail" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3 bg-red-500/10 border border-red-500/20 p-3 rounded animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "text-red-500", size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 363,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-red-400", children: "VERIFICATION FAILED" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 365,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-500/60 font-mono", children: result?.reason || "Check JSON format" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 366,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 364,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 362,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: runVerify,
            disabled: status === "verifying" || !jsonInput,
            className: "w-full bg-white text-black font-bold text-xs py-3 rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors shadow-lg",
            children: status === "verifying" ? "RUNNING SIMULATION..." : "VERIFY INTEGRITY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 373,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 336,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 327,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 319,
    columnNumber: 14
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 318,
    columnNumber: 9
  });
};
let miningWorkerPool = null;
let miningQueue = [];
let processingMining = false;
function mineProofOfWork(commitment, difficulty) {
  return new Promise((resolve) => {
    miningQueue.push({ commitment, difficulty, resolve });
    if (!processingMining) {
      processMiningQueue();
    }
  });
}
async function processMiningQueue() {
  if (miningQueue.length === 0) {
    processingMining = false;
    return;
  }
  processingMining = true;
  if (!miningWorkerPool) {
    miningWorkerPool = createMiningWorker();
  }
  const task = miningQueue.shift();
  miningWorkerPool.onmessage = (e) => {
    task.resolve(e.data);
    processMiningQueue();
  };
  miningWorkerPool.postMessage({
    id: Math.random(),
    prefix: task.commitment,
    difficulty: task.difficulty
  });
}
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
    if (miningWorkerPool) {
      miningWorkerPool.terminate();
      miningWorkerPool = null;
      miningQueue = [];
      processingMining = false;
    }
    const proof = {
      version: GAME_VERSION,
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
      await window.room.collection("high_scores").create({
        score: finalProof.finalScore,
        proof: finalProof,
        game_version: GAME_VERSION,
        verified_local: false,
        username: (await window.websim.getCurrentUser()).username
      });
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
        lineNumber: 828,
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
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 835,
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
        lineNumber: 844,
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
        lineNumber: 852,
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
        lineNumber: 867,
        columnNumber: 40
      },
      this
    ),
    view === "verify" && /* @__PURE__ */ jsxDEV(
      Verifier,
      {
        onClose: () => setView("menu"),
        initialProof: verificationProof
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 872,
        columnNumber: 35
      },
      this
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 827,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 881,
  columnNumber: 13
}));
