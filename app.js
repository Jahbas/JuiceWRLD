// Albums metadata (release and reissue dates)
const ALBUMS = [
  { name: "Goodbye & Good Riddance", releaseDate: "May 23, 2018", reissueDate: "July 10 & December 10, 2018", tags: ["debut","2018"] },
  { name: "Too Soon...", releaseDate: "June 19, 2018", tags: ["EP","2018"] },
  { name: "Future & Juice WRLD Present... WRLD ON DRUGS", releaseDate: "October 19, 2018", tags: ["collab","2018"] },
  { name: "Death Race For Love", releaseDate: "March 8, 2019", tags: ["album","2019"] },
  { name: "Legends Never Die", releaseDate: "July 10, 2020", reissueDate: "August 7, 2020", tags: ["posthumous","2020"] },
  { name: "Goodbye & Good Riddance (Anniversary Edition)", releaseDate: "May 28, 2021", tags: ["anniversary","2021"] },
  { name: "Fighting Demons", releaseDate: "December 10, 2021", tags: ["posthumous","2021"] },
  { name: "Fighting Demons (Complete/Extended)", releaseDate: "February 2022", tags: ["deluxe","2022"] },
  { name: "The Pre-Party", releaseDate: "September 9, 2024", tags: ["2024"] },
  { name: "The Pre-Party (Extended Edition)", releaseDate: "October 14, 2024", tags: ["2024","extended"] },
  { name: "The Party Never Ends", releaseDate: "November 29, 2024", reissueDate: "November 30, 2024", tags: ["2024"] },
  { name: "Legends Never Die (5 Year Anniversary Edition)", releaseDate: "July 11, 2025", tags: ["anniversary","2025"] },
];

