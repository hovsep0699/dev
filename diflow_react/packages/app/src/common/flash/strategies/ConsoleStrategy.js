import DisplayStrategyBase from './DisplayStrategyBase';

class ConsoleStrategy extends DisplayStrategyBase {
  displayError(err) {
    console.log(err);
  }
  displayInfo(txt) {
    console.info(txt);
  }
  displaySuccess(txt) {
    console.log(txt);
  }
}

export default ConsoleStrategy;
