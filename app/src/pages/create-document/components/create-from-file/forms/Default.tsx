import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select, Button, ButtonKinds } from '@distate/components';
import Core from '@distate/core/dist/application/Core';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import { createDocumentFromFile } from '../../../store/actions';
import { AutocompleteRecipient } from '../../common/AutocompleteRecipient';

type Props = {
  id: string;
  title?: string;
};

/** форма без доп полей ввода */
export const Default = (props: Props) => {
  const { id, title } = props;

  const dispatch = useDispatch();
  const companyGateway = new CompanyGateway();

  /** опции селекта подразделений отправителя */
  const [senderOptions, setSenderOptions] = useState<any>();
  /** получатель */
  const [recipient, setRecipient] = useState<any>();
  /** подразделение отправителя */
  const [sender, setSender] = useState<HTMLSelectElement>();
  const [senderError, setSenderError] = useState<boolean>();
  const [recipientError, setRecipientError] = useState<boolean>();

  /** преобразование ответа сервера в массив для опций селекта контрагента */
  function contractorDataToOptions(data: any[]) {
    return data.map(item => {
      return {
        value: item.id,
        label: item.title
      };
    });
  }

  useEffect(() => {
    const getSender = async () => {
      const userId = Core.user?.employee?.id;
      const { rows = [] } = await companyGateway.getEmployeeDivision(userId, {
        isActive: 1
      });
      setSenderOptions(contractorDataToOptions(rows));
    };
    getSender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** проверка валидации */
  const validation = () => {
    let isValid = true;

    if (!sender) {
      setSenderError(true);
      isValid = false;
    } else {
      setSenderError(false);
    }

    if (!recipient) {
      setRecipientError(true);
      isValid = false;
    } else {
      setRecipientError(false);
    }

    return isValid;
  };

  /** создать документ */
  const onCreateDocument = () => {
    if (!validation()) {
      return false;
    }

    const params = {
      from: { division: sender?.value },
      to: { division: recipient?.value }
    };
    dispatch(createDocumentFromFile({ id, params }));
  };

  return (
    <div>
      <h2 className="header">{title}</h2>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Подразделение отправителя</div>
          <div className="two-columns-center_value">
            <Select
              value={sender}
              options={senderOptions}
              onChange={(e: HTMLSelectElement) => setSender(e)}
              placeholder=""
              width={400}
              error={senderError}
              touched={senderError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Получатель</div>
          <div className="two-columns-center_value" style={{ width: 400 }}>
            <AutocompleteRecipient
              setItem={setRecipient}
              item={recipient}
              error={recipientError}
              placeholder=""
              qParams={{ isActive: 1, type: 'division' }}
            />
          </div>
        </div>
      </div>

      <Button kind={ButtonKinds.Orange} onClick={onCreateDocument}>
        Создать документ
      </Button>
    </div>
  );
};