// Lightweight curated dataset. Extend as needed.
const SONGS = [
  {
    id: "lucid-dreams",
    title: "Lucid Dreams",
    status: "released",
    album: "Goodbye & Good Riddance",
    year: 2018,
    producers: ["Nick Mira"],
    writers: ["Jarad Higgins"],
    lengthSec: 239,
    tags: ["emo rap","melodic","breakup"],
    cover: "https://i.scdn.co/image/ab67616d0000b273a7340fd7b6bff5841b1390d0",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/0s3nnoMeVWz3989MkNQiRf" }],
    description: "Breakout single interpolating Sting's 'Shape of My Heart'.",
  },
  {
    id: "all-girls-are-the-same",
    title: "All Girls Are The Same",
    status: "released",
    album: "Goodbye & Good Riddance",
    year: 2018,
    producers: ["Nick Mira"],
    writers: ["Jarad Higgins"],
    lengthSec: 174,
    tags: ["breakout","emo rap"],
    cover: "",
    links: [],
    description: "One of the first major-label singles for Juice WRLD.",
  },
  {
    id: "lean-wit-me",
    title: "Lean Wit Me",
    status: "released",
    album: "Goodbye & Good Riddance",
    year: 2018,
    producers: ["Nick Mira"],
    writers: ["Jarad Higgins"],
    lengthSec: 175,
    tags: ["melodic","anthem"],
    cover: "",
    links: [],
    description: "Hit single with introspective lyricism.",
  },
  {
    id: "wishing-well",
    title: "Wishing Well",
    status: "released",
    album: "Legends Never Die",
    year: 2020,
    producers: ["Dr. Luke","Sam Sumser","Ilya"],
    writers: ["Jarad Higgins"],
    lengthSec: 199,
    tags: ["posthumous","candor","anthem"],
    cover: "https://i.scdn.co/image/ab67616d0000b2737d8c2ffcf98101efb5da0c16",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/2U5WueTLIK5WJLD7mvDODv" }],
    description: "Introspective cut on addiction and recovery, released posthumously.",
  },
  {
    id: "come-and-go",
    title: "Come & Go (with Marshmello)",
    status: "released",
    album: "Legends Never Die",
    year: 2020,
    producers: ["Marshmello"],
    writers: ["Jarad Higgins"],
    lengthSec: 195,
    tags: ["collab","anthem"],
    cover: "",
    links: [],
    description: "EDM-rap fusion peak from the album.",
  },
  {
    id: "cigarettes",
    title: "Cigarettes",
    status: "released",
    album: "Fighting Demons (Deluxe)",
    year: 2022,
    producers: ["Nick Mira"],
    writers: ["Jarad Higgins"],
    lengthSec: 216,
    tags: ["melodic","relationship"],
    cover: "https://i.scdn.co/image/ab67616d0000b273c6b9c7c0788d7a5c57d59c09",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/7n4Sz3wYRA8d8y0zS04LZy" }],
    description: "Fan-favorite leak turned official release in 2022.",
  },
  {
    id: "go-hard-2.0",
    title: "Go Hard 2.0",
    status: "released",
    album: "Fighting Demons (Deluxe)",
    year: 2022,
    producers: ["Nick Mira","DT"] ,
    writers: ["Jarad Higgins"],
    lengthSec: 181,
    tags: ["anthem","hype"],
    cover: "https://i.scdn.co/image/ab67616d0000b273c6b9c7c0788d7a5c57d59c09",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/3gqV5HcTZXGmWlmZBkPdgV" }],
    description: "Up-tempo banger popularized through snippets and leaks.",
  },
  {
    id: "burn",
    title: "Burn",
    status: "released",
    album: "Fighting Demons",
    year: 2021,
    producers: ["Nick Mira","Rex Kudo"],
    writers: ["Jarad Higgins"],
    lengthSec: 204,
    tags: ["posthumous","anthem"],
    cover: "",
    links: [],
    description: "Album opener with soaring melodies.",
  },
  {
    id: "girl-of-my-dreams",
    title: "Girl Of My Dreams (with Suga)",
    status: "released",
    album: "Fighting Demons",
    year: 2021,
    producers: ["Rami"],
    writers: ["Jarad Higgins"],
    lengthSec: 171,
    tags: ["collab","pop rap"],
    cover: "",
    links: [],
    description: "Pop-leaning collaboration from Fighting Demons.",
  },
  {
    id: "up-up-and-away",
    title: "Up Up and Away",
    status: "released",
    album: "Legends Never Die",
    year: 2020,
    producers: ["Nick Mira","Rex Kudo"],
    writers: ["Jarad Higgins"],
    lengthSec: 162,
    tags: ["uplifting","anthem"],
    cover: "https://i.scdn.co/image/ab67616d0000b2737d8c2ffcf98101efb5da0c16",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/1yKu2MhpwzDXXH2tzG6xoa" }],
    description: "Energetic closer with soaring melodies.",
  },
  {
    id: "moonlight",
    title: "Moonlight",
    status: "unreleased",
    album: "N/A",
    year: 2019,
    producers: ["Nick Mira"],
    writers: ["Jarad Higgins"],
    lengthSec: 196,
    tags: ["unreleased","melodic"],
    cover: "",
    links: [],
    description: "Unreleased track known from snippets and leaks in the community.",
  },
  {
    id: "righteous",
    title: "Righteous",
    status: "released",
    album: "Single",
    year: 2020,
    producers: ["Nick Mira","Rex Kudo","TM88"],
    writers: ["Jarad Higgins"],
    lengthSec: 258,
    tags: ["posthumous","single","anthemic"],
    cover: "https://i.scdn.co/image/ab67616d0000b273066d1b0ca1933e6566981df4",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/6wWaVoUOzLQJTIU21WQ9rT" }],
    description: "First posthumous single; reflective and soaring.",
  },
  {
    id: "hide",
    title: "Hide (with Seezyn)",
    status: "released",
    album: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    producers: ["Danny Wolf"],
    writers: ["Jarad Higgins"],
    lengthSec: 181,
    tags: ["soundtrack","melodic"],
    cover: "https://i.scdn.co/image/ab67616d0000b273a3f8cc1f6f2f3b1b14cf5761",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/1c8gk2PeTE04A1pIDH9YMk" }],
    description: "Soundtrack cut with dreamy production.",
  },
  {
    id: "bandit",
    title: "Bandit (with YoungBoy Never Broke Again)",
    status: "released",
    album: "Single",
    year: 2019,
    producers: ["Nessian","Brick"],
    writers: ["Jarad Higgins"],
    lengthSec: 232,
    tags: ["collab","anthem"],
    cover: "https://i.scdn.co/image/ab67616d0000b2735ecf9e09fe67d2fcb02d5cec",
    links: [{ label: "Spotify", url: "https://open.spotify.com/track/62vpWI1CHwFy7tMIcSStl8" }],
    description: "Hit single with NBA YoungBoy.",
  },
  {
    id: "robbery",
    title: "Robbery",
    status: "released",
    album: "Death Race For Love",
    year: 2019,
    producers: ["Nick Mira"],
    writers: ["Jarad Higgins"],
    lengthSec: 270,
    tags: ["anthem","melodic"],
    cover: "",
    links: [],
    description: "Lead single to DRFL.",
  },
  {
    id: "hear-me-calling",
    title: "Hear Me Calling",
    status: "released",
    album: "Death Race For Love",
    year: 2019,
    producers: ["Purps"],
    writers: ["Jarad Higgins"],
    lengthSec: 189,
    tags: ["melodic","anthem"],
    cover: "",
    links: [],
    description: "Dancehall-tinged single from DRFL.",
  },
  {
    id: "fine-china",
    title: "Fine China (with Future)",
    status: "released",
    album: "Future & Juice WRLD Present... WRLD ON DRUGS",
    year: 2018,
    producers: ["Wheezy"],
    writers: ["Jarad Higgins"],
    lengthSec: 190,
    tags: ["collab","anthem"],
    cover: "",
    links: [],
    description: "Big single from the collaborative tape.",
  },
  {
    id: "jet-lag",
    title: "Jet Lag (with Young Scooter)",
    status: "released",
    album: "Future & Juice WRLD Present... WRLD ON DRUGS",
    year: 2018,
    producers: ["Danny Wolf"],
    writers: ["Jarad Higgins"],
    lengthSec: 194,
    tags: ["collab"],
    cover: "",
    links: [],
    description: "Fan-favorite from the collab project.",
  },
];

