// Start empty; populated from public sources (Google Sheet)
const ALBUMS = [];

// Start empty; populated from public sources (Google Sheet)
const SONGS = [];

// Data is fetched from public APIs at runtime (MusicBrainz + Cover Art Archive)

const els = {
  // search/status removed per request
  // album/year filters removed per request
  albumSort: document.getElementById('albumSort'),
  tabSongs: document.getElementById('tabSongs'),
  tabAlbums: document.getElementById('tabAlbums'),
  grid: document.getElementById('grid'),
  stats: document.getElementById('stats'),
  chips: document.getElementById('chips'),
  modal: document.getElementById('songModal'),
  modalTitle: document.getElementById('modalTitle'),
  modalMeta: document.getElementById('modalMeta'),
  modalTags: document.getElementById('modalTags'),
  modalDesc: document.getElementById('modalDesc'),
  modalLinks: document.getElementById('modalLinks'),
  modalArt: document.getElementById('modalArt'),
  albumModal: document.getElementById('albumModal'),
  albumArt: document.getElementById('albumArt'),
  albumTitle: document.getElementById('albumTitle'),
  albumMeta: document.getElementById('albumMeta'),
  albumTags: document.getElementById('albumTags'),
  albumTracks: document.getElementById('albumTracks'),
  loadingOverlay: document.getElementById('loadingOverlay'),
};

function secondsToTime(s){
  const m = Math.floor(s/60), r = s % 60; return `${m}:${String(r).padStart(2,'0')}`;
}

function unique(values){ return [...new Set(values)]; }

// removed: populateFilters (filters removed)

function renderStats(filtered){
  const total = SONGS.length;
  const rel = filtered.filter(s=>s.status==='released').length;
  const unrel = filtered.filter(s=>s.status==='unreleased').length;
  els.stats.innerHTML = `Showing <strong>${filtered.length}</strong> of ${total} • Released: ${rel} • Unreleased: ${unrel}`;
}

function renderChips(){ els.chips.innerHTML = ''; }

function cardHtml(song){
  const badgeColor = song.status==='released' ? 'var(--ok)' : song.status==='leaked' ? 'var(--warn)' : 'var(--danger)';
  return `
  <article class="card" data-id="${song.id}">
    <div class="thumb" style="background-image:${song.cover?`url(${song.cover})`:''}">
      <div class="meta-badge" style="border-color:${badgeColor};">${song.status}</div>
    </div>
    <div class="content">
      <div class="title-row">
        <h3 class="song-title">${song.title}</h3>
        <button class="icon-btn info" title="Details" aria-label="More info about ${song.title}">i</button>
      </div>
      <div class="sub">${song.album} • ${song.year} • ${secondsToTime(song.lengthSec)}</div>
      <div class="tags">${song.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div>
  </article>`
}

function albumCardHtml(album){
  const songs = SONGS.filter(s=>s.album===album.name);
  const year = album.year ?? unique(songs.map(s=>s.year))[0];
  return `
  <article class="card album" data-album="${album.name}">
    <div class="thumb" style="background-image:${album.cover?`url(${album.cover})`:''}"></div>
    <div class="content">
      <div class="title-row">
        <h3 class="song-title">${album.name}</h3>
        <button class="icon-btn info" title="Open album" aria-label="Open album ${album.name}">⤴</button>
      </div>
      <div class="sub">${year || ''} • ${songs.length} tracks</div>
      <div class="tags">${(album.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div>
  </article>`
}

function openAlbumModal(album){
  const songs = SONGS.filter(s=>s.album===album.name).sort((a,b)=>a.title.localeCompare(b.title));
  els.albumTitle.textContent = album.name;
  els.albumMeta.innerHTML = [
    album.releaseDate && `Release: <strong>${album.releaseDate}</strong>`,
    album.reissueDate && `Reissue: <strong>${album.reissueDate}</strong>`,
    `Tracks: <strong>${songs.length}</strong>`
  ].filter(Boolean).map(x=>`<span>${x}</span>`).join(' • ');
  els.albumTags.innerHTML = (album.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');
  els.albumTracks.innerHTML = songs.map(s=>`
    <div class="track-row" data-id="${s.id}">
      <span>${s.title}</span>
      <span class="sub">${secondsToTime(s.lengthSec)} • ${s.status}</span>
      <button class="icon-btn info" title="Details of ${s.title}">i</button>
    </div>
  `).join('');
  els.albumArt.style.backgroundImage = album.cover ? `url(${album.cover})` : '';
  els.albumModal.showModal();
  els.albumTracks.querySelectorAll('.track-row .icon-btn.info').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.currentTarget.closest('.track-row').dataset.id; const song = SONGS.find(s=>s.id===id); openModal(song);
    });
  });
}

