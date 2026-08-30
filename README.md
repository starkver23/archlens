# ArchLens

Official landing page for ArchLens.

## Local development

```bash
npm install
npm run dev
```

## Netlify deployment

This project is a standard Vite React app and includes `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_WAITLIST_API_URL`

Set `VITE_WAITLIST_API_URL` in Netlify to the deployed Google Apps Script Web App endpoint used by the waitlist form.
