import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './style.css';
import {IconCalendar} from '../../assets/icons';
import { format } from 'date-fns';

type Props = {
    value?: Date | null;
    name?: string;
    title?: string;
    onChange?: (date: any) => void;
    label?: string;
    required?: boolean;
    placeholder?: string;
    error?: any;
    errors?: string[];
};

/** Новый компонент календаря без ошибок заполнения */
export const DatePickerNew = (props: Props) => {
    const {value, name, onChange, label, required, placeholder, error, errors, title} = props;
    const [open, setOpen] = useState(false);

    const [startDate, setStartDate] = useState(value);

    useEffect(() => {
        setStartDate(value);
    }, [value]);

    const formatDate = (date: any): string | undefined => {
        if (!date) return undefined;
        return format(date, 'dd.MM.yyyy');
    };
    const handleOnChange = (date: Date) => {
        setStartDate(date);
        if (onChange && typeof onChange === 'function') {
            onChange(date);
        }
        setOpen(false);
    };

    return (
        <div
            className={`date-picker-wrapper ${!label ? 'date-picker-label' : ''} ${
                error ? 'date-picker-error' : ''
            }`}
        >
            {label && (
                <div className={`date-picker-label ${required ? 'date-picker-label--required' : ''}`}>
                    {label}
                </div>
            )}
            <DatePicker
                onInputClick={() => setOpen(!open)}
                onCalendarClose={() => setOpen(false)}
                onClickOutside={() => setOpen(false)}
                open={open}
                value={formatDate(startDate)}
                title={title}
                name={name}
                locale={ru}
                placeholderText={placeholder}
                dateFormat={'dd.MM.yyyy'}
                selected={value ? startDate : null}
                onChange={handleOnChange}
            />
            <div className="date-picker-icon">
                <IconCalendar fill="#70706a" onClick={() => setOpen(!open)}/>
            </div>
            {error && <span className="date-picker-text-error">{error}</span>}
        </div>
    );
};
