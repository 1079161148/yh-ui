/**
 * 内置图标集合
 * @description 提供常用的 SVG 图标
 */
import type { IconData } from '../icon'
import { registerIcons } from '../icon'

// Close 关闭图标
export const IconClose: IconData = {
  name: 'close',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
}

// Check 勾选图标
export const IconCheck: IconData = {
  name: 'check',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'
}

// ArrowUp 向上箭头
export const IconArrowUp: IconData = {
  name: 'arrow-up',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>'
}

// ArrowDown 向下箭头
export const IconArrowDown: IconData = {
  name: 'arrow-down',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>'
}

// ArrowLeft 向左箭头
export const IconArrowLeft: IconData = {
  name: 'arrow-left',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>'
}

// ArrowRight 向右箭头
export const IconArrowRight: IconData = {
  name: 'arrow-right',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>'
}

// Loading 加载图标
export const IconLoading: IconData = {
  name: 'loading',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>'
}

// Search 搜索图标
export const IconSearch: IconData = {
  name: 'search',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
}

// Plus 加号图标
export const IconPlus: IconData = {
  name: 'plus',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>'
}

// Minus 减号图标
export const IconMinus: IconData = {
  name: 'minus',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19 13H5v-2h14v2z"/>'
}

// Info 信息图标
export const IconInfo: IconData = {
  name: 'info',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
}

// Warning 警告图标
export const IconWarning: IconData = {
  name: 'warning',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'
}

// Error 错误图标
export const IconError: IconData = {
  name: 'error',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
}

// Success 成功图标
export const IconSuccess: IconData = {
  name: 'success',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
}

// Eye 眼睛图标（显示密码）
export const IconEye: IconData = {
  name: 'eye',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>'
}

// EyeOff 眼睛关闭图标（隐藏密码）
export const IconEyeOff: IconData = {
  name: 'eye-off',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
}

// Calendar 日历图标
export const IconCalendar: IconData = {
  name: 'calendar',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>'
}

// Time 时间图标
export const IconTime: IconData = {
  name: 'time',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>'
}

// User 用户图标
export const IconUser: IconData = {
  name: 'user',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
}

// Settings 设置图标 (复数)
export const IconSettings: IconData = {
  name: 'settings',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'
}

// Setting 设置图标 (单数别名)
export const IconSetting: IconData = {
  name: 'setting',
  viewBox: '0 0 24 24',
  svg: IconSettings.svg
}

// Home 首页图标
export const IconHome: IconData = {
  name: 'home',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
}

// Image 图片图标
export const IconImage: IconData = {
  name: 'image',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>'
}

// Document 文档图标
export const IconDocument: IconData = {
  name: 'document',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
}

// Refresh 刷新/重试图标
export const IconRefresh: IconData = {
  name: 'refresh',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>'
}

// Delete 删除图标
export const IconDelete: IconData = {
  name: 'delete',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>'
}

// Upload 上传图标 (云上传)
export const IconUpload: IconData = {
  name: 'upload',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5h-3z"/>'
}

// Download 下载图标
export const IconDownload: IconData = {
  name: 'download',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>'
}

// File PDF 图标
export const IconFilePdf: IconData = {
  name: 'file-pdf',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-1.5v1.5h-1V7h2.5v1zm-6.5 3.5h1v-3h-1v3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>'
}

// File Excel 图标
export const IconFileExcel: IconData = {
  name: 'file-excel',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
}

// File Word 图标
export const IconFileWord: IconData = {
  name: 'file-word',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
}

// File Video 图标
export const IconFileVideo: IconData = {
  name: 'file-video',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>'
}

// File Audio 图标
export const IconFileAudio: IconData = {
  name: 'file-audio',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z"/>'
}

// File TXT 图标
export const IconFileTxt: IconData = {
  name: 'file-txt',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
}

// Attachment (Clip) 图标
export const IconAttachment: IconData = {
  name: 'attachment',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.34 9.84 2 11.5 2C13.16 2 14.5 3.34 14.5 5V15.5C14.5 16.05 14.05 16.5 13.5 16.5C12.95 16.5 12.5 16.05 12.5 15.5V6H11V15.5C11 16.88 12.12 18 13.5 18C14.88 18 16 16.88 16 15.5V5C16 2.51 13.99 0.5 11.5 0.5C9.01 0.5 7 2.51 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z"/>'
}

// Edit 编辑图标
export const IconEdit: IconData = {
  name: 'edit',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'
}

// Copy 复制图标
export const IconCopy: IconData = {
  name: 'copy',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>'
}

// Star 星号图标
export const IconStar: IconData = {
  name: 'star',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>'
}

// Folder 文件夹图标
export const IconFolder: IconData = {
  name: 'folder',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>'
}

