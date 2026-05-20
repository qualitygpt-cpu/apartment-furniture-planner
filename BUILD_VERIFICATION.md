# Build Verification

## Install dependencies
```bash
npm install
```

## Run development server
```bash
npm run dev
```

## Run typecheck
```bash
npm run typecheck
```

## Build production bundle
```bash
npm run build
```

## Preview production build
```bash
npm run preview
```

## Expected successful commands
When successful, all commands above should exit with code 0. `npm run build` outputs files into `dist/`.

## Known limitation
In restricted environments (including Codex sandboxes), `npm install` may fail due to npm registry/network policy restrictions.
