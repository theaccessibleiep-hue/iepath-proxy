# IEPath Navigator — Netlify Proxy

This is the secure API proxy for IEPath Navigator.
The Anthropic API key is stored as a Netlify environment variable — never in code.

## Setup steps

1. Push this folder to a GitHub repository
2. Connect repo to Netlify (netlify.com → Add new site → Import from Git)
3. In Netlify dashboard: Site configuration → Environment variables
   Add: ANTHROPIC_API_KEY = your key from console.anthropic.com
4. Deploy — Netlify gives you a URL like https://your-site.netlify.app
5. Your proxy endpoint is: https://your-site.netlify.app/.netlify/functions/claude-proxy
6. Paste that URL into the IEPath widget (replace the direct Anthropic URL)

## Your domain (Namecheap)
You can also add a custom subdomain like api.iepathnavigator.com
pointing to this Netlify site via a CNAME record in Namecheap DNS.