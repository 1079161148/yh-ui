# Build Guide

This document describes the build system and technical implementation of the YH-UI component library.

## Build Architecture

YH-UI adopts a unified build architecture based on **[unbuild](https://github.com/unjs/unbuild)**. unbuild is a next-generation build tool based on Rollup, specifically optimized for Vue 3 component libraries in a Monorepo environment.

### Core Benefits

*   **Dual Output**: Native support for simultaneous ESM (.mjs) and CommonJS (.cjs) output.
*   **Extreme Tree-shaking**: Uses `mkdist` mode to maintain the original directory structure, ensuring the most precise code stripping at the application side.
*   **Stub Mode**: Supports developer mode with symlinks, allowing source code changes to take effect immediately without frequent recompilation.
*   **Auto Type Generation**: Integrated high-efficiency type generation ensuring robust TypeScript support.

## Quick Start

### Install Dependencies

It is recommended to use **pnpm** to install all dependencies from the root directory:

```bash
pnpm install
```

### Execute Build

Build in the component package directory or perform a full build from the root:

```bash
# Full build for all packages
pnpm build

# Build components only
pnpm build:components
```

### Development Mode (Stub)

When developing the component library, it is recommended to use Stub mode, which creates symlinks from source to dist:

```bash
# Run inside packages/components
pnpm dev
```

## Export Configuration and Usage

We have configured the modern `exports` field in `package.json` to support multiple environments:

### Configuration Details

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./resolver": {
      "types": "./dist/resolver.d.ts",
      "import": "./dist/resolver.mjs",
      "require": "./dist/resolver.cjs"
    }
  }
}
```

### Usage

#### ESM (Recommended)
Suitable for modern tools like Vite, Nuxt 3, and Webpack 5:

```javascript
import { YhButton } from '@yh-ui/components'
```

#### CommonJS
Suitable for Node.js or older Webpack environments:

```javascript
const { YhButton } = require('@yh-ui/components')
```

#### Local Import (Tree Shaking)
Thanks to the `mkdist` structure, you can point directly to specific files for ultimate optimization:

```javascript
import YhButton from '@yh-ui/components/dist/button/index.mjs'
```

## Important Notes

1.  **Style Import**: Component styles are usually imported separately via `@yh-ui/theme` or automatically applied using our `resolver` for on-demand loading.
2.  **Side Effects Safety**: CSS files are correctly marked in the `sideEffects` field to ensure bundlers do not erroneously strip styles.
3.  **Environment Requirements**: The build toolchain requires Node.js >= 18.0.0.

## Troubleshooting

### Type Definitions Outdated
If type hints are missing, ensure a full build has been executed to refresh `.d.ts` files in the `dist` folder.

### Dev Mode Changes Not Reflecting
Ensure `pnpm dev` (Stub mode) is running. If the file structure has changed, you may need to re-run the Stub command.
