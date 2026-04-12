var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class IndexedDBAdapter {
  constructor(dbName = "yh-ui-db", storeName = "yh-ui-store") {
    __publicField(this, "dbName");
    __publicField(this, "storeName");
    __publicField(this, "db", null);
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
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "key" });
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
      request.onsuccess = () => {
        var _a, _b;
        return resolve((_b = (_a = request.result) == null ? void 0 : _a.value) != null ? _b : null);
      };
    });
  }
  async set(key, value) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ key, value });
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
class APIClient {
  constructor(baseURL, headers = {}) {
    __publicField(this, "baseURL");
    __publicField(this, "headers");
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
      headers: __spreadProps(__spreadValues({}, this.headers), { "Content-Type": "application/json" }),
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
export {
  APIClient,
  IndexedDBAdapter
};
