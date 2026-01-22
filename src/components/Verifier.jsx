import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { ShieldCheck, X, AlertTriangle, FileJson } from "lucide-react";
import { verifyProof } from "../verifier.js";
const Verifier = ({ onClose, initialProof, gameVersion }) => {
  const [jsonInput, setJsonInput] = useState(initialProof ? JSON.stringify(initialProof, null, 2) : "");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (initialProof) {
      runVerify();
    }
  }, []);
  const runVerify = async () => {
    try {
      const proof = typeof jsonInput === "object" ? jsonInput : JSON.parse(jsonInput);
      setStatus("verifying");
      setTimeout(async () => {
        const res = await verifyProof(proof, (p) => setProgress(p));
        setResult(res);
        setStatus(res.valid ? "success" : "fail");
      }, 100);
    } catch (e) {
      setStatus("fail");
      setResult({ reason: "Invalid JSON format" });
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[60vh] md:h-[70vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 border-b border-white/5 flex justify-between items-center bg-black/20", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 18 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 40,
            columnNumber: 29
          }),
          "Proof Verifier"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-500 mt-0.5", children: "Validate game integrity client-side" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 43,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 38,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-full transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 45,
        columnNumber: 155
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 45,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 37,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col relative bg-zinc-900/50", children: /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 p-4", children: /* @__PURE__ */ jsxDEV(
      "textarea",
      {
        className: "w-full h-full bg-zinc-950/50 border border-white/5 rounded-xl p-4 font-mono text-[10px] md:text-xs text-zinc-400 resize-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:outline-none custom-scrollbar transition-all",
        placeholder: "Paste JSON proof object here...",
        value: jsonInput,
        onChange: (e) => setJsonInput(e.target.value),
        spellCheck: "false"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 25
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 50,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 49,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-900 border-t border-white/5 p-4 space-y-4", children: [
      status === "verifying" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Simulating Game State" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 67,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            Math.floor(progress * 100),
            "%"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 68,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 66,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all duration-200", style: { width: `${progress * 100}%` } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 71,
          columnNumber: 33
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 70,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 65,
        columnNumber: 25
      }),
      status === "success" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl animate-in fade-in slide-in-from-bottom-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-emerald-500/20 rounded-full text-emerald-500", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { size: 18 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 79,
          columnNumber: 33
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 78,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-emerald-400", children: "Valid Proof" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 82,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-emerald-500/60 font-mono", children: [
            "Matches Protocol v",
            gameVersion,
            " \u2022 Score: ",
            Math.floor(result.score)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 83,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 81,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 77,
        columnNumber: 25
      }),
      status === "fail" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl animate-in fade-in slide-in-from-bottom-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-red-500/20 rounded-full text-red-500", children: /* @__PURE__ */ jsxDEV(AlertTriangle, { size: 18 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 93,
          columnNumber: 33
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 92,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-red-400", children: "Verification Failed" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 96,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-red-500/60 font-mono", children: result?.reason || "Invalid JSON format" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 97,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 95,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: runVerify,
          disabled: status === "verifying" || !jsonInput,
          className: "w-full bg-white hover:bg-zinc-200 text-black font-bold text-sm py-3.5 rounded-xl disabled:opacity-50 transition-all shadow-lg active:scale-[0.98]",
          children: status === "verifying" ? "Verifying..." : "Run Verification"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 104,
          columnNumber: 21
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 62,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 14
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 34,
    columnNumber: 9
  });
};
export {
  Verifier
};
