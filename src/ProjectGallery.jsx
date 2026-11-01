import { siteUrl } from "./site-paths.js";import React, { useEffect, useRef, useState } from 'react';

export default function ProjectGallery({ images, title }) {
  const [index, setIndex] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [offset, setOffset] = useState(0);
  const gesture = useRef(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const active = index !== null;
  useEffect(() => {
    if (!active) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;document.body.style.overflow = 'hidden';
    return () => {dialog.current?.close();document.body.style.overflow = previous;opener.current?.focus({ preventScroll: true });};
  }, [active]);
  function close() {setIndex(null);setZoom(false);setOffset(0);gesture.current = null;}
  function step(direction) {setIndex((value) => (value + direction + images.length) % images.length);setZoom(false);setOffset(0);}
  function startDrag(event) {
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function drag(event) {
    const start = gesture.current;if (!start || start.id !== event.pointerId) return;
    if (zoom) {event.currentTarget.scrollLeft = start.left - (event.clientX - start.x);event.currentTarget.scrollTop = start.top - (event.clientY - start.y);} else
    setOffset(Math.max(-180, Math.min(180, event.clientX - start.x)));
  }
  function endDrag(event, cancel = false) {
    const start = gesture.current;if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x,dy = event.clientY - start.y;
    gesture.current = null;setOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const threshold = Math.max(40, Math.min(80, event.currentTarget.clientWidth * .18));
    if (!cancel && !zoom && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
  }
  return <div className="project-gallery"><div className="gallery-index mono">{title} / {images.length} Karten</div><div className="gallery-grid">{images.map((image, i) => <button key={image.src} className="gallery-card" onClick={(event) => {opener.current = event.currentTarget;setIndex(i);setZoom(false);}} aria-label={image.alt + ' - Karte vergrößern'}><img src={siteUrl(image.src)} alt={image.alt} loading="lazy" /><span>{image.alt}<span aria-hidden="true"> ⛶</span></span></button>)}</div>
    <dialog ref={dialog} className="gallery-dialog" aria-label={title + ' - Kartenansicht'} onCancel={(event) => {event.preventDefault();close();}} onKeyDown={(event) => {if (event.key === 'ArrowLeft') step(-1);if (event.key === 'ArrowRight') step(1);}}>{active && <><div className="gallery-toolbar"><div><strong>{images[index].alt}</strong><span className="mono">{index + 1} / {images.length}</span></div><div><button onClick={() => {setZoom((value) => !value);setOffset(0);}} aria-pressed={zoom}>{zoom ? 'Einpassen' : 'Details ansehen'}</button><a href={siteUrl(images[index].src)} target="_blank" rel="noopener noreferrer">Original ↗</a><button onClick={close} autoFocus aria-label="Galerie schließen">Schließen ×</button></div></div><div className={'gallery-stage ' + (zoom ? 'gallery-zoomed' : '')} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={(event) => endDrag(event)} onPointerCancel={(event) => endDrag(event, true)} onLostPointerCapture={() => {gesture.current = null;setOffset(0);}}><img src={siteUrl(images[index].src)} alt={images[index].alt} draggable={false} style={{ transform: zoom ? undefined : `translateX(${offset}px)` }} /></div><div className="gallery-bottom"><button onClick={() => step(-1)}>← Vorherige Karte</button><span className="mono">{zoom ? 'Ziehen zum Verschieben' : 'Ziehen zum Blättern · ← / →'}</span><button onClick={() => step(1)}>Nächste Karte →</button></div></>}</dialog>
  </div>;
}
