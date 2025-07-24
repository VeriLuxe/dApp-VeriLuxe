# dApp-VeriLuxe 🌟

**dApp-VeriLuxe** is a decentralized application (dApp) for luxury fashion authentication built on the Stellar blockchain. This frontend-only dApp provides a modern interface for interacting with Stellar Soroban smart contracts to verify, issue, and manage authenticity certificates for luxury fashion items.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

## 🎯 Key Features

- **🔐 Certificate Verification**: Verify authenticity of luxury fashion items using blockchain certificates
- **👛 Stellar Wallet Integration**: Seamless connection with Freighter and other Stellar wallets
- **🎨 Modern UI/UX**: Clean, responsive interface built with Next.js 15 and Tailwind CSS 4
- **📱 Mobile-First Design**: Optimized for all device sizes
- **🔄 Certificate Management**: Issue, transfer, and revoke authenticity certificates
- **👨‍💼 Admin Dashboard**: Administrative tools for contract management
- **⚡ Real-time Updates**: Live transaction status and error handling

## 🏗️ Project Structure

```
dApp-VeriLuxe/
├── frontend/                    # Next.js 15 Frontend Application
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   │   ├── page.tsx        # Main application entry
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── globals.css     # Global styles
│   │   ├── components/         # React Components
│   │   │   ├── modules/        # Feature modules
│   │   │   │   ├── dapp/       # dApp interface components
│   │   │   │   └── landing/    # Landing page components
│   │   │   └── ui/             # Reusable UI components
│   │   ├── contexts/           # React Context providers
│   │   │   └── WalletContext.tsx # Stellar wallet management
│   │   └── lib/                # Utilities and configurations
│   │       ├── contract-config.ts
│   │       ├── fashion-auth-contract.ts
│   │       └── utils.ts
│   ├── public/                 # Static assets
│   ├── package.json           # Dependencies and scripts
│   └── next.config.ts         # Next.js configuration
├── .github/                   # GitHub workflows and templates
├── LICENSE                    # MIT License
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Stellar Wallet** (Freighter recommended)
- **Git** for cloning the repository

### 1. Clone Repository

```bash
git clone https://github.com/your-username/dApp-VeriLuxe.git
cd dApp-VeriLuxe
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Configure Environment

```bash
# Copy environment template (if available)
cp .env.example .env.local
# Configure your Stellar network settings
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Connect Your Wallet

1. Install [Freighter Wallet](https://freighter.app/) browser extension
2. Create or import your Stellar account
3. Switch to Testnet for development
4. Connect your wallet through the dApp interface

## 🛠️ Technology Stack

### Core Technologies
- **Next.js 15.4.2** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Static type checking
- **Tailwind CSS 4** - Utility-first CSS framework

### Stellar Integration
- **@stellar/stellar-sdk 13.3.0** - Stellar blockchain interaction
- **Stellar Soroban** - Smart contract platform
- **Freighter Wallet** - Primary wallet integration

### UI Components & Icons
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variant management
- **Lucide React** - Modern icon library
- **Tailwind Merge** - Utility class merging

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **tw-animate-css** - Extended Tailwind animations

## 📋 dApp Features

### 🔍 Certificate Verification
- **Verify Authenticity**: Check luxury item certificates using certificate ID and metadata hash
- **Real-time Validation**: Instant blockchain verification with visual feedback
- **Certificate Details**: View complete certificate information and ownership history

### 🎫 Certificate Management  
- **Issue Certificates**: Create new authenticity certificates (Admin only)
- **Transfer Ownership**: Securely transfer certificates between Stellar addresses
- **Revoke Certificates**: Invalidate certificates when necessary (Admin only)
- **Certificate Listing**: View all issued certificates with current status

### 👛 Wallet Integration
- **Multi-wallet Support**: Compatible with Freighter and other Stellar wallets
- **Secure Connections**: Cryptographic signature-based authentication
- **Network Selection**: Support for Testnet and Mainnet environments
- **Transaction Management**: Real-time transaction status and error handling

### 🛡️ Admin Features
- **Contract Initialization**: Set up and configure smart contract admin
- **Admin Dashboard**: Overview of system statistics and certificate metrics
- **Privilege Management**: Secure admin-only operations with proper authorization
- **Contract Administration**: Complete smart contract management interface

## 🧪 Development & Testing

### Frontend Development
```bash
cd frontend

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Code Quality
- **ESLint Configuration**: Comprehensive linting rules for React and TypeScript
- **TypeScript Strict Mode**: Full type safety with strict configuration
- **Component Architecture**: Modular component structure with clear separation

