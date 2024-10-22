import { LEFT } from '../../Placement';

export const MAX_INPUT_WIDTH = 320;

class Appearance {
  constructor({
    width = MAX_INPUT_WIDTH,
    align = LEFT,
    customClasses = '',
    noCaption = false,
    isInDiv = false,
    withRequiredView = false
  } = {}) {
    this._width = width;
    this._align = align;
    this._customClasses = customClasses;
    this._noCaption = noCaption;
    this._isInDiv = isInDiv;
    this._withRequiredView = withRequiredView;
  }

  get width() {
    return this._width;
  }

  get align() {
    return this._align;
  }

  get customClasses() {
    return this._customClasses;
  }

  get noCaption() {
    return this._noCaption;
  }

  get isInDiv() {
    return this._isInDiv;
  }

  get withRequiredView() {
    return this._withRequiredView;
  }
}

export default Appearance;
