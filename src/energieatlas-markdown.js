// Deliberately limited to the headings, paragraphs, lists and tables in this story.
export function parseStoryMarkdown(markdown) {
  const lines=markdown.replace(/\r\n?/g,'\n').split('\n'),blocks=[];
  const cells=line=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());
  const startsBlock=line=>!line?.trim()||/^#{1,6} |^- |^---+$|^\|/.test(line);
  for(let i=0;i<lines.length;){
    const line=lines[i];
    if(!line.trim()||/^---+$/.test(line)){i++;continue;}
    const heading=line.match(/^(#{1,6}) (.+)$/);
    if(heading){blocks.push({type:'heading',level:heading[1].length,text:heading[2]});i++;continue;}
    if(line.startsWith('|')){
      const headers=cells(line),rows=[];i++;
      if(/^\|[\s:|-]+\|$/.test(lines[i]||''))i++;
      while(lines[i]?.startsWith('|'))rows.push(cells(lines[i++]));
      blocks.push({type:'table',headers,rows});continue;
    }
    if(line.startsWith('- ')){
      const items=[];while(lines[i]?.startsWith('- '))items.push(lines[i++].slice(2));
      blocks.push({type:'list',items});continue;
    }
    const paragraph=[line];i++;
    while(i<lines.length&&!startsBlock(lines[i]))paragraph.push(lines[i++]);
    blocks.push({type:'paragraph',text:paragraph.join(' ')});
  }
  return blocks;
}
export function splitStory(markdown){
  const blocks=parseStoryMarkdown(markdown);
  const start=blocks.findIndex(block=>block.type==='heading'&&['С чего всё началось','Wie alles begann'].includes(block.text));
  const appendix=blocks.findIndex(block=>block.type==='heading'&&['Technical appendix','Technischer Anhang'].includes(block.text));
  const sources=blocks.findIndex(block=>block.type==='heading'&&['Sources and documentation','Quellen und Dokumentation'].includes(block.text));
  const documentation=blocks.findIndex(block=>block.type==='heading'&&block.text==='Dokumentation und weiterführende Materialien');
  if(!(start>0&&appendix>start&&sources>appendix&&documentation>sources))throw new Error('Unexpected EnergieAtlas story structure; review Markdown section headings.');
  const sections=(items,level,prefix)=>{
    const result=[];
    for(const block of items){
      if(block.type==='heading'&&block.level===level)result.push({id:prefix+(result.length+1),title:block.text.replace(/^\d{2}\. /,''),blocks:[]});
      else if(result.length)result.at(-1).blocks.push(block);
    }
    return result;
  };
  return {
    title:blocks[0].text,subtitle:blocks[1].text,context:blocks[2].text,
    contribution:blocks[3].text,tools:blocks[4].text,
    narrative:sections(blocks.slice(start,appendix),2,'energy-story-'),
    notes:sections(blocks.slice(appendix+1,sources),3,'appendix-note-energy-'),
    sourceGroups:sections(blocks.slice(sources+1,documentation),3,'energy-source-'),documentation:blocks.slice(documentation+1),
  };
}
