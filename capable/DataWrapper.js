class DataWrapper {
  constructor(data = {}) {
    this.data = data;
    this._keysFromData(data);
  }

  get keys() {
    return Object.keys(this.data);
  }

  _keysFromData(data) {
    Object.keys(data).forEach((k) => (this[k] = data[k]));
  }
}

export { DataWrapper };
