import Core from './Core';
import ULCompany from '../domain/legal_entity/Company';
import IPCompany from '../domain/individual_entrepreneur/Company';
import Environment from './Environment';
import ULEmployee, { ACTIVE_STATUS, INACTIVE_STATUS, WAITING_STATUS } from '../domain/legal_entity/Employee';
import IPEmployee from '../domain/individual_entrepreneur/Employee';
import ULEmployeesActiveStub from './auth/stubs/ULEmployeesActiveStub';
import ULEmployeesInactiveStub from './auth/stubs/ULEmployeesInactiveStub';
import ULEmployeesWaitingStub from './auth/stubs/ULEmployeesWaitingStub';
import IPEmployeesActiveStub from './auth/stubs/IPEmployeesActiveStub';
import IPEmployeesInactiveStub from './auth/stubs/IPEmployeesInactiveStub';
import IPEmployeesWaitingStub from './auth/stubs/IPEmployeesWaitingStub';

expect.extend({
  toBeArrayOfClassInstances(received, Class) {
    const isArray = Array.isArray(received);
    const hasLength = received.length;
    const isNotClassInstance = received.some(obj => !(obj instanceof Class));

    return {
      message: () => `expected to be Array<${Class.name}>(length > 0)`,
      pass: isArray && hasLength && !isNotClassInstance,
    };
  },
});

describe('getEmployees UL active', () => {
  const initSettings = () => {
    Environment.setAuthGateway(new ULEmployeesActiveStub());
    Core._company = new ULCompany(50);
  };
  beforeEach(initSettings);
  test('Check totalRecords UL active', () => {
    expect.assertions(1);
    return Core.getEmployees(ACTIVE_STATUS).then((res) => {
      expect(res.totalRecords).toBe(1);
    });
  });
  test('Check employees classes UL active', () => {
    expect.assertions(1);
    return Core.getEmployees(ACTIVE_STATUS).then((res) => {
      expect(res.employees).toBeArrayOfClassInstances(ULEmployee);
    });
  });
});

describe('getEmployees UL inactive', () => {
  const initSettings = () => {
    Environment.setAuthGateway(new ULEmployeesInactiveStub());
    Core._company = new ULCompany(50);
  };
  beforeEach(initSettings);
  test('Check totalRecords UL inactive', () => {
    expect.assertions(1);
    return Core.getEmployees(INACTIVE_STATUS).then((res) => {
      expect(res.totalRecords).toBe(1);
    });
  });
  test('Check employees classes UL inactive', () => {
    expect.assertions(1);
    return Core.getEmployees(INACTIVE_STATUS).then((res) => {
      expect(res.employees).toBeArrayOfClassInstances(ULEmployee);
    });
  });
});

describe('getEmployees UL waiting', () => {
  const initSettings = () => {
    Environment.setAuthGateway(new ULEmployeesWaitingStub());
    Core._company = new ULCompany(50);
  };
  beforeEach(initSettings);
  test('Check totalRecords UL waiting', () => {
    expect.assertions(1);
    return Core.getEmployees(WAITING_STATUS).then((res) => {
      expect(res.totalRecords).toBe(4);
    });
  });
  test('Check employees classes UL waiting', () => {
    expect.assertions(1);
    return Core.getEmployees(WAITING_STATUS).then((res) => {
      expect(res.employees).toBeArrayOfClassInstances(ULEmployee);
    });
  });
});

describe('getEmployees IP active', () => {
  const initSettings = () => {
    Environment.setAuthGateway(new IPEmployeesActiveStub());
    Core._company = new IPCompany(50);
  };
  beforeEach(initSettings);
  test('Check totalRecords IP active', () => {
    expect.assertions(1);
    return Core.getEmployees(ACTIVE_STATUS).then((res) => {
      expect(res.totalRecords).toBe(1);
    });
  });
  test('Check employees classes IP active', () => {
    expect.assertions(1);
    return Core.getEmployees(ACTIVE_STATUS).then((res) => {
      expect(res.employees).toBeArrayOfClassInstances(IPEmployee);
    });
  });
});

describe('getEmployees IP inactive', () => {
  const initSettings = () => {
    Environment.setAuthGateway(new IPEmployeesInactiveStub());
    Core._company = new IPCompany(50);
  };
  beforeEach(initSettings);
  test('Check totalRecords IP inactive', () => {
    expect.assertions(1);
    return Core.getEmployees(INACTIVE_STATUS).then((res) => {
      expect(res.totalRecords).toBe(1);
    });
  });
  test('Check employees classes IP inactive', () => {
    expect.assertions(1);
    return Core.getEmployees(INACTIVE_STATUS).then((res) => {
      expect(res.employees).toBeArrayOfClassInstances(IPEmployee);
    });
  });
});

describe('getEmployees IP waiting', () => {
  const initSettings = () => {
    Environment.setAuthGateway(new IPEmployeesWaitingStub());
    Core._company = new IPCompany(50);
  };
  beforeEach(initSettings);
  test('Check totalRecords IP waiting', () => {
    expect.assertions(1);
    return Core.getEmployees(WAITING_STATUS).then((res) => {
      expect(res.totalRecords).toBe(3);
    });
  });
  test('Check employees classes IP waiting', () => {
    expect.assertions(1);
    return Core.getEmployees(WAITING_STATUS).then((res) => {
      expect(res.employees).toBeArrayOfClassInstances(IPEmployee);
    });
  });
});
