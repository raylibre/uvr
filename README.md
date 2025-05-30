# Mason Construction Website

A modern Vue.js website for a construction company, featuring a responsive design, modern UI components, and interactive features.

## Features

- Modern, responsive design with Tailwind CSS
- Component-based architecture using Vue.js 3 and TypeScript
- Interactive project showcase
- Contact form with validation
- Smooth scrolling navigation
- Mobile-friendly layout

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd mason-construction
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Add required images:
Place your project images in the `public/images` directory:
- hero-1.jpg
- hero-2.jpg
- hero-3.jpg
- project-1.jpg
- project-2.jpg
- project-3.jpg

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
├── public/
│   └── images/          # Static images
├── src/
│   ├── assets/         # Global styles and assets
│   ├── components/     # Vue components
│   │   ├── atoms/     # Basic UI components
│   │   ├── molecules/ # Composite components
│   │   └── pages/     # Page components
│   ├── router/        # Vue Router configuration
│   └── main.ts        # Application entry point
```

## Development

### Component Structure

The project follows the Atomic Design methodology:

- **Atoms**: Basic UI components (buttons, inputs, etc.)
- **Molecules**: More complex components composed of atoms
- **Pages**: Full page components

### Styling

- Tailwind CSS for utility-first styling
- Custom theme configuration in `tailwind.config.js`
- Global styles in `src/assets/main.css`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 