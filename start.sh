#!/bin/bash

# Colors
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
CYAN='\033[36m'
MAGENTA='\033[35m'
BOLD='\033[1m'
RESET='\033[0m'

clear

echo ""
echo -e "${BOLD}${MAGENTA}  -----------------------------------------------${RESET}"
echo -e "${BOLD}           SURVIVAL RUSH${RESET}"
echo -e "${BOLD}${MAGENTA}           Sheng Cun Jing Su${RESET}"
echo -e "       5 AI Engines · Combo Heal · Endless"
echo -e "${BOLD}${MAGENTA}  -----------------------------------------------${RESET}"
echo ""

# [1/3] Environment Check
echo -e "${BOLD}[1/3] Environment Check${RESET}"
echo -e "${CYAN}-----------------------------------------------${RESET}"

if command -v node &> /dev/null; then
    echo -e "${GREEN}  Node.js    $(node --version)${RESET}"
    if [[ "$(node --version)" < "v18.0.0" ]]; then
        echo -e "${YELLOW}  Warning: Node.js 18+ recommended${RESET}"
    fi
else
    echo -e "${RED}  Node.js    NOT FOUND - https://nodejs.org/${RESET}"
    exit 1
fi

if command -v npm &> /dev/null; then
    echo -e "${GREEN}  npm        v$(npm --version)${RESET}"
else
    echo -e "${RED}  npm        NOT FOUND${RESET}"
    exit 1
fi

for file in "package.json" "app/page.tsx"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  $file${RESET}"
    else
        echo -e "${RED}  $file  MISSING${RESET}"
    fi
done

echo ""

# [2/3] Dependencies
echo -e "${BOLD}[2/3] Dependencies${RESET}"
echo -e "${CYAN}-----------------------------------------------${RESET}"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}  Dependencies already installed${RESET}"
else
    echo -e "${YELLOW}  Installing dependencies...${RESET}"
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}  Install failed${RESET}"
        exit 1
    fi
    echo -e "${GREEN}  Install complete${RESET}"
fi

echo ""

# [3/3] Start Server
echo -e "${BOLD}[3/3] Starting Server${RESET}"
echo -e "${CYAN}-----------------------------------------------${RESET}"
echo ""
echo -e "  Open: http://localhost:3000"
echo -e "  First time? Expand [API Config] to enter your key"
echo -e "  Stop:  Ctrl+C"
echo ""
echo -e "${BOLD}${MAGENTA}  -----------------------------------------------${RESET}"
echo ""

npm run dev
