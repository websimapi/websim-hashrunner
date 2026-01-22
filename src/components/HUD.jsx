import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Activity, ShieldCheck, PlayCircle } from "lucide-react";
const HUD = ({ score, hash, isVerified, tick, isReplay }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 md:p-8 safe-area-inset-top", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center w-full", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold text-zinc-500 uppercase tracking-wider", children: "Score" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 11,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-black text-white tabular-nums tracking-tight leading-none", children: Math.floor(score).toLocaleString() }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 12,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 10,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 9,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-end gap-2", children: isReplay ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 bg-red-500/10 backdrop-blur-md border border-red-500/20 px-3 py-1.5 rounded-full text-red-400 animate-pulse", children: [
      /* @__PURE__ */ jsxDEV(PlayCircle, { size: 12 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-wide", children: "REPLAY" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 23,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 21,
      columnNumber: 21
    }) : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-3 py-1.5 rounded-full text-emerald-400", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-1.5 h-1.5 rounded-full ${isVerified ? "bg-emerald-400 shadow-[0_0_8px_currentColor]" : "bg-amber-400 animate-pulse"}` }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 27,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold tracking-wide", children: isVerified ? "VERIFIED" : "SYNCING" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 28,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 26,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 19,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 7,
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end items-end w-full pb-safe", children: [
    !isReplay && hash && /* @__PURE__ */ jsxDEV("div", { className: "hidden md:block opacity-50 hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-black/60 backdrop-blur rounded-lg border border-white/5 p-2 max-w-[180px]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold text-zinc-500", children: "SHA-256" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 30
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono text-zinc-600", children: [
          "#",
          tick
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 30
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 39,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[8px] text-zinc-400 break-all leading-tight", children: [
        hash.substring(0, 32),
        "..."
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 43,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 38,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 37,
      columnNumber: 18
    }),
    isReplay && /* @__PURE__ */ jsxDEV("div", { className: "w-full text-center mb-8", children: /* @__PURE__ */ jsxDEV("span", { className: "bg-black/40 backdrop-blur px-4 py-2 rounded-full text-white/50 text-xs font-medium border border-white/5", children: "Tap anywhere to exit replay" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 52,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 51,
      columnNumber: 18
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 5,
  columnNumber: 5
});
export {
  HUD
};
