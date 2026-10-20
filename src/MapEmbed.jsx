import { siteUrl } from "./site-paths.js";import React, { useEffect, useRef, useState } from 'react';
import { labels, useLocale } from './locale.jsx';
export default function MapEmbed({ url = 'https://mobile-network-map.netlify.app/', title = 'MobileNetwork', caption = 'Current Arrow IPC + Brotli version' }) {
  return <InteractiveEmbed url={url} title={title} caption={caption} autoStart={true} />;
}
function InteractiveEmbed({ url, title, caption, autoStart }) {
  const t = labels[useLocale()];
  const [started, setStarted] = useState(autoStart);
  const [expanded, setExpanded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [loadState, setLoadState] = useState(autoStart ? 'loading' : 'idle');
  const dialog = useRef(null);
  const expandButton = useRef(null);
  const wasExpanded = useRef(false);
  useEffect(() => {
    if (!started) return;
    setLoadState('loading');
    const timeout = window.setTimeout(() => setLoadState((state) => state === 'loading' ? 'slow' : state), 20000);
    return () => window.clearTimeout(timeout);
  }, [url, attempt, started]);
  const reload = () => {setLoadState('loading');setAttempt((value) => value + 1);};
  useEffect(() => {
    const element = dialog.current;
    if (expanded) {if (element.open) element.close();element.showModal();} else {if (element.matches(':modal')) element.close();element.setAttribute('open', '');if (wasExpanded.current) expandButton.current?.focus({ preventScroll: true });}
    wasExpanded.current = expanded;
    const previous = document.body.style.overflow;
    if (expanded) document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previous;};
  }, [expanded]);
  return <dialog ref={dialog} open={!expanded} className={`map-embed ${expanded ? 'map-expanded' : ''}`} data-layout="wide" role={expanded ? 'dialog' : 'region'} aria-modal={expanded ? 'true' : undefined} aria-label={t.application(title)} onCancel={(event) => {event.preventDefault();setExpanded(false);}} onKeyDown={(event) => {if (expanded && event.key === 'Escape') {event.preventDefault();setExpanded(false);}}}>
    <div className="embed-header"><div><span className="eyebrow">{t.live}</span><strong>{title}</strong></div><div className="embed-actions"><a href={siteUrl(url)} target="_blank" rel="noopener noreferrer">{t.separate} ↗</a><button ref={expandButton} onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? t.closeFullscreen + ' ×' : t.fullscreen + ' ⛶'}</button></div></div>
    <div className="embed-stage" aria-busy={loadState === 'loading'}>
      {!started ? <div className="embed-placeholder"><strong>{t.appStartTitle}</strong><p>{t.appStartHint}</p><button type="button" className="button embed-start" onClick={() => {setLoadState('loading');setStarted(true);}}>{t.appStart} ↗</button></div> : <iframe key={`${url}-${attempt}`} src={siteUrl(url)} title={t.map(title)} loading="eager" allow="fullscreen" onLoad={() => setLoadState('loaded')} />}
      {started && loadState !== 'loaded' && <div className="embed-status" role="status"><div>
        <strong>{loadState === 'loading' ? t.appLoading : t.appSlow}</strong>
        <p>{loadState === 'loading' ? t.appLoadingHint : t.appRetryHint}</p>
        {loadState !== 'loading' && <button type="button" onClick={reload}>{t.appReload} ↻</button>}
      </div></div>}
    </div>
    <div className="embed-caption"><span>{caption}</span>{started && <button type="button" className="embed-reload" onClick={reload}>{t.appReload} ↻</button>}<span>{expanded ? t.closeCaption : t.explore}</span></div>
  </dialog>;
}
