import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const replaceFillWithCurrentColor = (svg: string): string =>
  svg.replace(/fill="[^"]*"/g, 'fill="currentColor"')

export const appIconsCollection = {
  app: FileSystemIconLoader('@/assets/icons', replaceFillWithCurrentColor),
}
