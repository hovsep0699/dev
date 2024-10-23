// За неделю
// eslint-disable-next-line no-extend-native
Date.prototype._getMonday = function() {
  const day = this.getDay() || 7;
  const monday = new Date();
  if (day !== 1) {
    monday.setHours(-24 * (day - 1));
  } else {
    monday.setDate(monday.getDate() - 7);
  }

  return monday;
};

// eslint-disable-next-line no-extend-native
Date.prototype._getMonth = function() {
  if (this.getDate() === 1) {
    this.setDate(-7);
  }

  return new Date(this.getFullYear(), this.getMonth(), 1);
};

// eslint-disable-next-line no-extend-native
Date.prototype._getQuarter = function() {
  const month = this.getMonth() - (this.getMonth() % 3);
  return new Date(this.getFullYear(), month);
};

// eslint-disable-next-line no-extend-native
Date.prototype._formatDTO = function() {
  const day = `0${this.getDate()}`.slice(-2);
  const month = `0${this.getMonth() + 1}`.slice(-2);

  return `${this.getFullYear()}-${month}-${day}`;
};

export {};
