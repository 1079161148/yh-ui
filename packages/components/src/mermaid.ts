import mermaid from 'mermaid'

// Avoid direct default re-export which can be optimized by Rollup to 'export { default } from "mermaid"'
// and lead to 'default: default' SyntaxError in Nitro/Nuxt bundler namespaces.
const defaultMermaid = mermaid
export default defaultMermaid
