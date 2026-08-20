import type { Component } from 'vue'

export enum ActionName {
  Profile = 'profile',
  Cart = 'cart',
}
export interface ActionLink {
  id: number
  name: ActionName | string
  path: string
  ariaLabel: string
  icon: Component
  badge?: number
}
