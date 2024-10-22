import styled from 'styled-components';

export const HTMLBlock = styled.div`
  margin: 50px 0 25px 0;
  opacity: 0.6;
  outline: none;
  user-select: none;
`;

export const HTMLHeader = styled.div`
  font-size: 24px;
  line-height: 24px;
  padding: 25px 0;
  color: #4d4d4f;
`;

export const HTMLList = styled.ul`
  list-style: none;
`;

export const HTMLListItem = styled.li`
  margin: 12px 0;
  max-width: 680px;
  border: 1px solid #4d4d4f;
  background-color: white;
  padding-left: 40px;
  min-height: 80px;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

export const HTMLListImage = styled.img`
  max-width: 100px;
  width: 100%;
  margin: 12px;
`;

export const HTMLListLabel = styled.span`
  margin: 12px;
  font-weight: bold;
  color: #4d4d4f;
`;
