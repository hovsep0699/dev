class DisplayStrategyBase {
  displayError() {
    throw new Error('Override in subclass');
  }
  displayInfo() {
    throw new Error('Override in subclass');
  }
  displaySuccess() {
    throw new Error('Override in subclass');
  }
}

export default DisplayStrategyBase;
