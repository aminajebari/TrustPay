#!/bin/bash

# DappPay Deployment Script for Ubuntu VPS
# This script automates the deployment process

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print functions
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }
print_info() { echo -e "${YELLOW}➜ $1${NC}"; }

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run as root. Run as a regular user with sudo privileges."
    exit 1
fi

print_info "Starting DappPay deployment..."

# 1. System Update
print_info "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y
print_success "System updated"

# 2. Install Docker
if ! command -v docker &> /dev/null; then
    print_info "Installing Docker..."
    
    # Remove old versions
    sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # Install prerequisites
    sudo apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    # Add Docker's official GPG key
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    # Set up repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Add user to docker group
    sudo usermod -aG docker $USER
    
    print_success "Docker installed successfully"
else
    print_success "Docker is already installed"
fi

# 3. Verify Docker installation
print_info "Verifying Docker installation..."
docker --version
docker compose version
print_success "Docker verified"

# 4. Check system resources
print_info "Checking system resources..."
TOTAL_MEM=$(free -g | awk '/^Mem:/{print $2}')
if [ "$TOTAL_MEM" -lt 4 ]; then
    print_error "Warning: System has less than 4GB RAM. Build may fail."
    print_info "Consider upgrading your VPS or using a machine with more RAM for building."
fi

DISK_SPACE=$(df -BG / | awk 'NR==2 {print $4}' | sed 's/G//')
if [ "$DISK_SPACE" -lt 20 ]; then
    print_error "Warning: Less than 20GB free disk space available."
    print_info "Consider freeing up space or expanding your disk."
fi
print_success "Resource check complete"

# 5. Configure Docker daemon for better performance
print_info "Configuring Docker daemon..."
sudo mkdir -p /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 64000,
      "Soft": 64000
    }
  }
}
EOF
sudo systemctl restart docker
print_success "Docker daemon configured"

# 6. Clean up old containers and images
print_info "Cleaning up old Docker resources..."
docker compose down 2>/dev/null || true
docker system prune -f
print_success "Cleanup complete"

# 7. Build and start the application
print_info "Building Docker image (this may take 15-30 minutes)..."
print_info "Tip: You can monitor progress with: docker compose logs -f"

# Build with progress
docker compose build --no-cache --progress=plain

print_success "Build complete!"

# 8. Start the application
print_info "Starting DappPay application..."
docker compose up -d

# 9. Wait for application to be healthy
print_info "Waiting for application to start..."
RETRY_COUNT=0
MAX_RETRIES=30

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker compose ps | grep -q "healthy"; then
        print_success "Application is healthy and running!"
        break
    fi
    
    if docker compose ps | grep -q "unhealthy"; then
        print_error "Application is unhealthy. Check logs with: docker compose logs"
        exit 1
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo -n "."
    sleep 5
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    print_error "Application failed to become healthy in time"
    print_info "Check logs with: docker compose logs"
    exit 1
fi

# 10. Display status
echo ""
print_success "==================================="
print_success "DappPay Deployment Complete!"
print_success "==================================="
echo ""
print_info "Application URL: http://localhost:3000"
print_info "Container name: dapppay_app"
echo ""
print_info "Useful commands:"
echo "  - View logs: docker compose logs -f"
echo "  - Stop app: docker compose down"
echo "  - Restart app: docker compose restart"
echo "  - View status: docker compose ps"
echo ""

# 11. Show application logs
print_info "Recent application logs:"
docker compose logs --tail=50