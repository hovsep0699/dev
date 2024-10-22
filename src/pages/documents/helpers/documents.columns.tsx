import React from 'react';
import styled from 'styled-components';
import { Anchor } from 'grommet';
import { CheckBox, Icons } from '@distate/components';
import PackageStatesService from '@distate/core/dist/application/documents/common/packageStates/PackageStatesService';

import { DOCUMENT_DRAFT, DOCUMENT_VIEW } from '../../../common/Url';
import { EDIT } from '../../../common/Lbl';
import changeIconFill from '../../../utils/changeIconFill';

import { ButtonDetach } from '../../../container/folder/features/detach';
import { IColumn } from '../components/table/types';
import { ButtonDownload } from '../components/buttons';
import { HTMLTags, HTMLTag, HTMLIcons } from '../documents.style';
import { DocumentType } from './documents.typings';
import { getEditUrl } from './documnets.helpers';
import { getExternalTypeToString } from '../../../helpers/heplers';

const IconEdit = changeIconFill(Icons.IconPencil);
const IconDownload = changeIconFill(Icons.IconDownload);

export const HTMLAnchor = styled(Anchor)(({ theme }) => {
  return {
    color: theme.main.font.color.dark,
    ':hover': {
      color: theme.main.font.color.dark
    }
  };
});

export type IRows = DocumentType[];

export type IColumns = {
  rows: DocumentType[];
  folders?: any[];
  onCheck: (item: DocumentType) => void;
  onCheckAll: () => void;
  onDetachFolder: ({ folderId, packageId }: any) => void;
  onClickDownload: (ids: any[]) => void;
  pathname: string;
  isDownload?: boolean;
  isAllSelected?: boolean;
};

