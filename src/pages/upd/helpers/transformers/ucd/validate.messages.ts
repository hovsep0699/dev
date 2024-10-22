import { ValidateMessage } from '../../../../../utils/errors';

export const validateMessagesUCD: ValidateMessage = {
  invoiceCorrection: {
    children: {
      date: { name: 'Исходящий УКД (дата)' },
      number: { name: 'Исходящий УКД (номер)' },
      information: {
        children: {
          governmentContractId: { name: 'Идентификатор гос. контракта' }
        }
      },
      infoField: {
        name: 'Дополнительные сведения',
        children: {
          attributeValues: {
            children: {
              value: { name: 'Дополнительные сведения' }
            }
          }
        }
      }
    }
  },

  factActivity3: {
    children: {
      operationInformation: {
        name: 'Содержание операции'
      },
      transferDocuments: {
        children: {
          name: { name: 'Основание (Реквизиты передаточных)' },
          date: { name: 'Дата от (Реквизиты передаточных)' },
          number: { name: '№ (Реквизиты передаточных)' },
          information: { name: 'Доп. информация (Реквизиты передаточных)' }
        }
      },
      basisDocuments: {
        children: {
          name: { name: 'Основание (Реквизиты документов)' },
          date: { name: 'Дата от (Реквизиты документов)' },
          number: { name: '№ (Реквизиты документов)' },
          information: { name: 'Доп. информация (Реквизиты документов)' }
        }
      }
    }
  },

  table: {
    name: 'Таблица',
    children: {
      goods: {
        name: 'Товар/Груз',
        children: {
          count: {
            name: 'Кол-во',
            children: {
              before: { name: 'Кол-во (До изменения)' },
              after: { name: 'Кол-во (После изменения)' }
            }
          },
          costAfterTax: {
            name: 'Цена с НДС',
            children: {
              before: { name: 'Цена за ед. (До изменения)' },
              after: { name: 'Цена за ед. (После изменения)' }
            }
          },

          costBeforeTax: {
            name: 'Цена за ед.',
            children: {
              before: { name: 'Цена за ед. (До изменения)' },
              after: { name: 'Цена за ед. (После изменения)' }
            }
          }
        }
      },

      totalDecrease: {
        name: 'Всего уменьшение',
        children: {
          beforeTax: { name: 'Всего уменьшение без НДС' },
          afterTax: { name: 'Всего уменьшение с НДС' }
        }
      },

      totalIncrease: {
        name: 'Всего увеличение',
        children: {
          afterTax: { name: 'Всего увеличение без НДС' },
          beforeTax: { name: 'Всего увеличение с НДС' }
        }
      }
    }
  }
};
