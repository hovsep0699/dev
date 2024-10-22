import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icons, FormSchema, Placement, ButtonKinds } from '@distate/components';

import { SEARCH, CLEAR } from '../../common/Lbl';
import { selectVisible, selectDialog, selectSchema, selectTitle } from './store/selects';
import { actionDialog, actionSearchClear, actionSearchSubmit } from './store/actions';
import { HTMLContainer, HTMLButtons, HTMLDropdown, HTMLBody, HTMLButton } from './filter.style';

export interface IFilterPage {}

const FilterInit: React.FC<IFilterPage> = () => {
  const dispatch = useDispatch();

  const title = useSelector(selectTitle);
  const dialog = useSelector(selectDialog);
  const visible = useSelector(selectVisible);
  const schema = useSelector(selectSchema);

  if (!visible) {
    return null;
  }

  const handleOnVisible = () => {
    dispatch(actionDialog({ isDialog: !dialog }));
  };

  const handleOnClear = () => {
    dispatch(actionSearchClear());
  };

  const handleOnSubmit = (formData: any) => {
    dispatch(actionSearchSubmit({ formData }));
  };

  if (!schema || !schema.hasOwnProperty('topbar')) {
    return null;
  }

  const formData = schema.topbar.formData;
  const formSchema = schema.topbar.schema;
  const formUiSchema = schema.topbar.uiSchema;

  return (
    <HTMLContainer>
      <HTMLDropdown
        placement={Placement.BOTTOM_RIGHT}
        trigger={
          <HTMLButton icon={<Icons.IconSearch />} onClick={handleOnVisible}>
            {SEARCH}
          </HTMLButton>
        }
      >
        <HTMLDropdown.Header>{title}</HTMLDropdown.Header>
        <HTMLBody>
          <FormSchema
            schema={formSchema}
            onClear={handleOnClear}
            uiSchema={formUiSchema}
            onSubmit={handleOnSubmit}
            formData={formData}
          >
            {(props: any) => {
              return (
                <HTMLButtons>
                  <HTMLButton icon={<Icons.IconClose />} onClick={props.onClear}>
                    {CLEAR}
                  </HTMLButton>
                  <HTMLButton
                    icon={<Icons.IconSearch fill="currentColor" />}
                    kind={ButtonKinds.Secondary}
                    onClick={props.onSumbit}
                  >
                    {SEARCH}
                  </HTMLButton>
                </HTMLButtons>
              );
            }}
          </FormSchema>
        </HTMLBody>
      </HTMLDropdown>
    </HTMLContainer>
  );
};

export { FilterInit };
