import * as Yup from "yup";
import {AddressType} from "../SelectionConstants";

export const AddressValidationScheme = {
    regionCode: Yup.string().when(['type', 'addressType', 'Index', 'Province', 'city', 'settlement', 'street', 'house', 'block', 'flat', 'fiasId', 'fiasText'], {
        is: (type, addressType, Index, Province, city, settlement, street, house, block, flat) =>
            addressType === AddressType.normal.toString() &&
            (type === 'UL' ||
            [Index, city, street, house, Province, settlement, block, flat].some(field => field)),
        then: Yup.string().required('Введите код региона'),
        otherwise: Yup.string().when(['type', 'addressType', 'fiasId', 'fiasText'], {
            is: (type, addressType, fiasId, fiasText) =>
                (addressType === AddressType.fias.toString() &&
                type === 'UL') ||
                (fiasId || fiasText),
            then: Yup.string().required('Введите код региона'),
        }),
    }),
    Index: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => addressType === AddressType.normal.toString() && type === 'UL',
        then: Yup.string().required('Введите индекс'),
    }),
    city: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => addressType === AddressType.normal.toString() && type === 'UL',
        then: Yup.string().required('Поле обязательно для ввода'),
    }),
    street: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => addressType === AddressType.normal.toString() && type === 'UL',
        then: Yup.string().required('Поле обязательно для ввода'),
    }),
    house: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => addressType === AddressType.normal.toString() && type === 'UL',
        then: Yup.string().required('Поле обязательно для ввода'),
    }),
    flat: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => addressType === AddressType.normal.toString() && type === 'UL',
        then: Yup.string().required('Поле обязательно для ввода'),
    }),
    fiasId: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => type === 'UL' && addressType === AddressType.fias.toString(),
        then: Yup.string().required('Введите идентификатор адреса ФИАС'),
    }),
    fiasText: Yup.string().when(['type', 'addressType'], {
        is: (type, addressType) => type === 'UL' && addressType === AddressType.fias.toString(),
        then: Yup.string().required('Поле обязательно для ввода'),
    }),
};