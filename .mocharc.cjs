module.exports = {
  extension: ['ts'],
  spec: 'src/**/*.spec.ts',
  require: ['./test/setup.ts'],
  'node-option': ['import=./test/register-ts-node.js', 'experimental-specifier-resolution=node'],
};
