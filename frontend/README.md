# VeriLuxe Frontend - Smart Contract Integration

This frontend application provides a beautiful interface for interacting with the VeriLuxe Fashion Authenticity smart contract on the Stellar blockchain.

## Features

- **Wallet Integration**: Standard Stellar wallet connectivity using Stellar Wallets Kit
- **Certificate Verification**: Verify the authenticity of fashion items using certificate ID and metadata hash
- **Certificate Issuance**: Issue new authenticity certificates (Admin only)
- **Ownership Transfer**: Transfer certificate ownership between addresses
- **Certificate Revocation**: Revoke certificates when needed (Admin only)
- **Admin Panel**: Contract management and statistics

## Supported Wallets

The application uses the official Stellar approach for wallet connectivity by integrating directly with wallet browser extensions:

- **Freighter** - The most popular Stellar browser extension wallet
- **Future Support** - Additional wallet extensions can be easily integrated

## Wallet Integration Architecture

The application follows Stellar's recommended approach for dApp wallet connectivity:

- **Direct Integration**: Connects directly to wallet browser extensions
- **Official Standards**: Uses standard Stellar wallet APIs
- **Freighter First**: Prioritizes Freighter as the primary wallet
- **Extensible**: Easy to add support for additional wallets

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your smart contract:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address_here
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
```

### 3. Deploy Smart Contract

First, deploy your smart contract using the deployment script:

```bash
cd ../deploy-js
npm install
node deploy.js
```

Copy the contract address from the deployment output and add it to your `.env.local` file.

### 4. Run the Frontend

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Smart Contract Integration

### Architecture

The frontend integrates with the Stellar Soroban smart contract through:

- **`/src/lib/contract-config.ts`**: Configuration for different networks
- **`/src/lib/fashion-auth-contract.ts`**: Smart contract client class
- **`/src/components/modules/landing/hooks/useFashionAuth.ts`**: React hook for contract interactions

### User Management

The application uses the official Stellar approach for dApp wallet connectivity. Users connect their Freighter wallet extension to:

- Sign transactions securely
- Maintain ownership of their private keys
- Access admin privileges (if applicable)
- Interact with smart contracts

The wallet connection is persistent across browser sessions and automatically reconnects when the wallet is available.

### Contract Functions

#### Initialize Contract
- **Function**: `init(admin_address)`
- **Access**: Anyone (first time only)
- **Purpose**: Set the admin address for the contract

#### Issue Certificate
- **Function**: `issue_certificate(cert_id, metadata_hash, owner)`
- **Access**: Admin only
- **Purpose**: Create a new authenticity certificate

#### Verify Certificate
- **Function**: `verify(cert_id, metadata_hash)`
- **Access**: Public
- **Purpose**: Check if a certificate is valid and authentic

#### Transfer Ownership
- **Function**: `transfer(cert_id, new_owner)`
- **Access**: Current owner only
- **Purpose**: Transfer certificate to a new owner

#### Revoke Certificate
- **Function**: `revoke(cert_id)`
- **Access**: Admin only
- **Purpose**: Mark a certificate as invalid

### Error Handling

The application includes comprehensive error handling:

- Network connectivity issues
- Transaction failures
- Invalid inputs
- Unauthorized access attempts

### Loading States

Visual feedback is provided during:

- Contract initialization
- Transaction processing
- Certificate verification
- Data loading

## Network Configuration

### Testnet (Default)
- **Network**: Stellar Testnet
- **RPC URL**: https://soroban-testnet.stellar.org
- **Passphrase**: Test SDF Network ; September 2015

### Futurenet
- **Network**: Stellar Futurenet
- **RPC URL**: https://rpc-futurenet.stellar.org:443
- **Passphrase**: Test SDF Future Network ; October 2022

### Mainnet
- **Network**: Stellar Mainnet
- **RPC URL**: https://mainnet.sorobanrpc.com
- **Passphrase**: Public Global Stellar Network ; September 2015

## Usage Guide

### For Regular Users

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred Stellar wallet
2. **Verify Certificates**: Enter certificate ID and metadata hash to verify authenticity
3. **Transfer Ownership**: If you own a certificate, you can transfer it to another address

### For Administrators

1. **Connect Admin Wallet**: Connect the wallet that will serve as the contract administrator
2. **Initialize Contract**: Set yourself as admin (one-time setup)
3. **Issue Certificates**: Create new authenticity certificates for fashion items
4. **Revoke Certificates**: Mark certificates as invalid when necessary
5. **Monitor Statistics**: View certificate counts and status

## Development

### Key Components

- **`FashionAuthDApp.tsx`**: Main application interface
- **`useFashionAuth.ts`**: Contract interaction hook
- **`fashion-auth-contract.ts`**: Smart contract client
- **Form Components**: Individual forms for each contract function

### Adding New Features

1. Add new functions to `fashion-auth-contract.ts`
2. Update the `useFashionAuth` hook
3. Create UI components for new functionality
4. Add new tabs/sections to the main DApp interface

## Troubleshooting

### Common Issues

1. **Contract Not Connected**: Ensure `NEXT_PUBLIC_CONTRACT_ADDRESS` is set correctly
2. **Transaction Failures**: Check network connectivity and account balance
3. **Admin Issues**: Verify the contract is initialized and you're using the admin account

### Debug Mode

Enable debug logging by opening browser console to see detailed transaction information.

## Security Considerations

- Private keys are stored in localStorage (for demo purposes)
- In production, integrate with proper wallet solutions
- Always verify transaction details before signing
- Use HTTPS in production environments

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify environment configuration
3. Ensure smart contract is deployed and accessible
4. Check network connectivity