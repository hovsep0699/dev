import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragAndDrop } from '../../../../common/drag-and-drop';
import { Button, ButtonKinds } from '@distate/components';
import { sendFile } from '../../store/actions';
import { selectDocumentType, selectFileResponseId } from '../../store/selectors';
import { DocumentType, DocumentTypeName } from '../../helpers/createDocument.typings';
import { Universal } from './forms/Universal';
import { InvoiceUtd } from './forms/InvoiceUtd';
import { Default } from './forms/Default';

export const CreateFromFile = () => {
  const [file, setFile] = useState<File>();
  const onUpload = (currentFile: File) => {
    setFile(currentFile);
  };

  const dispatch = useDispatch();

  const documentType = useSelector(selectDocumentType);
  const fileResponseId = useSelector(selectFileResponseId);

  const onSend = () => {
    dispatch(sendFile(file));
  };

  const isUniversal = documentType === DocumentType.universal;
  const isInvoiceUtd = documentType === DocumentType.on_nschfdoppr;
  const isDefault = documentType && !isUniversal && !isInvoiceUtd;

  const title = DocumentTypeName[documentType!];

  return (
    <>
      <DragAndDrop onUpload={onUpload} maxLarge={50_000_000} />
      <Button kind={ButtonKinds.Secondary} style={{ marginTop: 10 }} onClick={onSend}>
        Отправить
      </Button>

      {documentType === DocumentType.universal && (
        <Universal id={fileResponseId!} title={title} enableTitle={file!.name} />
      )}
      {documentType === DocumentType.on_nschfdoppr && (
        <InvoiceUtd id={fileResponseId!} title={title} />
      )}
      {isDefault && <Default id={fileResponseId!} title={title} />}
    </>
  );
};
