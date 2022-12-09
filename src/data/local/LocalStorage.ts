export class LocalStorage {
  constructor(private readonly storage: Storage) {}

  getItem(key: string) {
    return this.storage.getItem(key)
      ? JSON.parse(this.storage.getItem(key) ?? "")
      : undefined;
  }

  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
