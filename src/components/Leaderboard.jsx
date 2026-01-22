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
            if (record[`proofs_${i}`]) {
              allRawProofs = allRawProofs.concat(record[`proofs_${i}`]);
            }
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
                // Store compressed proof
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
          lineNumber: 95,
          columnNumber: 25
        }),
        " HALL OF FAME"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 94,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 97,
        columnNumber: 143
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 97,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 93,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-auto flex-1 custom-scrollbar", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { className: "bg-black/20 sticky top-0 text-[10px] font-bold text-zinc-500 uppercase tracking-widest backdrop-blur-md z-10", children: /* @__PURE__ */ jsxDEV("tr", { children: [
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium", children: "Rank" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 104,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium", children: "Runner" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 105,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium text-right", children: "Score" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("th", { className: "p-4 font-medium text-center", children: "Actions" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 107,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 103,
        columnNumber: 29
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 102,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-white/5", children: loading ? /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 4, className: "p-12 text-center text-zinc-600 font-mono text-xs animate-pulse", children: "SYNCING LEDGER..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 112,
        columnNumber: 37
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 112,
        columnNumber: 33
      }) : scores.map((s, i) => /* @__PURE__ */ jsxDEV("tr", { className: "group hover:bg-white/[0.02] transition-colors", children: [
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 font-mono text-zinc-500 text-sm w-16", children: i < 3 ? /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-500 font-bold", children: [
          "#",
          i + 1
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 116,
          columnNumber: 50
        }) : `#${i + 1}` }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 115,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-white/5", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 121,
            columnNumber: 49
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 120,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-zinc-300 text-sm truncate max-w-[120px]", children: s.username }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 123,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 119,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 118,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-lg", children: s.score }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 126,
          columnNumber: 37
        }),
        /* @__PURE__ */ jsxDEV("td", { className: "p-4 text-center w-32", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => onReplay(decompressProof(s.proof)),
              className: "p-2 bg-zinc-800 hover:bg-emerald-500 hover:text-black text-zinc-400 rounded-lg transition-all",
              title: "Watch Replay",
              children: /* @__PURE__ */ jsxDEV(Eye, { size: 14 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 136,
                columnNumber: 49
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 131,
              columnNumber: 45
            }
          ),
          s.verified_local ? /* @__PURE__ */ jsxDEV("div", { className: "p-2 text-emerald-500", title: "Verified Locally", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 14 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 140,
            columnNumber: 112
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 140,
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
                lineNumber: 148,
                columnNumber: 68
              }) : /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 14 }, void 0, false, {
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
          lineNumber: 130,
          columnNumber: 41
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 129,
          columnNumber: 37
        })
      ] }, s.id, true, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 33
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 110,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 101,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 100,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 92,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 91,
    columnNumber: 9
  });
};
export {
  Leaderboard
};
