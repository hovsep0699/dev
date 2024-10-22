import React, {useState} from 'react';
import {StyledInput, InputWrapper, StyledIconAlert, FieldWrapper, StyledFormField} from '../Form.styles';
import FieldLabel from "../FieldLabel";
import FieldError from "../FieldError";
import {useField} from "formik";

export type InputMaskFieldProps = {
    name: string;
    label?: string | null;
    maskReg?: RegExp | null;
    value?: string | number | null;
    onChange?: (e: string) => void | null;
    type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel';
    placeholder?: string;
    hideErrors?: boolean;
    mask?: string | null;
    title?: string;
};

const InputMaskField = ({
                       type = 'text',
                       placeholder,
                       maskReg,
                       name,
                       label,
                       value,
                       hideErrors,
                       onChange,
                       mask,
                       title,
                       ...rest
                   }: InputMaskFieldProps) => {

    const applyMask = (input: string) => {
        let formattedValue = '';
        let inputIndex = 0;

        if (!mask) return  input;
        for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i];

            if (maskChar === 'x') {
                if (input[inputIndex]) {
                    formattedValue += input[inputIndex];
                    inputIndex++;
                } else {
                    break;
                }
            }
            else {
                if (maskReg) {
                    if (maskReg.test(maskChar) && !input[inputIndex] && formattedValue.length > 0) {
                        formattedValue.slice(0, formattedValue.length - 1);
                        continue;
                    }
                }
                else if (maskChar === '-' && !input[inputIndex] && formattedValue.length > 0) {
                    formattedValue.slice(0, formattedValue.length - 1);
                    continue;
                }

                formattedValue += maskChar;
            }
        }

        return formattedValue;
    };
    const [field, meta, helpers] = useField({ name, type });
    const { touched, error } = meta;
    const { setValue } = helpers;
    const [maskedValue, setMaskedValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        const newMaskedValue = applyMask(inputValue);

        setMaskedValue(maskedValue)
        onChange?.(newMaskedValue);
        setValue(newMaskedValue);

    };

    return (
        <StyledFormField>
            {label && <FieldLabel name={name}>{label}</FieldLabel>}

            <FieldWrapper>
                <InputWrapper>
                    <StyledInput
                        hideErrors={hideErrors}
                        error={!!error}
                        touched={touched}
                        placeholder={placeholder ?? ""}
                        type={type}
                        value={value ?? field.value ?? maskedValue ?? ""}
                        title={title}
                        onChange={handleChange}
                        {...rest}
                        name={field.name}
                        checked={field.checked}
                        onBlur={field.onBlur}
                        multiple={field.multiple}
                    />
                    {!hideErrors && error && touched && <StyledIconAlert />}
                </InputWrapper>
            </FieldWrapper>

            {!hideErrors && touched && error ? <FieldError>{error}</FieldError> : null}
        </StyledFormField>

    );
};

export default InputMaskField;
