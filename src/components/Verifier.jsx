import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { ShieldCheck, X, AlertTriangle } from "lucide-react";
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
  return /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-xl bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[70vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-white/5 flex justify-between items-center bg-black/20", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-sm font-bold flex items-center gap-2 text-white", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 16 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 25
        }),
        " CLIENT-SIDE VERIFIER"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 39,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-1 text-zinc-500 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(X, { size: 18 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 112
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 38,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col relative", children: [
      /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          className: "flex-1 bg-transparent border-none p-4 font-mono text-[10px] md:text-xs text-zinc-400 resize-none focus:ring-0 focus:outline-none custom-scrollbar",
          placeholder: "Paste JSON proof object here...",
          value: jsonInput,
          onChange: (e) => setJsonInput(e.target.value),
          spellCheck: "false"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 46,
          columnNumber: 21
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-black/20 border-t border-white/5 p-4", children: [
        status === "verifying" && /* @__PURE__ */ jsxDEV("div", { className: "mb-3 animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] text-zinc-400 font-bold mb-1", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "REPLAYING INPUTS" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 58,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("span", { children: [
              Math.floor(progress * 100),
              "%"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 59,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 57,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-emerald-500 transition-all", style: { width: `${progress * 100}%` } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 62,
            columnNumber: 37
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 61,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 56,
          columnNumber: 29
        }),
        status === "success" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "text-emerald-500", size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 69,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-emerald-400", children: "VALID PROOF" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 71,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-500/60 font-mono", children: [
              "Matches Protocol v",
              gameVersion,
              " \u2022 Score: ",
              result.score
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 72,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 70,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 68,
          columnNumber: 29
        }),
        status === "fail" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3 bg-red-500/10 border border-red-500/20 p-3 rounded animate-in fade-in slide-in-from-bottom-2", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "text-red-500", size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 81,
            columnNumber: 33
          }),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-red-400", children: "VERIFICATION FAILED" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 83,
              columnNumber: 37
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-500/60 font-mono", children: result?.reason || "Check JSON format" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 84,
              columnNumber: 37
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 82,
            columnNumber: 33
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 80,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: runVerify,
            disabled: status === "verifying" || !jsonInput,
            className: "w-full bg-white text-black font-bold text-xs py-3 rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors shadow-lg",
            children: status === "verifying" ? "RUNNING SIMULATION..." : "VERIFY INTEGRITY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 91,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 37,
    columnNumber: 14
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 36,
    columnNumber: 9
  });
};
export {
  Verifier
};
