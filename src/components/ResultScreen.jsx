import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { RotateCcw, Trophy, ShieldCheck, FileJson, Home, Eye, CheckCircle2 } from "lucide-react";
const ResultScreen = ({ score, proof, onVerify, onSave, onRestart, onHome, onReplay, isHashing, hashProgress }) => {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hashrunner_${proof.timestamp}.json`;
    a.click();
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-sm bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-8 pb-4 text-center border-b border-white/5", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-zinc-500 text-xs font-bold tracking-widest uppercase mb-2", children: "Final Score" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 20,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-7xl font-black text-white tracking-tighter mb-2", children: Math.floor(score) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 21
      }),
      proof && !isHashing && /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20", children: [
        /* @__PURE__ */ jsxDEV(CheckCircle2, { size: 12 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 26,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("span", { children: "Proof Generated" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 27,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 19,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 bg-black/20", children: isHashing ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 py-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] font-medium text-emerald-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "FINALIZING PROOF OF WORK" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 38,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            Math.floor(hashProgress * 100),
            "%"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 39,
            columnNumber: 37
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all duration-300 ease-out", style: { width: `${hashProgress * 100}%` } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 42,
          columnNumber: 37
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "text-center text-xs text-zinc-500", children: "Securing your run on the blockchain..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 45,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 25
    }) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 animate-in slide-in-from-bottom-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onRestart, className: "col-span-1 bg-white hover:bg-zinc-200 text-black h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors", children: [
          /* @__PURE__ */ jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 52,
            columnNumber: 37
          }),
          " Retry"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 51,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onReplay, className: "col-span-1 bg-zinc-800 hover:bg-zinc-700 text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-white/10", children: [
          /* @__PURE__ */ jsxDEV(Eye, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 55,
            columnNumber: 37
          }),
          " Replay"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 54,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 50,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "flex flex-col items-center justify-center h-16 bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5 rounded-xl gap-1.5 transition-colors group", children: [
          /* @__PURE__ */ jsxDEV(Trophy, { size: 18, className: "text-zinc-400 group-hover:text-yellow-400 transition-colors" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 62,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-medium text-zinc-400", children: "Submit" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 63,
            columnNumber: 37
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 61,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: downloadJson, className: "flex flex-col items-center justify-center h-16 bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5 rounded-xl gap-1.5 transition-colors group", children: [
          /* @__PURE__ */ jsxDEV(FileJson, { size: 18, className: "text-zinc-400 group-hover:text-white transition-colors" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 66,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-medium text-zinc-400", children: "Save" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 67,
            columnNumber: 37
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 65,
          columnNumber: 33
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "flex flex-col items-center justify-center h-16 bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5 rounded-xl gap-1.5 transition-colors group", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 18, className: "text-zinc-400 group-hover:text-emerald-400 transition-colors" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 70,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-medium text-zinc-400", children: "Verify" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 71,
            columnNumber: 37
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 69,
          columnNumber: 33
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 60,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onHome, className: "w-full py-3 mt-2 text-zinc-500 hover:text-white text-xs font-medium transition-colors", children: "Return to Menu" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 75,
        columnNumber: 29
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 48,
      columnNumber: 25
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 33,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 16,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 15,
    columnNumber: 9
  });
};
export {
  ResultScreen
};
