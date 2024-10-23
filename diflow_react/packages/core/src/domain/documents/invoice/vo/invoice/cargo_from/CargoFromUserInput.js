import UserInputOption from '../../../../../common/options/UserInputOption';

class CargoFromUserInput {
  static get title() {
    return 'Грузоотправитель';
  }

  static get value() {
    return `cargo${UserInputOption.postfix}`;
  }
}

export default CargoFromUserInput;
