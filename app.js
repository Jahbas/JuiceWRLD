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
];

const els = {
  search: document.getElementById('search'),
  statusFilter: document.getElementById('statusFilter'),
  albumFilter: document.getElementById('albumFilter'),
  yearFilter: document.getElementById('yearFilter'),
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
};

function secondsToTime(s){
  const m = Math.floor(s/60), r = s % 60; return `${m}:${String(r).padStart(2,'0')}`;
}

function unique(values){ return [...new Set(values)]; }

function populateFilters(){
  const albums = unique(SONGS.map(s=>s.album).filter(Boolean)).sort();
  const years = unique(SONGS.map(s=>s.year).filter(Boolean)).sort((a,b)=>b-a);
  for(const a of albums){
    const opt = document.createElement('option'); opt.value = a; opt.textContent = a; els.albumFilter.appendChild(opt);
  }
  for(const y of years){
    const opt = document.createElement('option'); opt.value = String(y); opt.textContent = String(y); els.yearFilter.appendChild(opt);
  }
}

function renderStats(filtered){
  const total = SONGS.length;
  const rel = filtered.filter(s=>s.status==='released').length;
  const unrel = filtered.filter(s=>s.status==='unreleased').length;
  const years = unique(filtered.map(s=>s.year)).length;
  els.stats.innerHTML = `Showing <strong>${filtered.length}</strong> of ${total} • Released: ${rel} • Unreleased: ${unrel} • Years: ${years}`;
}

function renderChips(){
  const chips = [];
  if(els.search.value){ chips.push({label:`Search: ${els.search.value}`, key:'search'}) }
  if(els.statusFilter.value!=='all'){ chips.push({label:`Status: ${els.statusFilter.value}`, key:'status'}) }
  if(els.albumFilter.value!=='all'){ chips.push({label:`Album: ${els.albumFilter.value}`, key:'album'}) }
  if(els.yearFilter.value!=='all'){ chips.push({label:`Year: ${els.yearFilter.value}`, key:'year'}) }
  els.chips.innerHTML = chips.map(c=>`<button class="chip" data-key="${c.key}">${c.label} ✕</button>`).join('');
  els.chips.querySelectorAll('button').forEach(btn=>btn.addEventListener('click', ()=>{
    const k = btn.dataset.key;
    if(k==='search') els.search.value='';
    if(k==='status') els.statusFilter.value='all';
    if(k==='album') els.albumFilter.value='all';
    if(k==='year') els.yearFilter.value='all';
    update();
  }));
}

function cardHtml(song){
  const badgeColor = song.status==='released' ? 'var(--ok)' : song.status==='leaked' ? 'var(--warn)' : 'var(--danger)';
  return `
  <article class="card" data-id="${song.id}">
    <div class="thumb">
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
  const album = els.albumFilter.value;
  const year = els.yearFilter.value;
  return SONGS.filter(s=>{
    const matchQ = !q || [s.title, s.album, s.producers?.join(' '), s.tags?.join(' ')]
      .filter(Boolean).join(' ').toLowerCase().includes(q);
    const matchStatus = status==='all' || s.status===status;
    const matchAlbum = album==='all' || s.album===album;
    const matchYear = year==='all' || String(s.year)===year;
    return matchQ && matchStatus && matchAlbum && matchYear;
  });
}

function render(){
  const filtered = filterSongs();
  renderStats(filtered);
  renderChips();
  els.grid.innerHTML = filtered.map(cardHtml).join('');
  bindCardEvents();
}

function update(){ render(); }

function init(){
  populateFilters();
  render();
  [els.search, els.statusFilter, els.albumFilter, els.yearFilter].forEach(el=>{
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  const close = document.querySelector('.modal .close');
  close?.addEventListener('click', ()=> els.modal.close());
  els.modal.addEventListener('click', (e)=>{ if(e.target === els.modal) els.modal.close(); });
}

document.addEventListener('DOMContentLoaded', init);


