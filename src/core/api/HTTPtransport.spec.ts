/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import HTTPTransport from './HTTPtransport';

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let xhrMock: any;

  let requests: any = [];

  function XHRMockConstructor() {
    xhrMock = {
      open(method: string, url: string) {
        this.method = method;
        this.url = url;
      },
      setRequestHeader(key: string, value: string) {
        (this.headers ||= {})[key] = value;
      },
      send(body?: any) {
        this._sentBody = body;
        requests.push(this);
      },
      withCredentials: false,
      status: 200,
      responseText: JSON.stringify({ ok: true }),
      getResponseHeader: (name: string) => (name === 'Content-Type' ? 'application/json' : null),
      onload: null as null | (() => void),
      onerror: null as null | (() => void),
      onabort: null as null | (() => void),
      ontimeout: null as null | (() => void),
    };
    return xhrMock;
  }

  beforeEach(() => {
    http = new HTTPTransport('https://example.com');
    requests = [];

    (global as any).XMLHttpRequest = XHRMockConstructor as any;
  });

  it('call GET with correct url', async () => {
    const promise = http.get<{ ok: boolean }>({ url: '/test' });

    xhrMock.onload();

    const result = await promise;
    expect(result).to.deep.equal({ ok: true });
    expect(xhrMock.method).to.equal('GET');
    expect(xhrMock.url).to.equal('https://example.com/test');
  });

  it('rejects with error', async () => {
    const promise = http.get<{ ok: boolean }>({ url: '/fail' });

    xhrMock.status = 500;
    xhrMock.responseText = JSON.stringify({ reason: 'fail' });
    xhrMock.onload();

    try {
      await promise;
      throw new Error('Ожидался reject');
    } catch (e: any) {
      expect(e).to.deep.equal({ reason: 'fail' });
    }
  });

  it('call POST with JSON body', async () => {
    const promise = http.post<{ ok: boolean }>({
      url: '/post',
      options: { data: { foo: 'bar' } },
    });

    xhrMock.onload();
    expect(xhrMock.method).to.equal('POST');
    expect(xhrMock.headers['Content-Type']).to.equal('application/json');
    expect(JSON.parse(xhrMock._sentBody)).to.deep.equal({ foo: 'bar' });

    const result = await promise;
    expect(result).to.deep.equal({ ok: true });
  });

  it('call PUT with FormData', async () => {
    const form = new FormData();
    form.append('key', 'value');

    const promise = http.put<{ ok: boolean }>({
      url: '/put',
      options: { data: form },
    });

    xhrMock.onload();
    expect(xhrMock.method).to.equal('PUT');
    expect(xhrMock._sentBody).to.equal(form);

    const result = await promise;
    expect(result).to.deep.equal({ ok: true });
  });

  it('call DELETE without body', async () => {
    const promise = http.delete<{ ok: boolean }>({ url: '/delete' });

    xhrMock.onload();
    expect(xhrMock.method).to.equal('DELETE');
    expect(xhrMock._sentBody).to.equal(undefined);

    const result = await promise;
    expect(result).to.deep.equal({ ok: true });
  });

  it('rejects on timeout', async () => {
    const promise = http.get({ url: '/timeout' });
    xhrMock.ontimeout();

    try {
      await promise;
      throw new Error('Ожидался reject');
    } catch (e) {
      expect(e).to.not.equal(undefined);
    }
  });
});
