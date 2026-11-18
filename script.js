const menuButton=document.getElementById('menu-toggle');const nav=document.getElementById('nav');menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');document.body.classList.remove('menu-open')}));document.getElementById('year').textContent=new Date().getFullYear();if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));


/* V14 — retorno ao topo com deslocamento de elevador e acessibilidade */
(()=>{
  const button=document.getElementById('back-to-top');
  if(!button)return;
  let frame=0;
  button.addEventListener('click',(event)=>{
    event.preventDefault();
    if(frame)cancelAnimationFrame(frame);
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start=window.scrollY||document.documentElement.scrollTop;
    if(reduced||start<=1){window.scrollTo(0,0);button.classList.remove('is-ascending');return;}
    button.classList.add('is-ascending');
    const duration=Math.min(1750,Math.max(850,850+start*.075));
    const started=performance.now();
    const ease=(t)=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const step=(now)=>{
      const progress=Math.min(1,(now-started)/duration);
      window.scrollTo(0,Math.max(0,start*(1-ease(progress))));
      if(progress<1){frame=requestAnimationFrame(step)}
      else{frame=0;button.classList.remove('is-ascending');}
    };
    frame=requestAnimationFrame(step);
  });
})();


/* V21 — animação tipográfica de resultados */
(()=>{
  const target=document.querySelector('.hero-v21-type');
  if(!target)return;
  const fullWord=target.dataset.word||'resultados!';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){target.textContent=fullWord;return;}
  const typeSpeed=72;
  const eraseSpeed=34;
  const holdDelay=900;
  const restartDelay=220;
  let typingTimeout;
  const typeWord=(index=0)=>{
    target.textContent=fullWord.slice(0,index);
    if(index<fullWord.length){typingTimeout=setTimeout(()=>typeWord(index+1),typeSpeed);}
    else{typingTimeout=setTimeout(()=>eraseWord(fullWord.length-1),holdDelay);}
  };
  const eraseWord=(index)=>{
    target.textContent=fullWord.slice(0,Math.max(0,index));
    if(index>0){typingTimeout=setTimeout(()=>eraseWord(index-1),eraseSpeed);}
    else{typingTimeout=setTimeout(()=>typeWord(1),restartDelay);}
  };
  target.textContent='';
  typeWord(1);
  window.addEventListener('beforeunload',()=>clearTimeout(typingTimeout),{once:true});
})();

