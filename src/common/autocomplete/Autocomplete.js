import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Downshift from 'downshift';
import classNames from 'classnames';
import styles from './Autocomplete.module.css';
import ReactHtmlParser from 'react-html-parser';
import { Loading } from '@distate/components';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      formattedValues: [],
      touched: false
    };
  }
  @autobind
  successAjaxHandler(res, newInputValue) {
    const formattedValues = this.props.formatAjaxRes ? this.props.formatAjaxRes(res) : res;
    this.setState(() => {
      if (newInputValue === undefined) {
        this.props.handleItemSelect()(newInputValue);
      }

      return { values: res, formattedValues, touched: true };
    });
  }
  @autobind
  failAjaxHandler(err) {
    this.setState({ values: [], touched: true });
  }
  @autobind
  updateValues(newInputValue) {
    this.props
      .doAjax(newInputValue ? newInputValue.toLowerCase() : newInputValue)
      .then(res => this.successAjaxHandler(res, newInputValue))
      .catch(this.failAjaxHandler);
  }
  @autobind
  withProps(element, additionalProps) {
    return React.cloneElement(element, additionalProps);
  }
  @autobind
  highlight(value, trim) {
    return value.replace(
      // eslint-disable-next-line no-useless-escape
      new RegExp(`(?![^&;]+;)(?!<[^<>]*)(${trim.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, '\\$1')})(?![^<>]*>)(?![^&;]+;)`,'gi'),
      '<strong>$1</strong>'
    );
  }
  @autobind
  renderListItems(acValues, inputValue, getItemProps, highlightedIndex) {
    return acValues.filter(item => item !== '').map((acValue, acValueIndex) => {
      const acValueFormatted = this.highlight(acValue, inputValue);
      const acItemClasses = classNames({
        ac_over: highlightedIndex === acValueIndex
      });
      return (
        <li
          {...getItemProps({
            key: acValue,
            index: acValueIndex,
            item: acValue
          })}
          className={acItemClasses}
        >
          {ReactHtmlParser(acValueFormatted)}
        </li>
      );
    });
  }
  render() {
    const { width, handleAutocompleteValidate, handleItemSelect, children, hasLoader } = this.props;
    const { touched, formattedValues, values } = this.state;
    const acDropdownStyles = {
      width: `${width}px`
    };
    const customInputProps = {};
    const noFormattedValues = formattedValues.length === 0;

    if (handleAutocompleteValidate) {
      customInputProps.validate = handleAutocompleteValidate(touched ? formattedValues : null);
    }

    return (
      <Downshift onSelect={handleItemSelect(values)}>
        {({ getInputProps, getItemProps, getMenuProps, isOpen, inputValue, highlightedIndex }) => (
          <div className={styles.acWrapper}>
            {this.withProps(children, {
              onValueChange: this.updateValues,
              ...getInputProps(customInputProps)
            })}

            <ul
              {...getMenuProps()}
              className={classNames('ac_results', styles.acDropdown, {
                [styles.hide]: !hasLoader && (!isOpen || noFormattedValues)
              })}
              style={acDropdownStyles}
            >
              {hasLoader && isOpen && noFormattedValues && <Loading />}
              {isOpen &&
                formattedValues.length > 0 &&
                this.renderListItems(formattedValues, inputValue, getItemProps, highlightedIndex)}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}

Autocomplete.propTypes = {
  handleItemSelect: PropTypes.func.isRequired,
  doAjax: PropTypes.func.isRequired,
  formatAjaxRes: PropTypes.func,
  hasLoader: PropTypes.bool
};

Autocomplete.defaultProps = {
  hasLoader: false
};

export default Autocomplete;
