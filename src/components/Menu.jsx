import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Play, ShieldCheck, Trophy } from "lucide-react";
const Menu = ({ onStart, onLeaderboard, onVerify, gameVersion }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-700", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center w-full max-w-md", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "mb-16 text-center space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] tracking-widest font-mono uppercase", children: [
      /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 12 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 9,
        columnNumber: 21
      }),
      " Cryptographically Verified"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 8,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("h1", { className: "text-7xl md:text-8xl font-black tracking-tighter text-white leading-none drop-shadow-2xl", children: [
      "HASH",
      /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 12,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-700", children: "RUNNER" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 12,
        columnNumber: 30
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 7,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-4", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onStart, className: "group relative w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl py-6 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "tracking-tight", children: "INITIATE RUN" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 19,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(Play, { className: "transition-transform group-hover:translate-x-1", size: 28, fill: "currentColor" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 20,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onLeaderboard, className: "bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-3 transition-all hover:border-white/20 group", children: [
        /* @__PURE__ */ jsxDEV(Trophy, { className: "text-zinc-500 group-hover:text-yellow-500 transition-colors", size: 24 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 27,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-zinc-400 tracking-wider", children: "LEADERBOARD" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 28,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onVerify, className: "bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-3 transition-all hover:border-white/20 group", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-zinc-500 group-hover:text-emerald-500 transition-colors", size: 24 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 31,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-zinc-400 tracking-wider", children: "VERIFIER" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 32,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 30,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 25,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 16,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "mt-16 text-[10px] text-zinc-600 font-mono", children: [
    "PROTOCOL v",
    gameVersion
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 37,
    columnNumber: 13
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 6,
  columnNumber: 9
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 5,
  columnNumber: 5
});
export {
  Menu
};
