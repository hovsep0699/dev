import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button, { ButtonKinds } from '@distate/components/dist/Button';
import { IconCheck } from '@distate/components/dist/icons';
import get from 'lodash.get';

import { PageOperatorSkeleton, PageOperatorCompanySkeleton } from './page.connecters.skeleton';
import { connectersRequest, legalsRequest, updateConnectersRequest } from '../../store/actions';
import {
  list,
  connecters,
  isLoadingConnecters,
  isLoadingList,
  isLoadingUpdate as isLoadingUpdateCompany,
  companyIdConnecters
} from '../../store/selects';
import { Operators } from './operators';
import { Companies } from './companies';
import { DevOperators } from './dev-operators';

export const Connecters: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const id = useSelector(companyIdConnecters);
  const companies = useSelector(list);
  const operators = useSelector(connecters);
  const isLoading = useSelector(isLoadingConnecters);
  const isLoadingUpdate = useSelector(isLoadingUpdateCompany);
  const isLoadingCompanies = useSelector(isLoadingList);

  useEffect(() => {
    dispatch(legalsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [items, setItems] = useState(operators);
  useEffect(() => setItems(operators), [operators]);

  const handleOnChecked = (code: any, checked: boolean) => {
    const index = items.findIndex(i => i.code === code);
    items[index].checked = checked;

    setItems([...items]);
  };

  const [company, setCompany] = useState<{ value: unknown; label: string }>();
  const handleOnChangeCompany = (data: any) => setCompany(data);

  useEffect(() => {
    const first = get(companies, '0');
    if (!company && first) {
      setCompany({ value: first.id, label: first.name });
    }

    if (company && company.value !== id) {
      dispatch(connectersRequest({ id: company.value }));
    }
  }, [dispatch, id, company, companies]);

  const renderCompanies = () => {
    if (isLoadingCompanies) {
      return (
        <>
          <PageOperatorCompanySkeleton />
          <PageOperatorSkeleton />
        </>
      );
    }

    return <Companies data={companies} value={company} onChange={handleOnChangeCompany} />;
  };

  const renderOperators = () => {
    if (isLoading) {
      return <PageOperatorSkeleton />;
    }
    return <Operators data={items} onChange={handleOnChecked} />;
  };

  const handleOnSave = () => {
    if (company && company.value && !isLoadingUpdate) {
      const connectors = items.reduce((prev, curr) => {
        prev.push({ operator: curr.code, enabled: curr.checked });
        return prev;
      }, []);

      dispatch(updateConnectersRequest({ id: company.value, connectors }));
    }
  };

  return (
    <>
      {renderCompanies()}
      {renderOperators()}
      <Button
        kind={ButtonKinds.Primary}
        icon={<IconCheck style={{ fill: 'currentcolor' }} />}
        onClick={handleOnSave}
        toogleTheme
      >
        Сохранить
      </Button>
      <DevOperators />
    </>
  );
};