function bindAlbumCardEvents(albums){
  els.grid.querySelectorAll('.card.album .icon-btn.info').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const name = e.currentTarget.closest('.card.album').dataset.album;
      const album = albums.find(a=>a.name===name);
      openAlbumModal(album);
    });
  });
}

function getAlbums(){
  // Merge discovered albums from songs with ALBUMS metadata
  const discovered = new Map();
  for(const s of SONGS){
    if(!s.album || s.album === 'N/A' || s.album === 'Single') continue;
    if(!discovered.has(s.album)) discovered.set(s.album, { name: s.album, year: s.year, cover: s.cover, tags: [] });
  }
  const merged = [];
  const byName = new Map(ALBUMS.map(a=>[a.name,a]));
  for(const [name, obj] of discovered){
    const meta = byName.get(name);
    merged.push({
      name,
      year: obj.year || undefined,
      cover: obj.cover || '',
      tags: meta?.tags || obj.tags || [],
      releaseDate: meta?.releaseDate || '',
      reissueDate: meta?.reissueDate || '',
    });
  }
  // Also include albums listed in ALBUMS even if no song objects yet (optional)
  for(const a of ALBUMS){
    if(!merged.find(m=>m.name===a.name)){
      merged.push({ name: a.name, year: undefined, cover: '', tags: a.tags||[], releaseDate: a.releaseDate||'', reissueDate: a.reissueDate||'' });
    }
  }
  return merged;
}

function openModal(song){
  els.modalTitle.textContent = song.title;
  els.modalMeta.innerHTML = [
    song.album && `Album: <strong>${song.album}</strong>`,
    song.year && `Year: <strong>${song.year}</strong>`,
    song.producers?.length && `Producers: <strong>${song.producers.join(', ')}</strong>`,
    song.writers?.length && `Writers: <strong>${song.writers.join(', ')}</strong>`,
    `Length: <strong>${secondsToTime(song.lengthSec)}</strong>`
  ].filter(Boolean).map(x=>`<span>${x}</span>`).join(' • ');
  els.modalTags.innerHTML = song.tags?.map(t=>`<span class="tag">${t}</span>`).join('') || '';
  els.modalDesc.textContent = song.description || '';
  els.modalLinks.innerHTML = song.links?.map(l=>`<a class="link-btn" target="_blank" rel="noopener" href="${l.url}">${l.label}</a>`).join('') || '';
  els.modalArt.style.backgroundImage = song.cover ? `url(${song.cover})` : '';
  els.modal.showModal();
}

function bindCardEvents(){
  els.grid.querySelectorAll('.card .icon-btn.info').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.currentTarget.closest('.card').dataset.id;
      const song = SONGS.find(s=>s.id===id);
      openModal(song);
    });
  });
}

function filterSongs(){ return SONGS; }

function render(){
  // Hide loader if we have any songs
  if(els.loadingOverlay){ els.loadingOverlay.hidden = SONGS.length > 0; }
  if(state.view==='songs'){
    els.albumSort.hidden = true;
    const filtered = filterSongs();
    renderStats(filtered);
    renderChips();
    els.grid.innerHTML = filtered.map(cardHtml).join('');
    bindCardEvents();
  }else{
    els.albumSort.hidden = false;
    const albums = getAlbums();
    const sorted = sortAlbums(albums, els.albumSort.value||'recent');
    els.stats.textContent = `Albums: ${sorted.length}`;
    els.chips.innerHTML = '';
    els.grid.innerHTML = sorted.map(albumCardHtml).join('');
    bindAlbumCardEvents(sorted);
  }
}

function update(){ render(); }

const state = { view: 'songs' };

function setTab(view){
  state.view = view;
  els.tabSongs.classList.toggle('is-active', view==='songs');
  els.tabAlbums.classList.toggle('is-active', view==='albums');
  render();
}

function sortAlbums(albums, mode){
  const list = [...albums];
  if(mode==='recent') list.sort((a,b)=> (b.year||0) - (a.year||0));
  if(mode==='oldest') list.sort((a,b)=> (a.year||0) - (b.year||0));
  if(mode==='az') list.sort((a,b)=> a.name.localeCompare(b.name));
  if(mode==='za') list.sort((a,b)=> b.name.localeCompare(a.name));
  return list;
}

