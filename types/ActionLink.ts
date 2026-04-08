import type { Component } from 'vue'

export interface ActionLink {
  id: number
  name: string
  path: string
  ariaLabel: string
  icon: Component
}
