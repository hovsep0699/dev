import React, { useRef, useState } from 'react';
import './style.css';
import { Flash } from '../flash';

type Props = {
  onUpload: any;
  maxLarge?: number;
};
export function DragAndDrop(props: Props) {
  const { onUpload, maxLarge } = props;

  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string>();

  const dropRef = useRef<any>();

  const onDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /** загрузка перетаскиванием */
  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e?.dataTransfer?.files;

    if (maxLarge && maxLarge < files[0].size) {
      Flash.error(`Размер файла не может быть больше ${maxLarge / 1_000_000}MB`);
    } else {
      setFileName(files[0].name);
      onUpload(files[0]);
    }

    setDragging(false);
  };

  /** загрузка через кнопку */
  const onChange = (e: any) => {
    e.preventDefault();
    const files = e?.target?.files;

    if (maxLarge && maxLarge < files[0].size) {
      Flash.error(`Размер файла не может быть больше ${maxLarge / 1_000_000}MB`);
    } else {
      setFileName(files[0].name);
      onUpload(files[0]);
    }
  };

  /** нажатие на кнопку вызывает клик по инпуту */
  const onClick = () => {
    dropRef.current.click();
  };

  /** объект входит в зону дропа */
  const onDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  /** объект выходит из зоны дропа */
  const onDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <>
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeaveCapture={onDragLeave}
        onDragEnterCapture={onDragEnter}
        className="drag-and-drop-field"
        style={{ backgroundColor: dragging ? '#e5e5e5' : '#fff' }}
        onClick={onClick}
      >
        <input type="file" onChange={e => onChange(e)} style={{ display: 'none' }} ref={dropRef} />
        {fileName ? fileName : 'Загрузить файл'}
      </div>
    </>
  );
}
