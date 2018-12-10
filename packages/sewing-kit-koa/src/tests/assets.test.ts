import {join} from 'path';
import withEnv from '@shopify/with-env';
import appRoot from 'app-root-path';
import Assets, {internalOnlyClearCache} from '../assets';

jest.mock('fs-extra', () => ({
  ...require.requireActual('fs-extra'),
  readJson: jest.fn(() => ({
    entrypoints: {},
  })),
}));

const {readJson} = require.requireMock('fs-extra');

describe('Assets', () => {
  const defaultOptions = {assetHost: '/assets/'};

  beforeEach(() => {
    readJson.mockReset();
    readJson.mockImplementation(() => createMockAssetList());
  });

  afterEach(() => {
    internalOnlyClearCache();
  });

  it('reads the asset cache', async () => {
    const assets = new Assets(defaultOptions);

    await assets.styles();

    expect(readJson).toHaveBeenCalledWith(
      join(appRoot.path, 'build/client/assets.json'),
    );
  });

  it('only reads the asset cache once', async () => {
    await new Assets(defaultOptions).styles();
    await new Assets(defaultOptions).scripts();

    expect(readJson).toHaveBeenCalledTimes(1);
  });

  describe('scripts', () => {
    it('returns the main scripts by default', async () => {
      const js = '/style.js';

      readJson.mockImplementation(() =>
        createMockAssetList({name: 'main', scripts: [js]}),
      );

      const assets = new Assets(defaultOptions);

      expect(await assets.scripts()).toEqual([{path: js}]);
    });

    it('returns the scripts for a named bundle', async () => {
      const js = '/style.js';

      readJson.mockImplementation(() =>
        createMockAssetList({name: 'custom', scripts: [js]}),
      );

      const assets = new Assets(defaultOptions);

      expect(await assets.scripts({name: 'custom'})).toEqual([{path: js}]);
    });

    it('throws an error when no scripts exist for the passed entrypoint', async () => {
      const assets = new Assets(defaultOptions);
      await expect(
        assets.scripts({name: 'non-existent'}),
      ).rejects.toBeInstanceOf(Error);
    });

    it('prefixes the list with the vendor DLL in development', async () => {
      const js = '/style.js';
      const assetHost = '/sewing-kit-assets/';

      readJson.mockImplementation(() =>
        createMockAssetList({name: 'custom', scripts: [js]}),
      );

      const assets = new Assets({...defaultOptions, assetHost});
      const scripts = await withEnv('development', () =>
        assets.scripts({name: 'custom'}),
      );

      expect(scripts).toEqual([
        {path: `${assetHost}dll/vendor.js`},
        {path: js},
      ]);
    });
  });

  describe('styles', () => {
    it('returns the main styles by default', async () => {
      const css = '/style.css';

      readJson.mockImplementation(() =>
        createMockAssetList({name: 'main', styles: [css]}),
      );

      const assets = new Assets(defaultOptions);

      expect(await assets.styles()).toEqual([{path: css}]);
    });

    it('returns the styles for a named bundle', async () => {
      const css = '/style.css';

      readJson.mockImplementation(() =>
        createMockAssetList({name: 'custom', styles: [css]}),
      );

      const assets = new Assets(defaultOptions);

      expect(await assets.styles({name: 'custom'})).toEqual([{path: css}]);
    });

    it('throws an error when no styles exist for the passed entrypoint', async () => {
      const assets = new Assets(defaultOptions);
      await expect(
        assets.styles({name: 'non-existent'}),
      ).rejects.toBeInstanceOf(Error);
    });
  });
});

function createMockAssetList({
  name = 'main',
  styles = [],
  scripts = [],
}: {
  name?: string;
  styles?: string[];
  scripts?: string[];
} = {}) {
  return {
    entrypoints: {
      [name]: {
        js: scripts.map(path => ({
          path,
        })),
        css: styles.map(path => ({
          path,
        })),
      },
    },
  };
}
