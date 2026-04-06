import { fileURLToPath, URL } from 'node:url'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const replaceFillWithCurrentColor = (svg: string): string =>
  svg
    .replace(/fill="(black|#000|#000000)"/gi, 'fill="currentColor"')
    .replace(/stroke="(black|#000|#000000)"/gi, 'stroke="currentColor"')

const iconsPath = fileURLToPath(new URL('../assets/icons', import.meta.url))

export const appIconsCollection = {
  app: FileSystemIconLoader(iconsPath, replaceFillWithCurrentColor),
}
