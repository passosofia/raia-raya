(() => {
  const cities=[
    ['caminha-guarda','caminha','Caminha','pt',38,8],['caminha-guarda','a-guarda','A Guarda','es',44,6],
    ['valenca-tui','valenca','Valença','pt',45,12],['valenca-tui','tui','Tui','es',51,10],
    ['moncao-salvaterra','moncao','Monção','pt',51,16],['moncao-salvaterra','salvaterra-de-mino','Salvaterra de Miño','es',58,14],
    ['chaves-verin','chaves','Chaves','pt',57,18],['chaves-verin','verin','Verín','es',67,15],
    ['miranda-zamora','miranda-do-douro','Miranda do Douro','pt',70,30],['miranda-zamora','zamora','Zamora','es',80,29],
    ['almeida-rodrigo','almeida','Almeida','pt',65,40],['almeida-rodrigo','ciudad-rodrigo','Ciudad Rodrigo','es',74,40],
    ['marvao-valencia','marvao','Marvão','pt',61,58],['marvao-valencia','valencia-de-alcantara','Valencia de Alcántara','es',70,57],
    ['elvas-badajoz','elvas','Elvas','pt',61,66],['elvas-badajoz','badajoz','Badajoz','es',71,65],
    ['barrancos-encinasola','barrancos','Barrancos','pt',62,76],['barrancos-encinasola','encinasola','Encinasola','es',70,76],
    ['vrsa-ayamonte','vila-real-santo-antonio','Vila Real de Santo António','pt',56,91],['vrsa-ayamonte','ayamonte','Ayamonte','es',64,91]
  ];
  const markers=document.getElementById('map-markers'),cards=document.getElementById('city-cards');if(!markers||!cards)return;
  const url=city=>`par-raiano.html?par=${city[0]}&cidade=${city[1]}`;
  markers.innerHTML=cities.map(c=>`<a id="marker-${c[1]}" class="map-marker ${c[3]}" style="--x:${c[4]}%;--y:${c[5]}%" href="${url(c)}" aria-label="Explorar ${c[2]}"><span>${c[2]}</span></a>`).join('');
  cards.innerHTML=cities.map(c=>`<a id="card-${c[1]}" class="map-city-card ${c[3]}" href="${url(c)}"><img src="assets/cidades/${c[1]}.webp" alt="Ilustração em aguarela de ${c[2]}"><div class="map-city-copy"><small>${c[3]==='pt'?'Portugal':'España'}</small><h2>${c[2]}</h2><span>${c[3]==='pt'?'Explorar a cidade':'Explorar la ciudad'} →</span></div></a>`).join('');
  const activate=(slug,on)=>{document.getElementById(`marker-${slug}`)?.classList.toggle('active',on);document.getElementById(`card-${slug}`)?.classList.toggle('active',on)};
  cities.forEach(c=>{const slug=c[1],marker=document.getElementById(`marker-${slug}`),card=document.getElementById(`card-${slug}`);[marker,card].forEach(el=>{el.addEventListener('mouseenter',()=>activate(slug,true));el.addEventListener('mouseleave',()=>activate(slug,false));el.addEventListener('focus',()=>activate(slug,true));el.addEventListener('blur',()=>activate(slug,false));});marker.addEventListener('mouseenter',()=>card.scrollIntoView({block:'nearest',behavior:'smooth'}));});
})();
