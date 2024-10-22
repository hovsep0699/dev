import React, { useState } from 'react';
import styled from 'styled-components';

interface HierarchicalDropdownProps {
    data: Record<string, any>;
}

const HierarchicalDropdown: React.FC<HierarchicalDropdownProps> = ({data}: HierarchicalDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<any>({});
    const [expandedItems, setExpandedItems] = useState<any>({});
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleCheckboxChange = (path: any) => {
      setSelectedItems((prevState: any) => ({
        ...prevState,
        [path]: !prevState[path]
      }));
    };
  
    const toggleExpand = (path: any) => {
      setExpandedItems((prevState: any) => ({
        ...prevState,
        [path]: !prevState[path]
      }));
    };
  
    const renderItems = (items: any, level: number = 0, parentPath: string = '') => {
      return Object.keys(items).map((key) => {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;
        const isExpandable = typeof items[key] === 'object';
  
        return (
          <div key={currentPath}>
            {isExpandable ? (
              <>
                <Item level={level} onClick={() => toggleExpand(currentPath)}>
                  <ExpandIcon>{expandedItems[currentPath] ? '−' : '+'}</ExpandIcon>
                  {key}
                </Item>
                {expandedItems[currentPath] && renderItems(items[key], level + 1, currentPath)}
              </>
            ) : (
              <IndentedItem level={level}>
                <Checkbox
                  type="checkbox"
                  checked={selectedItems[currentPath] || false}
                  onChange={() => handleCheckboxChange(currentPath)}
                />
                <Label>{key}</Label>
              </IndentedItem>
            )}
          </div>
        );
      });
    };
  
    return (
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          Машиночитаемые полномочия
        </DropdownButton>
        <DropdownContent isOpen={isOpen}>
          {renderItems(data)}
        </DropdownContent>
      </DropdownContainer>
    );
  };
  
  export default HierarchicalDropdown;
  
// Styled components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const DropdownButton = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  //border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
`;

interface DropdownContainerProps {
    isOpen?: boolean;
}

const DropdownContent = styled.div<DropdownContainerProps>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  //border-radius: 5px;
  background-color: #fff;
  z-index: 1;
`;

interface ItemProps {
    level: number;
}

const Item = styled.div<ItemProps>`
  padding: 5px 10px;
  margin-left: ${props => props.level * 10}px;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const Label = styled.label`
  cursor: pointer;
`;

const ExpandIcon = styled.span`
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
  width: 12px;
  text-align: center;
`;

const IndentedItem = styled.div<ItemProps>`
  padding-left: ${props => props.level * 10}px;
`;
