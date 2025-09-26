import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

process.env.TS_NODE_EXPERIMENTAL_SPECIFIER_RESOLUTION =
  process.env.TS_NODE_EXPERIMENTAL_SPECIFIER_RESOLUTION ?? 'node';

register('ts-node/esm', pathToFileURL(`${process.cwd()}/`));
