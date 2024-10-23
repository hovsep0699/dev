import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { ICON } from '@distate/components';
import autobind from 'autobind-decorator';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 1,
      current: 1
    };
  }

  componentDidMount() {
    const { totalRecords, limit, currentPage } = this.props;
    const totalPages = this.calcTotalPages(totalRecords, limit);
    this.setState({
      totalPages,
      current: currentPage
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.limit !== this.props.limit ||
      prevProps.totalRecords !== this.props.totalRecords
    ) {
      const newCurrentPage = this.calcNewCurrentPage(
        prevProps.currentPage,
        prevProps.limit,
        this.props.limit
      );
      const totalPages = this.calcTotalPages(this.props.totalRecords, this.props.limit);

      const validPageNum = this.getValidPageNum(newCurrentPage, totalPages);
      this.setState({ totalPages }, () => {
        if (validPageNum !== this.props.currentPage) {
          this.props.handleChange(validPageNum);
        } else {
          this.setState({ current: validPageNum });
        }
      });
    }
    if (prevProps.currentPage !== this.props.currentPage) {
      const validPageNum = this.getValidPageNum(this.props.currentPage, this.state.totalPages);
      if (validPageNum !== this.props.currentPage) {
        this.props.handleChange(validPageNum);
      } else {
        this.setState({ current: validPageNum });
      }
    }
  }
  @autobind
  getValidPageNum(pageNum, totalPages) {
    if (pageNum > totalPages) {
      return totalPages;
    }
    if (pageNum < 1) {
      return 1;
    }
    return pageNum;
  }

  calcTotalPages(totalRecords, limit) {
    if (limit <= 0) {
      throw new Error('Значение limit должно быть больше нуля');
    }
    return Math.ceil(totalRecords / limit);
  }

  calcNewCurrentPage(currentPage, currentLimit, newLimit) {
    if (currentPage <= 0) {
      throw new Error('Номер текущей страницы должен быть больше нуля');
    } else if (currentLimit <= 0) {
      throw new Error('Текущее количество элементов на странице должно быть больше нуля');
    } else if (newLimit <= 0) {
      throw new Error('Желаемое количество элементов на странице должно быть больше нуля');
    }
    return Math.floor((currentLimit * (currentPage - 1)) / newLimit) + 1;
  }
  @autobind
  incrementPage() {
    const validPageNum = this.getValidPageNum(this.state.current + 1, this.state.totalPages);
    this.setState({ current: validPageNum }, this.changeCurrentPage);
  }
  @autobind
  decrementPage() {
    const validPageNum = this.getValidPageNum(this.state.current - 1, this.state.totalPages);
    this.setState({ current: validPageNum }, this.changeCurrentPage);
  }
  @autobind
  changeCurrentPage() {
    const pageNum = this.state.current;
    const validPageNum = this.getValidPageNum(pageNum, this.state.totalPages);
    if (validPageNum) {
      this.setState({ current: validPageNum });
      this.props.handleChange(validPageNum);
    } else {
      this.setState({ current: this.props.currentPage });
    }
  }
  @autobind
  handleInputChange(e) {
    this.setState({ current: e.target.value });
  }
  @autobind
  handleInputEnterKeyPress(e) {
    if (e.key === 'Enter') {
      this.changeCurrentPage();
    }
  }
  render() {
    return (
      <div>
        <div className="group align-bottom">
          <Button iconClass={ICON.leftArrow} onClick={this.decrementPage} />
        </div>
        <div className="group align-bottom">
          <label>
            <input
              type="text"
              value={this.state.current}
              onChange={this.handleInputChange}
              onBlur={this.changeCurrentPage}
              onKeyPress={this.handleInputEnterKeyPress}
              className="ds-input width-square solid text-center"
            />
            <span> из </span>
            <span>{this.state.totalPages}</span>
          </label>
        </div>
        <div className="group align-bottom">
          <Button iconClass={ICON.rightArrow} onClick={this.incrementPage} />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  limit: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Pagination;
