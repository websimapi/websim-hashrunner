import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Play, ShieldCheck, Trophy, ChevronRight } from "lucide-react";
const Menu = ({ onStart, onLeaderboard, onVerify, gameVersion }) => /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl animate-in fade-in duration-500", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-sm flex flex-col gap-8", children: [
  /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-2", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[11px] font-medium backdrop-blur-md", children: [
      /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 12 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 10,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("span", { children: [
        "VERIFIED PROTOCOL v",
        gameVersion
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 11,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 9,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("h1", { className: "text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-xl", children: [
      "HASH",
      /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-500", children: "RUNNER" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 14,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 text-sm font-medium", children: "Run. Mine. Prove." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 16,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 8,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: onStart,
        className: "w-full group bg-white text-black h-16 rounded-2xl flex items-center justify-between px-6 transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98] shadow-xl shadow-black/20",
        children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-lg tracking-tight", children: "Start Game" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 25,
            columnNumber: 21
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors", children: /* @__PURE__ */ jsxDEV(Play, { size: 20, fill: "currentColor", className: "ml-1" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 27,
            columnNumber: 25
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 26,
            columnNumber: 21
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 17
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onLeaderboard,
          className: "bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur border border-white/10 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:border-emerald-500/50 hover:shadow-lg group",
          children: [
            /* @__PURE__ */ jsxDEV(Trophy, { className: "text-zinc-500 group-hover:text-yellow-400 transition-colors", size: 24 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 36,
              columnNumber: 25
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-zinc-400 group-hover:text-white", children: "Leaderboard" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 37,
              columnNumber: 25
            })
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 32,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onVerify,
          className: "bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur border border-white/10 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:border-emerald-500/50 hover:shadow-lg group",
          children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-zinc-500 group-hover:text-emerald-400 transition-colors", size: 24 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 44,
              columnNumber: 25
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-zinc-400 group-hover:text-white", children: "Verify Proof" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 45,
              columnNumber: 25
            })
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 21
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 31,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 20,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-zinc-500 font-mono", children: "BLOCKCHAIN ENABLED \u2022 SHA-256 PROOF OF WORK" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 52,
    columnNumber: 18
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 51,
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
