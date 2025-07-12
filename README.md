# Initials Image Generator

A modern Next.js application that generates custom initials images with a beautiful web interface and REST API.

## Features

- 🎨 **Beautiful Web Interface**: Clean, responsive design with real-time preview
- 🚀 **Fast Generation**: Server-side image generation using HTML5 Canvas
- 🎯 **Customizable**: Control dimensions, colors, and text
- 🔗 **REST API**: Public endpoint for programmatic access
- 📱 **Responsive**: Works perfectly on all devices
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎪 **TypeScript**: Full type safety and excellent developer experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd initials-image-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Web Interface

1. Navigate to `/app` to access the image generator
2. Enter a full name (e.g., "John Doe")
3. Customize dimensions (100-1000px)
4. Choose text and background colors
5. Preview and download your image

### API Endpoint

Generate images programmatically using the REST API:

```
GET /api/image?name=John+Doe&width=300&height=300&color=%23FF0000&bcolor=%230000FF
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `name` | string | Yes | - | Full name to extract initials from |
| `width` | number | No | 200 | Image width (100-1000px) |
| `height` | number | No | 200 | Image height (100-1000px) |
| `color` | string | No | #000000 | Text color (hex format) |
| `bcolor` | string | No | #FFFFFF | Background color (hex format) |

#### Examples

**Basic Usage:**
```
/api/image?name=Jane+Smith
```

**Custom Dimensions:**
```
/api/image?name=Bob+Johnson&width=400&height=400
```

**Custom Colors:**
```
/api/image?name=Alice+Brown&color=%23FFFFFF&bcolor=%23FF5733
```

#### Response

- **Success (200)**: Returns PNG image
- **Error (400)**: Invalid parameters
- **Error (500)**: Server error

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── app/page.tsx       # Image generator interface
│   └── api/image/route.ts # API endpoint
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── validation.ts     # Input validation
│   ├── imageGenerator.ts # Canvas image generation
│   └── utils.ts          # Common utilities
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared interfaces
└── README.md
```

## Development

### Code Quality

The project includes ESLint and Prettier for code quality:

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

### Testing

```bash
npm test
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## API Rate Limiting

For production use, consider implementing rate limiting on the `/api/image` endpoint to prevent abuse.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.