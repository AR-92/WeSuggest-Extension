class Fox {
  #store;
  #events;
  constructor(initialstore, dbName, mode) {
    this.ini=initialstore
    this.dbName = dbName;
    this.mode=mode;
    this.#store={};
    this.checkMode(this.ini, this.dbName, this.mode);
    
    this.#events = this.getEvents();
  }
  restoreDefault(){
    // this.checkMode(this.ini, this.dbName, this.mode);
    this.saveStore(this.ini,  this.dbName);
    this.#store = this.getStore( this.dbName);
  }
  checkMode(initialstore, dbName, mode){
    console.log("initialstore",initialstore,mode,dbName)
    if (mode===true) {
      if (initialstore) {
        if (localStorage.getItem(`_fox_store_${dbName}`)) {
          this.#store = this.getStore(dbName);
          // this.saveStore(initialstore, dbName);

        } else {
          this.saveStore(initialstore, dbName);
        }
      } else {
        this.saveStore({}, dbName);
        this.#store = this.getStore(dbName);
      }
    }
    if(mode===false){
      if (initialstore) {
            this.saveStore(initialstore, dbName);
            this.#store = this.getStore(dbName);
        } 
    }
  }
  emit(eventName, payload) {
    this.#store = this.getStore(this.dbName);
    if (typeof payload == "function") payload = payload(this.#store);
    if (Object.prototype.toString.call(payload) !== "[object Object]") {
      console.error("Payload should be an object");
      return false;
    }

    if (!this.#events.hasOwnProperty(eventName)) {
      console.error(`Event "${eventName}" does not exists`);
      return false;
    }

    this.#store = { ...this.#store, ...payload };
    this.#events[eventName].forEach(({ dep, cb }) => {
      if (dep.length == 0) cb(this.#store);
      else {
        const t = {};
        dep.forEach((k) => {
          if (this.#store.hasOwnProperty(k)) t[k] = this.#store[k];
        });

        cb(t);
      }
    });
    this.saveStore(this.#store, this.dbName);
    return true;
  }
  on(eventName, cb, dep = []) {
    if (typeof eventName !== "string") {
      console.error("on() method expects 1st argument as a string");
      return false;
    }
    if (typeof cb !== "function") {
      console.error("on() method expects 2nd argument as a callback function");
      return false;
    }

    if (Object.prototype.toString.call(dep) !== "[object Array]") {
      console.error("on() method expects 3rd argument as an array");
      return false;
    }

    if (!this.#events.hasOwnProperty(eventName)) this.#events[eventName] = [];
    this.#events[eventName].push({ dep, cb });
    return true;
  }
  getEvents() {
    if (localStorage.getItem("_fox_store_events")) {
      return JSON.parse(localStorage.getItem("_fox_store_events"));
    } else {
      return {};
    }
  }
  saveEvents(events) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("_fox_store_events", JSON.stringify(events));
    } else {
      console.error("Sorry !  Browser Does Not Support Local Storage");
    }
  }
  removeAllEvents() {
    this.saveEvents({});
  }
  removeAllStore(name) {
    this.saveStore({}, name);
  }
  getStore(name) {
    if (localStorage.getItem(`_fox_store_${name}`)) {
      return JSON.parse(localStorage.getItem(`_fox_store_${name}`));
    } else {
      return {};
    }
  }
  saveStore(store, name) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem(`_fox_store_${name}`, JSON.stringify(store));
    } else {
      console.error("Sorry !  Browser Does Not Support Local Storage");
    }
  }
  setDefaultStore(){
    if (this.ini) {
        this.saveStore(this.ini, this.dbName);
        this.#store = this.getStore(this.dbName);
    }
  }
}
