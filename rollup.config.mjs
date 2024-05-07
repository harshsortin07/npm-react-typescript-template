import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import copy from "rollup-plugin-copy-assets";
import copy from 'rollup-plugin-copy';
import image from 'rollup-plugin-img';
import pkg from './package.json' with {type:"json"}
// import css from "rollup-plugin-import-css";
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import autoprefixer from 'autoprefixer';






export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
      
    },
    // { file: 'dist/index.d.ts', format: 'esm' }
  ],
  plugins: [typescript(),  postcss({
    extract: true,
    modules: true,
    plugins:[autoprefixer]
    
  }),
copy({
  targets:[
    {
      src:"src/assets/sortin-home-banner.css",
      dest:"dist/assets",
      rename:"sortin-home-banner.css"
    }
  ]
})
],

  // output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  external: ['react', 'react-dom', 'fs', nodeResolve(), /\.css$/]
}
