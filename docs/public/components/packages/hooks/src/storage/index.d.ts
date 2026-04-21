export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}
export declare class IndexedDBAdapter implements StorageAdapter {
  private dbName
  private storeName
  private db
  constructor(dbName?: string, storeName?: string)
  private getDB
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}
export declare class APIClient implements StorageAdapter {
  private baseURL
  private headers
  constructor(baseURL: string, headers?: Record<string, string>)
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}
