import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableBody from './TableBody';
import TableStub from './TableStub';
import Button from '../Button';
import { ICON } from '@distate/components';
import Toolbar from './Toolbar';
import Table from './Table';
import Colgroup from './Colgroup';
import autobind from 'autobind-decorator';
import TableFooter from './TableFooter';
import TotalRecords from './TotalRecords';
import GroupRight from '../GroupRight';
import Perpage from './Perpage';
import { LIST_IS_EMPTY, UPDATE } from '../Lbl';

class TableBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      limit: this.getLimitValues()[0],
      currentPage: 1,
      isUpdateBtnBusy: false,
      totalRecordsNum: 0
    };
    this.colsnum = 1;
  }
  componentDidMount() {
    this.updateTableData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.limit !== prevState.limit || this.state.currentPage !== prevState.currentPage) {
      this.updateTableData();
    }
  }
  getTableData() {
    throw new Error('Необходимо переопределить метод в подклассах');
  }
  successDataHandler() {
    throw new Error('Необходимо переопределить метод в подклассах');
  }
  errorDataHandler() {
    throw new Error('Необходимо переопределить метод в подклассах');
  }
  @autobind
  getOffset() {
    return this.state.limit * (this.state.currentPage - 1);
  }
  @autobind
  async updateTableData() {
    this.getTableData()
      .then(this.successDataHandler)
      .catch(this.errorDataHandler);
  }
  @autobind
  renderBody() {
    const rows = this.state.tableData.map((item, index) => this.renderRow(item, index));
    return <TableBody>{rows}</TableBody>;
  }
  renderRow(data, index) {
    throw new Error('Необходимо переопределить метод в подклассах');
  }
  @autobind
  renderStub(content) {
    return <TableStub colSpan={this.colsnum} stubContent={content || LIST_IS_EMPTY} />;
  }
  @autobind
  handleLimitChange(e) {
    this.setState({ limit: e.target.value });
  }
  @autobind
  renderToolbar() {
    return (
      <Toolbar>
        <Button
          iconClass={ICON.update}
          onClick={() => {
            this.setState({ isUpdateBtnBusy: true });
            this.updateTableData();
          }}
          busy={this.state.isUpdateBtnBusy}
        >
          {UPDATE}
        </Button>
        <GroupRight>
          <Perpage
            limits={this.getLimitValues()}
            value={this.state.limit}
            handleChange={this.handleLimitChange}
          />
        </GroupRight>
      </Toolbar>
    );
  }
  @autobind
  getLimitValues() {
    return [2, 10, 20, 50];
  }
  @autobind
  renderColgroup(colsWidth = []) {
    if (colsWidth.length > 0) {
      return <Colgroup cols={colsWidth} />;
    }
  }
  renderHead() {
    throw new Error('Необходимо переопределить метод в подклассах');
  }
  @autobind
  handleCurrentPageChange(currentPage) {
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage !== this.state.currentPage) {
      this.setState({ currentPage });
    }
  }
  @autobind
  renderFooter() {
    return (
      <TableFooter
        colsnum={this.colsnum}
        handleChange={this.handleCurrentPageChange}
        currentPage={this.state.currentPage}
        limit={this.state.limit}
        totalRecords={this.state.totalRecordsNum}
      >
        <TotalRecords recordsNum={this.state.totalRecordsNum} />
      </TableFooter>
    );
  }
  @autobind
  renderTable(colsWidth = [], stubContent = null) {
    const { tableData } = this.state;
    const isEmpty = Array.isArray(tableData) && tableData.length === 0;
    this.colsnum = colsWidth.length;
    return (
      <React.Fragment>
        {this.renderToolbar()}
        <Table>
          {this.renderColgroup(colsWidth)}
          {this.renderHead()}
          {tableData && this.renderBody()}
          {isEmpty && this.renderStub(stubContent)}
          {this.renderFooter()}
        </Table>
      </React.Fragment>
    );
  }
  render() {
    return <span>Must be rendered in subclass</span>;
  }
}

//TODO добавить методы, которые умеют считать количество ячеек в ряду и предупреждать разработчика,
// если получилось меньше или больше, чем планировалось
TableBase.defaultProps = {
  handleOffset: () => {},
  handleLimit: () => {},
  offset: 0,
  limit: 10,
  isUpdateBtnBusy: false
};
TableBase.propTypes = {
  handleOffset: PropTypes.func,
  offset: PropTypes.number,
  handleLimit: PropTypes.func,
  limit: PropTypes.number,
  isUpdateBtnBusy: PropTypes.bool
};

export default TableBase;
