# BitSave Frontend

A modern, responsive frontend for the BitSave decentralized savings platform built with Next.js 15, React 19, and shadcn/ui.

## 🚀 Features

- **Modern Design**: Clean, professional interface with glassmorphism effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Wallet Integration**: Connect with Stacks wallets (Hiro, Xverse, etc.)
- **Real-time Updates**: Live transaction status and balance updates
- **Animated UI**: Smooth animations and transitions using Framer Motion
- **Type Safety**: Full TypeScript support with strict type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: React 19 with Server Components
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **Blockchain**: Stacks.js for wallet integration
- **TypeScript**: Full type safety
- **Deployment**: Vercel (optimized configuration)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Environment Setup

Create a `.env.local` file in the frontend directory:

```env
# Optional: Analytics or monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Custom RPC endpoints
NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

2. **Configure Build Settings**:
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables** (if needed):
   - Add any environment variables in the Vercel dashboard
   - Variables starting with `NEXT_PUBLIC_` are exposed to the browser

4. **Deploy**:
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Build the application
npm run build

# The built files will be in the .next directory
# Deploy these files to your hosting provider
```

## 🎨 Design System

The frontend uses a custom design system built on top of Tailwind CSS:

### Colors
- **Primary**: Blue gradient (`from-blue-600 to-purple-600`)
- **Secondary**: Slate tones for text and backgrounds
- **Accent**: Green for success states, Red for errors

### Components
- **Glass Cards**: Glassmorphism effect with backdrop blur
- **Animated Buttons**: Hover effects and state transitions
- **Responsive Grid**: Adaptive layouts for all screen sizes

### Typography
- **Headings**: Inter font with gradient text effects
- **Body**: Optimized for readability with proper line heights
- **Code**: Monospace font for addresses and technical content

## 🔗 Smart Contract Integration

The frontend integrates with BitSave smart contracts on Stacks:

- **Main Contract**: `bitsave.clar` - Handles deposits, withdrawals, and rewards
- **Badge Contract**: `bitsave-badges.clar` - Manages NFT achievement badges
- **Network**: Stacks Testnet (configurable for mainnet)

### Key Features
- Wallet connection with multiple providers
- Real-time balance and reputation tracking
- Transaction status monitoring
- Badge collection display

## 📱 Responsive Design

The interface is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Collapsible navigation
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🎯 Performance

- **Core Web Vitals**: Optimized for excellent scores
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies
- **Bundle Size**: Minimized with tree shaking

## 🔒 Security

- **CSP Headers**: Content Security Policy implementation
- **XSS Protection**: Built-in Next.js protections
- **HTTPS Only**: Secure connections enforced
- **Wallet Security**: Non-custodial wallet integration

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Stacks.js](https://docs.stacks.co/stacks.js/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
