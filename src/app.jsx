import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { GameEngine, GAME_CONSTANTS } from "./engine.js";
import { sha256, serializeStateForHashing } from "./crypto.js";
import { verifyProof } from "./verifier.js";
import { Play, ShieldCheck, Trophy, RotateCcw, Save, Loader2, AlertTriangle, FileJson } from "lucide-react";
const GAME_VERSION = "1.0.0";
const Menu = ({ onStart, onLeaderboard, onVerify }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 text-white z-10", children: [
  /* @__PURE__ */ jsxDEV("h1", { className: "text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500", children: "HASH RUNNER" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 14,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 mb-8 font-mono text-sm", children: "CRYPTOGRAPHICALLY VERIFIABLE GAMEPLAY" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 15,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4 w-64", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onStart, className: "flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 py-3 rounded font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]", children: [
      /* @__PURE__ */ jsxDEV(Play, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 19,
        columnNumber: 17
      }),
      " START GAME"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 18,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("button", { onClick: onLeaderboard, className: "flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 py-3 rounded font-bold transition-all", children: [
      /* @__PURE__ */ jsxDEV(Trophy, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 17
      }),
      " LEADERBOARD"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 21,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded font-bold transition-all border border-zinc-700", children: [
      /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 17
      }),
      " VERIFY PROOF"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 24,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 17,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "mt-8 text-xs text-zinc-500 max-w-md text-center", children: "Each frame is hashed and linked to the previous one. Cheating requires breaking SHA-256 or forging a perfect physics replay." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 29,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 13,
  columnNumber: 5
});
const HUD = ({ score, hash, isVerified, tick }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none", children: [
  /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-4xl font-bold text-white drop-shadow-md", children: score.toString().padStart(6, "0") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 39,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono mt-1 opacity-70 bg-black/50 p-1 rounded", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-2 h-2 rounded-full ${isVerified ? "bg-emerald-500" : "bg-yellow-500 animate-pulse"}` }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 41,
        columnNumber: 17
      }),
      isVerified ? "CHAIN VERIFIED" : "HASHING..."
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 40,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 38,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "text-right font-mono text-[10px] text-emerald-400/60 max-w-[200px] break-all bg-black/80 p-2 rounded border border-emerald-500/30", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-zinc-500 mb-1", children: [
      "CURRENT BLOCK HASH (",
      tick,
      ")"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 46,
      columnNumber: 13
    }),
    hash || "INITIALIZING CHAIN..."
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 45,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 37,
  columnNumber: 5
});
const ResultScreen = ({ score, proof, onVerify, onSave, onRestart, isHashing, hashProgress }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-black/95 text-white z-20 animate-in fade-in duration-300", children: [
  /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl font-bold mb-2", children: "GAME OVER" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 54,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "text-6xl font-mono text-emerald-400 mb-8", children: score }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 55,
    columnNumber: 9
  }),
  isHashing ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2 mb-8", children: [
    /* @__PURE__ */ jsxDEV(Loader2, { className: "animate-spin text-emerald-500", size: 32 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-mono text-zinc-400", children: [
      "FINALIZING HASH CHAIN (",
      Math.floor(hashProgress * 100),
      "%)"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 60,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "w-64 h-1 bg-zinc-800 rounded overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all duration-75", style: { width: `${hashProgress * 100}%` } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 62,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 61,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 58,
    columnNumber: 13
  }) : /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4 mb-8", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "flex flex-col items-center gap-2 bg-emerald-900/50 border border-emerald-500/50 hover:bg-emerald-900 p-4 rounded-lg w-32 transition-all", children: [
      /* @__PURE__ */ jsxDEV(Save, { size: 24 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 68,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold", children: "SUBMIT SCORE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 69,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 67,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("button", { onClick: () => {
      const blob = new Blob([JSON.stringify(proof, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hashrunner_proof_${proof.timestamp}.json`;
      a.click();
    }, className: "flex flex-col items-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg w-32 transition-all", children: [
      /* @__PURE__ */ jsxDEV(FileJson, { size: 24 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 79,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold", children: "EXPORT PROOF" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 71,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 66,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("button", { onClick: onRestart, className: "flex items-center gap-2 text-zinc-400 hover:text-white transition-colors", children: [
    /* @__PURE__ */ jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 86,
      columnNumber: 13
    }),
    " RETURN TO MENU"
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 85,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 53,
  columnNumber: 5
});
const Leaderboard = ({ onClose }) => {
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
      const result = await verifyProof(record.proof);
      setScores((current) => current.map(
        (s) => s.id === record.id ? { ...s, verifying: false, verified_local: result.valid } : s
      ));
    } catch (e) {
      console.error("Verification failed", e);
      setScores((current) => current.map((s) => s.id === record.id ? { ...s, verifying: false } : s));
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-zinc-900 z-30 p-8 overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { className: "text-yellow-500" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 138,
          columnNumber: 21
        }),
        " GLOBAL LEADERBOARD"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700", children: "CLOSE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 140,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 136,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-950 rounded-lg border border-zinc-800 flex-1 overflow-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-zinc-900 sticky top-0 text-xs font-bold text-zinc-500 uppercase", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "p-4", children: "Rank" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 147,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4", children: "Player" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 148,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 text-right", children: "Score" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 149,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 text-center", children: "Status" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 150,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 text-right", children: "Action" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 151,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 146,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 145,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("tbody", { children: loading ? /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 5, className: "p-8 text-center text-zinc-500", children: "Loading neural link..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 156,
        columnNumber: 33
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 156,
        columnNumber: 29
      }) : scores.map((s, i) => /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-zinc-900 hover:bg-zinc-900/50", children: [
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-mono text-zinc-400", children: [
          "#",
          i + 1
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 159,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full", alt: "" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 162,
            columnNumber: 41
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 161,
            columnNumber: 37
          }),
          s.username
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 160,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right font-mono text-emerald-400 font-bold", children: s.score }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 166,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-center", children: s.verified_local ? /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center gap-1 text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 12 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 170,
            columnNumber: 45
          }),
          " VERIFIED"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 169,
          columnNumber: 41
        }) : /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-600", children: "UNVERIFIED" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 173,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 167,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => verifyScore(s),
            disabled: s.verifying || s.verified_local,
            className: "text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded transition-colors disabled:opacity-50",
            children: s.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 12, className: "animate-spin" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 182,
              columnNumber: 56
            }) : "VERIFY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 177,
            columnNumber: 37
          }
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 176,
          columnNumber: 33
        })
      ] }, s.id, true, {
        fileName: "<stdin>",
        lineNumber: 158,
        columnNumber: 29
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 154,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 144,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 143,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 135,
    columnNumber: 9
  });
};
const Verifier = ({ onClose }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const runVerify = async () => {
    try {
      const proof = JSON.parse(jsonInput);
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-zinc-900 z-30 p-8 flex flex-col items-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl flex flex-col h-full", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 222,
          columnNumber: 25
        }),
        " MANUAL VERIFICATION"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 221,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "text-zinc-400 hover:text-white", children: "CLOSE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 224,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 220,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-950 p-6 rounded-lg border border-zinc-800 flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-zinc-500 mb-4", children: "Paste the raw JSON proof below. The system will replay the entire game input-by-input and compare SHA-256 hashes." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 228,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          className: "flex-1 bg-zinc-900 border border-zinc-800 rounded p-4 font-mono text-xs text-zinc-300 resize-none focus:outline-none focus:border-emerald-500/50 mb-4",
          placeholder: 'Paste {"version": "1.0.0", "seed": "..."} here',
          value: jsonInput,
          onChange: (e) => setJsonInput(e.target.value)
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 230,
          columnNumber: 21
        }
      ),
      status === "verifying" && /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs text-zinc-400 mb-1", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "REPLAYING GAME STATE..." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 240,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            Math.floor(progress * 100),
            "%"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 241,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 239,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-2 bg-zinc-800 rounded overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-yellow-500 transition-all", style: { width: `${progress * 100}%` } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 244,
          columnNumber: 33
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 243,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 238,
        columnNumber: 25
      }),
      status === "success" && /* @__PURE__ */ jsxDEV("div", { className: "bg-emerald-900/30 border border-emerald-500/30 p-4 rounded mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-emerald-500 text-black p-2 rounded-full", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 24 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 251,
          columnNumber: 89
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 251,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-emerald-400", children: "VERIFICATION SUCCESSFUL" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 253,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-emerald-300/70", children: [
            "Score: ",
            result.score,
            " | Ticks: ",
            JSON.parse(jsonInput).inputs.length,
            " | Hash Chain Intact"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 254,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 252,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 250,
        columnNumber: 25
      }),
      status === "fail" && /* @__PURE__ */ jsxDEV("div", { className: "bg-red-900/30 border border-red-500/30 p-4 rounded mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-red-500 text-black p-2 rounded-full", children: /* @__PURE__ */ jsxDEV(AlertTriangle, { size: 24 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 263,
          columnNumber: 85
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 263,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-red-400", children: "VERIFICATION FAILED" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 265,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-red-300/70", children: [
            "Reason: ",
            result?.reason || "Unknown error"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 266,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 264,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 262,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: runVerify,
          disabled: status === "verifying" || !jsonInput,
          className: "w-full bg-zinc-100 text-black font-bold py-3 rounded hover:bg-white disabled:opacity-50 transition-colors",
          children: status === "verifying" ? "RUNNING SIMULATION..." : "VERIFY PROOF"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 273,
          columnNumber: 21
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 227,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 219,
    columnNumber: 14
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 218,
    columnNumber: 9
  });
};
function App() {
  const [view, setView] = useState("menu");
  const [score, setScore] = useState(0);
  const [finalProof, setFinalProof] = useState(null);
  const [lastHash, setLastHash] = useState(null);
  const [hashQueueLength, setHashQueueLength] = useState(0);
  const [isHashing, setIsHashing] = useState(false);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const requestRef = useRef(null);
  const hashWorkerRef = useRef(null);
  const inputsRef = useRef([]);
  const keys = useRef({ jump: false });
  useEffect(() => {
    window.room = new window.WebsimSocket();
  }, []);
  const startGame = async () => {
    const seed = Math.random().toString(36).substring(2) + Date.now().toString(36);
    engineRef.current = new GameEngine(seed);
    inputsRef.current = [];
    const initialHash = await sha256(seed);
    setLastHash(initialHash);
    startHashProcessor(initialHash);
    setView("game");
    setScore(0);
    setIsHashing(false);
    setFinalProof(null);
    requestRef.current = requestAnimationFrame(gameLoop);
  };
  const startHashProcessor = (initialHash) => {
    hashWorkerRef.current = {
      previousHash: initialHash,
      processedCount: 0,
      queue: [],
      // { tick, input, state }
      active: true,
      processing: false
    };
  };
  const processHashQueue = async () => {
    const worker = hashWorkerRef.current;
    if (!worker || !worker.active || worker.processing) return;
    if (worker.queue.length > 0) {
      worker.processing = true;
      const batchSize = view === "game" ? 2 : 50;
      for (let i = 0; i < batchSize && worker.queue.length > 0; i++) {
        const item = worker.queue.shift();
        const dataToHash = worker.previousHash + "|" + serializeStateForHashing(item.tick, item.input, item.state);
        const newHash = await sha256(dataToHash);
        worker.previousHash = newHash;
        worker.processedCount++;
        inputsRef.current[item.tick - 1].hash = newHash;
        if (item.tick % 10 === 0) setLastHash(newHash);
      }
      setHashQueueLength(worker.queue.length);
      worker.processing = false;
      if (worker.queue.length > 0) {
        if (view !== "game") setTimeout(processHashQueue, 0);
      } else if (view !== "game" && isHashing) {
        finalizeGame();
      }
    }
  };
  const gameLoop = () => {
    const engine = engineRef.current;
    if (!engine) return;
    const input = { jump: keys.current.jump };
    const prevState = engine.getState();
    const newState = engine.tick(input);
    render(newState);
    const tickData = {
      tick: engine.tickCount,
      input: { ...input },
      // clone
      state: { ...newState }
      // clone
    };
    inputsRef.current.push({
      input: tickData.input,
      hash: null
      // Will be filled by hash processor
    });
    if (hashWorkerRef.current && hashWorkerRef.current.active) {
      hashWorkerRef.current.queue.push(tickData);
      processHashQueue();
    }
    setScore(newState.score);
    if (engine.gameOver) {
      endGame();
    } else {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };
  const render = (state) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const c = GAME_CONSTANTS;
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, c.GROUND_Y - 20, canvas.width, 4);
    ctx.fillRect(0, c.GROUND_Y, canvas.width, canvas.height - c.GROUND_Y);
    ctx.fillStyle = "#0f9";
    ctx.fillRect(c.PLAYER_X, state.player.y - state.player.height, state.player.width, state.player.height);
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#0f9";
    ctx.fillRect(c.PLAYER_X + 5, state.player.y - state.player.height + 5, state.player.width - 10, state.player.height - 10);
    ctx.shadowBlur = 0;
    state.obstacles.forEach((obs) => {
      ctx.fillStyle = obs.type === "flying" ? "#f09" : "#f90";
      ctx.fillRect(obs.x, obs.y - obs.h, obs.w, obs.h);
    });
    ctx.fillStyle = "#0f9";
    ctx.font = "10px monospace";
    ctx.globalAlpha = 0.05;
    if (hashWorkerRef.current) {
      ctx.fillText(hashWorkerRef.current.previousHash.substring(0, 64), 50, 50);
    }
    ctx.globalAlpha = 1;
  };
  const endGame = () => {
    cancelAnimationFrame(requestRef.current);
    setIsHashing(true);
    setView("result");
    processHashQueue();
  };
  const finalizeGame = async () => {
    setIsHashing(false);
    const engine = engineRef.current;
    const worker = hashWorkerRef.current;
    const proof = {
      version: GAME_VERSION,
      timestamp: Date.now(),
      seed: engine.seed,
      finalScore: engine.state.score,
      initialHash: await sha256(engine.seed),
      // Recompute to be safe, or store
      finalHash: worker.previousHash,
      inputs: inputsRef.current
      // These now have hashes attached
    };
    setFinalProof(proof);
  };
  const submitScore = async () => {
    if (!finalProof) return;
    try {
      const user = await window.websim.getCurrentUser();
      await window.room.collection("high_scores").create({
        score: finalProof.finalScore,
        proof: finalProof,
        // Store the full proof for verification
        game_version: GAME_VERSION,
        verified_local: false
        // Needs peer verification
      });
      alert("Score submitted to global ledger!");
      setView("menu");
    } catch (e) {
      console.error(e);
      alert("Submission failed. Check console.");
    }
  };
  useEffect(() => {
    const down = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        keys.current.jump = true;
        e.preventDefault();
      }
    };
    const up = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        keys.current.jump = false;
      }
    };
    const touchStart = () => keys.current.jump = true;
    const touchEnd = () => keys.current.jump = false;
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("touchstart", touchStart);
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
  const getHashProgress = () => {
    if (!inputsRef.current.length) return 0;
    const processed = hashWorkerRef.current?.processedCount || 0;
    return processed / inputsRef.current.length;
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-full bg-zinc-950 overflow-hidden select-none", children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        width: 800,
        height: 400,
        className: "w-full h-full object-contain"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 570,
        columnNumber: 13
      },
      this
    ),
    view === "menu" && /* @__PURE__ */ jsxDEV(
      Menu,
      {
        onStart: startGame,
        onLeaderboard: () => setView("leaderboard"),
        onVerify: () => setView("verify")
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 578,
        columnNumber: 33
      },
      this
    ),
    view === "game" && /* @__PURE__ */ jsxDEV(
      HUD,
      {
        score,
        hash: lastHash,
        isVerified: hashWorkerRef.current?.queue.length === 0,
        tick: engineRef.current?.tickCount || 0
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 584,
        columnNumber: 33
      },
      this
    ),
    view === "result" && /* @__PURE__ */ jsxDEV(
      ResultScreen,
      {
        score,
        proof: finalProof,
        isHashing,
        hashProgress: getHashProgress(),
        onSave: submitScore,
        onRestart: () => setView("menu"),
        onVerify: () => setView("verify")
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 591,
        columnNumber: 35
      },
      this
    ),
    view === "leaderboard" && /* @__PURE__ */ jsxDEV(Leaderboard, { onClose: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 601,
      columnNumber: 40
    }, this),
    view === "verify" && /* @__PURE__ */ jsxDEV(Verifier, { onClose: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 603,
      columnNumber: 35
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 568,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 609,
  columnNumber: 13
}));
