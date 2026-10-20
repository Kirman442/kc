import { siteUrl, currentPath } from "./site-paths.js";import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import { labels, useLocale } from './locale.jsx';
import './appendix.css';
const AppendixContext = createContext(null);
const useCommittedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
function moveTo(id) {
  const element = document.getElementById(id);if (!element) return;
  if (!element.hasAttribute('tabindex') && !['A', 'BUTTON'].includes(element.tagName)) element.tabIndex = -1;
  element.focus({ preventScroll: true });
  element.scrollIntoView({ block: 'start', behavior: Math.abs(element.getBoundingClientRect().top) > window.innerHeight || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
export function AppendixProvider({ children }) {
  const [state, setState] = useState({ ids: [], origin: null, focus: null, serial: 0 });
  const notesRef = useRef([]);
  const register = useCallback((notes) => {notesRef.current = notes;}, []);
  const resolve = useCallback((hash) => {
    let id;try {id = decodeURIComponent(hash.replace(/^#/, ''));} catch {return { ids: [], origin: null, focus: null };}
    if (id === 'technical-appendix') return { ids: notesRef.current.map((n) => n.id), origin: null, focus: id };
    const note = notesRef.current.find((n) => n.id === id || n.aliases.includes(id));
    return { ids: note ? [note.id] : [], origin: null, focus: note ? note.id : id || null };
  }, []);
  useEffect(() => {
    function restore(event) {
      const saved = window.history.state?.portfolioAppendix;
      const next = event && saved?.hash === window.location.hash ? { ids: saved.ids.filter((id) => notesRef.current.some((n) => n.id === id)), origin: saved.origin, focus: saved.focus } : resolve(window.location.hash);
      if (event && !next.focus) {const requested = resolve(window.location.hash).focus;next.focus = next.ids.length ? next.ids.includes(requested) ? requested : next.ids[0] : notesRef.current.some((n) => n.id === requested) ? 'appendix-toggle' : requested;}
      setState((current) => ({ ...next, serial: current.serial + 1 }));
    }
    restore();window.addEventListener('hashchange', restore);window.addEventListener('popstate', restore);
    return () => {window.removeEventListener('hashchange', restore);window.removeEventListener('popstate', restore);};
  }, [resolve]);
  useCommittedEffect(() => {if (state.focus) moveTo(state.focus);}, [state.serial, state.focus]);
  function navigate(ids, origin, focus, hash, { replace = false, source = null } = {}) {
    const next = { ids, origin, focus };
    if (!replace) window.history.replaceState({ ...window.history.state, portfolioAppendix: { ...state, focus: state.ids.length ? state.focus : source || state.focus, hash: window.location.hash } }, '');
    window.history[replace ? 'replaceState' : 'pushState']({ ...window.history.state, portfolioAppendix: { ...next, hash } }, '', hash || currentPath() + window.location.search);
    setState((current) => ({ ...next, serial: current.serial + 1 }));
  }
  function visit(event, target, source) {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0)) return;
    event?.preventDefault();const next = resolve('#' + target);navigate(next.ids, source || state.origin, next.focus, '#' + target, { source });
  }
  function back(event) {event.preventDefault();const target = state.origin && document.getElementById(state.origin) ? state.origin : 'story-start';navigate([], null, target, '#' + target);}
  function toggleAll() {const all = notesRef.current.map((n) => n.id);navigate(all.length && all.every((id) => state.ids.includes(id)) ? [] : all, state.origin, null, window.location.hash, { replace: true });}
  function toggleNote(id) {const ids = state.ids.includes(id) ? state.ids.filter((value) => value !== id) : [...state.ids, id];navigate(ids, state.origin, ids.length ? null : 'appendix-toggle', window.location.hash, { replace: true });}
  useEffect(() => {
    function followTechnicalLink(event) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
      const link = event.target.closest?.('a[href^="#"]');if (!link) return;
      const hash = link.getAttribute('href');const next = resolve(hash);
      if (hash === '#technical-appendix' || next.ids.length) visit(event, decodeURIComponent(hash.slice(1)), null);
    }
    document.addEventListener('click', followTechnicalLink);return () => document.removeEventListener('click', followTechnicalLink);
  }, [state, resolve]);
  return <AppendixContext.Provider value={{ ...state, register, visit, back, toggleAll, toggleNote }}>{children}</AppendixContext.Provider>;
}
export function AppendixLinks({ items }) {
  const context = useContext(AppendixContext);const t = labels[useLocale()];
  return <div className="appendix-reference"><span className="mono">{items.length > 1 ? t.notes : t.note}</span>{items.map((item) => <a key={item.target} href={siteUrl('#' + item.target)} id={item.origin} onClick={(event) => context.visit(event, item.target, item.origin)}>{item.label}<span aria-hidden="true"> ↗</span></a>)}</div>;
}
export function AppendixLink({ target, origin, children }) {return <AppendixLinks items={[{ target, origin, label: children }]} />;}
function ReturnLink() {const { origin, back } = useContext(AppendixContext);const t = labels[useLocale()];return <a className="appendix-return" href={siteUrl('#' + (origin || 'story-start'))} onClick={back}>{origin ? t.back : t.backStory}</a>;}
function collectNotes(children, result = []) {React.Children.forEach(children, (child) => {if (!React.isValidElement(child)) return;if (child.type === AppendixSection) result.push({ id: child.props.id, title: child.props.title, aliases: child.props.aliases || [] });else if (child.props.children) collectNotes(child.props.children, result);});return result;}
export function TechnicalAppendix({ children, description }) {
  const context = useContext(AppendixContext);const t = labels[useLocale()];const notes = useMemo(() => collectNotes(children), [children]);
  useCommittedEffect(() => context.register(notes), [notes, context.register]);
  const all = notes.length > 0 && notes.every((n) => context.ids.includes(n.id));const any = context.ids.length > 0;
  const numbers = Object.fromEntries(notes.map((n, i) => [n.id, i + 1]));
  return <section className="technical-appendix" aria-label="Technical appendix"><button type="button" id="appendix-toggle" className="appendix-toggle" aria-expanded={any} aria-controls="appendix-content" onClick={context.toggleAll}><span><strong>{t.implementation}</strong><small>{t.count(notes.length)}</small></span><span className="appendix-all-label">{all ? t.closeAll : t.openAll}</span></button><div id="appendix-content" className="appendix-content" hidden={!any}><div className="appendix-introduction"><p>{description || t.description}</p><ReturnLink /></div><nav className="appendix-index" aria-label={t.notes}>{notes.map((n, i) => <a key={n.id} href={siteUrl('#' + n.id)} onClick={(event) => context.visit(event, n.id, null)}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{n.title}</a>)}</nav><AppendixContext.Provider value={{ ...context, numbers }}>{children}</AppendixContext.Provider></div></section>;
}
export function AppendixSection({ id, title, children }) {
  const context = useContext(AppendixContext);const t = labels[useLocale()];const open = context.ids.includes(id);
  return <section className="appendix-section" data-note-id={id}><div className="appendix-heading"><span className="eyebrow">{t.note} / {String(context.numbers[id]).padStart(2, '0')}</span><h3 id={id} tabIndex={-1}><button className="appendix-note-toggle" type="button" aria-expanded={open} aria-controls={id + '-content'} onClick={() => context.toggleNote(id)}>{title}<span aria-hidden="true">{open ? '−' : '+'}</span></button></h3></div><div id={id + '-content'} className="appendix-note-content" hidden={!open}>{children}<ReturnLink /></div></section>;
}
