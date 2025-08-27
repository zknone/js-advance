abstract class BaseAPI {
  abstract request(...args: any[]): Promise<unknown>;
  create(): Promise<unknown> {
    throw new Error('Not implemented');
  }

  update(): Promise<unknown> {
    throw new Error('Not implemented');
  }

  delete(): Promise<unknown> {
    throw new Error('Not implemented');
  }
}

export default BaseAPI;