function init(){
  render();
  els.albumSort.addEventListener('change', ()=> state.view==='albums' && render());
  const close = document.querySelector('.modal .close');
  close?.addEventListener('click', ()=> els.modal.close());
  els.modal.addEventListener('click', (e)=>{ if(e.target === els.modal) els.modal.close(); });
  const aclose = document.querySelector('#albumModal .close');
  aclose?.addEventListener('click', ()=> els.albumModal.close());
  els.albumModal.addEventListener('click', (e)=>{ if(e.target === els.albumModal) els.albumModal.close(); });
  els.tabSongs.addEventListener('click', ()=> setTab('songs'));
  els.tabAlbums.addEventListener('click', ()=> setTab('albums'));
  // Pull data from public APIs, then refresh artwork
  if(els.loadingOverlay) els.loadingOverlay.hidden = false;
  fetchFromITunes()
    .catch(()=>{})
    .then(()=> refreshArtworkForAll())
    .then(()=>{ if(state.view==='songs') render(); if(els.loadingOverlay) els.loadingOverlay.hidden = SONGS.length > 0; });
}

// removed CSV/import helpers

// --- Artwork fetching ---
const artworkCache = JSON.parse(localStorage.getItem('jw_art')||'{}');

async function fetchArtworkForSong(song){
  if(song.cover) return song.cover;
  if(artworkCache[song.title]){ song.cover = artworkCache[song.title]; return song.cover; }
  // Spotify oEmbed
  const sp = song.links?.find(l=>/open.spotify.com\/(track|album)/.test(l.url));
  if(sp){
    try{
      const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(sp.url)}`);
      if(res.ok){ const data = await res.json();
        if(data.thumbnail_url){ artworkCache[song.title]=data.thumbnail_url; song.cover=data.thumbnail_url; persistArtworkCache(); return song.cover; }
      }
    }catch{}
  }
  // iTunes Search API fallback
  try{
    const term = encodeURIComponent(`${song.title} Juice WRLD`);
    const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=1`);
    if(res.ok){
      const json = await res.json();
      if(json.results?.length){
        const art100 = json.results[0].artworkUrl100;
        const art512 = art100?.replace('100x100bb.jpg','512x512bb.jpg');
        artworkCache[song.title]=art512||art100; song.cover=art512||art100; persistArtworkCache(); return song.cover;
      }
    }
  }catch{}
  return '';
}

function persistArtworkCache(){ localStorage.setItem('jw_art', JSON.stringify(artworkCache)); }

async function refreshArtworkForAll(){
  const tasks = SONGS.map(s=>fetchArtworkForSong(s).catch(()=>''));
  await Promise.all(tasks);
}

// --- iTunes Search API (public, no auth) ---
async function fetchFromITunes(){
  const artist = await itunesFindArtist('Juice WRLD');
  if(!artist) return;
  const [albums, songs] = await Promise.all([
    itunesLookup(artist.artistId, 'album', 200),
    itunesLookup(artist.artistId, 'song', 200),
  ]);
  // Albums
  ALBUMS.splice(0, ALBUMS.length, ...albums.map(a=>({
    name: a.collectionName,
    releaseDate: a.releaseDate ? a.releaseDate.slice(0,10) : '',
    reissueDate: '',
    tags: ['album'],
    cover: a.artworkUrl100 ? a.artworkUrl100.replace('100x100bb.jpg','512x512bb.jpg') : '',
  })));
  // Songs
  SONGS.splice(0, SONGS.length, ...songs
    .filter(s=> /juice wrld/i.test(s.artistName||''))
    .map(s=>({
      id: String(s.trackId || s.trackViewUrl),
      title: s.trackName,
      status: 'released',
      album: s.collectionName || 'Single',
      year: s.releaseDate ? new Date(s.releaseDate).getFullYear() : undefined,
      producers: [],
      writers: [],
      lengthSec: s.trackTimeMillis ? Math.round(s.trackTimeMillis/1000) : undefined,
      tags: [],
      cover: s.artworkUrl100 ? s.artworkUrl100.replace('100x100bb.jpg','512x512bb.jpg') : '',
      links: s.trackViewUrl ? [{ label: 'Apple Music', url: s.trackViewUrl }] : [],
      description: '',
    }))
  );
}

async function itunesFindArtist(name){
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=musicArtist&limit=5`;
  const res = await fetch(url); if(!res.ok) return null; const json = await res.json();
  return (json.results||[]).find(a=> (a.artistName||'').toLowerCase()===name.toLowerCase()) || (json.results||[])[0] || null;
}

async function itunesLookup(artistId, entity, limit){
  const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=${entity}&limit=${limit||200}`;
  const res = await fetch(url); if(!res.ok) return [];
  const json = await res.json();
  return (json.results||[]).filter(x=> x.wrapperType==='collection' || x.wrapperType==='track');
}

// removed MusicBrainz/CAA sync helpers

document.addEventListener('DOMContentLoaded', init);


