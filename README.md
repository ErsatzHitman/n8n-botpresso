# SEO Metadata Agent Frontend

A React-based frontend for the n8n SEO Metadata Agent. This application allows users to input a URL and keyword, then displays the original webpage metadata alongside three AI-generated variations (Urgency, Benefits, Social Proof) with SEO compliance validation.

## Features

- **URL Input Form**: Input webpage URL and keyword with client-side validation
- **Side-by-Side Display**: Compare original metadata with AI-generated variations
- **SEO Compliance Indicators**: Visual indicators (green/red borders) showing if variations meet character limits
- **Copy to Clipboard**: Single button to copy both title and description for each variation
- **Loading States**: Full-screen loading overlay during API requests
- **Error Handling**: User-friendly error messages for failed requests
- **Responsive Design**: Optimized for mobile (stacked) and desktop (2-column) layouts

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Fast build tool and dev server
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **JavaScript clipboard API** - Copy functionality

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- n8n instance with SEO Metadata Agent workflow

### Installation

1. Clone the repository and navigate to the project:

```bash
cd n8n-botpresso
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set `N8N_URL` if your n8n instance isn't on the default port 5678.

### Dev Server Proxy (CORS)

During development, Vite's built-in proxy forwards all `/webhook` requests to your n8n instance. Because the browser sends these as same-origin requests to `http://localhost:5173`, no CORS preflight (OPTIONS) is triggered — **no special n8n configuration is required**.

The proxy target defaults to `http://localhost:5678`. To use a different address, set `N8N_URL` in `.env.local`:

```env
N8N_URL=http://my-n8n-host:5678
```

> **Note for production**: The Vite proxy is a dev-only feature. For production deployments, either configure your web server (nginx, Caddy, etc.) to reverse-proxy `/webhook` requests to n8n, or set `VITE_API_URL` to the full n8n URL and configure CORS on n8n directly.

## Development

### Start Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
src/
├── types/
│   └── api.ts                 # TypeScript interfaces for API responses
├── App.tsx                    # Main component with state and layout
├── InputForm.tsx              # URL and keyword input form
├── CurrentMetadata.tsx        # Display original webpage metadata
├── VariationCard.tsx          # Display AI-generated variation with status
├── main.tsx                   # React entry point
└── index.css                  # Global styles
```

## API Integration

### Endpoint

The webhook path is controlled by `VITE_WEBHOOK_PATH` in `.env.local`:

| n8n workflow state | Path |
|---|---|
| **Activated** (production toggle ON) | `/webhook/seo-metadata-agent` |
| **Test/listen mode** (not activated) | `/webhook-test/seo-metadata-agent` |

- **Dev URL** (via Vite proxy): `VITE_WEBHOOK_PATH` → proxied to `http://localhost:5678${VITE_WEBHOOK_PATH}`
- **Production URL**: configured via `VITE_API_URL` environment variable
- **Method**: POST
- **Headers**: Content-Type: application/json

### Request Format

```json
{
  "url": "https://example.com/product",
  "keyword": "search term"
}
```

### Response Format

```json
[{
  "success": true,
  "data": {
    "url": "https://example.com/product",
    "keyword": "search term",
    "analysis": {
      "current": {
        "title": "Original Title",
        "titleLength": 50,
        "description": "Original description text...",
        "descriptionLength": 160
      }
    },
    "optimizedVariations": [
      {
        "title": "Urgency-based title (56 chars)",
        "titleLength": 56,
        "description": "Description with urgency elements...",
        "descriptionLength": 157,
        "strategy": "urgency",
        "meetsRequirements": {
          "titleLength": true,
          "descriptionLength": true
        }
      },
      // ... more variations
    ]
  }
}]
```

## Component Details

### InputForm
- Accepts webpage URL and keyword input
- Validates URL format (must start with http:// or https://)
- Submit button disabled until valid URL and keyword provided
- Shows validation feedback to user

### CurrentMetadata
- Displays original title and description from the webpage
- Shows character counts for reference
- Read-only (no editing or copying)

### VariationCard
- Displays strategy type (URGENCY, BENEFITS, SOCIAL PROOF)
- Shows title and description with character counts
- **Green border**: Both title and description meet SEO requirements
- **Red border**: One or both doesn't meet requirements
- **Copy button**: Copies both title and description in the format:
  ```
  Title: [title text]
  Description: [description text]
  ```
- Shows "Copied!" feedback for 2 seconds after copy

## SEO Guidelines

The application enforces these SEO best practices:

- **Title Length**: 50-60 characters (optimal)
- **Description Length**: 150-160 characters (optimal)

Character limits are validated by the backend. The frontend uses the `meetsRequirements` flags for visual indicators.

## Troubleshooting

### CORS Error
```
Access to XMLHttpRequest at 'http://localhost:5678/webhook/seo-metadata-agent'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

This should not occur during development — the Vite proxy routes requests as same-origin.

**Solution (development)**: Verify `npm run dev` is running and that `N8N_URL` in `.env.local` points to your n8n instance.

**Solution (production)**: Configure your reverse proxy to forward `/webhook` requests to n8n, or set `VITE_API_URL` to the full n8n URL and configure CORS on n8n directly.

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5678
```

**Solution**: Verify n8n is running at `http://localhost:5678`

### Invalid URL Error
Make sure the URL starts with `http://` or `https://`

## Performance

- **Bundle Size**: ~150KB (gzipped) with MUI and Axios
- **Load Time**: <2s on standard 3G connection
- **API Response**: Typical 3-5 seconds (includes scraping and AI generation)

## Accessibility

- WCAG 2.1 AA compliant components
- Keyboard navigation support
- ARIA labels for screen readers
- Sufficient color contrast ratios
- Focus management in forms

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- Local storage for search history
- Theme switching (light/dark mode)
- Batch processing multiple URLs
- Export results as CSV/JSON
- SEO analytics dashboard

## License

See LICENSE file for details

## Support

For issues or questions, please create an issue in the repository.
