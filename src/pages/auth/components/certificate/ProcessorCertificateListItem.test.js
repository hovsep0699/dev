import ProcessorCertificateListItem from './ProcessorCertificateListItem';
import ReactDOM from 'react-dom';
import Certificate from '@distate/core/dist/domain/common/Certificate';

it('Физическое лицо', () => {
  const certificate = new Certificate(
    {
      SN: 'Физицкая',
      G: 'Майя Эдуардовна',
      STREET: 'Санкт-Петербург',
      CN: 'Физицкая Майя Эдуардовна',
      L: 'Санкт-Петербург',
      C: 'RU',
      E: 'fizickaya@mail.ru',
      INN: '465296166930',
      SNILS: '46239571406'
    },
    '28CFEC3D5E8234BC96A0C058DD3C8BCEA8F480C8',
    '2019-05-20T08:40:00.000Z',
    '2020-08-20T08:50:00.000Z'
  );
  const div = document.createElement('div');
  ReactDOM.render(
    ProcessorCertificateListItem.getTransformation(certificate, true, () => {
      console.log('click');
    }),
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
