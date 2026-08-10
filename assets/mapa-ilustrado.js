(() => {
  const pairs=[
    ['caminha-guarda',8,54,['caminha','Caminha'],['a-guarda','A Guarda']],['valenca-tui',16,57,['valenca','Valença'],['tui','Tui']],['moncao-salvaterra',24,59,['moncao','Monção'],['salvaterra-de-mino','Salvaterra']],['chaves-verin',33,66,['chaves','Chaves'],['verin','Verín']],['miranda-zamora',43,72,['miranda-do-douro','Miranda'],['zamora','Zamora']],['almeida-rodrigo',53,65,['almeida','Almeida'],['ciudad-rodrigo','Ciudad Rodrigo']],['marvao-valencia',64,61,['marvao','Marvão'],['valencia-de-alcantara','Valencia']],['elvas-badajoz',73,62,['elvas','Elvas'],['badajoz','Badajoz']],['barrancos-encinasola',82,61,['barrancos','Barrancos'],['encinasola','Encinasola']],['vrsa-ayamonte',92,58,['vila-real-santo-antonio','V. R. Sto. António'],['ayamonte','Ayamonte']]
  ];
  const box=document.getElementById('map-pairs');if(!box)return;
  box.innerHTML=pairs.map(([pair,y,x,pt,es])=>`<div class="map-pair" style="--x:${x}%;--y:${y}%"><a class="map-city pt" href="par-raiano.html?par=${pair}&cidade=${pt[0]}" aria-label="Explorar ${pt[1]}"><img src="assets/cidades/${pt[0]}.webp" alt=""><span>${pt[1]}</span></a><b class="pair-link" aria-hidden="true">↔</b><a class="map-city es" href="par-raiano.html?par=${pair}&cidade=${es[0]}" aria-label="Explorar ${es[1]}"><img src="assets/cidades/${es[0]}.webp" alt=""><span>${es[1]}</span></a></div>`).join('');
})();
