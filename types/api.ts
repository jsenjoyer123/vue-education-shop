export enum ProductBadge {
  OnSale = 'on-sale',
  SoldOut = 'sold-out',
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  badge?: ProductBadge | null
}

export type Picture = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}
