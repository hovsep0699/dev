import axios from 'axios';

export default async (
  downloadUrl: string,
  successAction?: () => void,
  errorAction?: (error: any) => void
) => {
  try {
    const { data, headers } = await axios.get(downloadUrl, {
      responseType: 'blob',
      timeout: 30000
    });

    // TODO поправить получение названия
    const fileName = decodeURI(headers['content-disposition']).match(/Выгрузка.+zip/);
    const url = URL.createObjectURL(data);

    // TODO найти другой механизм создания ссылки
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName !== null ? fileName[0] : 'Выгрузка.zip');

    document.body.appendChild(link);
    link.click();
    link.parentNode!.removeChild(link);

    successAction && successAction();
  } catch (error) {
    errorAction && errorAction(error);
  }
};
