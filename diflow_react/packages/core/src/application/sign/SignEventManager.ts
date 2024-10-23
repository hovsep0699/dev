import SignRequest from './SignRequest';

class SignEventManager {
  channels: any; //TODO make Map type

  constructor() {
    this.channels = new Map();
  }

  subscribe(eventType: string, listener: (data: SignRequest) => void): void {
    let listeners: any = [];
    if (this.channels.has(eventType)) {
      listeners = this.channels.get(eventType);
    }
    listeners.push(listener);
    this.channels.set(eventType, listeners);
  }

  unsubscribe(eventType: string, listener?: (data: SignRequest) => void): void {
    //TODO unsubscribe doesnt work :(
    //make listener object with cb inside
    if (!this.channels.has(eventType)) return;
    if (!listener) this.channels.delete(eventType);

    const listeners = this.channels.get(eventType);
    const listenerIndex = listeners.indexOf(listener);
    if (listenerIndex === -1) return;

    listeners.splice(listenerIndex, 1);
    if (listeners.length) {
      this.channels.set(eventType, listeners);
    } else {
      this.channels.delete(eventType);
    }
  }

  notify(eventType: string, data: SignRequest): void {
    if (!this.channels.has(eventType)) return;
    const listeners = this.channels.get(eventType);
    listeners.forEach((listener: (data: SignRequest) => void) => listener(data));
  }
}

export default SignEventManager;
