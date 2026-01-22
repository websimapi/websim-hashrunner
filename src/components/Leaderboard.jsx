import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { Trophy, X, Eye, ShieldCheck, Loader2 } from "lucide-react";
import { verifyProof } from "../verifier.js";
import { decompressProof } from "../compression.js";
const Leaderboard = ({ onClose, onReplay }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const records = await window.room.collection("player_records_v1").getList();
        let allScores = [];
        records.forEach((record) => {
          let allRawProofs = [];
          if (record.proofs) allRawProofs = allRawProofs.concat(record.proofs);
          let i = 2;
          while (record[`proofs_${i}`]) {
            if (record[`proofs_${i}`]) allRawProofs = allRawProofs.concat(record[`proofs_${i}`]);
            i++;
            if (i > 20) break;
          }
          if (allRawProofs.length === 0) return;
          allRawProofs.forEach((rawProof, index) => {
            if (rawProof && rawProof.finalScore) {
              allScores.push({
                id: `${record.id}_${index}`,
                username: record.username,
                score: rawProof.finalScore,
                proof: rawProof,
                verifying: false,
                verified_local: false,
                timestamp: rawProof.timestamp || 0
              });
            }
          });
        });
        const sorted = allScores.sort((a, b) => b.score - a.score).slice(0, 50);
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
      const fullProof = decompressProof(record.proof);
      const result = await verifyProof(fullProof, null, record.username);
      if (!result.valid) alert(`Verification Failed: ${result.reason}`);
      setScores((current) => current.map(
        (s) => s.id === record.id ? { ...s, verifying: false, verified_local: result.valid } : s
      ));
    } catch (e) {
      console.error(e);
      setScores((current) => current.map((s) => s.id === record.id ? { ...s, verifying: false } : s));
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-black/20", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Trophy, { className: "text-yellow-500", size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 82,
            columnNumber: 29
          }),
          "Global Rankings"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 81,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-500 mt-1", children: "Top verified runs from around the world" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 85,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 88,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 87,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-y-auto flex-1 p-2 md:p-4 custom-scrollbar", children: loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center h-64 gap-3 text-zinc-500", children: [
      /* @__PURE__ */ jsxDEV(Loader2, { size: 32, className: "animate-spin text-emerald-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 96,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-medium", children: "SYNCING BLOCKCHAIN RECORDS..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 97,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 95,
      columnNumber: 26
    }) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: scores.map((s, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 p-3 bg-zinc-800/30 hover:bg-zinc-800/50 border border-white/5 rounded-xl transition-all group", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-8 text-center font-black text-lg ${i < 3 ? "text-yellow-500" : "text-zinc-600"}`, children: [
        "#",
        i + 1
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 37
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 111,
          columnNumber: 45
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 41
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-zinc-200 truncate", children: s.username }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 114,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-500 font-mono", children: new Date(s.timestamp).toLocaleDateString() }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 115,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 113,
          columnNumber: 41
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 109,
        columnNumber: 37
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-black text-emerald-400 tabular-nums leading-none", children: s.score }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 122,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-600 font-bold uppercase tracking-wider", children: "Score" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 125,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 121,
          columnNumber: 41
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-1.5 pl-4 border-l border-white/5", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => onReplay(decompressProof(s.proof)),
              className: "p-2 bg-zinc-800 hover:bg-white hover:text-black text-zinc-400 rounded-lg transition-colors",
              title: "Watch Replay",
              children: /* @__PURE__ */ jsxDEV(Eye, { size: 16 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 134,
                columnNumber: 49
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 129,
              columnNumber: 45
            }
          ),
          s.verified_local ? /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20", title: "Verified", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 139,
            columnNumber: 53
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 138,
            columnNumber: 49
          }) : /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => verifyScore(s),
              disabled: s.verifying,
              className: "p-2 bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-400 rounded-lg transition-colors disabled:opacity-50",
              title: "Verify Proof",
              children: s.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 16, className: "animate-spin" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 148,
                columnNumber: 68
              }) : /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 148,
                columnNumber: 117
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 142,
              columnNumber: 49
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 128,
          columnNumber: 41
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 120,
        columnNumber: 37
      })
    ] }, s.id, true, {
      fileName: "<stdin>",
      lineNumber: 102,
      columnNumber: 33
    })) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 100,
      columnNumber: 25
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 93,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 76,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 75,
    columnNumber: 9
  });
};
export {
  Leaderboard
};
