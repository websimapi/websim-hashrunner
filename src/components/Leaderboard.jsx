import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { Trophy, X, Eye, ShieldCheck, Loader2, Medal, ChevronLeft, ChevronRight, User, History, Calendar } from "lucide-react";
import { verifyProof } from "../verifier.js";
import { decompressProof } from "../compression.js";
const Leaderboard = ({ onClose, onReplay }) => {
  const [allData, setAllData] = useState({});
  const [summaryList, setSummaryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("summary");
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 6;
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const records = await window.room.collection("player_records_v1").getList();
        const grouped = {};
        records.forEach((record) => {
          let allRawProofs = [];
          if (record.proofs) allRawProofs = allRawProofs.concat(record.proofs);
          for (let c = 2; c <= 20; c++) {
            const col = record[`proofs_${c}`];
            if (col) allRawProofs = allRawProofs.concat(col);
          }
          if (allRawProofs.length === 0) return;
          allRawProofs.forEach((rawProof, index) => {
            if (rawProof && rawProof.finalScore !== void 0) {
              const scoreItem = {
                id: `${record.id}_${index}`,
                username: record.username,
                score: rawProof.finalScore,
                proof: rawProof,
                verifying: false,
                verified_local: false,
                timestamp: rawProof.timestamp || 0
              };
              if (!grouped[record.username]) {
                grouped[record.username] = {
                  username: record.username,
                  bestScore: 0,
                  scores: [],
                  avatarUrl: `https://images.websim.com/avatar/${record.username}`
                };
              }
              grouped[record.username].scores.push(scoreItem);
              if (scoreItem.score > grouped[record.username].bestScore) {
                grouped[record.username].bestScore = scoreItem.score;
              }
            }
          });
        });
        const summary = Object.values(grouped).map((user) => {
          user.scores.sort((a, b) => b.score - a.score);
          return user;
        }).sort((a, b) => b.bestScore - a.bestScore);
        setAllData(grouped);
        setSummaryList(summary);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);
  const handleUserClick = (username) => {
    setSelectedUsername(username);
    setPage(0);
    setViewMode("detail");
  };
  const handleBack = () => {
    setViewMode("summary");
    setPage(0);
    setSelectedUsername(null);
  };
  const verifyScore = async (scoreId, username) => {
    const userGroup = allData[username];
    if (!userGroup) return;
    const scoreIndex = userGroup.scores.findIndex((s) => s.id === scoreId);
    if (scoreIndex === -1) return;
    setAllData((prev) => {
      const u = { ...prev[username] };
      u.scores = [...u.scores];
      u.scores[scoreIndex] = { ...u.scores[scoreIndex], verifying: true };
      return { ...prev, [username]: u };
    });
    try {
      const record = userGroup.scores[scoreIndex];
      const fullProof = decompressProof(record.proof);
      const result = await verifyProof(fullProof, null, username);
      if (!result.valid) alert(`Verification Failed: ${result.reason}`);
      setAllData((prev) => {
        const u = { ...prev[username] };
        u.scores = [...u.scores];
        u.scores[scoreIndex] = {
          ...u.scores[scoreIndex],
          verifying: false,
          verified_local: result.valid
        };
        return { ...prev, [username]: u };
      });
    } catch (e) {
      console.error(e);
      setAllData((prev) => {
        const u = { ...prev[username] };
        u.scores = [...u.scores];
        u.scores[scoreIndex] = { ...u.scores[scoreIndex], verifying: false };
        return { ...prev, [username]: u };
      });
    }
  };
  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;
    return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-4 py-4 border-t border-white/5 bg-zinc-900/30 mt-auto", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setPage((p) => Math.max(0, p - 1)),
          disabled: page === 0,
          className: "p-2 rounded-lg hover:bg-white/10 text-zinc-400 disabled:opacity-30 disabled:hover:bg-transparent",
          children: /* @__PURE__ */ jsxDEV(ChevronLeft, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 150,
            columnNumber: 21
          })
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 145,
          columnNumber: 17
        }
      ),
      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-zinc-500", children: [
        "PAGE ",
        page + 1,
        " ",
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-700", children: "/" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 153,
          columnNumber: 37
        }),
        " ",
        totalPages
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 152,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
          disabled: page === totalPages - 1,
          className: "p-2 rounded-lg hover:bg-white/10 text-zinc-400 disabled:opacity-30 disabled:hover:bg-transparent",
          children: /* @__PURE__ */ jsxDEV(ChevronRight, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 160,
            columnNumber: 21
          })
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 155,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 144,
      columnNumber: 13
    });
  };
  const currentList = viewMode === "summary" ? summaryList : allData[selectedUsername]?.scores || [];
  const displayedItems = currentList.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col", style: { height: "min(600px, 85vh)" }, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center shrink-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        viewMode === "detail" && /* @__PURE__ */ jsxDEV("button", { onClick: handleBack, className: "mr-2 p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(ChevronLeft, { size: 20 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 181,
          columnNumber: 33
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 180,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-white flex items-center gap-2", children: viewMode === "summary" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-500", children: /* @__PURE__ */ jsxDEV(Trophy, { size: 18 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 188,
              columnNumber: 75
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 188,
              columnNumber: 41
            }),
            "Leaderboard"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 187,
            columnNumber: 37
          }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-full overflow-hidden bg-zinc-800", children: /* @__PURE__ */ jsxDEV("img", { src: allData[selectedUsername]?.avatarUrl, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 194,
              columnNumber: 45
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 193,
              columnNumber: 41
            }),
            selectedUsername
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 192,
            columnNumber: 37
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 185,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-zinc-500 font-medium", children: viewMode === "summary" ? "GLOBAL RANKINGS \u2022 BEST SCORES" : "PLAYER HISTORY \u2022 ALL PROOFS" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 200,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 184,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 178,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 hover:bg-white/10 text-zinc-400 hover:text-white rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 206,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 205,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 177,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col min-h-0 bg-[#0c0c0e]", children: [
      loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col items-center justify-center gap-4 text-zinc-500", children: [
        /* @__PURE__ */ jsxDEV(Loader2, { size: 32, className: "animate-spin text-emerald-500" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 214,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-widest uppercase", children: "Syncing Ledger" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 215,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 213,
        columnNumber: 26
      }) : displayedItems.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex items-center justify-center text-zinc-600 text-xs", children: "No records found" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 218,
        columnNumber: 25
      }) : /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-hidden p-2 space-y-1", children: displayedItems.map((item, i) => {
        const isSummary = viewMode === "summary";
        const rank = page * ITEMS_PER_PAGE + i + 1;
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => isSummary && handleUserClick(item.username),
            className: `flex items-center gap-3 p-3 rounded-xl border border-transparent transition-all group ${isSummary ? "hover:bg-white/5 hover:border-white/5 cursor-pointer active:scale-[0.99]" : "bg-white/[0.02] border-white/[0.02]"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: `w-8 text-center font-black text-lg ${isSummary && rank === 1 ? "text-yellow-400" : isSummary && rank === 2 ? "text-zinc-300" : isSummary && rank === 3 ? "text-amber-600" : "text-zinc-700"}`, children: isSummary ? rank <= 3 ? /* @__PURE__ */ jsxDEV(Medal, { size: 20, className: "mx-auto" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 240,
                columnNumber: 71
              }) : rank : i + 1 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 235,
                columnNumber: 41
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: isSummary ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-9 h-9 rounded-full bg-zinc-800 border border-white/10 overflow-hidden shrink-0", children: /* @__PURE__ */ jsxDEV("img", { src: item.avatarUrl, className: "w-full h-full object-cover", alt: "" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 248,
                  columnNumber: 57
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 247,
                  columnNumber: 53
                }),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-zinc-200 truncate", children: item.username }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 251,
                    columnNumber: 57
                  }),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-600 font-bold uppercase tracking-wide flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(History, { size: 10 }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 253,
                      columnNumber: 61
                    }),
                    " ",
                    item.scores.length,
                    " Runs"
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 252,
                    columnNumber: 57
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 250,
                  columnNumber: 53
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 246,
                columnNumber: 49
              }) : /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-500 font-mono flex items-center gap-2 mb-0.5", children: [
                  /* @__PURE__ */ jsxDEV(Calendar, { size: 10 }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 260,
                    columnNumber: 57
                  }),
                  new Date(item.timestamp).toLocaleString(void 0, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 259,
                  columnNumber: 53
                }),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-medium text-zinc-400 truncate w-32 md:w-auto", children: [
                  "v",
                  item.proof.version,
                  " \u2022 ",
                  item.proof.inputs?.length || "?",
                  " Ticks"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 265,
                  columnNumber: 53
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 258,
                columnNumber: 49
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 244,
                columnNumber: 41
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "text-right px-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-black text-emerald-400 tabular-nums leading-none", children: isSummary ? item.bestScore : item.score }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 274,
                  columnNumber: 45
                }),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-600 font-bold uppercase tracking-wider", children: "PTS" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 277,
                  columnNumber: 45
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 273,
                columnNumber: 41
              }),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 pl-2 border-l border-white/5", children: isSummary ? /* @__PURE__ */ jsxDEV("button", { className: "p-2 text-zinc-500 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(ChevronRight, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 284,
                columnNumber: 53
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 283,
                columnNumber: 49
              }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      onReplay(decompressProof(item.proof));
                    },
                    className: "p-2 bg-zinc-900 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 rounded-lg transition-colors border border-white/5",
                    title: "Replay",
                    children: /* @__PURE__ */ jsxDEV(Eye, { size: 16 }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 293,
                      columnNumber: 57
                    })
                  },
                  void 0,
                  false,
                  {
                    fileName: "<stdin>",
                    lineNumber: 288,
                    columnNumber: 53
                  }
                ),
                item.verified_local ? /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 297,
                  columnNumber: 61
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 296,
                  columnNumber: 57
                }) : /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      verifyScore(item.id, selectedUsername);
                    },
                    disabled: item.verifying,
                    className: "p-2 bg-zinc-900 hover:bg-white hover:text-black text-zinc-400 rounded-lg transition-colors border border-white/5 disabled:opacity-50",
                    title: "Verify",
                    children: item.verifying ? /* @__PURE__ */ jsxDEV(Loader2, { size: 16, className: "animate-spin" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 306,
                      columnNumber: 79
                    }) : /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 306,
                      columnNumber: 128
                    })
                  },
                  void 0,
                  false,
                  {
                    fileName: "<stdin>",
                    lineNumber: 300,
                    columnNumber: 57
                  }
                )
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 287,
                columnNumber: 49
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 281,
                columnNumber: 41
              })
            ]
          },
          item.username || item.id,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 226,
            columnNumber: 37
          }
        );
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 220,
        columnNumber: 25
      }),
      renderPagination(currentList.length)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 211,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 174,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 173,
    columnNumber: 9
  });
};
export {
  Leaderboard
};
