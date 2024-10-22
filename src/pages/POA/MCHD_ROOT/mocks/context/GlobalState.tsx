import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RecordData {
  doviritel: string;
  predstavitel: string;
  identifier: string;
  dataVidachi: string;
  dataNachala: string;
  dataOkonchaniya: string;
  status: string;
  isUsed: boolean;
}

 /* 
 Legal entity = անհատ ձեռներեց
  Individual entrepreneur = իրավաբանական անձ
  International Individual entrepreneur = միջազգային իրավաբանական անձ

 
 */

export enum UserType {
  LegalEntity = 'Legal entity',
  IndividualEntrepreneur = 'Individual entrepreneur',
  InternationalIndividualEntrepreneur = 'International Individual entrepreneur',
}

interface GlobalStateContextType {
  records: RecordData[];
  setRecords: React.Dispatch<React.SetStateAction<RecordData[]>>;
  isCompany: boolean;
  setIsCompany: React.Dispatch<React.SetStateAction<boolean>>;
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(UserType.LegalEntity); // Default to 'Legal entity'
  const [records, setRecords] = useState<RecordData[]>([
    {
      doviritel: 'ООО "Ромашка и Лютики"',
      predstavitel: 'Петров Петр Петрович (123456789123)',
      identifier: '98fca4ad-5a0c-4a4a-9d25-0b4d2f6b837e',
      dataVidachi: '16.05.2026',
      dataNachala: '16.05.2027 12:00:00+03:00',
      dataOkonchaniya: '16.05.2028 12:00:00+03:00',
      status: 'Отозвана',
      isUsed: false,
    },
    {
      doviritel: 'ООО "Ромашка облачко и партнеры"',
      predstavitel: 'Петров Петр Петрович (123456789123)',
      identifier: 'a1b3c2d4-e5f6-4b7a-89c0-1d3e3f45g6h1',
      dataVidachi: '16.05.2026',
      dataNachala: '16.05.2027 12:00:00+03:00',
      dataOkonchaniya: '16.05.2028 12:00:00+03:00',
      status: 'Действительна',
      isUsed: true,
    },
  ]);

  return (
    <GlobalStateContext.Provider value={{ records, setRecords, isCompany, setIsCompany, userType, setUserType }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
