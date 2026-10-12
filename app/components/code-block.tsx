"use client";

import { useRef, useState } from "react";

// Dark terminal block with a one-click copy button. Token colours are plain CSS classes (no highlighting library).
// k = key, s = string, v = value to notice, c = comment, "" = plain.
export type Tok = [kind: "k" | "s" | "v" | "c" | "", text: string];

export default function CodeBlock({
  title,
  lines,
  copyText,
  copyLabel,
  className = "",
}: {
  title: string;
  lines: Tok[][];
  copyText: string;
  copyLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      // clipboard API unavailable (older browsers, insecure context): select-and-copy fallback
      const ta = document.createElement("textarea");
      ta.value = copyText;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      ta.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`code-block ${className}`}>
      <div className="code-head">
        <span>{title}</span>
        <button type="button" className="code-copy" onClick={copy} aria-label={copyLabel}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-body" tabIndex={0}>
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line.map(([kind, text], j) => (
                <span key={j} className={kind ? `tok-${kind}` : undefined}>
                  {text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
