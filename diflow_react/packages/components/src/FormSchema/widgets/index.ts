import { AutocompleteContractorWidget } from './_contractor.widget';
import { AutocompleteWidget } from './autocomplete.widget';
import { CheckboxWidget } from './checkbox.widget';
import { SelectWidget } from './select.widget';
import { ButtonWidget } from './button.widget';
import { RadioWidget } from './radio.widget';
import { TextWidget } from './text.widget';
import { DateWidget } from './date.widget';
import { InfoWidget } from './info.widget';

export const widgets = {
  сontractor: AutocompleteContractorWidget,
  autocomplete: AutocompleteWidget,
  checkbox: CheckboxWidget,
  select: SelectWidget,
  radio: RadioWidget,
  date: DateWidget,
  text: TextWidget,
  info: InfoWidget,
  button: ButtonWidget
};

export default widgets;
