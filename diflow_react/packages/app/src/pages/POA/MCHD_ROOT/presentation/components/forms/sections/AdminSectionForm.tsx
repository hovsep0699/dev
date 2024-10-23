import {Box} from 'grommet';
import React from 'react';
import Button from '@distate/app/src/pages/POA/MCHD_ROOT/common/Button';
import {IconMinus, IconPencil, IconPlus} from '@distate/app/src/pages/POA/MCHD_ROOT/assets/icons';

function AdminSectionForm({
                              setFieldValue,
                              handleSubmitSubAdmin,
                              handleRemoveSubAdmin,
                              handleEditSubAdmin,
                              adminIndex,
                              admins
                          }: any) {
    const handleSubmitAdmin = async (formData: any) => {
        await setFieldValue('Admin', formData);
    };

    const handleEditClick = (admin: any) => {
        setFieldValue('Admin', admin);
    };

    return (
        <>
            <Box direction="column" gap="20px" justify="center" width="medium">

                {admins?.length === 0 && (
                    <Box direction="row" gap="40px" justify="center" width="100%">
                        <h4>Руководитель Организации*</h4>
                        <Box direction="row" gap="20px" justify="end">
                            <Button
                                icon={<IconPlus/>}
                                onClick={(e) => {
                                    if (handleSubmitSubAdmin) {
                                        handleSubmitSubAdmin(e, 0, handleSubmitAdmin);
                                    }
                                }}
                                children="Добавить"
                            />
                        </Box>
                    </Box>
                )}

                {admins && admins.map((Admin: any, index: any) => (
                    <Box direction="row" gap="20px" justify="between" width="100%" key={index}>
                        <h4>Руководитель*</h4>
                        <p>{Admin.snils ?? ''}</p>
                        <Box direction="row" gap="20px">
                            <Button
                                icon={<IconPencil/>}
                                children="Изменить"
                                onClick={(e) => {
                                    if (handleEditSubAdmin) {
                                        handleEditSubAdmin(Admin, index, handleEditClick);
                                    }
                                }}
                            />
                            <Button
                                icon={<IconMinus/>}
                                children="Удалить"
                                onClick={(e) => {
                                    if (handleRemoveSubAdmin) {
                                        handleRemoveSubAdmin(Admin, index);
                                    }
                                }}
                            />
                            {index === admins.length - 1 &&
                                <Button
                                    icon={<IconPlus/>}
                                    children="Добавить"
                                    onClick={(e) => {
                                        if (handleSubmitSubAdmin) {
                                            handleSubmitSubAdmin(e, index, handleSubmitAdmin);
                                        }
                                    }}
                                />}
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default AdminSectionForm;
