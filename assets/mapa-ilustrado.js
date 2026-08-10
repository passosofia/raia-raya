(() => {
  const cities=[
    ['caminha-guarda','caminha','Caminha','pt',39,7],['caminha-guarda','a-guarda','A Guarda','es',42,5],
    ['valenca-tui','valenca','Valença','pt',47,10],['valenca-tui','tui','Tui','es',50,9],
    ['moncao-salvaterra','moncao','Monção','pt',53,12],['moncao-salvaterra','salvaterra-de-mino','Salvaterra de Miño','es',56,11],
    ['chaves-verin','chaves','Chaves','pt',60,22],['chaves-verin','verin','Verín','es',63,18],
    ['miranda-zamora','miranda-do-douro','Miranda do Douro','pt',70,30],['miranda-zamora','zamora','Zamora','es',80,29],
    ['almeida-rodrigo','almeida','Almeida','pt',65,40],['almeida-rodrigo','ciudad-rodrigo','Ciudad Rodrigo','es',72,40],
    ['marvao-valencia','marvao','Marvão','pt',61,58],['marvao-valencia','valencia-de-alcantara','Valencia de Alcántara','es',67,57],
    ['elvas-badajoz','elvas','Elvas','pt',61,66],['elvas-badajoz','badajoz','Badajoz','es',68,65],
    ['barrancos-encinasola','barrancos','Barrancos','pt',62,76],['barrancos-encinasola','encinasola','Encinasola','es',67,76],
    ['vrsa-ayamonte','vila-real-santo-antonio','Vila Real de Santo António','pt',56,91],['vrsa-ayamonte','ayamonte','Ayamonte','es',61,91]
  ];
  const markers=document.getElementById('map-markers'),cards=document.getElementById('city-cards');if(!markers||!cards)return;
  const url=city=>`par-raiano.html?par=${city[0]}&cidade=${city[1]}`;
  markers.innerHTML=cities.map(c=>`<a id="marker-${c[1]}" class="map-marker ${c[3]}" style="--x:${c[4]}%;--y:${c[5]}%" href="${url(c)}" aria-label="Explorar ${c[2]}"><span>${c[2]}</span></a>`).join('');
  cards.innerHTML=cities.map(c=>`<a id="card-${c[1]}" class="map-city-card ${c[3]}" href="${url(c)}"><img src="assets/cidades/${c[1]}.webp" alt="Ilustração em aguarela de ${c[2]}"><div class="map-city-copy"><small>${c[3]==='pt'?'Portugal':'España'}</small><h2>${c[2]}</h2><span>${c[3]==='pt'?'Explorar a cidade':'Explorar la ciudad'} →</span></div></a>`).join('');
  const activate=(slug,on)=>{document.getElementById(`marker-${slug}`)?.classList.toggle('active',on);document.getElementById(`card-${slug}`)?.classList.toggle('active',on)};
  cities.forEach(c=>{const slug=c[1],marker=document.getElementById(`marker-${slug}`),card=document.getElementById(`card-${slug}`);[marker,card].forEach(el=>{el.addEventListener('mouseenter',()=>activate(slug,true));el.addEventListener('mouseleave',()=>activate(slug,false));el.addEventListener('focus',()=>activate(slug,true));el.addEventListener('blur',()=>activate(slug,false));});marker.addEventListener('mouseenter',()=>card.scrollIntoView({block:'nearest',behavior:'smooth'}));});
})();
