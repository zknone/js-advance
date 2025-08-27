export default function set(object: any, path: string, value: unknown) {
  const keys = path.split('');
  let current = object;

  keys.forEach((key, index) => {
    if (index === key.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
  });
}
