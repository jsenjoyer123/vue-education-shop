import { fileURLToPath, URL } from 'node:url'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const replaceFillWithCurrentColor = (svg: string): string =>
  svg.replace(/fill="[^"]*"/g, 'fill="currentColor"')

const iconsPath = fileURLToPath(new URL('../assets/icons', import.meta.url))

export const appIconsCollection = {
  app: FileSystemIconLoader(iconsPath, replaceFillWithCurrentColor),
}
