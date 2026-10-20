import React, { useState } from 'react';
import { labels as translations, useLocale } from './locale.jsx';
export default function CodeBlock({ code, language, labels }) {
  const t = translations[useLocale()];const copyLabels = labels || { copy: t.copy, copied: t.copied, fallback: t.copyFallback };
  const [status, setStatus] = useState(null);
  async function copy() {try {await navigator.clipboard.writeText(code);setStatus(copyLabels.copied);} catch {setStatus(copyLabels.fallback);}}
  return <div className="article-code"><div className="code-toolbar"><span>{language}</span><button onClick={copy}>{status || copyLabels.copy}</button></div><pre tabIndex={0} aria-label={t.code(language)}><code>{code}</code></pre></div>;
}
