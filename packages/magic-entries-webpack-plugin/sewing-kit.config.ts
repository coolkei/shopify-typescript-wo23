import {createPackage, Runtime} from '@sewing-kit/core';

import {quiltPackage} from '../../config/sewing-kit';

export default createPackage((pkg) => {
  pkg.runtimes(Runtime.Node);
  pkg.entry({root: './src/index'});
  pkg.use(quiltPackage({jestEnv: 'node'}));
});