const els = {
  search: document.getElementById('search'),
  statusFilter: document.getElementById('statusFilter'),
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
  // import UI removed per request
};

function secondsToTime(s){
  const m = Math.floor(s/60), r = s % 60; return `${m}:${String(r).padStart(2,'0')}`;
}

function unique(values){ return [...new Set(values)]; }

function populateFilters(){ /* filters simplified */ }

function renderStats(filtered){
  const total = SONGS.length;
  const rel = filtered.filter(s=>s.status==='released').length;
  const unrel = filtered.filter(s=>s.status==='unreleased').length;
  els.stats.innerHTML = `Showing <strong>${filtered.length}</strong> of ${total} • Released: ${rel} • Unreleased: ${unrel}`;
}

function renderChips(){
  const chips = [];
  if(els.search.value){ chips.push({label:`Search: ${els.search.value}`, key:'search'}) }
  if(els.statusFilter.value!=='all'){ chips.push({label:`Status: ${els.statusFilter.value}`, key:'status'}) }
  els.chips.innerHTML = chips.map(c=>`<button class="chip" data-key="${c.key}">${c.label} ✕</button>`).join('');
  els.chips.querySelectorAll('button').forEach(btn=>btn.addEventListener('click', ()=>{
    const k = btn.dataset.key;
    if(k==='search') els.search.value='';
    if(k==='status') els.statusFilter.value='all';
    update();
  }));
}

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

