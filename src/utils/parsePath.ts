import { API_BASE_URL } from '../consts/api';

interface ParsedPath {
  pathname: string;
  query: Record<string, string>;
}

function parsePath(path: string, rawQuery: string): ParsedPath {
  const url = new URL(path, API_BASE_URL);
  const query: Record<string, string> = {};
  if (rawQuery.startsWith('?')) {
    const params = new URLSearchParams(rawQuery);

    params.forEach((value, key) => {
      query[key] = value;
    });
  }

  return {
    pathname: url.pathname,
    query,
  };
}

export default parsePath;
