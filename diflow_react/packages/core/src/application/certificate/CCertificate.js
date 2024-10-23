import moment from 'moment'

export default function CCertificate (rawCertificate, data) {
  this.data = data;
  this.rawCertificate = rawCertificate;
  this.dnSubject = [];
  this.dnIssuer = [];

  this.isExtractedFromVerifiedSignature = function () {
      return this.data.extractedFromVerifiedSignature;
  };

  this.getRaw = function () {
      return this.rawCertificate;
  };

  this.getThumbprint = function () {
      return this.data.thumbprint;
  };

  this.getSerialNumber = function () {
      return this.data.serialNumber;
  };

  this.getData = function () {
      return this.data.data;
  };

  this.getValidFromDate = function () {
      return _parseDate(this.data.validFrom);
  };

  this.getValidToDate = function () {
      return _parseDate(this.data.validTo);
  };

  this.isActual = function () {
      return moment(this.getValidToDate(), 'DD.MM.YYYY H:m:s').unix() > moment().unix() && moment(this.getValidFromDate(), 'DD.MM.YYYY H:m:s').unix() < moment().unix();
  };

  this.dnSubject = _parseString(this.data.subjectName);
  this.dnIssuer = _parseString(this.data.issuerName);

  function _parseDate(date, bUTC) {
      bUTC = bUTC == true;
      const oDate = new Date(date);
      const arDate = [bUTC ? oDate.getUTCDate() : oDate.getDate(), bUTC ? oDate.getUTCMonth() + 1 : oDate.getMonth() + 1, bUTC ? oDate.getUTCFullYear() : oDate.getFullYear(), bUTC ? oDate.getUTCHours() : oDate.getHours(), bUTC ? oDate.getUTCMinutes() : oDate.getMinutes(), bUTC ? oDate.getUTCSeconds() : oDate.getSeconds()];

      for (let i = 0; i < arDate.length; i++) {
          while (String(arDate[i]).length < 2) {
              arDate[i] = `0${arDate[i]}`;
          }
      }
      return `${arDate[0]}.${arDate[1]}.${arDate[2]} ${arDate[3]}:${arDate[4]}:${arDate[5]}`;
  }

  function _parseString(str) {
      function trim(str) {
          return str.replace(/^\s+|\s+$/g, '');
      }

      const res = [];
      let DN = '';
      let DNValue = '';
      let bIn = false;
      let bEqual = false;
      for (let i = 0; i < str.length; i++) {
          if (str[i] == '"') {
              bIn = !bIn;
          } else if (str[i] == '=' && !bIn) {
              bEqual = true;
              DNValue = '';
          } else if (str[i] == ',' && !bIn) {
              bEqual = false;
              if (DN != '' && DNValue != '') {
                  res[trim(DN)] = trim(DNValue);
              }
              DN = '';
          } else if (!bEqual) {
              DN += str[i];
          } else {
              DNValue += str[i];
          }
      }
      if (DN != '' && DNValue != '') {
          res[trim(DN)] = trim(DNValue);
      }

      const dnReplacements = {
          ИНН: 'INN',
          СНИЛС: 'SNILS',
          ОГРН: 'OGRN',
          ОГРНИП: 'OGRNIP'
      };

      for (const j in res) {
          if (res.hasOwnProperty(j) && dnReplacements[j]) {
              res[dnReplacements[j]] = res[j];
              delete res[j];
          }
      }

      return res;
  }
}