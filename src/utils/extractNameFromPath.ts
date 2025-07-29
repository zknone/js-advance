export default function extractNameFromPath(path: string) {
  return path
    .split('/')
    .find((item) => item.endsWith('.hbs'))
    ?.split('.')[0];
}
