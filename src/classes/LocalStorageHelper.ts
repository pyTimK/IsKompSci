export abstract class LocalStorageHelper {
  private static storage = window.localStorage;

  static get<T>(key: string, fallBackValue: T): T {
    try {
      const item = this.storage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallBackValue;
    } catch (_e) {
      const e: Error = _e;
      console.log(e.message);
      return fallBackValue;
    }
  }

  static set<T>(key: string, value: T) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (_e) {
      const e: Error = _e;
      console.log(e.message);
    }
  }
}
