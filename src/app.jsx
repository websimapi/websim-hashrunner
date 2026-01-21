import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { GameEngine, GAME_CONSTANTS } from "./engine.js";
import { sha256, serializeStateForHashing } from "./crypto.js";
import { verifyProof } from "./verifier.js";
import { Play, ShieldCheck, Trophy, RotateCcw, Save, Loader2, AlertTriangle, FileJson } from "lucide-react";
const GAME_VERSION = "1.0.0";
const Menu = ({ onStart, onLeaderboard, onVerify }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-white z-10 glass-panel animate-in fade-in duration-700", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "relative mb-12 text-center group", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 leading-none select-none", children: [
      "HASH",
      /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 16,
        columnNumber: 21
      }),
      "RUNNER"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 15,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 18,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-emerald-500/80 font-mono text-sm tracking-[0.2em] uppercase", children: "Cryptographically Verified" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 19,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 14,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 w-72", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onStart, className: "group relative flex items-center justify-between px-6 py-4 bg-zinc-100 hover:bg-white text-black rounded transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/20", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "font-bold tracking-tight", children: "START RUN" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(Play, { size: 18, className: "fill-black" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded border-2 border-transparent group-focus:border-emerald-500 transition-colors" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onLeaderboard, className: "flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 py-3 rounded border border-white/5 hover:border-white/20 transition-all text-sm font-medium text-zinc-300 hover:text-white backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 31,
          columnNumber: 21
        }),
        " LEADERBOARD"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 30,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 py-3 rounded border border-white/5 hover:border-white/20 transition-all text-sm font-medium text-zinc-300 hover:text-white backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 34,
          columnNumber: 21
        }),
        " VERIFY"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 33,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 22,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-8 text-[10px] text-zinc-600 font-mono max-w-xs text-center leading-relaxed", children: [
    "SYSTEM INTEGRITY CHECK: PASS",
    /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 40,
      columnNumber: 41
    }),
    "SHA-256 HASH CHAINING ACTIVE"
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 39,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 13,
  columnNumber: 5
});
const HUD = ({ score, hash, isVerified, tick }) => /* @__PURE__ */ jsxDEV(Fragment, { children: [
  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-6 left-8 pointer-events-none z-10", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-zinc-500 tracking-wider mb-1", children: "SCORE" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 49,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg", children: score.toString().padStart(6, "0") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 50,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 48,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-6 right-8 flex flex-col items-end pointer-events-none z-10", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-black/40 backdrop-blur px-3 py-1.5 rounded-full border border-white/5 text-zinc-300 mb-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-1.5 h-1.5 rounded-full ${isVerified ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-amber-400 animate-pulse"}` }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 57,
        columnNumber: 17
      }),
      isVerified ? "VERIFIED" : "CALCULATING"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 56,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-black/40 backdrop-blur px-3 py-2 rounded border border-white/5 max-w-[160px]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-600 font-bold uppercase mb-1", children: [
        "Latest Block (",
        tick,
        ")"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] text-emerald-500/80 break-all leading-tight opacity-70", children: hash ? hash.substring(0, 32) + "..." : "GENESIS_BLOCK..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 63,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 61,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 55,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 47,
  columnNumber: 5
});
const ResultScreen = ({ score, proof, onVerify, onSave, onRestart, isHashing, hashProgress }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center glass-panel text-white z-20 animate-in fade-in zoom-in-95 duration-300", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-10", children: [
    /* @__PURE__ */ jsxDEV("h2", { className: "text-sm font-bold text-zinc-500 tracking-[0.3em] mb-4", children: "SEQUENCE COMPLETE" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 74,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]", children: score }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 75,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 73,
    columnNumber: 9
  }),
  isHashing ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-4 mb-10 w-64", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between w-full text-xs font-mono text-zinc-400", children: [
      /* @__PURE__ */ jsxDEV("span", { children: "FINALIZING CHAIN" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 83,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("span", { children: [
        Math.floor(hashProgress * 100),
        "%"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 84,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 82,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 shadow-[0_0_10px_#10b981]", style: { width: `${hashProgress * 100}%` } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 87,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 86,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-wider animate-pulse", children: [
      /* @__PURE__ */ jsxDEV(Loader2, { size: 10, className: "animate-spin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 21
      }),
      " Cryptographic Signatures"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 89,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 81,
    columnNumber: 13
  }) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 w-64 mb-8", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]", children: [
      /* @__PURE__ */ jsxDEV(Save, { size: 18 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 96,
        columnNumber: 21
      }),
      " UPLOAD SCORE"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 95,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: () => {
        const blob = new Blob([JSON.stringify(proof, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `hashrunner_${proof.timestamp}.json`;
        a.click();
      }, className: "flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded text-sm font-medium transition-colors", children: [
        /* @__PURE__ */ jsxDEV(FileJson, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 107,
          columnNumber: 25
        }),
        " EXPORT"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 99,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onRestart, className: "flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded text-sm font-medium transition-colors", children: [
        /* @__PURE__ */ jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 25
        }),
        " RETRY"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 109,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 98,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 94,
    columnNumber: 13
  }),
  !isHashing && /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1", children: [
    /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 12 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 118,
      columnNumber: 17
    }),
    " Verify Integrity Manually"
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 117,
    columnNumber: 13
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 72,
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
      console.error(e);
      setScores((current) => current.map((s) => s.id === record.id ? { ...s, verifying: false } : s));
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/90 backdrop-blur-xl z-30 flex flex-col items-center justify-center p-6", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-4xl bg-zinc-900/50 rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh] shadow-2xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-white/5 flex justify-between items-center bg-white/5", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold flex items-center gap-2 tracking-tight", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { className: "text-yellow-500", size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 162,
          columnNumber: 25
        }),
        " TOP RUNNERS"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 161,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "text-zinc-400 hover:text-white transition-colors text-sm font-medium px-3 py-1 bg-white/5 rounded hover:bg-white/10", children: "CLOSE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 164,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 160,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-auto flex-1 p-0", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-zinc-950/80 sticky top-0 text-[10px] font-bold text-zinc-500 uppercase tracking-widest backdrop-blur-md", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "p-5 font-medium", children: "Rank" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 171,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-5 font-medium", children: "Player" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 172,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-5 font-medium text-right", children: "Score" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 173,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-5 font-medium text-center", children: "Proof" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 174,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 170,
        columnNumber: 29
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-white/5", children: loading ? /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 4, className: "p-12 text-center text-zinc-500 font-mono text-sm", children: "LOADING LEDGER..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 179,
        columnNumber: 37
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 179,
        columnNumber: 33
      }) : scores.map((s, i) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-white/[0.02] transition-colors group", children: [
        /* @__PURE__ */ jsxDEV("td", { className: "p-5 font-mono text-zinc-500 text-sm", children: i < 3 ? /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-500 font-bold", children: [
          "#",
          i + 1
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 183,
          columnNumber: 50
        }) : `#${i + 1}` }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 182,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-5", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-transparent group-hover:ring-white/10 transition-all", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 188,
            columnNumber: 49
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 187,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-zinc-200", children: s.username }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 190,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 186,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 185,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-5 text-right", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-lg", children: s.score }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 194,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 193,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-5 text-center", children: s.verified_local ? /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 10 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 199,
            columnNumber: 49
          }),
          " VALID"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 45
        }) : /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => verifyScore(s),
            disabled: s.verifying,
            className: "text-[10px] font-bold text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 rounded transition-all disabled:opacity-50",
            children: s.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 10, className: "animate-spin" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 207,
              columnNumber: 64
            }) : "VERIFY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 202,
            columnNumber: 45
          }
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 196,
          columnNumber: 37
        })
      ] }, s.id, true, {
        fileName: "<stdin>",
        lineNumber: 181,
        columnNumber: 33
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 177,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 167,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 159,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 158,
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/90 backdrop-blur-xl z-30 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 border-b border-white/5 flex justify-between items-center bg-zinc-900", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 247,
          columnNumber: 25
        }),
        " PROOF VERIFIER"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 246,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "text-zinc-500 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 249,
        columnNumber: 108
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 249,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 245,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 p-0 flex flex-col bg-zinc-950/50 relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-4 text-[10px] text-zinc-600 font-mono pointer-events-none", children: "INPUT: JSON" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 253,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          className: "flex-1 bg-transparent border-none p-4 font-mono text-xs text-zinc-400 resize-none focus:ring-0 focus:outline-none leading-relaxed",
          placeholder: "Paste proof JSON...",
          value: jsonInput,
          onChange: (e) => setJsonInput(e.target.value),
          spellCheck: "false"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 254,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-900 border-t border-white/5 p-5", children: [
        status === "verifying" && /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] text-zinc-400 font-bold mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "SIMULATING GAMEPLAY" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 267,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("span", { children: [
              Math.floor(progress * 100),
              "%"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 268,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 266,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all", style: { width: `${progress * 100}%` } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 271,
            columnNumber: 37
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 270,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 265,
          columnNumber: 29
        }),
        status === "success" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-4 bg-emerald-500/5 border border-emerald-500/20 p-3 rounded", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 278,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-emerald-400", children: "VERIFICATION PASSED" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 280,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-500/60 font-mono", children: [
              "Hash chain intact. Score: ",
              result.score
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 281,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 279,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 277,
          columnNumber: 29
        }),
        status === "fail" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-4 bg-red-500/5 border border-red-500/20 p-3 rounded", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "text-red-500", size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 290,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-red-400", children: "VERIFICATION FAILED" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 292,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-500/60 font-mono", children: result?.reason || "Malformed Proof" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 293,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 291,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 289,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: runVerify,
            disabled: status === "verifying" || !jsonInput,
            className: "w-full bg-white text-black font-bold text-sm py-3 rounded hover:bg-zinc-200 disabled:opacity-50 transition-colors",
            children: status === "verifying" ? "VERIFYING..." : "RUN VERIFICATION"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 300,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 263,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 252,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 244,
    columnNumber: 14
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 243,
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
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#27272a";
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
    if (hashWorkerRef.current) {
      ctx.fillStyle = "#10b981";
      ctx.font = '12px "Space Mono"';
      ctx.textAlign = "right";
      ctx.globalAlpha = 0.03;
      const hash = hashWorkerRef.current.previousHash;
      for (let i = 0; i < 10; i++) {
        ctx.fillText(hash.substring(i * 6, i * 6 + 64), canvas.width - 20, 100 + i * 20);
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
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.roundRect(c.PLAYER_X, p.y - p.height, p.width, p.height, 4);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#09090b";
    ctx.fillRect(c.PLAYER_X + 18, p.y - p.height + 10, 8, 4);
    state.obstacles.forEach((obs) => {
      const isFlying = obs.type === "flying";
      ctx.shadowBlur = 15;
      ctx.shadowColor = isFlying ? "rgba(236, 72, 153, 0.6)" : "rgba(245, 158, 11, 0.6)";
      ctx.fillStyle = isFlying ? "#ec4899" : "#f59e0b";
      ctx.beginPath();
      if (isFlying) {
        ctx.roundRect(obs.x, obs.y - obs.h, obs.w, obs.h, 2);
        ctx.fillStyle = "#ec4899";
        ctx.fillRect(obs.x - 5, obs.y - obs.h + 5, obs.w + 10, 4);
      } else {
        ctx.roundRect(obs.x, obs.y - obs.h, obs.w, obs.h, 2);
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(obs.x + 5, obs.y - obs.h + 5, obs.w - 10, obs.h - 10);
    });
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
        lineNumber: 644,
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
        lineNumber: 652,
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
        lineNumber: 658,
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
        lineNumber: 665,
        columnNumber: 35
      },
      this
    ),
    view === "leaderboard" && /* @__PURE__ */ jsxDEV(Leaderboard, { onClose: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 675,
      columnNumber: 40
    }, this),
    view === "verify" && /* @__PURE__ */ jsxDEV(Verifier, { onClose: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 677,
      columnNumber: 35
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 642,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 683,
  columnNumber: 13
}));
