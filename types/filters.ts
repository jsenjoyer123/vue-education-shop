export enum SortOption {
  LowPrice = 'low-price',
  HighPrice = 'high-price',
}

export enum StockStatusFilter {
  OnSale = 'on-sale',
  InStock = 'in-stock',
}

export enum ProductBadge {
  OnSale = 'on-sale',
  SoldOut = 'sold-out',
}

export interface FiltersState {
  searchQuery: string
  category: string
  sort: SortOption | ''
  stockStatus: StockStatusFilter | ''
  priceRange: [number, number]
}
