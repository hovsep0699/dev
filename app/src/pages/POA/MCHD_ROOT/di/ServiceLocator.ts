import autobind from "autobind-decorator";

type ServiceFactory<T> = (...args: any[]) => T;

export class ServiceLocator {
    private static instance?: ServiceLocator | null;

    private constructor() {}

    public static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance!;
    }

    private services: Map<string, { instance?: any; factory?: ServiceFactory<any>; args?: any[] }> = new Map();

    @autobind
    public registerSingleton<T>(key: new (...args: any[]) => T, keyName: string, ...args: any[]): void {
        const keyString = keyName;
        console.log("registerSingleton", keyString);
        if (!this.services.has(keyString)) {
            const instance: T = new key(...args);
            this.services.set(keyString, { instance });
        }
    }

    @autobind
    public register<T>(key: new (...args: any[]) => T, keyName: string, factory: ServiceFactory<T>): void {
        const keyString = key.name;
        this.services.set(keyString, { factory, instance: undefined });
    }

    @autobind
    public get<T>(keyName: string, ...args: any[]): T {
        const keyString = keyName;
        const service = this.services.get(keyString);
        if (!service) {
            throw new Error(`Service not found for key: ${keyString}`);
        }
        if (service.instance) {
            return service.instance as T;
        }
        if (service.factory) {
            const instance = service.factory(...args);
            service.instance = instance; // Store instance for future calls
            return instance as T;
        }
        throw new Error(`No instance or factory found for key: ${keyString}`);
    }
}

