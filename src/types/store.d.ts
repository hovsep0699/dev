import { DefaultState as SignState } from '../container/sign/helpers/sign.typings';
import { DefaultState as FolderState } from '../container/folder/helpers/folder.typings';
import { DefaultState as FilterState } from '../container/filter/helpers/filter.typings';
import { DefaultState as DocumentState } from '../pages/documents/helpers/documents.typings';
import { DefaultState as CompanyState } from '../pages/company/helpers/company.typings';
import { DefaultState as SystemState } from '../pages/system/helpers/typings';
import { DefaultState as ContractorsState } from '../pages/contractors/helpers/contractors.typings';
import { DefaultState as FinanceState } from '../pages/finance/helpers/finance.typings';
import { DefaultState as CreateDocument } from '../pages/create-document/helpers/createDocument.typings';
import { DefaultState as CabinetState } from '../pages/cabubet/helpers/cabubet.typings';
import { DefaultState as TariffState } from '../pages/tariff/helpers/typings';

export type RootState = {
  sign: SignState;
  filter: FilterState;
  folders: FolderState;
  company: CompanyState;
  system: SystemState;
  documents: DocumentState;
  contractors: ContractorsState;
  finance: FinanceState;
  createDocument: CreateDocument;
  cabinet: CabinetState;
  tariff: TariffState;
};
