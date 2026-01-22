import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
const HUD = ({ score, hash, isVerified, tick, isReplay }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-8", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-bold text-zinc-500 tracking-wider mb-1", children: "SCORE" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 7,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "text-4xl md:text-6xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg", children: score.toString().padStart(6, "0") }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 8,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 6,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-end", children: isReplay ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-red-500/20 backdrop-blur px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 mb-2 animate-pulse", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-1.5 h-1.5 rounded-full bg-red-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 16,
        columnNumber: 25
      }),
      "REPLAY MODE"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 15,
      columnNumber: 21
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-zinc-300 mb-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-1.5 h-1.5 rounded-full ${isVerified ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-amber-400 animate-pulse"}` }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 25
      }),
      isVerified ? "VERIFIED" : "SYNCING"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 5,
    columnNumber: 9
  }),
  !isReplay && /* @__PURE__ */ jsxDEV("div", { className: "self-end max-w-[200px] md:max-w-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-black/60 backdrop-blur px-3 py-2 rounded border border-white/5", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-500 font-bold uppercase mb-1 flex justify-between", children: [
      /* @__PURE__ */ jsxDEV("span", { children: [
        "BLOCK ",
        tick
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 32,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-500", children: "SHA-256" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 33,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 31,
      columnNumber: 21
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] text-emerald-500/60 break-all leading-tight", children: hash || "INIT_GENESIS..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 35,
      columnNumber: 21
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 30,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 29,
    columnNumber: 13
  }),
  isReplay && /* @__PURE__ */ jsxDEV("div", { className: "self-center mt-auto mb-12", children: /* @__PURE__ */ jsxDEV("div", { className: "text-white/50 text-xs font-mono tracking-widest uppercase", children: "Tap to cancel replay" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 44,
    columnNumber: 17
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 43,
    columnNumber: 14
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 4,
  columnNumber: 5
});
export {
  HUD
};
