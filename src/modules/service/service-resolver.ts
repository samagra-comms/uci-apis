export interface User {
  id: string;
}

export interface ServiceResponse<T> {
  data: T;
}

export abstract class ServiceResolver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract resolve(string): Promise<ServiceResponse<User> | null>;
}
