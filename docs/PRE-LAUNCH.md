# Pre-Launch Checklista – vihandlar.se (Next.js)

Allt som måste göras innan domänbyte från Loveable → Vercel.

---

## 1. Vercel-projekt

- [ ] Skapa nytt projekt på vercel.com (importera GitHub-repo)
- [ ] Välj Framework Preset: **Next.js**
- [ ] Root Directory: `/` (default)
- [ ] Build Command: `next build` (default)
- [ ] Output Directory: `.next` (default)

## 2. Environment Variables (Vercel Dashboard)

Gå till **Settings → Environment Variables** och lägg till:

| Variabel | Värde | Environments | Källa |
|----------|-------|-------------|-------|
| `KV_REST_API_URL` | *(sätts automatiskt)* | Alla | Koppla Vercel KV |
| `KV_REST_API_TOKEN` | *(sätts automatiskt)* | Alla | Koppla Vercel KV |
| `GOOGLE_CLOUD_API_KEY` | Din GCP API-nyckel | Production, Preview | Google Cloud Console |
| `OPENAI_API_KEY` | Din OpenAI API-nyckel | Production, Preview | OpenAI Dashboard |
| `NEXT_PUBLIC_GA_ID` | `G-96FB72HXEJ` | Production | Google Analytics |

### Steg för Vercel KV:
1. Gå till **Storage** i Vercel Dashboard
2. Klicka **Create Database** → **KV**
3. Välj namn (t.ex. `vihandlar-lists`) och region (`arn1` för Stockholm)
4. Klicka **Connect to Project** → välj ditt projekt
5. `KV_REST_API_URL` och `KV_REST_API_TOKEN` sätts automatiskt

### Steg för Google Cloud Vision API:
1. Gå till [Google Cloud Console](https://console.cloud.google.com)
2. Skapa projekt eller välj befintligt
3. Aktivera **Cloud Vision API** under APIs & Services
4. Skapa API-nyckel under **Credentials**
5. Begränsa nyckeln till Cloud Vision API
6. Klistra in som `GOOGLE_CLOUD_API_KEY` i Vercel

### Steg för OpenAI (Whisper):
1. Gå till [OpenAI Platform](https://platform.openai.com/api-keys)
2. Skapa ny API-nyckel
3. Klistra in som `OPENAI_API_KEY` i Vercel

### Steg för Google Analytics:
1. Befintligt GA4-konto: **G-96FB72HXEJ** (samma som originalet)
2. Lägg till som `NEXT_PUBLIC_GA_ID` → **endast Production**
3. Uppdatera GA4-propertyn med ny domän om nödvändigt

## 3. Domän-konfiguration

- [ ] I Vercel Dashboard: **Settings → Domains**
- [ ] Lägg till `vihandlar.se` och `www.vihandlar.se`
- [ ] Uppdatera DNS:
  - A-record: `76.76.21.21` (Vercel)
  - CNAME `www`: `cname.vercel-dns.com`
- [ ] Verifiera SSL-certifikat aktiveras automatiskt
- [ ] Kontrollera att `www` → `vihandlar.se` redirect fungerar

## 4. SEO & Redirects

- [ ] Verifiera att alla 301-redirects i `next.config.ts` fungerar
- [ ] Testa: `/shopping` → `/handla`
- [ ] Testa: `/e-amnen/scanner` → `/skanner`
- [ ] Testa: `/list/:token` → `/inkopslista/dela/:token`
- [ ] Testa: `/integritetspolicy` → `/integritet`
- [ ] Verifiera `robots.txt` → `https://vihandlar.se/robots.txt`
- [ ] Verifiera `sitemap.xml` → `https://vihandlar.se/sitemap.xml`
- [ ] Skicka in ny sitemap till Google Search Console
- [ ] Skicka in ny sitemap till Bing Webmaster Tools

## 5. Funktionstest (Production)

- [ ] Startsidan laddar korrekt
- [ ] Inköpslista: skapa → dela → realtidssynk
- [ ] E-ämnesscanner: ladda upp bild → resultat
- [ ] Röstinmatning: spela in → text → items
- [ ] Produktsök fungerar
- [ ] E-ämnen sök och detaljsidor
- [ ] Livsmedel sök och detaljsidor
- [ ] 404-sida visas för felaktiga URL:er
- [ ] Alla navigeringslänkar fungerar (header + footer)
- [ ] Mobilvy fungerar korrekt

## 6. Performance

- [ ] Kör Lighthouse audit (mål: 90+ alla kategorier)
- [ ] Verifiera att bilder använder next/image (redan gjort)
- [ ] Verifiera Core Web Vitals i Search Console efter deploy
- [ ] Kontrollera att ISR fungerar (produkt- och kategorisidor)

## 7. Backup & Rollback

- [ ] Behåll Loveable-projektet aktivt i minst 2 veckor efter bytet
- [ ] Dokumentera Loveable Supabase-uppgifter om data behöver exporteras igen
- [ ] Ha en rollback-plan: DNS kan snabbt pekas tillbaka till Loveable

## 8. Efter lansering

- [ ] Övervaka felloggar i Vercel Dashboard (Functions → Logs)
- [ ] Kontrollera Google Analytics-data flödar
- [ ] Verifiera att Google Search Console inte rapporterar 404-fel
- [ ] Kör Coverage-rapport i Search Console efter 1 vecka
- [ ] Ta bort gammal `data/e_additives_rows.csv` om den finns
- [ ] Överväg att aktivera Vercel Speed Insights

---

## Tidsuppskattning

| Steg | Tid |
|------|-----|
| Vercel-setup + env vars | 15 min |
| DNS-ändring | 5 min (propagering kan ta 1-48h) |
| Funktionstester | 15 min |
| Search Console-uppdatering | 10 min |
| **Totalt** | **~45 min + DNS-propagering** |
