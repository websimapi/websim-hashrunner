import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { RotateCcw, Trophy, ShieldCheck, FileJson, Home, Eye } from "lucide-react";
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
        lineNumber: 17,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]", children: score }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 17
      }),
      proof && !isHashing && /* @__PURE__ */ jsxDEV("div", { className: "absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-900/90 border border-white/10 p-3 rounded-lg backdrop-blur text-left", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-500 font-bold mb-1", children: "FINAL HASH" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 24,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] text-zinc-400 w-32 truncate", children: proof.finalHash }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 25,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 23,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 16,
      columnNumber: 13
    }),
    isHashing ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-6 w-full max-w-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between w-full text-[10px] font-bold tracking-wider text-emerald-500", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "MINING PROOF OF WORK" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 35,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            Math.floor(hashProgress * 100),
            "%"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 36,
            columnNumber: 29
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 34,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 shadow-[0_0_15px_#10b981]", style: { width: `${hashProgress * 100}%` } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 29
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 38,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 33,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-500 font-mono animate-pulse text-center", children: [
        "SOLVING CRYPTOGRAPHIC PUZZLES...",
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 43,
          columnNumber: 57
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] opacity-50", children: "This proves you played legitimately" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 44,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 32,
      columnNumber: 17
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 w-full max-w-xs animate-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onReplay, className: "bg-white hover:bg-zinc-200 text-black p-4 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsxDEV(Eye, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 51,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-wide", children: "REPLAY" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 51,
            columnNumber: 47
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 50,
          columnNumber: 26
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onRestart, className: "bg-emerald-500 hover:bg-emerald-400 text-black p-4 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]", children: [
          /* @__PURE__ */ jsxDEV(RotateCcw, { size: 20 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 54,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-wide", children: "RETRY" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 54,
            columnNumber: 53
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 53,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 49,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg flex flex-col items-center gap-1.5 transition-colors border border-white/5", children: [
          /* @__PURE__ */ jsxDEV(Trophy, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 60,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold", children: "SUBMIT" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 60,
            columnNumber: 50
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 59,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: downloadJson, className: "bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg flex flex-col items-center gap-1.5 transition-colors border border-white/5", children: [
          /* @__PURE__ */ jsxDEV(FileJson, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 63,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold", children: "JSON" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 63,
            columnNumber: 52
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 62,
          columnNumber: 26
        }),
        /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg flex flex-col items-center gap-1.5 transition-colors border border-white/5", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 66,
            columnNumber: 29
          }),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold", children: "VERIFY" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 66,
            columnNumber: 55
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 65,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 58,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onHome, className: "mt-4 text-zinc-500 hover:text-white text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxDEV(Home, { size: 14 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 71,
          columnNumber: 25
        }),
        " RETURN TO MENU"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 70,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 48,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 15,
    columnNumber: 9
  });
};
export {
  ResultScreen
};
