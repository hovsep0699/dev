import React from 'react';
import Core from '@distate/core/dist/application/Core';

import Dropdown from '../dropdown/Dropdown';
import { BOTTOM_LEFT } from '../Placement';
import DropdownItem from '../dropdown/DropdownItem';
import {
  ACT_DOC,
  WAYBILL_DOC,
  UNFORMALIZED_DOC,
  BILL_DOC,
  UNIVERSAL_INVOICE_DOC,
  INVOICE_UTD_DOC,
  NEW_DOCUMENT,
  CREATE_DOCUMENT
} from '../Lbl';
import {
  NEW_ACT,
  NEW_BILL,
  NEW_WAYBILL,
  NEW_UNFORMALIZED,
  NEW_UNIVERSAL_INVOICE,
  NEW_INVOICE_UTD,
  CREATE_FROM_FILE
} from '../Url';
import Button, { PRIMARY } from '../Button';
import { ICON } from '@distate/components';

function createItem(name, link) {
  return (
    <DropdownItem itemKey={link} key={link}>
      <a href={link}>{name}</a>
    </DropdownItem>
  );
}

const menuTrigger = (
  <Button iconClass={ICON.add} colorClass={PRIMARY}>
    {CREATE_DOCUMENT}
  </Button>
);

const CreateDocumentMenu = () => {
  const isCompany = !!Core.company;

  const menu = [];

  menu.push(createItem(UNFORMALIZED_DOC, NEW_UNFORMALIZED));

  menu.push(createItem(BILL_DOC, NEW_BILL));

  if (isCompany) {
    menu.push(createItem(ACT_DOC, NEW_ACT));
    menu.push(createItem(WAYBILL_DOC, NEW_WAYBILL));
    menu.push(createItem(UNIVERSAL_INVOICE_DOC, NEW_UNIVERSAL_INVOICE));
    menu.push(createItem(INVOICE_UTD_DOC, NEW_INVOICE_UTD));
    menu.push(createItem('Создать из файла', CREATE_FROM_FILE));
  }

  return (
    <Dropdown placement={BOTTOM_LEFT} trigger={menuTrigger}>
      <Dropdown.Header>{NEW_DOCUMENT}</Dropdown.Header>
      <Dropdown.Menu>{menu}</Dropdown.Menu>
    </Dropdown>
  );
};

export default CreateDocumentMenu;
