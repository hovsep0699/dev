import DiError, {
  AUTH,
  REGISTER,
  CERT,
  RECOVER,
  CHANGE_COMPANY,
  CHANGE_SETTINGS,
  AUTOCOMPLETE,
  DOCUMENT,
  SIGN,
  SEND_CONTAINER
} from './Error';

export default function(errorType, messageForDeveloper, jsError, serverErrorResponse) {
  switch (errorType) {
    case AUTH:
      return new DiError(
        errorType,
        'Ошибка авторизации',
        messageForDeveloper,
        jsError,
        serverErrorResponse
      );
    case REGISTER:
     var msgForUser = 'Ошибка регистрации'
      if (serverErrorResponse){
          msgForUser = msgForUser + ':' + serverErrorResponse
      }
      return new DiError(
        errorType,
          msgForUser ,
        messageForDeveloper,
        jsError,
        serverErrorResponse
      );
    case CERT:
      return new DiError(errorType, 'Ошибка сертификатов', messageForDeveloper, jsError);
    case RECOVER:
      return new DiError(
        errorType,
        'Ошибка восстановления пароля',
        messageForDeveloper,
        jsError,
        serverErrorResponse
      );
    case CHANGE_COMPANY:
      return new DiError(errorType, 'Ошибка модификации компании', messageForDeveloper, jsError);
    case CHANGE_SETTINGS:
      return new DiError(errorType, 'Ошибка изменения настроек', messageForDeveloper);
    case AUTOCOMPLETE:
      return new DiError(errorType, 'Ошибка autocomplete-a', messageForDeveloper, jsError);
    case DOCUMENT:
      return new DiError(errorType, 'Ошибка документа', messageForDeveloper, jsError);
    case SIGN:
      return new DiError(errorType, 'Ошибка подписания', messageForDeveloper, jsError);
    case SEND_CONTAINER:
      return new DiError(errorType, 'Ошибка отправки пакета', messageForDeveloper, jsError);
    default:
      throw new Error(`Нет такого типа ошибки. ${errorType}`);
  }
}
