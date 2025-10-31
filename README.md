# QR Code Generator

A free, customisable QR code generator built with Next.js. Create beautiful QR codes with advanced styling options, custom logos, and support for multiple data types.

## Features

### Content Types
- **URL**: Generate QR codes for websites and web pages
- **Text**: Encode any text content into a QR code
- **Email**: Create QR codes that open email clients with pre-filled recipient, subject, and message
- **Phone**: Generate QR codes for phone numbers that initiate calls

### Customisation Options
- **Colours**: Customise QR code colour and background colour
- **Dot Styles**: Choose from 6 different dot styles (square, dots, rounded, extra-rounded, classy, classy-rounded)
- **Corner Styles**: Customise corner squares and corner dots independently
- **Logo Upload**: Add a custom logo or image to the centre of your QR code
- **Logo Size**: Adjustable logo size (10% to 60% of QR code size)
- **Error Correction**: Four levels of error correction (L, M, Q, H) to ensure readability even with logos
- **Download Size**: Configurable download size from 200px to 2000px
- **Transparent Background**: Option to download QR codes with transparent backgrounds

### Design
- **Brutalist UI**: Bold, modern interface with thick borders and sharp corners
- **Real-time Preview**: See your QR code update instantly as you make changes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lukeorriss/qr
cd qr
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a QR Code

1. **Choose Content Type**: Select from URL, Text, Email, or Phone tabs
2. **Enter Content**: Fill in the required fields based on your selected type
3. **Customise Appearance**: 
   - Adjust colours using the colour pickers
   - Select dot and corner styles
   - Upload and size your logo (optional)
   - Set error correction level
4. **Preview**: Your QR code updates in real-time in the preview panel
5. **Download**: Choose to download with background or with transparent background

### Tips for Best Results

- **Logo Usage**: Use square images for best results when adding logos
- **Error Correction**: Use higher error correction levels (Q or H) when adding logos to ensure scanability
- **Download Size**: The preview automatically scales to fit the container. The download size is independent and can be set from 200px to 2000px
- **Colour Contrast**: Ensure good contrast between QR code colour and background for reliable scanning

## Tech Stack

- **Framework**: Next.js 16.0.1
- **UI Library**: Radix UI components with Shadcn UI
- **Styling**: Tailwind CSS 4
- **QR Code Generation**: qr-code-styling
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
qr/
├── app/
│   ├── globals.css          # Global styles and brutalist theme
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── qr-generator.tsx      # Main QR code generator component
│   └── ui/                    # Shadcn UI components
├── lib/
│   └── utils.ts               # Utility functions
└── public/                   # Static assets
```

## Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## How It Works

1. **Content Encoding**: Based on the selected data type, the application constructs the appropriate QR code content (URL, text, `mailto:`, or `tel:` protocol)
2. **QR Code Generation**: Uses `qr-code-styling` library to generate QR codes with customisable styling
3. **Logo Integration**: When a logo is uploaded, it's embedded in the centre of the QR code with configurable size and error correction to maintain scanability
4. **Preview Generation**: A fixed-size preview (400px) is rendered in the UI, scaled to fit the container
5. **Download Generation**: Downloads are generated at the specified size (200px-2000px) with optional transparent background

## Deployment

The easiest way to deploy this Next.js app is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with default settings

The app will be automatically deployed and available at a Vercel URL.

## License

This project is open source and available for personal and commercial use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
