type OptionsWithTries = RequestInit & { tries: number };

const fetchWithRetry = (url: string, options: OptionsWithTries): Promise<unknown> => {
  const { tries = 1 } = options;

  function onError(err: Error) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return fetch(url, options).catch(onError);
};

export default fetchWithRetry;
