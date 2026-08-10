(() => {
  const pairs=[
    ['caminha-guarda',7,48,['caminha','Caminha'],['a-guarda','A Guarda']],['valenca-tui',14,57,['valenca','Valença'],['tui','Tui']],['moncao-salvaterra',21,64,['moncao','Monção'],['salvaterra-de-mino','Salvaterra']],['chaves-verin',29,69,['chaves','Chaves'],['verin','Verín']],['miranda-zamora',38,74,['miranda-do-douro','Miranda'],['zamora','Zamora']],['almeida-rodrigo',47,69,['almeida','Almeida'],['ciudad-rodrigo','Ciudad Rodrigo']],['marvao-valencia',59,65,['marvao','Marvão'],['valencia-de-alcantara','Valencia']],['elvas-badajoz',67,64,['elvas','Elvas'],['badajoz','Badajoz']],['barrancos-encinasola',77,65,['barrancos','Barrancos'],['encinasola','Encinasola']],['vrsa-ayamonte',91,61,['vila-real-santo-antonio','V. R. Sto. António'],['ayamonte','Ayamonte']]
  ];
  const box=document.getElementById('map-pairs');if(!box)return;
  box.innerHTML=pairs.map(([pair,y,x,pt,es])=>`<div class="map-pair" style="--x:${x}%;--y:${y}%"><a class="map-city pt" href="par-raiano.html?par=${pair}&cidade=${pt[0]}" aria-label="Explorar ${pt[1]}"><img src="assets/cidades/${pt[0]}.webp" alt=""><span>${pt[1]}</span></a><b class="pair-link" aria-hidden="true">↔</b><a class="map-city es" href="par-raiano.html?par=${pair}&cidade=${es[0]}" aria-label="Explorar ${es[1]}"><img src="assets/cidades/${es[0]}.webp" alt=""><span>${es[1]}</span></a></div>`).join('');
})();
