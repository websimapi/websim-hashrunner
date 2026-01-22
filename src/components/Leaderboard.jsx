import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { Trophy, X, Eye, ShieldCheck, Loader2, Medal } from "lucide-react";
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[85vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "bg-yellow-500/10 text-yellow-500 p-1.5 rounded-lg border border-yellow-500/20", children: /* @__PURE__ */ jsxDEV(Trophy, { size: 18 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 83,
          columnNumber: 33
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 82,
          columnNumber: 29
        }),
        "Top Runners"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 hover:bg-white/10 text-zinc-400 hover:text-white rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 89,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 88,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto custom-scrollbar p-2", children: loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center h-full gap-4 text-zinc-500", children: [
      /* @__PURE__ */ jsxDEV(Loader2, { size: 40, className: "animate-spin text-emerald-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 97,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-widest uppercase", children: "Fetching Blockchain Data" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 98,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 26
    }) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: scores.map((s, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-10 text-center font-black text-xl flex items-center justify-center ${i === 0 ? "text-yellow-400" : i === 1 ? "text-zinc-300" : i === 2 ? "text-amber-600" : "text-zinc-600"}`, children: i < 3 ? /* @__PURE__ */ jsxDEV(Medal, { size: 24 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 110,
        columnNumber: 50
      }) : i + 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 37
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden shrink-0", children: /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${s.username}`, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 115,
        columnNumber: 41
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 37
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-zinc-200 truncate", children: s.username }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 120,
          columnNumber: 41
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-500 font-mono flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { children: new Date(s.timestamp).toLocaleDateString() }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 122,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-1 bg-zinc-700 rounded-full" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 123,
            columnNumber: 45
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "v",
            s.proof.version || "1.0"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 124,
            columnNumber: 45
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 121,
          columnNumber: 41
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 119,
        columnNumber: 37
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-right pr-4 border-r border-white/5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-black text-emerald-400 tabular-nums leading-none", children: s.score }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 130,
          columnNumber: 41
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-600 font-bold uppercase tracking-wider", children: "PTS" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 133,
          columnNumber: 41
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 129,
        columnNumber: 37
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 pl-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onReplay(decompressProof(s.proof)),
            className: "p-2 bg-zinc-900 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 rounded-lg transition-colors border border-white/5 hover:border-emerald-500/30",
            title: "Watch Replay",
            children: /* @__PURE__ */ jsxDEV(Eye, { size: 16 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 143,
              columnNumber: 45
            })
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 138,
            columnNumber: 41
          }
        ),
        s.verified_local ? /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 148,
          columnNumber: 49
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 147,
          columnNumber: 45
        }) : /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => verifyScore(s),
            disabled: s.verifying,
            className: "p-2 bg-zinc-900 hover:bg-white hover:text-black text-zinc-400 rounded-lg transition-colors border border-white/5 disabled:opacity-50",
            title: "Verify Proof",
            children: s.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 16, className: "animate-spin" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 157,
              columnNumber: 64
            }) : /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 157,
              columnNumber: 113
            })
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 151,
            columnNumber: 45
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 37
      })
    ] }, s.id, true, {
      fileName: "<stdin>",
      lineNumber: 103,
      columnNumber: 33
    })) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 101,
      columnNumber: 25
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 94,
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
