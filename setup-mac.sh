#!/bin/bash

# Monumental Times Blog Setup Script for Mac
# This script installs all required tools and sets up the project

set -e  # Exit on any error

echo "=========================================="
echo "Monumental Times Blog Setup for Mac"
echo "=========================================="
echo ""
echo "This script will install:"
echo "  - Homebrew (package manager)"
echo "  - Node.js & npm"
echo "  - Git"
echo "  - VS Code (optional)"
echo ""
echo "You may be prompted for your Mac password."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status messages
print_status() {
    echo ""
    echo "===> $1"
    echo ""
}

# Step 1: Install Homebrew
print_status "Step 1/5: Installing Homebrew..."
if command_exists brew; then
    echo "✓ Homebrew is already installed"
else
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo "Adding Homebrew to PATH for Apple Silicon..."
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    echo "✓ Homebrew installed successfully"
fi

# Step 2: Install Node.js
print_status "Step 2/5: Installing Node.js and npm..."
if command_exists node; then
    echo "✓ Node.js is already installed (version: $(node --version))"
else
    echo "Installing Node.js..."
    brew install node
    echo "✓ Node.js installed successfully (version: $(node --version))"
fi

# Step 3: Install Git
print_status "Step 3/5: Installing Git..."
if command_exists git; then
    echo "✓ Git is already installed (version: $(git --version))"
else
    echo "Installing Git..."
    brew install git
    echo "✓ Git installed successfully"
fi

# Configure Git
print_status "Configuring Git..."
git config --global user.name "tikvah02"
git config --global user.email "tikvah2002@gmail.com"
echo "✓ Git configured with user: tikvah02"

# Step 4: Install VS Code (optional)
print_status "Step 4/5: Installing VS Code (optional)..."
read -p "Do you want to install VS Code? (y/n): " install_vscode
if [[ "$install_vscode" =~ ^[Yy]$ ]]; then
    if command_exists code; then
        echo "✓ VS Code is already installed"
    else
        echo "Installing VS Code..."
        brew install --cask visual-studio-code
        echo "✓ VS Code installed successfully"
    fi
else
    echo "Skipping VS Code installation"
fi

# Step 5: Clone and setup project
print_status "Step 5/5: Setting up the Monumental Times project..."
read -p "Do you want to clone the project repository now? (y/n): " clone_repo
if [[ "$clone_repo" =~ ^[Yy]$ ]]; then
    # Ask for installation location
    echo ""
    echo "Where would you like to install the project?"
    echo "Default: ~/Documents"
    read -p "Enter path (or press Enter for default): " install_path
    
    if [ -z "$install_path" ]; then
        install_path=~/Documents
    fi
    
    # Expand tilde
    install_path="${install_path/#\~/$HOME}"
    
    # Create directory if it doesn't exist
    mkdir -p "$install_path"
    cd "$install_path"
    
    # Clone repository
    if [ -d "monumentaltimes" ]; then
        echo "⚠ monumentaltimes directory already exists at $install_path"
        read -p "Do you want to remove it and re-clone? (y/n): " remove_existing
        if [[ "$remove_existing" =~ ^[Yy]$ ]]; then
            rm -rf monumentaltimes
            git clone https://github.com/splawrence/monumentaltimes.git
        else
            echo "Using existing directory..."
            cd monumentaltimes
        fi
    else
        git clone https://github.com/splawrence/monumentaltimes.git
        cd monumentaltimes
    fi
    
    # Install dependencies
    print_status "Installing project dependencies..."
    npm install
    
    echo ""
    echo "✓ Project setup complete!"
    echo ""
    echo "Project location: $(pwd)"
else
    echo "Skipping project clone. You can clone it later with:"
    echo "  cd ~/Documents"
    echo "  git clone https://github.com/splawrence/monumentaltimes.git"
    echo "  cd monumentaltimes"
    echo "  npm install"
fi

# Final verification
print_status "Installation Summary"
echo "✓ Homebrew: $(brew --version | head -1)"
echo "✓ Node.js: $(node --version)"
echo "✓ npm: $(npm --version)"
echo "✓ Git: $(git --version)"
if command_exists code; then
    echo "✓ VS Code: installed"
else
    echo "  VS Code: not installed"
fi

echo ""
echo "=========================================="
echo "Setup Complete! 🎉"
echo "=========================================="
echo ""
echo "Next steps:"
if [[ "$clone_repo" =~ ^[Yy]$ ]]; then
    echo "  1. cd $(pwd)"
    echo "  2. npm run dev"
    echo "  3. Open http://localhost:5173/admin in your browser"
else
    echo "  1. Clone the repository (see commands above)"
    echo "  2. Navigate to the project folder"
    echo "  3. Run: npm run dev"
    echo "  4. Open http://localhost:5173/admin in your browser"
fi
echo ""
echo "For help, see HOW_TO_MANAGE_ARTICLES.md"
echo ""
