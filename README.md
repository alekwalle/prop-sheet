## Teknologi
- React + TypeScript + Vite
- Tailwind CSS
- localStorage for lagring av scenarioer
- 100 % statisk app (ingen server)

## Komme i gang
```bash
npm install
npm run dev
```
Åpne `http://localhost:5173`.

## Bygg for produksjon
```bash
npm run build
npm run preview   # lokal test av prod-bundle
```

## Deploy gratis (f.eks. Cloudflare Pages)
1. Push repo til GitHub.
2. I Cloudflare Pages: “Create project” → “Connect to Git” → velg repo.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment: `NODE_VERSION=20`
6. Deploy. Ingen ekstra tjenester trengs.

Alternativer: Netlify / Vercel (gratis statisk tier) med samme build og output.

## Deploy til GitHub Pages
1. `npm install && npm run build`
2. Commit `dist` eller bruk GitHub Actions:
   - Legg til workflow som kjører `npm ci`, `npm run build`, og publiserer `dist` til `gh-pages` branch (f.eks. med `peaceiris/actions-gh-pages`).
   - Sett Pages-source til `gh-pages`-branch (root).
3. URL blir `https://<bruker>.github.io/<repo>/`.
Tips: Sett `base` i `vite.config.ts` dersom repo-navnet ikke er rot: `export default defineConfig({ base: '/<repo>/', ... })`.

## Funksjoner (fase 3)
- Opprett, dupliser, gi nytt navn til og slett scenarioer
- Autosave til localStorage, valgt scenario bevares over refresh
- Norsk UI, lys/mørk modus
- Live beregning av kontantstrøm, yield, investering-score
- Stress-test panel (rente opp, leie ned, ledighet opp, vedlikehold opp)
- Mobil- og desktop-tilpasset visning, separate prognose-kort på mobil
- Enkle grafer for kontantstrøm og egenkapital

## Struktur
- `src/types` – domene-typer
- `src/lib/calculations` – rent logikk, rammeverksfri
- `src/lib/formatting` – formateringshjelpere
- `src/lib/validation` – validering av scenarioer
- `src/data` – eksempel-scenarier
- `src/hooks` – scenario-lagring m/localStorage, kalkulasjon
- `src/components` – UI (skjemaer, kort, tabeller, grafer, stress-test)

## Fremtidige forbedringer
- Autentisering for sikker tilgang
- Skylagring / sync av scenarioer
- CSV-eksport
- PDF-eksport
- Delbare scenario-lenker
- Flernivå språkstøtte
