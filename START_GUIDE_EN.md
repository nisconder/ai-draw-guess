# Quick Start Guide - English

## Easiest Way to Start

### Windows Users:

**Option 1: Quick Start (Recommended)**
```
Double-click: quick-start.bat
```

**Option 2: Simple Start**
```
Double-click: start-simple.bat
```

**Option 3: Check Environment First**
```
Double-click: check-simple.bat
```

**Option 4: Verify Project**
```
Double-click: verify-simple.bat
```

**Option 5: Manual Start**
```
1. Open Command Prompt in project folder
2. Type: npm install
3. Type: npm run dev
4. Open browser: http://localhost:3000
```

### Linux/Mac Users:

**Option 1: Simple Start**
```
./start.sh
```

**Option 2: Manual Start**
```
npm install
npm run dev
```

## Get API Key

1. Visit: https://open.bigmodel.cn/
2. Register or login
3. Generate API key (Free)

## How to Play

1. Open browser: http://localhost:3000
2. Enter ZhipuAI API key
3. Click "Start Game"
4. AI generates text description
5. Guess the word
6. Submit answer
7. Complete 5 rounds

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Run production build
```

## Troubleshooting

### Port 3000 already in use?
Server will try port 3001 automatically.

### Installation failed?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json  # Linux/Mac
# Or delete node_modules folder manually
npm install
```

### Build failed?
Check Node.js version (requires 18+):
```bash
node --version
```

## Success Indicators

You should see:
```
▲ Next.js 14.2.35
- Local: http://localhost:3000

✓ Ready in X.Xs
```

## Verification

Check your environment:
```bash
node --version   # Should show v18.0.0 or higher
npm --version    # Should show 8.0.0 or higher
```

## Additional Help

- [README](README.md)
- [Full Troubleshooting Guide](TROUBLESHOOTING.md)
- [Project Status](PROJECT_STATUS.md)

## Enjoy the Game!

The project has been configured and tested. Ready to play!
