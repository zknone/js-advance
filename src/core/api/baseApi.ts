abstract class BaseAPI {
  abstract request(...args: any[]): Promise<unknown>;

  create(_data?: any): Promise<unknown> {
    throw new Error('Not implemented');
  }

  update(_data?: any): Promise<unknown> {
    throw new Error('Not implemented');
  }

  delete(_id?: any): Promise<unknown> {
    throw new Error('Not implemented');
  }
}

export default BaseAPI;
