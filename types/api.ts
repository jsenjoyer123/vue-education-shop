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
  rating?: {
    rate: number
    count: number
  }
}

export type Picture = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}
