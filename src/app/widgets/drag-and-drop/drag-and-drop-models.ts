export interface DraggingItem<T extends any> {
  data: T
  originalIndex?: number | null
}
