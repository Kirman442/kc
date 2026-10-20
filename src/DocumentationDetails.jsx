import React from 'react';
const titles = new Set(['Dokumentation und weitere Informationen', 'Dokumentation und weiterführende Materialien', 'Documentation and background reading']);
export function documentationStart(blocks) {return blocks.findIndex((block) => block.type === 'heading' && titles.has(block.text));}
export default function DocumentationDetails({ title, children }) {
  return <details className="mobile-network-documentation"><summary>{title}</summary><div className="documentation-details-content">{children}</div></details>;
}
