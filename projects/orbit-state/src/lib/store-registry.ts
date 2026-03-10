export class StoreRegistry {
  private static instances: Map<string, any> = new Map();

  static get<T>(storeClass: new () => T): T {
    const name = storeClass.name;
    if (!this.instances.has(name)) {
      this.instances.set(name, new storeClass());
    }
    return this.instances.get(name);
  }
}