function filterSongs(){
  const q = els.search.value.toLowerCase().trim();
  const status = els.statusFilter.value;
  return SONGS.filter(s=>{
    const matchQ = !q || [s.title, s.album, s.producers?.join(' '), s.tags?.join(' ')]
      .filter(Boolean).join(' ').toLowerCase().includes(q);
    const matchStatus = status==='all' || s.status===status;
    return matchQ && matchStatus;
  });
}

function render(){
  if(state.view==='songs'){
    els.albumSort.hidden = true; els.statusFilter.hidden = false;
    const filtered = filterSongs();
    renderStats(filtered);
    renderChips();
    els.grid.innerHTML = filtered.map(cardHtml).join('');
    bindCardEvents();
  }else{
    els.albumSort.hidden = false; els.statusFilter.hidden = true;
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
  populateFilters();
  render();
  [els.search, els.statusFilter].forEach(el=>{
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  els.albumSort.addEventListener('change', ()=> state.view==='albums' && render());
  const close = document.querySelector('.modal .close');
  close?.addEventListener('click', ()=> els.modal.close());
  els.modal.addEventListener('click', (e)=>{ if(e.target === els.modal) els.modal.close(); });
  const aclose = document.querySelector('#albumModal .close');
  aclose?.addEventListener('click', ()=> els.albumModal.close());
  els.albumModal.addEventListener('click', (e)=>{ if(e.target === els.albumModal) els.albumModal.close(); });
  els.tabSongs.addEventListener('click', ()=> setTab('songs'));
  els.tabAlbums.addEventListener('click', ()=> setTab('albums'));
  // Preload artwork
  refreshArtworkForAll().then(()=>{ if(state.view==='songs') render(); });
}

// --- CSV & Import ---
function parseCsv(text){
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(',').map(h=>h.trim().toLowerCase());
  const out = [];
  for(let i=1;i<lines.length;i++){
    const cols = smartSplitCsv(lines[i]);
    const row = {};
    header.forEach((h,idx)=> row[h] = (cols[idx]||'').trim());
    out.push(row);
  }
  return out;
}

function smartSplitCsv(line){
  const result = []; let cur = ''; let inQ=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){ inQ=!inQ; continue; }
    if(c===',' && !inQ){ result.push(cur); cur=''; continue; }
    cur+=c;
  }
  result.push(cur);
  return result;
}

async function fetchCsv(url){
  if(!url) return '';
  // If Google Sheets view link is pasted, convert to CSV export
  if(url.includes('docs.google.com') && !url.includes('export?format=csv')){
    const base = url.split('/edit')[0];
    url = `${base}/export?format=csv`;
  }
  const res = await fetch(url); return await res.text();
}

function mergeImported(rows){
  // Expected columns: title,album,year,status,lengthSec,producers,writers,tags,spotify_url
  for(const r of rows){
    const id = (r.id || `${(r.title||'').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`);
    if(!r.title) continue;
    const existing = SONGS.find(s=>s.id===id || s.title.toLowerCase()===r.title.toLowerCase());
    const base = {
      id,
      title: r.title,
      status: r.status?.toLowerCase()||'released',
      album: r.album||'Single',
      year: Number(r.year)||undefined,
      lengthSec: Number(r.lengthsec)||Number(r.length)||undefined,
      producers: splitSemi(r.producers),
      writers: splitSemi(r.writers),
      tags: splitSemi(r.tags),
      cover: '',
      links: r.spotify_url ? [{label:'Spotify', url:r.spotify_url}] : [],
      description: r.description||'',
    };
    if(existing){ Object.assign(existing, base); }
    else SONGS.push(base);
  }
}

function splitSemi(s){
  if(!s) return [];
  return String(s).split(/;|\|/).map(x=>x.trim()).filter(Boolean);
}

function cacheImported(rows){ localStorage.setItem('jw_import', JSON.stringify(rows)); }
function restoreImported(){
  try{
    const raw = localStorage.getItem('jw_import'); if(!raw) return;
    const rows = JSON.parse(raw); mergeImported(rows);
  }catch{}
}

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


document.addEventListener('DOMContentLoaded', init);


