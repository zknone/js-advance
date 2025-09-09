import type { Indexed } from '../types/core';

function getDataFromInputs(formClassName: string): Indexed {
  const inputs = document.querySelectorAll<HTMLInputElement>(`.${formClassName} input[name]`);

  const data = Array.from(inputs).reduce((acc, input) => {
    const key = input.name as string;
    acc[key] = input.value;
    return acc;
  }, {} as Indexed);

  return data;
}

export default getDataFromInputs;
