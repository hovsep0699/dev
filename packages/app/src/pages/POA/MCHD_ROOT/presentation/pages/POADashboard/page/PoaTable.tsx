import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import {Pagination, PaginationLimit} from "../../../../common/pagination";
import { IconDownload, IconEye, IconPencil } from '../../../../assets/icons';
import { ButtonWrapper } from './PoaActionButtonsList';
import {useGlobalState} from "../../../../mocks/context/GlobalState";
import {DashboardPresenter} from "../presenter/DashboardPresenter";

const TableContainer = styled.div`
  margin: 20px 20px;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: white;
  border-top: 2px solid #dddddd;
  border-bottom: 2px solid #dddddd;
  //border-left: 2px solid white;
  text-align: left;
  padding: 8px;
  width: 32px;
  max-width: 80px;
  font-size: 12px;
  //background-color: #f2f2f2;
`;

const TableRow = styled.tr<{ isSelected: boolean }>`
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? 'hsl(0, 0%, 80%)' : 'white')}; /* Change color here */
  
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? 'hsl(0, 0%, 80%)' : '#ffffff')}; /* Change hover color here */
  }
`;

const TableCell = styled.td`
  text-align: left;
  font-size: 14px;
  padding: 8px;
`;

interface PoaTableProps {
  presenter: DashboardPresenter;
  setSelectedPoa: any;
}

const PoaTable: React.FC<PoaTableProps> = ({ setSelectedPoa, presenter }: PoaTableProps) => {
  const { records, isCompany } = useGlobalState();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    //console.log('offset', offset);
  }, [offset]);

  const handleRowClick = (record: any) => {
    setSelectedRecord(record);
    setSelectedPoa(record);
  };

  return (
      <>
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>ДОВЕРИТЕЛЬ (ИНН)</TableHeader>
            <TableHeader>ПРЕДСТАВИТЕЛЬ (ИНН)</TableHeader>
            <TableHeader>ИДЕНТИФИКАТОР</TableHeader>
            <TableHeader>ДАТА ВЫДАЧИ</TableHeader>
            <TableHeader>ДАТА НАЧАЛА</TableHeader>
            <TableHeader>ДАТА ОКОНЧАНИЯ</TableHeader>
            <TableHeader>СТАТУС</TableHeader>
            {!isCompany ? (
                <TableHeader style={{maxWidth: "50px"}}>ИСПОЛЬЗУЕТСЯ</TableHeader>
            ) : ( <TableHeader style={{maxWidth: "50px"}}></TableHeader>)}
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <TableRow
              key={index}
              isSelected={selectedRecord === record}
              onClick={() => handleRowClick(record)}
            >
              <TableCell style={{maxWidth: "80px"}}>{record.doviritel}</TableCell>
              <TableCell style={{maxWidth: "80px"}}>{record.predstavitel}</TableCell>
              <TableCell style={{maxWidth: "80px"}}>{record.identifier}</TableCell>
              <TableCell style={{maxWidth: "80px"}}>{record.dataVidachi}</TableCell>
              <TableCell style={{maxWidth: "80px"}}>{record.dataNachala}</TableCell>
              <TableCell style={{maxWidth: "80px"}}>{record.dataOkonchaniya}</TableCell>
              <TableCell style={{maxWidth: "80px"}}>{record.status}</TableCell>
              {!isCompany ? (
              <TableCell style={{maxWidth: "80px"}}>
                {/*<ButtonWrapper>*/}
                  <Box direction={"column"} justify={"start"} width={"50px"}  align={"start"}>
                      {!isCompany ? (
                          <Box direction={"row"} margin={{left: "75%"}} justify={"center"}>
                            <IconPencil />
                          </Box>
                      ) : (<></>)}
                  </Box>
              </TableCell>
              ) : (<TableCell style={{maxWidth: "80px", width: "50px"}}></TableCell>)}
              <TableCell style={{maxWidth: "80px"}}>
                <ButtonWrapper>
                  <Box direction={"column"}>
                    <Box direction={"row"} gap={"20px"} justify={"between"}>
                      <Box direction={"column"} justify={"center"}>
                        <IconEye />
                      </Box>
                      <Box direction={"column"} justify={"center"}>
                        <IconDownload />
                      </Box>
                    </Box>
                  </Box>
                </ButtonWrapper>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  <Box direction={"column"} justify={"center"} margin={{left: "medium", right: "medium"}} style={{borderBottom: "2px solid #dddddd"}}>
    <Box direction={"row"} justify={"between"} pad={{bottom: "10px", left: "10px", right: "10px"}}>
      <Box direction={"column"} justify={"start"} >
        <PaginationLimit limit={10} setLimit={setOffset} />
      </Box>
      <Box direction={"column"} justify={"end"}>
        <Pagination setOffset={setOffset}/>
      </Box>
    </Box>
  </Box>
  </>
  );
};

export default PoaTable;
