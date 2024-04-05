import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import * as Repack from '@callstack-mwg/repack';
import { deps } from './shared/dependencies.mjs';
const babelLoaderConfig = {
  loader: 'babel-loader',
  options: {
    cacheCompression: false,
    cacheDirectory: true,
  },
};

/**
 * Webpack configuration.
 * You can also export a static object or a function returning a Promise.
 *
 * @param env Environment options passed from either Webpack CLI or React Native CLI
 *            when running with `react-native start/bundle`.
 */
export default (env) => {
  const {
    mode = 'development',
    context = Repack.getDirname(import.meta.url),
    entry = './index.js',
    platform = process.env.PLATFORM,
    minimize = mode === 'production',
    devServer = undefined,
    bundleFilename = undefined,
    sourceMapFilename = undefined,
    assetsPath = undefined,
    reactNativePath = new URL('./node_modules/react-native', import.meta.url)
      .pathname,
  } = env;
  const dirname = Repack.getDirname(import.meta.url);

  if (!platform) {
    throw new Error('Missing platform');
  }

  /**
 * Using Module Federation might require disabling hmr.
 * Uncomment below to set `devServer.hmr` to `false`.
 *
 * Keep in mind that `devServer` object is not available
 * when running `webpack-bundle` command. Be sure
 * to check its value to avoid accessing undefined value,
 * otherwise an error might occur.
 */
  // if (devServer) {
  //   devServer.hmr = false;
  // }

  /**
   * Depending on your Babel configuration you might want to keep it.
   * If you don't use `env` in your Babel config, you can remove it.
   *
   * Keep in mind that if you remove it you should set `BABEL_ENV` or `NODE_ENV`
   * to `development` or `production`. Otherwise your production code might be compiled with
   * in development mode by Babel.
   */
  process.env.BABEL_ENV = mode;

  return {
    mode,
    /**
     * This should be always `false`, since the Source Map configuration is done
     * by `SourceMapDevToolPlugin`.
     */
    devtool: false,
    context,
    /**
     * `getInitializationEntries` will return necessary entries with setup and initialization code.
     * If you don't want to use Hot Module Replacement, set `hmr` option to `false`. By default,
     * HMR will be enabled in development mode.
     */
    entry: [
      ...Repack.getInitializationEntries(reactNativePath, {
        hmr: devServer && devServer.hmr,
      }),
      entry,
    ],
    resolve: {
      symlinks: false,
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs'],
      ...Repack.getResolveOptions(platform),
      alias: {
        '@app': path.resolve(dirname, './app'),
      },
    },
    /**
     * Configures output.
     * It's recommended to leave it as it is unless you know what you're doing.
     * By default Webpack will emit files into the directory specified under `path`. In order for the
     * React Native app use them when bundling the `.ipa`/`.apk`, they need to be copied over with
     * `Repack.OutputPlugin`, which is configured by default inside `Repack.RepackPlugin`.
     */
    output: {
      clean: true,
      path: path.join(dirname, 'build', platform),
      filename: 'index.bundle',
      chunkFilename: '[name].chunk.bundle',
      publicPath: Repack.getPublicPath({ platform, devServer }),
    },
    /**
     * Configures optimization of the built bundle.
     */
    optimization: {
      /** Enables minification based on values passed from React Native CLI or from fallback. */
      minimize,
      /** Configure minimizer to process the bundle. */
      minimizer: [
        new TerserPlugin({
          test: /\.(js)?bundle(\?.*)?$/i,
          /**
           * Prevents emitting text file with comments, licenses etc.
           * If you want to gather in-file licenses, feel free to remove this line or configure it
           * differently.
           */
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
      chunkIds: 'named',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          include: [
            /node_modules(.*[/\\])+react/,
            /node_modules(.*[/\\])+@react-native/,
            /node_modules(.*[/\\])+@react-navigation/,
            /node_modules(.*[/\\])+@react-native-community/,
            /node_modules(.*[/\\])+@expo/,
            /node_modules(.*[/\\])+pretty-format/,
            /node_modules(.*[/\\])+metro/,
            /node_modules(.*[/\\])+abort-controller/,
            /node_modules(.*[/\\])+@callstack\/repack/,
            /node_modules(.*[/\\])+rn-fetch-blob/,
            /node_modules(.*[/\\])+react-native-webview/,
            /node_modules(.*[/\\])+react-native-media-controls/,
            /node_modules(.*[/\\])+react-native-signature-canvas/,
            /node_modules(.*[/\\])+@rnmapbox\/maps/,
            /node_modules(.*[/\\])+react-freeze/,
            /node_modules(.*[/\\])+@react-native-community/,
            /node_modules(.*[/\\])+@rneui\/base/,
            /node_modules(.*[/\\])+@rneui\/themed/,
            /node_modules(.*[/\\])+@mwg-kits\/core/,
            /node_modules(.*[/\\])+@mwg-sdk\/kits/,
            /node_modules(.*[/\\])+@mwg-sdk\/languages/,
            /node_modules(.*[/\\])+@apollo\/client/,
            /node_modules(.*[/\\])+graphql/,
          ],
          use: babelLoaderConfig,
        },
        {
          test: /\.tsx?$/,
          use: babelLoaderConfig,
        },
        {
          test: /\.js?$/,
          use: babelLoaderConfig,
        },
        {
          test: /\.d.ts?$/,
          use: babelLoaderConfig,
        },
        {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: babelLoaderConfig,
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins:
                devServer && devServer.hmr
                  ? ['module:react-refresh/babel']
                  : undefined,
            },
          },
        },
        {
          test: Repack.getAssetExtensionsRegExp(
            Repack.ASSET_EXTENSIONS.filter(
              ext => ext !== 'svg' && ext !== 'ico',
            ),
          ),
          use: {
            loader: '@callstack-mwg/repack/assets-loader',
            options: {
              platform,
              devServerEnabled: Boolean(devServer),
              scalableAssetExtensions: Repack.SCALABLE_ASSETS,
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                native: true,
                dimensions: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      /**
       * Configure other required and additional plugins to make the bundle
       * work in React Native and provide good development experience with
       * sensible defaults.
       *
       * `Repack.RepackPlugin` provides some degree of customization, but if you
       * need more control, you can replace `Repack.RepackPlugin` with plugins
       * from `Repack.plugins`.
       */
      new Repack.RepackPlugin({
        context,
        mode,
        platform,
        devServer,
        output: {
          bundleFilename,
          sourceMapFilename,
          assetsPath,
        },
      }),
      new Repack.plugins.ModuleFederationPlugin({
        name: 'host',
        shared: deps,
      }),
      new Repack.plugins.ChunksToHermesBytecodePlugin({
        enabled: mode === 'production' && !devServer,
        test: /\.(js)?bundle$/,
        exclude: /index.bundle$/,
      }),
    ],
  };
};
