import {createPackage, Runtime} from '@sewing-kit/core';

import {quiltPackage} from '../../config/sewing-kit';

export default createPackage((pkg) => {
  pkg.runtimes(Runtime.Browser, Runtime.Node);
  pkg.entry({root: './src/index'});
  pkg.binary({name: 'graphql-validate-fixtures', root: './src/cli'});
  pkg.use(quiltPackage());
});
