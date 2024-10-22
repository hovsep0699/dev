import React from 'react';
import { useSelector } from 'react-redux';

import { FilterDialog } from '../../../../container/filter/features/filter-dialog';
import { selectMode, selectFilter } from '../../store/selects';
import { SchemaSearch, UISchemaSearch } from '../../helpers/documents.schema';
import { getStatus } from '../../helpers/documents.status';

export interface IFilterProps {}

const Filter: React.FC<IFilterProps> = () => {
  const mode = useSelector(selectMode) || '';
  const filter = useSelector(selectFilter);

  const shcema: any = React.useMemo(() => {
    const enums = getStatus(mode);
    const packageStatus = ['inbox', 'outbox', 'archive', 'folder'].includes(mode) && {
      type: 'string',
      title: 'Статус документа',
      ...enums
    };

    return {
      ...SchemaSearch,
      properties: {
        ...SchemaSearch.properties,
        packageStatus
      }
    };
  }, [mode]);

  return (
    <FilterDialog
      title="Поиск по документам"
      schema={shcema}
      uiSchema={UISchemaSearch}
      formData={filter}
    />
  );
};

export { Filter };
