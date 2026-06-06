export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}

export class IndexedDBAdapter implements StorageAdapter {
  private dbName: string
  private storeName: string
  private db: IDBDatabase | null = null

  constructor(dbName = 'yh-ui-db', storeName = 'yh-ui-store') {
    this.dbName = dbName
    this.storeName = storeName
  }

  private async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(request.result)
      }
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' })
        }
      }
    })
  }

  async get<T>(key: string): Promise<T | null> {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result?.value ?? null)
    })
  }

  async set<T>(key: string, value: T): Promise<void> {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.put({ key, value })
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async remove(key: string): Promise<void> {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(key)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async clear(): Promise<void> {
    const db = await this.getDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }
}

export class APIClient implements StorageAdapter {
  private baseURL: string
  private headers: Record<string, string>

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.baseURL = baseURL.replace(/\/$/, '')
    this.headers = headers
  }

  async get<T>(key: string): Promise<T | null> {
    const response = await fetch(`${this.baseURL}/storage/${key}`, {
      headers: this.headers
    })
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
  }

  async set<T>(key: string, value: T): Promise<void> {
    const response = await fetch(`${this.baseURL}/storage/${key}`, {
      method: 'PUT',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
  }

  async remove(key: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/storage/${key}`, {
      method: 'DELETE',
      headers: this.headers
    })
    if (!response.ok && response.status !== 404) {
      throw new Error(`HTTP ${response.status}`)
    }
  }

  async clear(): Promise<void> {
    const response = await fetch(`${this.baseURL}/storage`, {
      method: 'DELETE',
      headers: this.headers
    })
    if (!response.ok && response.status !== 404) {
      throw new Error(`HTTP ${response.status}`)
    }
  }
}
