import {
    PowersExercisedSelectionType,
    PowersExercisedType,
    PowersSelectionType,
    PowersSubTrustSelectionType,
    PowersSubTrustType,
    PowersType,
    SelectionType
} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/SelectionType";

export const typeOptions: SelectionType[] = [
    {value: "00000000", label: "Доверенность для взаимодействия между хозяйствующими субъектами"},
    {
        value: "00010000",
        label: "Доверенность для предоставления в налоговые органы и взаимодействия между хозяйствующими субъектами"
    }
]

export enum AddressType {
    normal = 0,
    fias = 1
}


export const addressTypes: SelectionType[] = [
    { label: 'Обычный', value: AddressType.normal.toString() },
    { label: 'ФИАС', value: AddressType.fias.toString() },
];

export const reTrustOptions: SelectionType[] = [
    {value: "1", label: "Без права передоверия"},
    {value: "2", label: "Однократное передоверие"},
    {value: "3", label: "C правом последующего передоверия"}
]


export const Options: SelectionType[] = [
    {label: 'Корневая', value: 'Корневая'},
    {label: 'Дочерняя', value: 'Дочерняя'},
];

export const options: SelectionType[] = [
    {value: "type1", label: "Type 1"},
    {value: "type2", label: "Type 2"},
    {value: "unchecked", label: "unchecked"},
]

export const genderOptions: SelectionType[] = [
    {value: "1", label: "Мужской"},
    {value: "2", label: "Женский"}
]


export const powersDeltsType: PowersExercisedSelectionType[] = [
    {value: PowersExercisedType.individual, label: "Индивидуально"},
    {value: PowersExercisedType.group, label: "Совместно"}
]


export const powersSubTrustType: PowersSubTrustSelectionType[] = [
    {value: PowersSubTrustType.lost, label: "Утрачиваются"},
    {value: PowersSubTrustType.notLost, label: "Не утрачиваются"}
]

export  const privilagesOptions: SelectionType[] = [
    { label: 'Полные', value: 'Полные' },
    { label: 'Ограниченные', value: 'Ограниченные' },
    { label: 'Other', value: 'other' },
];


export const POAType: SelectionType[] = [
    { label: 'Корневая', value: 'Корневая' },
    { label: 'Дочерняя', value: 'Дочерняя' },
]

export const powerOfAttonomyType: PowersSelectionType[] = [
    {value: PowersType.text, label: "Текстовые"},
    {value: PowersType.machineReadable, label: "Машиночитаемые"}
]

export const principalsTypes : Record<string, string> = {
    UL:"russianorg",
    IP: "individualEntrepreneur"
}