// FolderOpened 文件夹打开图标
export const IconFolderOpened: IconData = {
  name: 'folder-opened',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>'
}

// Robot 机器人图标 (AI)
export const IconRobot: IconData = {
  name: 'robot',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M22,10h-2V7c0-1.66-1.34-3-3-3H7C5.34,4,4,5.34,4,7v3H2C1.45,10,1,10.45,1,11v4c0,0.55,0.45,1,1,1h2v3c0,1.66,1.34,3,3,3h10c1.66,0,3-1.34,3-3v-3h2c0.55,0,1-0.45,1-1v-4C23,10.45,22.55,10,22,10z M8,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1S7,12.55,7,12C7,11.45,7.45,11,8,11z M16,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C15,11.45,15.45,11,16,11z M16,18H8v-2h8V18z"/>'
}

// Close Circle 关闭圆圈图标
export const IconCloseCircle: IconData = {
  name: 'close-circle',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>'
}

// Check Circle 成功圆圈图标 (alias)
export const IconCheckCircle: IconData = {
  name: 'check-circle',
  viewBox: '0 0 24 24',
  svg: IconSuccess.svg
}

// Send 发送图标
export const IconSend: IconData = {
  name: 'send',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>'
}

// Send Arrow 发送(向上箭头)图标
export const IconSendArrow: IconData = {
  name: 'send-arrow',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M11 4.586V20h2V4.586l6.29 6.294 1.414-1.414L12 0.758 3.293 9.466l1.414 1.414z"/>'
}

// Clean 清空扫帚图标
export const IconClean: IconData = {
  name: 'clean',
  viewBox: '0 0 1024 1024',
  svg: '<path fill="currentColor" d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V342c0-14.4-11.6-26-26-26H611.8l-4.8-27.4c-9.6-55.6-58.4-96.6-114.7-96.6s-105.1 41-114.7 96.6l-4.8 27.4H160c-14.4 0-26 11.6-26 26v196c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4 14.2-2.4 23.7-15.9 21.2-30.4zM492.2 263.3c3.2-18.4 19.2-31.3 37.8-31.3s34.6 12.9 37.8 31.3l2.8 52.7h-81.2l2.8-52.7zm321 563.3H210.7l41.5-238h519.5l41.5 238zM206 518v-84h612v84H206z"></path>'
}

// Paperclip 别针图标 (alias)
export const IconPaperclip: IconData = {
  name: 'paperclip',
  viewBox: '0 0 24 24',
  svg: IconAttachment.svg
}

// Microphone 麦克风图标
export const IconMicrophone: IconData = {
  name: 'microphone',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>'
}

// ThumbUp 点赞图标
export const IconThumbUp: IconData = {
  name: 'thumb-up',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>'
}

// ThumbDown 点踩图标
export const IconThumbDown: IconData = {
  name: 'thumb-down',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.37-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>'
}

// Sparkles 闪烁图标
export const IconSparkles: IconData = {
  name: 'sparkles',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M11,1L12.5,4L15.5,5.5L12.5,7L11,10L9.5,7L6.5,5.5L9.5,4L11,1M5,10L6.5,13L9.5,14.5L6.5,16L5,19L3.5,16L0.5,14.5L3.5,13L5,10M17.5,12L19,15L22,16.5L19,18L17.5,21L16,18L13,16.5L16,15L17.5,12Z"/>'
}

// Share 分享图标
export const IconShare: IconData = {
  name: 'share',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>'
}

// Chat 对话气泡图标
export const IconChat: IconData = {
  name: 'chat',
  viewBox: '0 0 24 24',
  svg: '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>'
}

// 所有内置图标
export const builtInIcons: IconData[] = [
  IconClose,
  IconCheck,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconLoading,
  IconSearch,
  IconPlus,
  IconMinus,
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconEye,
  IconEyeOff,
  IconCalendar,
  IconTime,
  IconUser,
  IconSettings,
  IconSetting,
  IconHome,
  IconImage,
  IconDocument,
  IconRefresh,
  IconDelete,
  IconUpload,
  IconDownload,
  IconFilePdf,
  IconFileExcel,
  IconFileWord,
  IconFileVideo,
  IconFileAudio,
  IconFileTxt,
  IconAttachment,
  IconEdit,
  IconCopy,
  IconStar,
  IconFolder,
  IconFolderOpened,
  IconRobot,
  IconCloseCircle,
  IconCheckCircle,
  IconSend,
  IconSendArrow,
  IconClean,
  IconPaperclip,
  IconMicrophone,
  IconThumbUp,
  IconThumbDown,
  IconSparkles,
  IconShare,
  IconChat
]

// 自动注册所有内置图标
registerIcons(builtInIcons)

export default builtInIcons
