# VeriLuxe Dashboard

## Overview

The VeriLuxe Dashboard is a web interface for managing luxury fashion authenticity certificates on the Stellar blockchain. It provides a user-friendly interface for interacting with all VeriLuxe API endpoints.

## Features

### Authentication
- **Wallet Connection**: Secure authentication using Stellar wallets
- **Protected Routes**: Dashboard access requires wallet connection
- **Auto-redirect**: Automatic navigation between landing and dashboard based on auth state

### API Endpoints Management

#### Health Check
- Monitor API health status
- No parameters required
- `GET /health`

#### Contract Initialization
- Initialize smart contract with admin address
- Required: Admin Stellar address
- `POST /init`

#### Certificate Operations

1. **Issue Certificate** (`POST /certificates`)
   - Create new authenticity certificates
   - Required: Certificate ID, Metadata Hash, Owner Address

2. **Get Certificate** (`GET /certificates/{id}`)
   - Retrieve certificate details by ID
   - Required: Certificate ID

3. **Verify Certificate** (`POST /certificates/{id}/verify`)
   - Verify certificate authenticity
   - Required: Certificate ID, Expected Metadata Hash

4. **Transfer Certificate** (`POST /certificates/{id}/transfer`)
   - Transfer ownership to new owner
   - Required: Certificate ID, New Owner Address, Current Owner Secret Key

5. **Revoke Certificate** (`POST /certificates/{id}/revoke`)
   - Permanently revoke a certificate
   - Required: Certificate ID

6. **Check Existence** (`GET /certificates/{id}/exists`)
   - Check if certificate exists
   - Required: Certificate ID

## Usage

1. **Connect Wallet**: Start by connecting your Stellar wallet on the landing page
2. **Access Dashboard**: After connection, you'll be automatically redirected to the dashboard
3. **Select Endpoint**: Use the sidebar to choose which API endpoint to interact with
4. **Fill Parameters**: Enter required parameters in the request form
5. **Execute Request**: Click "Execute Request" to call the API
6. **View Response**: See the API response in the right panel

## UI Components

- **Sidebar**: Navigation between different API endpoints
- **Header**: Shows connected wallet info and disconnect option
- **Content Area**: Request forms and response display
- **Toast Notifications**: Success/error feedback for operations

## Styling

- Gradient backgrounds: Rose and pink theme matching the landing page
- Responsive design: Works on desktop and mobile devices
- Clean interface: Easy-to-use forms and clear response display

## Navigation

- **From Landing**: Auto-redirect when wallet connects
- **To Landing**: Click disconnect in header to return to landing page
- **Protected Access**: Dashboard requires wallet connection

## Development

The dashboard is built with:
- Next.js 15.4.2
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Stellar Wallets Kit (authentication)
- Radix UI (components)
- Lucide React (icons)

## API Configuration

The dashboard connects to the VeriLuxe API at `http://127.0.0.1:3000` by default. You can modify the `API_BASE_URL` constant in each panel component to connect to a different API endpoint.