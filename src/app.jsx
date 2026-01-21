import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { GameEngine, GAME_CONSTANTS } from "./engine.js";
import { sha256, serializeStateForHashing } from "./crypto.js";
import { verifyProof } from "./verifier.js";
import { Play, ShieldCheck, Trophy, RotateCcw, Save, Loader2, AlertTriangle, FileJson, X } from "lucide-react";
const GAME_VERSION = "1.0.0";
const Menu = ({ onStart, onLeaderboard, onVerify }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center max-w-md w-full", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "relative mb-12 text-center", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-6xl md:text-8xl font-black tracking-tighter text-white leading-none", children: [
      "HASH",
      /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 17,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500", children: "RUNNER" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 17,
        columnNumber: 30
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 16,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "mt-4 text-emerald-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-80", children: "Cryptographically Verified" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 19,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 15,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4 w-full max-w-xs", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onStart, className: "btn-primary flex items-center justify-between px-6 py-5 rounded-lg text-lg shadow-xl shadow-emerald-900/20", children: [
      /* @__PURE__ */ jsxDEV("span", { children: "START RUN" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV(Play, { size: 24, fill: "currentColor" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onLeaderboard, className: "btn-secondary flex flex-col items-center justify-center py-4 rounded-lg gap-2", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 30,
          columnNumber: 25
        }),
        " ",
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] tracking-widest", children: "LEADERBOARD" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 30,
          columnNumber: 46
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 29,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "btn-secondary flex flex-col items-center justify-center py-4 rounded-lg gap-2", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 33,
          columnNumber: 25
        }),
        " ",
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] tracking-widest", children: "VERIFY" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 33,
          columnNumber: 51
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 32,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 28,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 22,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "mt-12 text-[10px] text-zinc-700 font-mono text-center", children: [
    "v",
    GAME_VERSION,
    " \u2022 INTEGRITY CHECK: PASS"
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 38,
    columnNumber: 13
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 14,
  columnNumber: 9
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 13,
  columnNumber: 5
});
const HUD = ({ score, hash, isVerified, tick, isReplay }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-8", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-bold text-zinc-500 tracking-wider mb-1", children: "SCORE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 49,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-4xl md:text-6xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg", children: score.toString().padStart(6, "0") }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 50,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 48,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-end", children: isReplay ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-red-500/20 backdrop-blur px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 mb-2 animate-pulse", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-1.5 h-1.5 rounded-full bg-red-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 58,
        columnNumber: 25
      }),
      "REPLAY MODE"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 57,
      columnNumber: 21
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-zinc-300 mb-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-1.5 h-1.5 rounded-full ${isVerified ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-amber-400 animate-pulse"}` }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 63,
        columnNumber: 25
      }),
      isVerified ? "VERIFIED" : "SYNCING"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 62,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 55,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 47,
    columnNumber: 9
  }),
  !isReplay && /* @__PURE__ */ jsxDEV("div", { className: "self-end max-w-[200px] md:max-w-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-black/60 backdrop-blur px-3 py-2 rounded border border-white/5", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-500 font-bold uppercase mb-1 flex justify-between", children: [
      /* @__PURE__ */ jsxDEV("span", { children: [
        "BLOCK ",
        tick
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 74,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-500", children: "SHA-256" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 75,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] text-emerald-500/60 break-all leading-tight", children: hash || "INIT_GENESIS..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 77,
      columnNumber: 21
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 72,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 71,
    columnNumber: 13
  }),
  isReplay && /* @__PURE__ */ jsxDEV("div", { className: "self-center mt-auto mb-12", children: /* @__PURE__ */ jsxDEV("div", { className: "text-white/50 text-xs font-mono tracking-widest uppercase", children: "Tap to cancel replay" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 86,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 85,
    columnNumber: 14
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 46,
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-xs font-bold text-zinc-500 tracking-[0.4em] mb-4 uppercase", children: "Run Complete" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]", children: score }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 106,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 13
    }),
    isHashing ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-4 w-full max-w-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between w-full text-xs font-mono text-zinc-400", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "SIGNING BLOCKCHAIN" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 114,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { children: [
          Math.floor(hashProgress * 100),
          "%"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 115,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 113,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 shadow-[0_0_10px_#10b981]", style: { width: `${hashProgress * 100}%` } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 118,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 117,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-wider animate-pulse mt-2", children: [
        /* @__PURE__ */ jsxDEV(Loader2, { size: 12, className: "animate-spin" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 121,
          columnNumber: 25
        }),
        " Verifying Gameplay Logic"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 120,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 112,
      columnNumber: 17
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onReplay, className: "btn-primary flex items-center justify-center gap-2 py-4 rounded-lg text-sm mb-2", children: [
        /* @__PURE__ */ jsxDEV(Play, { size: 18 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 25
        }),
        " WATCH INSTANT REPLAY"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 126,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: downloadJson, className: "btn-secondary py-3 rounded-lg text-xs flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(FileJson, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 132,
            columnNumber: 29
          }),
          " SAVE JSON"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 131,
          columnNumber: 26
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "btn-secondary py-3 rounded-lg text-xs flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Trophy, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 135,
            columnNumber: 29
          }),
          " SUBMIT"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 134,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 130,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onHome, className: "btn-secondary py-3 rounded-lg text-xs flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(X, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 141,
            columnNumber: 29
          }),
          " HOME"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 140,
          columnNumber: 26
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onRestart, className: "btn-secondary py-3 rounded-lg text-xs flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 144,
            columnNumber: 29
          }),
          " RETRY"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 143,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 139,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "mt-6 text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex items-center justify-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 12 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 149,
          columnNumber: 25
        }),
        " VERIFY PROOF MANUALLY"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 148,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 125,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 103,
    columnNumber: 9
  });
};
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-zinc-900 rounded-xl border border-white/10 overflow-hidden flex flex-col h-[80vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold flex items-center gap-2 tracking-tight", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { className: "text-yellow-500", size: 18 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 195,
          columnNumber: 25
        }),
        " HALL OF FAME"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 194,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 197,
        columnNumber: 143
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 197,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 193,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-auto flex-1", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-zinc-950/90 sticky top-0 text-[10px] font-bold text-zinc-500 uppercase tracking-widest backdrop-blur-md", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium", children: "Rank" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 204,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium", children: "Runner" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 205,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium text-right", children: "Score" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 206,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium text-center", children: "Sig" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 207,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 203,
        columnNumber: 29
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 202,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-white/5", children: loading ? /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 4, className: "p-12 text-center text-zinc-600 font-mono text-xs animate-pulse", children: "SYNCING LEDGER..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 212,
        columnNumber: 37
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 212,
        columnNumber: 33
      }) : scores.map((s, i) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-white/[0.02] transition-colors", children: [
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-mono text-zinc-500 text-sm w-16", children: i < 3 ? /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-500 font-bold", children: [
          "#",
          i + 1
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 216,
          columnNumber: 50
        }) : `#${i + 1}` }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 215,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-full overflow-hidden bg-zinc-800", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 221,
            columnNumber: 49
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 220,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-zinc-300 text-sm truncate max-w-[120px]", children: s.username }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 223,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 219,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 218,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-400", children: s.score }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 227,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 226,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-center w-24", children: s.verified_local ? /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 14, className: "text-emerald-500" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 231,
          columnNumber: 82
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 231,
          columnNumber: 45
        }) : /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => verifyScore(s),
            disabled: s.verifying,
            className: "text-[9px] font-bold text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 px-2 py-1 rounded transition-all disabled:opacity-50",
            children: s.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 10, className: "animate-spin" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 238,
              columnNumber: 64
            }) : "CHECK"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 233,
            columnNumber: 45
          }
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 229,
          columnNumber: 37
        })
      ] }, s.id, true, {
        fileName: "<stdin>",
        lineNumber: 214,
        columnNumber: 33
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 210,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 201,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 200,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 192,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 191,
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/95 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-xl bg-zinc-900 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[70vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-sm font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 278,
          columnNumber: 25
        }),
        " CLIENT-SIDE VERIFIER"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 277,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-1 text-zinc-500 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 280,
        columnNumber: 112
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 280,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 276,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col relative bg-zinc-950", children: [
      /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          className: "flex-1 bg-transparent border-none p-4 font-mono text-[10px] md:text-xs text-zinc-400 resize-none focus:ring-0 focus:outline-none",
          placeholder: "Paste JSON proof object here...",
          value: jsonInput,
          onChange: (e) => setJsonInput(e.target.value),
          spellCheck: "false"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 284,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-900 border-t border-white/5 p-4", children: [
        status === "verifying" && /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] text-zinc-400 font-bold mb-1", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "REPLAYING INPUTS" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 296,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("span", { children: [
              Math.floor(progress * 100),
              "%"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 297,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 295,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all", style: { width: `${progress * 100}%` } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 300,
            columnNumber: 37
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 299,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 294,
          columnNumber: 29
        }),
        status === "success" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 307,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-emerald-400", children: "VALID PROOF" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 309,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-500/60 font-mono", children: [
              "Matches Protocol v",
              GAME_VERSION,
              " \u2022 Score: ",
              result.score
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 310,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 308,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 306,
          columnNumber: 29
        }),
        status === "fail" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3 bg-red-500/10 border border-red-500/20 p-3 rounded", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "text-red-500", size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 319,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-red-400", children: "VERIFICATION FAILED" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 321,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-500/60 font-mono", children: result?.reason || "Check JSON format" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 322,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 320,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 318,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: runVerify,
            disabled: status === "verifying" || !jsonInput,
            className: "w-full bg-white text-black font-bold text-xs py-3 rounded hover:bg-zinc-200 disabled:opacity-50 transition-colors",
            children: status === "verifying" ? "RUNNING SIMULATION..." : "VERIFY INTEGRITY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 329,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 292,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 283,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 275,
    columnNumber: 14
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 274,
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
  const viewRef = useRef("menu");
  const isHashingRef = useRef(false);
  useEffect(() => {
    window.room = new window.WebsimSocket();
  }, []);
  useEffect(() => {
    viewRef.current = view;
    isHashingRef.current = isHashing;
    if (view === "result" && isHashing) {
      processHashQueue();
    }
  }, [view, isHashing]);
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
    keys.current.jump = false;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(gameLoop);
  };
  const startReplay = () => {
    if (!finalProof) return;
    engineRef.current = new GameEngine(finalProof.seed);
    setView("replay");
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(replayLoop);
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
      const batchSize = viewRef.current === "game" ? 2 : 100;
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
        if (viewRef.current !== "game") setTimeout(processHashQueue, 0);
      } else if (viewRef.current !== "game" && isHashingRef.current) {
        finalizeGame();
      }
    } else if (viewRef.current !== "game" && isHashingRef.current) {
      finalizeGame();
    }
  };
  const gameLoop = () => {
    const engine = engineRef.current;
    if (!engine) return;
    const input = { jump: keys.current.jump };
    const newState = engine.tick(input);
    render(newState);
    const tickData = {
      tick: engine.tickCount,
      input: { ...input },
      state: { ...newState }
    };
    inputsRef.current.push({
      input: tickData.input,
      hash: null
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
  const replayLoop = () => {
    const engine = engineRef.current;
    if (!engine || !finalProof) return;
    if (engine.tickCount >= finalProof.inputs.length) {
      setView("result");
      return;
    }
    const inputRecord = finalProof.inputs[engine.tickCount];
    if (!inputRecord) {
      setView("result");
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
    if (hashWorkerRef.current) {
      ctx.fillStyle = "#10b981";
      ctx.font = '10px "Space Mono"';
      ctx.textAlign = "right";
      ctx.globalAlpha = 0.05;
      const hash = hashWorkerRef.current.previousHash;
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
    viewRef.current = "result";
    isHashingRef.current = true;
    setIsHashing(true);
    setView("result");
    processHashQueue();
  };
  const finalizeGame = async () => {
    if (!isHashingRef.current) return;
    isHashingRef.current = false;
    const engine = engineRef.current;
    const worker = hashWorkerRef.current;
    const proof = {
      version: GAME_VERSION,
      timestamp: Date.now(),
      seed: engine.seed,
      finalScore: engine.state.score,
      initialHash: await sha256(engine.seed),
      finalHash: worker.previousHash,
      inputs: inputsRef.current
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
          setView("result");
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
  const getHashProgress = () => {
    if (!inputsRef.current.length) return 0;
    return (hashWorkerRef.current?.processedCount || 0) / inputsRef.current.length;
  };
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
        lineNumber: 717,
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
        lineNumber: 724,
        columnNumber: 33
      },
      this
    ),
    (view === "game" || view === "replay") && /* @__PURE__ */ jsxDEV(
      HUD,
      {
        score,
        hash: lastHash,
        isVerified: hashWorkerRef.current?.queue.length === 0,
        tick: engineRef.current?.tickCount || 0,
        isReplay: view === "replay"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 730,
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
        hashProgress: getHashProgress(),
        onSave: submitScore,
        onRestart: startGame,
        onHome: () => setView("menu"),
        onReplay: startReplay,
        onVerify: () => setView("verify")
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 738,
        columnNumber: 35
      },
      this
    ),
    view === "leaderboard" && /* @__PURE__ */ jsxDEV(Leaderboard, { onClose: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 750,
      columnNumber: 40
    }, this),
    view === "verify" && /* @__PURE__ */ jsxDEV(Verifier, { onClose: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 752,
      columnNumber: 35
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 716,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 758,
  columnNumber: 13
}));