export const getColumnts = <D extends DocumentType>({
  rows = [],
  folders,
  pathname,
  isDownload,
  isAllSelected,
  onCheck,
  onCheckAll,
  onDetachFolder,
  onClickDownload
}: IColumns): IColumn<D>[] => {
  const foldersHash: any = folders
    ? folders.reduce((prev, curr) => {
        prev[curr.id] = curr.title;
        return prev;
      }, {})
    : {};

  return [
    {
      width: '229px',
      property: 'companyName',
      header: 'Контрагент',
      format: (value, datum: DocumentType, index) => {
        const {
          status,
          toCompanyName,
          toPersonName,
          fromPersonName,
          fromCompanyName,
          containerID,
          containerSize,
          toCompanyExternalType,
          toCompanyExternalOperator,
          toCompanyNetwork,
          fromCompanyExternalType,
          fromCompanyExternalOperator,
          fromCompanyNetwork
        } = datum;

        /** подготовленная строка с описанием типеа для исходящих */
        const toContractorType = getExternalTypeToString(
          toCompanyExternalType,
          toCompanyExternalOperator,
          toCompanyNetwork
        );

        /** подготовленная строка с описание типа для входящих */
        const fromContractorType = getExternalTypeToString(
          fromCompanyExternalType,
          fromCompanyExternalOperator,
          fromCompanyNetwork
        );

        if (containerSize && rows[index - 1] && containerID === rows[index - 1]['containerID']) {
          return null;
        }

        if (status === 'sent' || status === 'draft' || status === 'signed') {
          if (toPersonName) return toPersonName;
          if (toCompanyName) return toCompanyName + toContractorType;
        }

        if (status === 'received') {
          if (fromPersonName) return fromPersonName;
          if (fromCompanyName) return fromCompanyName + fromContractorType;
        }

        if (toCompanyName) return toCompanyName + toContractorType;
        if (fromCompanyName) return fromCompanyName + fromContractorType;
        if (toPersonName) return toPersonName;
        if (fromPersonName) return fromPersonName;

        return '';
      }
    },
    {
      width: '48px',
      property: 'containerSize',
      format: (value, datum: DocumentType, index) => {
        const { containerID, containerSize } = datum;
        if (
          !value ||
          (containerSize && rows[index - 1] && containerID === rows[index - 1]['containerID'])
        ) {
          return null;
        }

        return (
          <HTMLIcons>
            <Icons.IconFiles />
            <span>{value}</span>
          </HTMLIcons>
        );
      }
    },
    {
      width: '48px',
      property: 'checkbox',
      header: <CheckBox onChange={onCheckAll} checked={!!isAllSelected} />,
      format: (value, datum: DocumentType) => {
        const { checked } = datum;
        return <CheckBox checked={checked} onChange={() => onCheck(datum)} />;
      }
    },
    {
      width: '200px',
      property: 'documentTitle',
      header: 'Документ',
      format: (value, { id, isRead, containerSize }: DocumentType) => {
        const styles: React.CSSProperties = {};
        const hrefView = DOCUMENT_VIEW.replace(':id', id);
        const renders = [];

        if (!isRead) {
          renders.push(
            <HTMLTag key={`tag_${id}`} kind="success">
              новый
            </HTMLTag>
          );
        }

        if (containerSize) {
          styles['marginTop'] = 8;
        }

        renders.push(
          <HTMLAnchor
            key={`link_${id}`}
            style={styles}
            label={value}
            href={hrefView}
            margin={{ vertical: 'small' }}
          />
        );

        return <HTMLTags key={`tags_${id}`}>{renders}</HTMLTags>;
      }
    },
    {
      width: '120px',
      property: 'status',
      header: 'Статус',
      format: (value, datum: DocumentType) => {
        if (pathname === DOCUMENT_DRAFT) {
          if (value === 'signed') {
            return 'Подписан';
          }

          const state = PackageStatesService.getStateByName(datum.packageState, 'OUT');
          return state.label;
        }

        const aggregatedPackageState = PackageStatesService.getAggregatedStateByStateName(
          datum.packageState,
          datum.packageType || 'IN'
        );

        let label = aggregatedPackageState.label;
        if (aggregatedPackageState.name === 'complete' && datum.uvutochExist) {
          label = `${aggregatedPackageState.label} (c уточнением)`;
        }

        return label;
      }
    },
    {
      width: '180px',
      property: 'date',
      header: 'Дата создания'
    },
    // TODO колонка с названием договора для Tektorg
    {
      width: '40px',
      property: 'edit',
      format: (value, datum: DocumentType) => {
        const { id, flowType, flowGroup, status, documentTypeSystemName } = datum;
        const isEdit = status === 'draft' && !['act', 'waybill'].includes(documentTypeSystemName);
        const url = getEditUrl(id, flowType, flowGroup);

        if (!isEdit) {
          return null;
        }

        return (
          <HTMLAnchor title={EDIT} href={url}>
            <IconEdit />
          </HTMLAnchor>
        );
      }
    },
    {
      width: '40px',
      property: 'download',
      format: (value, { packageId }: DocumentType) => (
        <ButtonDownload solid onClick={() => onClickDownload([packageId])} loading={!!isDownload}>
          <IconDownload />
        </ButtonDownload>
      )
    },
    {
      width: '40px',
      property: 'folder',
      format: (value, datum: DocumentType) => {
        const { packageId, labels = [] } = datum;
        const itemFolders = labels.map(item => ({
          id: item.id,
          title: foldersHash.hasOwnProperty(item.id) ? foldersHash[item.id] : item.title
        }));

        return (
          <ButtonDetach
            packageId={packageId}
            folders={itemFolders}
            callbackSuccess={onDetachFolder}
          />
        );
      }
    }
  ];
};

export const getRowClass = (
  item: DocumentType,
  index: number,
  rows: DocumentType[]
): string | undefined => {
  const { containerID, containerSize } = item;
  if (containerSize && rows[index - 1] && rows[index - 1].containerID === containerID) {
    return 'no-border';
  }

  return;
};
