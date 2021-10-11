/* eslint-disable max-len */
module.exports = {
  // https://github.com/qcolate/web-configs/blob/master/packages/eslint-config/react.js
  // extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  extends: ['next/core-web-vitals', '@qcolate/eslint-config'],
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    __DEV__: true,
    __PROD__: true,
  },
  //
  // 0 (off) / 1 (warn) / 2 (error)
  rules: {
    'max-len': [
      2,
      {
        code: 80, // (default 80) enforces a maximum line length
        ignoreComments: true, // ignores all trailing comments and comments on their own line
        ignoreTrailingComments: true, // ignores only trailing comments
        // ignoreUrls: true, // ignores lines that contain a URL
        // tabWidth: 4, // (default 4) specifies the character width for tab characters
        // comments: 80, // enforces a maximum line length for comments; defaults to value of code
        // ignorePattern: true, // ignores lines matching a regular expression; can only match a single line and need to be double escaped when written in YAML or JSON
        // ignoreStrings: true, // ignores lines that contain a double-quoted or single-quoted string
        // ignoreTemplateLiterals: true, // ignores lines that contain a template literal
        // ignoreRegExpLiterals: true, // ignores lines that contain a RegExp literal
      },
    ],
    'spaced-comment': 0,
    //
    //
    // Next.js
    '@next/next/no-img-element': 0,
  },
};
