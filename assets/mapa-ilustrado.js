(() => {
  const cities = [
    ['caminha-guarda', 'caminha', 'Caminha', 'pt', -8.8384, 41.8758],
    ['caminha-guarda', 'a-guarda', 'A Guarda', 'es', -8.8740, 41.9010],
    ['valenca-tui', 'valenca', 'Valença', 'pt', -8.6420, 42.0260],
    ['valenca-tui', 'tui', 'Tui', 'es', -8.6444, 42.0471],
    ['moncao-salvaterra', 'moncao', 'Monção', 'pt', -8.4802, 42.0787],
    ['moncao-salvaterra', 'salvaterra-de-mino', 'Salvaterra de Miño', 'es', -8.5000, 42.0833],
    ['chaves-verin', 'chaves', 'Chaves', 'pt', -7.4688, 41.7400],
    ['chaves-verin', 'verin', 'Verín', 'es', -7.4381, 41.9415],
    ['miranda-zamora', 'miranda-do-douro', 'Miranda do Douro', 'pt', -6.2737, 41.4961],
    ['miranda-zamora', 'zamora', 'Zamora', 'es', -5.7445, 41.5035],
    ['almeida-rodrigo', 'almeida', 'Almeida', 'pt', -6.9061, 40.7256],
    ['almeida-rodrigo', 'ciudad-rodrigo', 'Ciudad Rodrigo', 'es', -6.5229, 40.5987],
    ['marvao-valencia', 'marvao', 'Marvão', 'pt', -7.3767, 39.3941],
    ['marvao-valencia', 'valencia-de-alcantara', 'Valencia de Alcántara', 'es', -7.2428, 39.4125],
    ['elvas-badajoz', 'elvas', 'Elvas', 'pt', -7.1628, 38.8815],
    ['elvas-badajoz', 'badajoz', 'Badajoz', 'es', -6.9707, 38.8794],
    ['barrancos-encinasola', 'barrancos', 'Barrancos', 'pt', -6.9760, 38.1302],
    ['barrancos-encinasola', 'encinasola', 'Encinasola', 'es', -6.8723, 38.1345],
    ['vrsa-ayamonte', 'vila-real-santo-antonio', 'Vila Real de Santo António', 'pt', -7.4177, 37.1950],
    ['vrsa-ayamonte', 'ayamonte', 'Ayamonte', 'es', -7.4083, 37.2145]
  ];
  const bounds = { west: -9.65, east: -5.20, north: 42.30, south: 36.85 };
  const position = city => ({
    x: (city[4] - bounds.west) / (bounds.east - bounds.west) * 100,
    y: (bounds.north - city[5]) / (bounds.north - bounds.south) * 100
  });
  const markers = document.getElementById('map-markers');
  const cards = document.getElementById('city-cards');
  if (!markers || !cards) return;
  const language = localStorage.getItem('raia-language') === 'es' ? 'es' : 'pt';
  const url = city => `par-raiano.html?par=${city[0]}&cidade=${city[1]}`;
  markers.innerHTML = cities.map(city => {
    const point = position(city);
    return `<a id="marker-${city[1]}" class="map-marker ${city[3]}" style="--x:${point.x.toFixed(3)}%;--y:${point.y.toFixed(3)}%" href="${url(city)}" aria-label="Explorar ${city[2]}"><span>${city[2]}</span></a>`;
  }).join('');
  cards.innerHTML = cities.map(city => `<a id="card-${city[1]}" class="map-city-card ${city[3]}" href="${url(city)}"><img src="assets/cidades/${city[1]}.webp" alt="${language === 'es' ? 'Ilustración en acuarela' : 'Ilustração em aguarela'} de ${city[2]}"><div class="map-city-copy"><small>${city[3] === 'pt' ? 'Portugal' : 'España'}</small><h2>${city[2]}</h2><span>${language === 'es' ? 'Explorar la ciudad' : 'Explorar a cidade'} →</span></div></a>`).join('');
  const activate = (slug, on) => {
    document.getElementById(`marker-${slug}`)?.classList.toggle('active', on);
    document.getElementById(`card-${slug}`)?.classList.toggle('active', on);
  };
  cities.forEach(city => {
    const slug = city[1];
    const marker = document.getElementById(`marker-${slug}`);
    const card = document.getElementById(`card-${slug}`);
    [marker, card].forEach(element => {
      element.addEventListener('mouseenter', () => activate(slug, true));
      element.addEventListener('mouseleave', () => activate(slug, false));
      element.addEventListener('focus', () => activate(slug, true));
      element.addEventListener('blur', () => activate(slug, false));
    });
    marker.addEventListener('mouseenter', () => card.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  });
})();
