import * as Yup from "yup";

const isRequiredForType = (type: any, ...fields: any[]) => {
    return (value: any, context: any) => {

        const anyFieldFilled = fields.some(field => context.parent[field]);
        const allFieldsFilled = fields.every(field => context.parent[field]);
        if (fields.some((field)=>field.name === "expireAt" ? field.value : null) && !allFieldsFilled)
            return false;

        if (type === 'REPRIP' || type === 'REPRFL') {
            const allFieldsFilled = fields.every(field => context.parent[field]);
            if (value) {
                return true;
            }
            if (!allFieldsFilled) {
                return false;
            }
        } else {
            if (anyFieldFilled) {
                const allFieldsFilled = fields.every(field => context.parent[field] || value);
                if (!allFieldsFilled) {
                    return false;
                }
            }
        }
        return true;
    };
};

export const PersonalDocumentValidationScheme = {
    kind: Yup.string().test('required-for-type',
        'Выберите документ удостоверяющий личность', function(value) {
        return isRequiredForType(this.parent.type, 'serialnumber', 'issuedAt', 'issuer', 'issuerCode', "expireAt").call(this, value, this);
    }),
    serialnumber: Yup.string().test('required-for-type',
        'Поле обязательно для ввода', function(value) {
        return isRequiredForType(this.parent.type, 'kind', 'issuedAt', 'issuer', 'issuerCode', 'expireAt').call(this, value, this);
    }),
    issuedAt: Yup.string().test('required-for-type',
        'Введите дату выдачи документа', function(value) {
        return isRequiredForType(this.parent.type, 'kind', 'serialnumber', 'issuer', 'issuerCode', "expireAt").call(this, value, this);
    }),
    issuer: Yup.string().test('required-for-type',
        'Поле обязательно для ввода', function(value) {
        return isRequiredForType(this.parent.type, 'kind', 'serialnumber', 'issuedAt', 'issuerCode', "expireAt").call(this, value, this);
    }),
    issuerCode: Yup.string().test('required-for-type',
        'Введите 7-значный код', function(value) {
        return isRequiredForType(this.parent.type, 'kind', 'serialnumber', 'issuedAt', 'issuer', "expireAt").call(this, value, this);
    }),
};
