type Listener = (...data: any) => void;

class EventManager {
  channels: any;

  constructor() {
    this.channels = new Map();
  }

  subscribe(eventType: string, listener: Listener) {
    let listeners: any = [];
    if (this.channels.has(eventType)) {
      listener = this.channels.get(eventType);
    }

    listeners.push(listener);
    console.log(eventType, listener);
    this.channels.set(eventType, listeners);
  }

  unsubscribe(eventType: string, listener: Listener) {
    if (!this.channels.has(eventType)) return;

    const listeners = this.channels.get(eventType);
    const listenerIndex = listeners.indexOf(listener);
    if (listenerIndex === -1) return;

    listeners.splice(listenerIndex, 1);
    if (listeners.length) {
      this.channels.set(eventType, listeners);
      return;
    }

    this.channels.delete(eventType);
  }

  notify(eventType: string, ...rest: any) {
    if (!this.channels.has(eventType)) return;
    const listeners = this.channels.get(eventType);
    listeners.forEach((listener: Listener) => listener(...rest));
  }
}

export default EventManager;
