import React, {useEffect, useState} from 'react';
import {Input, InputProps} from '../Input'; // Adjust the import path as needed

export type InputMaskProps = {
    value?: string;
    mask: string; // e.g., '(999) 999-9999'
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
} & Omit<InputProps, 'onChange' | 'value'>;

export const InputMask: React.FC<InputMaskProps> = ({
    value = '',
    children,
    mask,
    placeholder = '',
    onChange,
    disabled,
    className,
    style,
    ...props
}) => {
    const [maskedValue, setMaskedValue] = useState(value);

    useEffect(() => {
        setMaskedValue(value);
    }, [value]);

    const applyMask = (input: string) => {
        let formattedValue = '';
        let inputIndex = 0;

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
                if (maskChar === '-' && !input[inputIndex] && formattedValue.length > 0) {
                    formattedValue.slice(0, formattedValue.length - 1);
                    continue;
                }
                // if (input[inputIndex] === "-") {
                //     ++inputIndex;
                //     continue ;
                // }
                formattedValue += maskChar; // Static character from the mask

                // if (!input[inputIndex] && formattedValue.length > 0) {
                //     // Add the mask character if no input exists
                //     inputIndex++;
                // } // Static character from the mask
            }
        }

        return formattedValue;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        const newMaskedValue = applyMask(inputValue);

        setMaskedValue(newMaskedValue);
        onChange?.(newMaskedValue);
    };
    return (
        <Input
            {...props}
            value={maskedValue}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}
            className={className}
            style={style}
        />
    );
};
