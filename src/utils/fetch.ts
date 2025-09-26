import { httpStatus } from '../consts/api';
import type { AdditionalField } from '../types/core';
import queryStringify from './queryStringify';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

type HTTPMethod = (typeof METHODS)[keyof typeof METHODS];

interface RequestOptions extends AdditionalField {
  method?: HTTPMethod;
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
}

interface FetchRequest {
  url: string;
  options?: RequestOptions;
}

function getFullUrl(baseUrl: string, url: string) {
  return `${baseUrl}${url}`;
}

interface ApiError {
  reason: string;
}

class HTTPTransport {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<T>(request: FetchRequest) {
    const { url, options } = request;
    return this.request<T>(
      getFullUrl(this.baseUrl, url),
      { ...options, method: METHODS.GET },
      options?.timeout
    );
  }

  post<T>(request: FetchRequest) {
    const { url, options } = request;
    return this.request<T>(
      getFullUrl(this.baseUrl, url),
      { ...options, method: METHODS.POST },
      options?.timeout
    );
  }

  put<T>(request: FetchRequest) {
    const { url, options } = request;
    return this.request<T>(
      getFullUrl(this.baseUrl, url),
      { ...options, method: METHODS.PUT },
      options?.timeout
    );
  }

  delete<T>(request: FetchRequest) {
    const { url, options } = request;
    return this.request<T>(
      getFullUrl(this.baseUrl, url),
      { ...options, method: METHODS.DELETE },
      options?.timeout
    );
  }

  request<T = unknown>(
    fullUrl: string,
    options: RequestOptions = {} as RequestOptions,
    timeout = 5000
  ): Promise<T> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${fullUrl}${queryStringify(data)}` : fullUrl);
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function onLoadHandler() {
        const contentType = xhr.getResponseHeader('Content-Type') ?? '';
        const isJson = contentType.includes('application/json');

        const response = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;

        if (xhr.status >= httpStatus.Ok && xhr.status < httpStatus.MultipleChoices) {
          resolve(response as T);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(response as ApiError);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'object') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
