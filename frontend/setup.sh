#!/bin/bash

echo "🚀 VeriLuxe Smart Contract Integration Setup"
echo "============================================="

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the frontend directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "⚙️ Setting up environment configuration..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "📝 Please edit .env.local and add your contract address"
else
    echo "⚠️ .env.local already exists"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Deploy your smart contract using the deploy-js scripts"
echo "2. Copy the contract address to your .env.local file"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📚 For detailed instructions, see the README.md file"
echo ""
echo "✨ Setup complete! Happy coding!"