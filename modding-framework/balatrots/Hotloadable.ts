export interface Hotloadable  {
  onLoad: () => void
  onUnload: () => void
}