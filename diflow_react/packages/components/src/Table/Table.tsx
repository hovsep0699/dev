import { Table } from 'grommet';
import styled from 'styled-components';

export default styled(Table)`
  width: 100%;
  table-layout: fixed;

  tbody {
    overflow: unset;

    tr {
      &:hover {
        background-color: ${({ theme }) => theme.main.color.greyLight};
      }

      &:nth-child(n + 2) {
        border-top: 1px solid ${({ theme }) => theme.main.color.borderColor};
      }
    }
  }
`;
