BRIJESH BIRTHDAY WEBSITE — NETLIFY VERSION 🎂

Website: Happy Birthday Brijesh! — 31 October 2026
Features:
- Birthday popup
- Visitor name form
- Party Yes/No buttons
- Netlify Function saves responses in Netlify Blobs
- Optional JSON endpoint for viewing records (secure it before public use)

DEPLOY KARNE KA TARIKA:
1. ZIP ko extract karo.
2. Netlify account par login karo: https://app.netlify.com/
3. Recommended: folder ko GitHub repository mein upload karo, phir Netlify mein "Add new site" > "Import an existing project" se connect karo.
4. Netlify build settings mein publish directory "." aur functions directory "netlify/functions" honi chahiye. netlify.toml ye settings define karta hai.
5. Deploy ke baad ek test response submit karo. Netlify site par Blobs storage available/enabled hona chahiye.

IMPORTANT:
- Static drag-and-drop deploy may not reliably install/build the function dependency. Git-based deploy with package.json is recommended.
- Response endpoint: /.netlify/functions/responses returns the records as JSON. This endpoint is PUBLIC in this starter and has no authentication. Do not share/leave it public if responses should be private; add authentication before real use.
- Visitors should be told their names and party choices are saved.
- This does NOT send WhatsApp messages automatically. WhatsApp notifications require separate official WhatsApp Business Cloud API setup.
- Netlify site is public once deployed. Do not include private tokens or personal secrets in the project.
