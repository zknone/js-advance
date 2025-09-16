interface ParsedPath {
  pathname: string;
  query: Record<string, string>;
}

function parsePath(path: string, rawQuery: string): ParsedPath {
  const query: Record<string, string> = {};
  if (rawQuery && rawQuery.startsWith('?')) {
    const params = new URLSearchParams(rawQuery);
    params.forEach((value, key) => {
      query[key] = value;
    });
  }

  return {
    pathname: path,
    query,
  };
}

export default parsePath;