## 🌐 Network Configuration

The dApp supports both Stellar Testnet and Mainnet. Configure through environment variables:

### Testnet (Recommended for Development)
```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
```

### Mainnet (Production)
```env
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_NETWORK_PASSPHRASE=Public Global Stellar Network ; September 2015
NEXT_PUBLIC_RPC_URL=https://mainnet.sorobanrpc.com
```

> **Note**: You'll need to deploy or connect to existing Soroban smart contracts for full functionality.

## 📚 Component Architecture

### Main Components
- **`FashionAuthDApp`** - Main dApp interface with tabbed navigation
- **`LandingPage`** - Welcome screen and dApp entry point
- **`WalletConnect`** - Stellar wallet connection component
- **`AdminPanel`** - Administrative dashboard and controls

### Feature Modules
- **`VerifyForm`** - Certificate verification interface
- **`IssueForm`** - Certificate issuance (admin only)
- **`TransferForm`** - Ownership transfer functionality
- **`RevokeForm`** - Certificate revocation (admin only)
- **`CertificatesList`** - Display all certificates

### Context & Hooks
- **`WalletContext`** - Global wallet state management
- **`useFashionAuth`** - Custom hook for contract interactions

## 🔒 Security Features

- 🔐 **Client-Side Only**: No server-side private key storage
- 🛡️ **Wallet Integration**: Secure authentication through Stellar wallets
- 🔄 **Blockchain Immutability**: All certificates stored on immutable Stellar ledger
- ✅ **Input Validation**: Comprehensive form and data validation
- 🚫 **Admin Controls**: Restricted operations with proper authorization checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes in the `frontend/` directory
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow existing code patterns and component structure
- Use TypeScript for all new components
- Maintain responsive design principles
- Test wallet integration thoroughly
- Update documentation for significant changes

## 📄 Project Status

- ✅ **Frontend dApp**: Complete Next.js 15 application
- ✅ **Wallet Integration**: Freighter and Stellar wallet support
- ✅ **UI Components**: Modern, accessible component library
- ✅ **TypeScript**: Full type safety implementation
- ⚠️ **Smart Contract Integration**: Requires contract deployment
- 📱 **Mobile Optimization**: Responsive design completed

## 🔗 Useful Resources

### Stellar Development
- **[Stellar Laboratory](https://laboratory.stellar.org/)** - Stellar network testing and development tool
- **[Soroban Documentation](https://soroban.stellar.org/)** - Official Soroban smart contract documentation
- **[Stellar SDK Documentation](https://stellar.github.io/js-stellar-sdk/)** - JavaScript SDK for Stellar integration

### Wallet & Tools
- **[Freighter Wallet](https://freighter.app/)** - Recommended Stellar wallet browser extension
- **[Stellar Expert](https://stellar.expert/)** - Stellar network explorer and analytics
- **[StellarTerm](https://stellarterm.com/)** - Stellar DEX and wallet interface

### Frontend Development
- **[Next.js Documentation](https://nextjs.org/docs)** - Next.js framework documentation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

## 🐛 Troubleshooting

### Common Issues
1. **Wallet Connection Issues**: Ensure Freighter wallet is installed and unlocked
2. **Network Errors**: Verify you're connected to the correct Stellar network (Testnet/Mainnet)
3. **Contract Errors**: Ensure smart contracts are deployed and contract addresses are configured
4. **Build Issues**: Clear `node_modules` and reinstall dependencies

### Development Tips
- Use browser developer tools to debug wallet connections
- Check network requests for Stellar RPC errors
- Verify wallet permissions and account funding
- Monitor Stellar transaction status through explorers

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for luxury fashion authentication on Stellar**

![dApp-VeriLuxe](https://img.shields.io/badge/dApp--VeriLuxe-Stellar%20Fashion%20dApp-gold.svg)