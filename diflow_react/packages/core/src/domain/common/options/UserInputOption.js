class UserInputOption {
  static get postfix() {
    return 'UserInput';
  }

  static check(optionValue) {
    return optionValue && optionValue.includes(UserInputOption.postfix);
  }
}

export default UserInputOption;
