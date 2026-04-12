import { withInstall } from '../../utils/index.js'
import Pagination from './src/pagination.js'
const YhPagination = withInstall(Pagination)
var stdin_default = YhPagination
export * from './src/pagination-meta.js'
export { YhPagination, stdin_default as default }
