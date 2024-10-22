export default function(TargetObj) {
  Object.defineProperty(TargetObj, '_observers', {
    value: [],
    writable: true
  });
  TargetObj.on = (eventName, callback) => {
    TargetObj._observers.push({ eventName, callback });
  };
  TargetObj.off = eventName => {
    TargetObj._observers = TargetObj._observers.filter(observer => {
      return !(observer.eventName === eventName);
    });
  };
  TargetObj.dispatch = (eventName, payload) => {
    TargetObj._observers.forEach(observer => {
      if (observer.eventName === eventName) {
        observer.callback(payload);
      }
    });
  };
  return TargetObj;
}