/* V22 — slider de serviços com autoplay, navegação e gesto de deslizar */
(()=>{
 const carousel=document.querySelector('[data-services-carousel]');if(!carousel)return;
 const track=carousel.querySelector('.services-carousel-track');
 const slides=[...track.querySelectorAll('.service-card')];
 const dots=[...carousel.querySelectorAll('.services-carousel-dot')];
 const viewport=carousel.querySelector('.services-carousel-window');
 const counter=carousel.querySelector('.services-carousel-status');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let current=0,timer=0,paused=false,startX=0,startY=0;
 const render=()=>{track.style.transform=`translate3d(-${current*100}%,0,0)`;dots.forEach((d,i)=>d.setAttribute('aria-current',String(i===current)));slides.forEach((s,i)=>s.setAttribute('aria-hidden',String(i!==current)));counter.textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`};
 const stop=()=>{clearInterval(timer);timer=0};
 const autoplay=()=>{stop();if(!paused&&!reduced&&!document.hidden&&slides.length>1)timer=setInterval(()=>{current=(current+1)%slides.length;render()},4300)};
 const go=(n)=>{current=(n+slides.length)%slides.length;render();autoplay()};
 carousel.querySelector('[data-prev]').addEventListener('click',()=>go(current-1));
 carousel.querySelector('[data-next]').addEventListener('click',()=>go(current+1));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
 viewport.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;startX=e.touches[0].clientX;startY=e.touches[0].clientY;stop()},{passive:true});
 viewport.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2)go(current+(dx<0?1:-1));else autoplay()},{passive:true});
 carousel.addEventListener('mouseenter',()=>{paused=true;stop()});carousel.addEventListener('mouseleave',()=>{paused=false;autoplay()});
 carousel.addEventListener('focusin',()=>{paused=true;stop()});carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){paused=false;autoplay()}});
 carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(current-1)}if(e.key==='ArrowRight'){e.preventDefault();go(current+1)}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else autoplay()});render();autoplay();
})();


/* V26: limites municipais reais, com rótulos reposicionados e melhor leitura */
(()=>{
 const root=document.querySelector('.np-coverage');if(!root)return;
 const cities=[
  {name:'Laje',totems:['Academia Evolution'],lottery:[]},
  {name:'Mutuípe',totems:['Academia Biofitness'],lottery:[]},
  {name:'Jiquiriçá',totems:['Academia Tao Fitness'],lottery:[]},
  {name:'Ubaíra',totems:['Academia Caverna'],lottery:[]},
  {name:'Nilo Peçanha',totems:['Academia Five — São Benedito'],lottery:[]},
  {name:'Teolândia',totems:['Academia W2'],lottery:['Lotérica']},
  {name:'Gandu',totems:['Academia Batalhão Fitness','Academia IAI Bora Treinar','Clínica Climeg','Clínica Laclig'],lottery:['Lotérica']},
  {name:'Piraí do Norte',totems:[],lottery:['Lotérica']},
  {name:'Itamari',totems:['Academia Visual Fitness'],lottery:['Lotérica']},
  {name:'Nova Ibiá',totems:[],lottery:['Lotérica']},
  {name:'Apuarema',totems:[],lottery:['Lotérica']},
  {name:'Wenceslau Guimarães',totems:[],lottery:['Lotérica']}
 ];
 cities.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR',{sensitivity:'base'}));
 const labelConfig={
  'laje':{dx:18,dy:-12,anchor:'start'},
  'mutuipe':{dx:16,dy:-8,anchor:'start',size:'small'},
  'jiquirica':{dx:18,dy:13,anchor:'start',size:'small'},
  'ubaira':{dx:-14,dy:13,anchor:'end',size:'small'},
  'nilo pecanha':{dx:0,dy:-14,anchor:'middle',lines:['Nilo Peçanha']},
  'teolandia':{dx:2,dy:0,anchor:'middle'},
  'gandu':{dx:10,dy:18,anchor:'start'},
  'pirai do norte':{dx:42,dy:-1,anchor:'start',lines:['Piraí do','Norte'],size:'small'},
  'itamari':{dx:0,dy:19,anchor:'middle',lines:['Itamari']},
  'nova ibia':{dx:-6,dy:24,anchor:'middle',lines:['Nova Ibiá'],size:'small'},
  'apuarema':{dx:-16,dy:18,anchor:'end',size:'small'},
  'wenceslau guimaraes':{dx:20,dy:-16,anchor:'start',lines:['Wenceslau','Guimarães'],size:'small'}
 };
 const normalized=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
 const byName=new Map(cities.map((c,i)=>[normalized(c.name),i]));
 const cityName=root.querySelector('#np-coverage-city'), summary=root.querySelector('#np-coverage-summary'),venues=root.querySelector('#np-coverage-venues'),counter=root.querySelector('#np-coverage-count');
 let selection=cities.findIndex(c=>c.name==='Gandu'),areas=[];
 const visible=()=>cities.map((c,i)=>i);
 function render(){
  const set=visible();if(!set.includes(selection))selection=set[0];const c=cities[selection];
  areas.forEach(area=>{const i=Number(area.dataset.index),muted=!set.includes(i);area.classList.toggle('is-muted',muted);area.classList.toggle('is-selected',i===selection);area.setAttribute('aria-pressed',String(i===selection));area.setAttribute('aria-disabled',String(muted))});
  cityName.textContent=c.name;
  const academyItems=c.totems.filter(name=>/^Academia\b/i.test(name));
  const clinicItems=c.totems.filter(name=>/^Cl[ií]nica\b/i.test(name));
  const otherItems=c.totems.filter(name=>!/^Academia\b/i.test(name)&&!/^Cl[ií]nica\b/i.test(name));
  const types=[];
  if(academyItems.length)types.push('academias');
  if(clinicItems.length)types.push('clínicas');
  if(otherItems.length)types.push('espaços ativos');
  if(c.lottery.length)types.push('casas lotéricas');
  summary.textContent='Presença em '+types.join(' e ')+'.';venues.replaceChildren();
  const venueGroups=[];
  if(academyItems.length)venueGroups.push(['Academias',academyItems]);
  if(clinicItems.length)venueGroups.push(['Clínicas',clinicItems]);
  if(otherItems.length)venueGroups.push(['Espaços ativos',otherItems]);
  if(c.lottery.length)venueGroups.push(['Lotéricas',c.lottery]);
  for(const [label,arr] of venueGroups){if(!arr.length)continue;const h=document.createElement('h5');h.textContent=label;venues.appendChild(h);const ul=document.createElement('ul');arr.forEach(name=>{const li=document.createElement('li');li.textContent=name;ul.appendChild(li)});venues.appendChild(ul)}
  counter.textContent=String(set.indexOf(selection)+1).padStart(2,'0')+' / '+String(set.length).padStart(2,'0');
 }
 function select(i){if(!visible().includes(i))return;selection=i;render()}
 function shift(dir){const set=visible();select(set[(set.indexOf(selection)+dir+set.length)%set.length])}
 root.querySelector('#np-map-prev').addEventListener('click',()=>shift(-1));root.querySelector('#np-map-next').addEventListener('click',()=>shift(1));render();
 const map=root.querySelector('#np-official-map');const mapFrame=map.closest('.np-coverage-map');const ns='http://www.w3.org/2000/svg';
 let mapSvg=null,mapViewport=null,mapZoom=1,mapPanX=0,mapPanY=0,pinchState=null,panState=null,didPan=false,suppressClickUntil=0;
 const clampZoom=value=>Math.max(1,Math.min(5,value));
 const clampPan=()=>{
  const maxX=420*(mapZoom-1),maxY=290*(mapZoom-1);
  mapPanX=Math.max(-maxX,Math.min(maxX,mapPanX));
  mapPanY=Math.max(-maxY,Math.min(maxY,mapPanY));
 };
 function applyMapTransform(){
  if(!mapViewport)return;
  clampPan();
  mapViewport.setAttribute('transform',`translate(${mapPanX} ${mapPanY}) translate(420 290) scale(${mapZoom}) translate(-420 -290)`);
  const touchMode=mapZoom>1.001?'none':'pan-y';
  map.style.touchAction=touchMode;
  if(mapSvg)mapSvg.style.touchAction=touchMode;
 }
 function setMapZoom(value){mapZoom=clampZoom(value);applyMapTransform()}
 function clientToSvgPoint(x,y){
  if(!mapSvg)return{x:420,y:290};
  const point=mapSvg.createSVGPoint();point.x=x;point.y=y;
  const matrix=mapSvg.getScreenCTM();
  return matrix?point.matrixTransform(matrix.inverse()):{x:420,y:290};
 }
 function clientToMapPoint(x,y){
  if(!mapSvg||!mapViewport)return{x:420,y:290};
  const point=mapSvg.createSVGPoint();point.x=x;point.y=y;
  const matrix=mapViewport.getScreenCTM();
  return matrix?point.matrixTransform(matrix.inverse()):clientToSvgPoint(x,y);
 }
 function ensureMapZoomControls(){
  if(mapFrame.querySelector('.np-map-zoom-controls'))return;
  const controls=document.createElement('div');controls.className='np-map-zoom-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Controles de zoom do mapa');
  const specs=[['+','Ampliar mapa',()=>setMapZoom(mapZoom*1.25)],['−','Reduzir mapa',()=>setMapZoom(mapZoom/1.25)],['↺','Recentrar mapa',()=>{mapZoom=1;mapPanX=0;mapPanY=0;applyMapTransform()}]];
  specs.forEach(([label,aria,action])=>{const button=document.createElement('button');button.type='button';button.className='np-map-zoom-button';button.textContent=label;button.setAttribute('aria-label',aria);button.title=aria;button.addEventListener('click',event=>{event.stopPropagation();action()});controls.appendChild(button)});
  mapFrame.appendChild(controls);
  const hint=document.createElement('span');hint.className='np-map-zoom-hint';hint.textContent='Pinçe para ampliar · arraste para explorar';hint.setAttribute('aria-hidden','true');mapFrame.appendChild(hint);
 }
 function midpoint(touches){return{x:(touches[0].clientX+touches[1].clientX)/2,y:(touches[0].clientY+touches[1].clientY)/2}}
 // A pinça amplia a área que está entre os dedos, não um ponto fixo do mapa.
 // Com o mapa ampliado, um dedo passa a arrastar o conteúdo sem mover a página.
 map.addEventListener('touchstart',event=>{
  if(event.touches.length===2&&mapSvg&&mapViewport){
   event.preventDefault();panState=null;didPan=false;
   const mid=midpoint(event.touches);
   pinchState={distance:Math.hypot(event.touches[0].clientX-event.touches[1].clientX,event.touches[0].clientY-event.touches[1].clientY),zoom:mapZoom,anchor:clientToMapPoint(mid.x,mid.y)};
  }else if(event.touches.length===1&&mapZoom>1.001&&mapSvg){
   pinchState=null;didPan=false;
   const t=event.touches[0],point=clientToSvgPoint(t.clientX,t.clientY);
   panState={startX:point.x,startY:point.y,panX:mapPanX,panY:mapPanY};
  }
 },{passive:false});
 map.addEventListener('touchmove',event=>{
  if(event.touches.length===2&&pinchState&&mapSvg){
   event.preventDefault();
   const mid=midpoint(event.touches),point=clientToSvgPoint(mid.x,mid.y);
   const distance=Math.hypot(event.touches[0].clientX-event.touches[1].clientX,event.touches[0].clientY-event.touches[1].clientY);
   mapZoom=clampZoom(pinchState.zoom*(distance/Math.max(1,pinchState.distance)));
   mapPanX=point.x-420-mapZoom*(pinchState.anchor.x-420);
   mapPanY=point.y-290-mapZoom*(pinchState.anchor.y-290);
   applyMapTransform();
  }else if(event.touches.length===1&&panState&&mapZoom>1.001){
   const t=event.touches[0],point=clientToSvgPoint(t.clientX,t.clientY);
   const dx=point.x-panState.startX,dy=point.y-panState.startY;
   if(Math.hypot(dx,dy)>5){didPan=true;event.preventDefault();}
   mapPanX=panState.panX+dx;mapPanY=panState.panY+dy;applyMapTransform();
  }
 },{passive:false});
 map.addEventListener('touchend',event=>{
  if(didPan)suppressClickUntil=Date.now()+350;
  if(event.touches.length<2)pinchState=null;
  if(event.touches.length===0){panState=null;didPan=false;}
 },{passive:true});
 map.addEventListener('touchcancel',()=>{pinchState=null;panState=null;didPan=false},{passive:true});
 map.addEventListener('click',event=>{if(Date.now()<suppressClickUntil){event.preventDefault();event.stopPropagation();}},true);
 const make=(tag,attrs={})=>{const el=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));return el};
 function getRings(g){if(!g)return[];if(g.type==='Polygon')return g.coordinates;if(g.type==='MultiPolygon')return g.coordinates.flat();return[]}
 function allCoords(g){return getRings(g).flat()}
 function polygonCentroid(coords){let area=0,cx=0,cy=0;for(let i=0,j=coords.length-1;i<coords.length;j=i++){const [x1,y1]=coords[j];const [x2,y2]=coords[i];const f=x1*y2-x2*y1;area+=f;cx+=(x1+x2)*f;cy+=(y1+y2)*f;}if(Math.abs(area)<1e-9){const xs=coords.map(p=>p[0]), ys=coords.map(p=>p[1]);return[(Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2]}area*=0.5;return[cx/(6*area),cy/(6*area)];}
 function representativePoint(geometry){const rings=getRings(geometry);let best=rings[0]||[];let bestArea=0;rings.forEach(r=>{let a=0;for(let i=0,j=r.length-1;i<r.length;j=i++)a+=r[j][0]*r[i][1]-r[i][0]*r[j][1];a=Math.abs(a/2);if(a>bestArea){bestArea=a;best=r;}});return polygonCentroid(best)}
 function renderGeojson(data){
  if(!data||!Array.isArray(data.features)||data.features.length<11)throw Error('Base municipal incompleta');
  const features=data.features.filter(f=>f.geometry&&getRings(f.geometry).length);if(!features.length)throw Error('Geometrias ausentes');
  const matched=new Set(features.map(f=>String(f.properties?.CODIGO_COMPLETO)==='2933505'?'wenceslau guimaraes':normalized((f.properties?.NOME||f.properties?.nome))).filter(n=>byName.has(n)));
  if(matched.size!==cities.length)console.warn('Alguns municípios não constam da consulta cartográfica; continuam disponíveis no seletor de cidades.');
  // Enquadramento baseado nos municípios atendidos. Os municípios
  // vizinhos permanecem em cinza, mas são recortados pelas bordas do SVG.
  const attended=features.filter(f=>String(f.properties?.CODIGO_COMPLETO)==='2933505'||byName.has(normalized((f.properties?.NOME||f.properties?.nome))));
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  for(const f of attended){for(const pt of allCoords(f.geometry)){
    const x=pt[0],y=pt[1];if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
  }}
  const w=840,h=580,pad=74;
  const scale=Math.min((w-2*pad)/(maxX-minX),(h-2*pad)/(maxY-minY));
  const xOff=(w-(maxX-minX)*scale)/2,yOff=(h-(maxY-minY)*scale)/2;
  const project=p=>[xOff+(p[0]-minX)*scale,h-yOff-(p[1]-minY)*scale];
  function dFor(g){return getRings(g).map(ring=>'M'+ring.map((p,j)=>{const [x,y]=project(p);return(j?'L':'')+x.toFixed(1)+','+y.toFixed(1)}).join(' ')+'Z').join(' ')}
  const svg=make('svg',{viewBox:'0 0 840 580',role:'group','aria-label':'Limites oficiais dos municípios da Bahia; municípios atendidos em amarelo'});svg.appendChild(make('rect',{width:840,height:580,rx:20,fill:'#e6e7e3'}));
  const defs=make('defs');
  const grad=make('linearGradient',{id:'np-map-territory',x1:'0%',y1:'0%',x2:'100%',y2:'100%'});grad.appendChild(make('stop',{offset:'0%','stop-color':'#f8cf2c'}));grad.appendChild(make('stop',{offset:'100%','stop-color':'#f0c304'}));defs.appendChild(grad);svg.appendChild(defs);
  const bg=make('g',{class:'np-map-neighbors'}),highlight=make('g',{class:'np-map-municipalities'}),labels=make('g',{class:'np-map-labels','aria-hidden':'true'});areas=[];
  features.forEach(f=>{const name=normalized((f.properties?.NOME||f.properties?.nome)),i=String(f.properties?.CODIGO_COMPLETO)==='2933505'?byName.get('wenceslau guimaraes'):byName.get(name),d=dFor(f.geometry);if(i===undefined){const path=make('path',{d,class:'np-map-outside'});const title=make('title');title.textContent=(f.properties?.NOME||f.properties?.nome)||'Município vizinho';path.appendChild(title);bg.appendChild(path);return}
   const group=make('g',{class:'np-map-area',tabindex:0,role:'button','data-index':i,'aria-label':'Ver presença da NP Digital em '+cities[i].name});group.appendChild(make('path',{class:'np-map-shape',d}));const title=make('title');title.textContent=cities[i].name;group.appendChild(title);
   const centerGeo=representativePoint(f.geometry);const [cx,cy]=project(centerGeo);group.appendChild(make('circle',{class:'np-map-center',cx:cx.toFixed(1),cy:cy.toFixed(1),r:'5'}));
   const cfg=labelConfig[name]||{dx:0,dy:0,anchor:'middle'};const lx=cx+(cfg.dx||0),ly=cy+(cfg.dy||0);const lbl=make('text',{class:`np-map-label np-map-label-anchor-${cfg.anchor||'middle'}${cfg.size?` is-${cfg.size}`:''}`,x:lx.toFixed(1),y:ly.toFixed(1)});
   const lines=cfg.lines||[cities[i].name];lines.forEach((line,idx)=>{const t=make('tspan',{x:lx.toFixed(1),dy:idx===0?'0':'.98em'});t.textContent=line;lbl.appendChild(t)});labels.appendChild(lbl);
   group.addEventListener('click',()=>select(i));group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i)}});highlight.appendChild(group);areas.push(group);
  });
  mapViewport=make('g',{class:'np-map-viewport'});mapViewport.appendChild(bg);mapViewport.appendChild(highlight);mapViewport.appendChild(labels);svg.appendChild(mapViewport);
  mapSvg=svg;map.replaceChildren(svg);ensureMapZoomControls();applyMapTransform();render();
 }
 const base='https://mapas.conder.ba.gov.br/arcgis/rest/services/BAHIA/LIMITES_MUNICIPAIS/FeatureServer/0/query';
 const q=new URLSearchParams({where:'1=1',geometry:'-40.15,-14.25,-38.75,-12.78',geometryType:'esriGeometryEnvelope',inSR:'4326',spatialRel:'esriSpatialRelIntersects',outFields:'NOME,CODIGO_COMPLETO',outSR:'4326',returnGeometry:'true',f:'geojson',maxAllowableOffset:'0.0025'});
 async function getGeojson(url){const response=await fetch(url,{method:'GET',mode:'cors'});if(!response.ok)throw Error('HTTP '+response.status);const json=await response.json();if(json.error)throw Error(json.error.message||'Erro da malha');return json;}
 async function loadMunicipalMap(){
   const region=await getGeojson(base+'?'+q.toString());
   if(!Array.isArray(region.features))throw Error('Malha incompleta');
   const seen=new Set(region.features.map(f=>String(f.properties?.CODIGO_COMPLETO)==='2933505'?'wenceslau guimaraes':normalized((f.properties?.NOME||f.properties?.nome))));
   // Busca individual por municípios ausentes no recorte inicial.
   // Isso garante especialmente a presença territorial de Wenceslau Guimarães.
   const missing=cities.filter(c=>!seen.has(normalized(c.name)));
   const additional=await Promise.all(missing.map(async city=>{
     const where=city.name==='Wenceslau Guimarães'?"CODIGO_COMPLETO='2933505'":"NOME='"+city.name.replaceAll("'","''")+"'";
     const query=new URLSearchParams({where,outFields:'NOME,CODIGO_COMPLETO',outSR:'4326',returnGeometry:'true',f:'geojson',maxAllowableOffset:'0.0025'});
     try{const result=await getGeojson(base+'?'+query.toString());if(result.features?.length)return result.features;
       if(city.name==='Wenceslau Guimarães'){
        const fallback=new URLSearchParams({where:"NOME LIKE 'Wenceslau%'",outFields:'NOME,CODIGO_COMPLETO',outSR:'4326',returnGeometry:'true',f:'geojson',maxAllowableOffset:'0.0025'});
        const second=await getGeojson(base+'?'+fallback.toString());return second.features||[];
       }
       return [];}
     catch(err){console.warn('Limite não carregado para '+city.name,err);return []}
   }));
   for(const features of additional)for(const feature of features){const n=String(feature.properties?.CODIGO_COMPLETO)==='2933505'?'wenceslau guimaraes':normalized((feature.properties?.NOME||feature.properties?.nome));if(!seen.has(n)){region.features.push(feature);seen.add(n)}}
   renderGeojson(region);
   const stillMissing=cities.filter(c=>!seen.has(normalized(c.name)));
   if(stillMissing.length){console.warn('Contornos não encontrados:',stillMissing.map(c=>c.name));const note=document.createElement('p');note.className='np-map-source-warning';note.textContent='Atenção: os limites de '+stillMissing.map(c=>c.name).join(', ')+' não foram retornados pelo serviço cartográfico. A cidade continua acessível no seletor.';mapFrame.appendChild(note)}
 }
 loadMunicipalMap().catch(err=>{
  console.warn('Malha municipal indisponível:',err);map.replaceChildren();const fallback=document.createElement('div');fallback.className='np-map-loading';fallback.textContent='Não foi possível carregar os limites oficiais dos municípios. Verifique a conexão e tente atualizar a página.';map.appendChild(fallback);
 });
})();


/* V26 — carrossel da seção "Presença que vira resultado" */
(()=>{
 const carousel=document.querySelector('[data-projects-carousel]');if(!carousel)return;
 const track=carousel.querySelector('.projects-carousel-track');
 const slides=[...track.querySelectorAll('.project-slide')];
 const dots=[...carousel.querySelectorAll('.projects-carousel-dot')];
 const viewport=carousel.querySelector('.projects-carousel-window');
 const counter=carousel.querySelector('.projects-carousel-status');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let current=0,timer=0,paused=false,startX=0,startY=0;
 const render=()=>{track.style.transform=`translate3d(-${current*100}%,0,0)`;dots.forEach((d,i)=>d.setAttribute('aria-current',String(i===current)));counter.textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;slides.forEach((s,i)=>s.setAttribute('aria-hidden',String(i!==current)))};
 const stop=()=>{clearInterval(timer);timer=0};
 const autoplay=()=>{stop();if(!paused&&!reduced&&!document.hidden&&slides.length>1)timer=setInterval(()=>{current=(current+1)%slides.length;render()},4200)};
 const go=(n)=>{current=(n+slides.length)%slides.length;render();autoplay()};
 carousel.querySelector('[data-prev]').addEventListener('click',()=>go(current-1));
 carousel.querySelector('[data-next]').addEventListener('click',()=>go(current+1));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
 viewport.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;startX=e.touches[0].clientX;startY=e.touches[0].clientY;stop()},{passive:true});
 viewport.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2)go(current+(dx<0?1:-1));else autoplay()},{passive:true});
 carousel.addEventListener('mouseenter',()=>{paused=true;stop()});carousel.addEventListener('mouseleave',()=>{paused=false;autoplay()});
 carousel.addEventListener('focusin',()=>{paused=true;stop()});carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){paused=false;autoplay()}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else autoplay()});render();autoplay();
})();
