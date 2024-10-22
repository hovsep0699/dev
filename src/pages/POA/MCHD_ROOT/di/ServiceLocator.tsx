import autobind from "autobind-decorator";

type ServiceFactory<T> = (...args: any[]) => T;

export class ServiceLocator {
    private static instance: ServiceLocator;

    private constructor() {}

    @autobind
    public static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    private services: Map<string, { instance?: any; factory?: ServiceFactory<any>; args?: any[] }> = new Map();

    @autobind
    registerSingleton<T>(key: new (...args: any[]) => T, ...args: any[]): void {
        const keyString = key.name;
        console.log("registerSingleton", keyString);
        if (!this.services.has(keyString)) {
            const instance = new key(...args);
            this.services.set(keyString, { instance });
        }
    }

    @autobind
    register<T>(key: new (...args: any[]) => T, factory: ServiceFactory<T>): void {
        const keyString = key.name;
        this.services.set(keyString, { factory, instance: undefined });
    }

    @autobind
    get<T>(key: new (...args: any[]) => T, ...args: any[]): T {
        const keyString = key.name;
        const service = this.services.get(keyString);
        if (!service) {
            throw new Error(`Service not found for key: ${keyString}`);
        }
        if (service.instance) {
            return service.instance;
        }
        if (service.factory) {
            const instance = service.factory(...args);
            service.instance = instance; // Store instance for future calls
            return instance;
        }
        throw new Error(`No instance or factory found for key: ${keyString}`);
    }
}

