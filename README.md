# Juice WRLD Tracker (Dark, Sleek, Rounded)

A lightweight, dark-themed web app that tracks Juice WRLD songs and albums with a sleek rounded UI, artwork-first cards, and clean info modals.

## Preview

- Songs/Albums toggle with album sorting
- Artwork-driven cards with quick info and per-track details modal
- Zero local data: fetches from public APIs at runtime

## Tech Stack

- HTML/CSS/Vanilla JS (no build step)
- Data source: iTunes Search API (public, no auth)
- Artwork fallback: iTunes art high-res; optional Spotify oEmbed lookup when links exist

## Getting Started

1. Open `index.html` in a modern browser
2. The app auto-fetches Juice WRLD albums and songs from iTunes and renders

No server, no keys, no build required.

## Project Structure

- `index.html` – markup and modals
- `styles.css` – dark, rounded, glassy UI
- `app.js` – data fetch, render logic, and modals

## Data Sources and Mapping

- iTunes Search API
  - Artist lookup: `https://itunes.apple.com/search?term=Juice%20WRLD&entity=musicArtist&limit=5`
  - Artist content: `https://itunes.apple.com/lookup?id=<artistId>&entity=album|song&limit=200`
- Albums mapped from `collectionName`, cover upgraded to 512px
- Tracks mapped from `trackName`, `trackTimeMillis`, `releaseDate`

## Why some songs/albums/playlists may be missing

- iTunes Search limit caps results; not all regional/legacy/mixtape entries are returned in a single call
- Playlists aren’t fully exposed via iTunes Search API
- Some collaborations, leaks, mixtapes, and alternate versions are not on Apple Music
- Artist aliases and metadata variations can cause misses (e.g., different casing or featuring credits)

## Roadmap (optional enhancements)

- Add Discogs as secondary source (public API with token) for mixtapes, drafts, alternate pressings
- Add Spotify Web API (requires OAuth) for canonical links/covers and better availability
- Add MusicBrainz release-group enrichment (covers via Cover Art Archive) for completeness
- Allow user-provided CSV/Google Sheet as supplemental data
- Persistent cache and periodic background refresh

## Contributing

PRs welcome for:
- Additional public sources (Discogs, MusicBrainz, Deezer) integrations
- Better deduping and album grouping (by collectionId)
- Accessibility and performance improvements

## License

MIT

