declare module '@svg-maps/ukraine' {
  interface Location {
    id: string
    name: string
    path: string
    [key: string]: any
  }

  interface MapData {
    name: string
    id: string
    viewBox: string
    locations: Location[]
  }

  const Ukraine: MapData
  export default Ukraine
}

declare module 'vue3-svg-map' {
  import { DefineComponent } from 'vue'

  export const SvgMap: DefineComponent<{
    map: any
    locationClass?: (location: any, index: number) => string
  }>
} 