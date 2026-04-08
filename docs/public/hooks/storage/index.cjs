"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexedDBAdapter = exports.APIClient = void 0;
class IndexedDBAdapter {
  dbName;
  storeName;
  db = null;
  constructor(dbName = "yh-ui-db", storeName = "yh-ui-store") {
    this.dbName = dbName;
    this.storeName = storeName;
  }
  async getDB() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: "key"
          });
        }
      };
    });
  }
  async get(key) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result?.value ?? null);
    });
  }
  async set(key, value) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put({
        key,
        value
      });
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  async remove(key) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  async clear() {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}
exports.IndexedDBAdapter = IndexedDBAdapter;
class APIClient {
  baseURL;
  headers;
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL.replace(/\/$/, "");
    this.headers = headers;
  }
  async get(key) {
    const response = await fetch(`${this.baseURL}/storage/${key}`, {
      headers: this.headers
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }
  async set(key, value) {
    const response = await fetch(`${this.baseURL}/storage/${key}`, {
      method: "PUT",
      headers: {
        ...this.headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  }
  async remove(key) {
    const response = await fetch(`${this.baseURL}/storage/${key}`, {
      method: "DELETE",
      headers: this.headers
    });
    if (!response.ok && response.status !== 404) {
      throw new Error(`HTTP ${response.status}`);
    }
  }
  async clear() {
    const response = await fetch(`${this.baseURL}/storage`, {
      method: "DELETE",
      headers: this.headers
    });
    if (!response.ok && response.status !== 404) {
      throw new Error(`HTTP ${response.status}`);
    }
  }
}
exports.APIClient = APIClient;