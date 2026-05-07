import * as React from 'react';

export const CodeBlock: React.FC<{ title: string; code: string }> = ({
  title,
  code
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [code]);

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
          {title}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-white/70 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="bg-neutral-950 text-white/90 text-xs font-mono p-3 rounded-md overflow-auto max-h-48 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};
