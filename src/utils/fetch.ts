import type { AdditionalField } from '../types/core';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

type HTTPMethod = (typeof METHODS)[keyof typeof METHODS];

interface RequestOptions extends AdditionalField {
  method: HTTPMethod;
  timeout: number;
  headers: Record<string, string>;
  data: Record<string, string>;
}

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?'
  );
}

class HTTPTransport {
  static get = (url: string, options: RequestOptions = {} as RequestOptions) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  static post = (url: string, options: RequestOptions = {} as RequestOptions) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  static put = (url: string, options: RequestOptions = {} as RequestOptions) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  static delete = (url: string, options: RequestOptions = {} as RequestOptions) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  static request = (
    url: string,
    options: RequestOptions = {} as RequestOptions,
    timeout = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function onLoadHandler() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (typeof data === 'object') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
