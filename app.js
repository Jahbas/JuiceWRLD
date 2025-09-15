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
  const songs = SONGS.filter(s=> (album.id && s.albumId===album.id) || s.album===album.name);
  const year = album.year ?? unique(songs.map(s=>s.year)).sort((a,b)=>a-b)[0];
  return `
  <article class="card album" data-album="${album.name}" data-album-id="${album.id||''}">
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
  const songs = SONGS
    .filter(s=> (album.id && s.albumId===album.id) || s.album===album.name)
    .reduce((acc, s)=>{ const k = `${s.albumId||s.album}|${s.discNumber||1}|${s.trackNumber||0}|${(s.title||'').toLowerCase()}`; if(!acc.map.has(k)){ acc.map.set(k, true); acc.list.push(s); } return acc; }, {list:[], map:new Map()}).list
    .sort((a,b)=> (a.discNumber||1)-(b.discNumber||1) || (a.trackNumber||0)-(b.trackNumber||0) || a.title.localeCompare(b.title));
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
      <span class="track-right">
        <span class="sub">${s.lengthSec?secondsToTime(s.lengthSec):''}</span>
        <span class="badge ${s.status||'released'}">${s.status||'released'}</span>
        <button class="icon-btn info" title="Details of ${s.title}">i</button>
      </span>
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
      const el = e.currentTarget.closest('.card.album');
      const id = el.dataset.albumId; const name = el.dataset.album;
      const album = id ? albums.find(a=>String(a.id)===String(id)) : albums.find(a=>a.name===name);
      openAlbumModal(album);
    });
  });
}

function getAlbums(){
  if(ALBUMS.length){ return ALBUMS.map(a=>({ ...a })); }
  // Fallback: derive from songs
  const byKey = new Map();
  for(const s of SONGS){
    const key = s.albumId || s.album;
    if(!key || s.album==='N/A' || s.album==='Single') continue;
    if(!byKey.has(key)) byKey.set(key, { id: s.albumId, name: s.album, year: s.year, cover: s.cover, tags: [], releaseDate: s.year? String(s.year):'' });
  }
  return [...byKey.values()];
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
const ITUNES_ARTIST_ID = 1368733420; // Juice WRLD
async function fetchFromITunes(){
  const artistId = ITUNES_ARTIST_ID;
  const [albums, songs, albumsSearch, songsSearch] = await Promise.all([
    itunesLookup(artistId, 'album', 200),
    itunesLookup(artistId, 'song', 200),
    itunesSearchPaged('Juice WRLD', 'album', 5),
    itunesSearchPaged('Juice WRLD', 'song', 8),
  ]);
  const allAlbums = dedupeBy(
    [...albums, ...albumsSearch].filter(a=>
      String(a.artistId||a.collectionArtistId)===String(artistId) || /juice wrld/i.test(a.artistName||a.collectionArtistName||'')
    ),
    a => String(a.collectionId || a.collectionName)
  );
  // Merge songs and hard-dedupe by trackId → fallback by album-position
  const mergedSongs = [...songs, ...songsSearch].filter(s=> String(s.artistId)===String(artistId) || /juice wrld/i.test(s.artistName||''));
  const byTrackId = new Map();
  const provisional = [];
  for(const s of mergedSongs){
    if(s.trackId){ if(!byTrackId.has(s.trackId)) byTrackId.set(s.trackId, s); }
    else provisional.push(s);
  }
  // Secondary dedupe for items missing trackId: by collectionId+discNumber+trackNumber+trackName
  const byPos = new Map();
  for(const s of provisional){
    const key = `${s.collectionId||''}|${s.discNumber||1}|${s.trackNumber||0}|${(s.trackName||'').toLowerCase()}`;
    if(!byPos.has(key)) byPos.set(key, s);
  }
  const allSongs = [...byTrackId.values(), ...byPos.values()];
  // Albums
  ALBUMS.splice(0, ALBUMS.length, ...allAlbums.map(a=>({
    id: a.collectionId,
    name: a.collectionName,
    releaseDate: a.releaseDate ? a.releaseDate.slice(0,10) : '',
    reissueDate: '',
    tags: ['album'],
    cover: a.artworkUrl100 ? a.artworkUrl100.replace('100x100bb.jpg','512x512bb.jpg') : '',
  })));
  // Songs
  SONGS.splice(0, SONGS.length, ...allSongs.map(s=>({
    id: String(s.trackId || s.trackViewUrl || `${s.trackName}-${s.collectionId}`),
    title: s.trackName,
    status: 'released',
    albumId: s.collectionId,
    album: s.collectionName || 'Single',
    year: s.releaseDate ? new Date(s.releaseDate).getFullYear() : undefined,
    producers: [],
    writers: [],
    lengthSec: s.trackTimeMillis ? Math.round(s.trackTimeMillis/1000) : undefined,
    trackNumber: s.trackNumber || null,
    discNumber: s.discNumber || 1,
    tags: [],
    cover: s.artworkUrl100 ? s.artworkUrl100.replace('100x100bb.jpg','512x512bb.jpg') : '',
    links: s.trackViewUrl ? [{ label: 'Apple Music', url: s.trackViewUrl }] : [],
    description: '',
  })));
  // Final safety: dedupe SONGS list globally by id and by album-position key
  const uniqueById = new Map();
  const fallbackByPos = new Map();
  const finalSongs = [];
  for(const s of SONGS){
    if(s.id && !uniqueById.has(s.id)){ uniqueById.set(s.id, true); finalSongs.push(s); continue; }
    const k = `${s.albumId||s.album}|${s.discNumber||1}|${s.trackNumber||0}|${(s.title||'').toLowerCase()}`;
    if(!fallbackByPos.has(k)){ fallbackByPos.set(k, true); finalSongs.push(s); }
  }
  SONGS.splice(0, SONGS.length, ...finalSongs);
}

// kept for potential future use
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

async function itunesSearchPaged(term, entity, pages){
  const out = [];
  const pageCount = Math.max(1, pages||1);
  for(let p=0;p<pageCount;p++){
    const offset = p*200;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&media=music&limit=200&offset=${offset}`;
    const res = await fetch(url); if(!res.ok) break; const json = await res.json();
    out.push(...(json.results||[]));
    if(!(json.results||[]).length) break;
  }
  return out;
}

function dedupeBy(arr, keyFn){
  const map = new Map();
  for(const item of arr){ const key = keyFn(item); if(!map.has(key)) map.set(key, item); }
  return [...map.values()];
}

// removed MusicBrainz/CAA sync helpers

document.addEventListener('DOMContentLoaded', init);


