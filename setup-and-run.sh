#!/bin/bash

# Function to check if a command exists
command_exists () {
    command -v "$1" >/dev/null 2>&1 ;
}

# Check if Node.js is installed
if command_exists node; then
    echo "Node.js is already installed."
else
    echo "Node.js is not installed. Installing Node.js..."

    # Check if NVM for Windows is installed
    if [ ! -d "$APPDATA/nvm" ]; then
        echo "NVM for Windows is not installed. Installing NVM for Windows..."
        # Download and install NVM for Windows
        curl -LO https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.zip
        unzip nvm-setup.zip -d "$APPDATA/nvm"
        rm nvm-setup.zip
        "$APPDATA/nvm/nvm-setup.exe" /SILENT
    fi

    # Use NVM to install the latest LTS version of Node.js
    echo "Installing the latest LTS version of Node.js using NVM..."
    nvm install --lts
    nvm use --lts
fi

# Check if Bun.js is installed
if command_exists bun; then
    echo "Bun.js is already installed."
else
    echo "Bun.js is not installed. Installing Bun.js..."
    # Install Bun.js for Windows
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Install any dependencies for Node.js (if you have a package.json)
if [ -f "package.json" ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

# Run the benchmark tests
echo "Running benchmarks..."
./run-local.sh

# Notify the user
echo "Setup and benchmark completed! Check the report.html file for results."
