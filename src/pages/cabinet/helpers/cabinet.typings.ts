/** дефолтный стейт Кабинета */
export type DefaultState = {
  employee?: Employee;
  errors?: any;
  notificationSetting?: any;
  certificates?: any;
};

export type Employee = {
  surname: string;
  name: string;
  patronymic: string;
  position: string;
  email: string;
};
