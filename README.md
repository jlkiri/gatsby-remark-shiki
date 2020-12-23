## Description

This plugin uses [`shiki`](https://github.com/octref/shiki) to add code highlighting to pages that are built with [`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/).

## How to install

`npm install gatsby-remark-shiki`

## When do I use this plugin?

You need it to highlight code blocks (```) in your markdown files. You can use many popular [themes](https://github.com/octref/shiki/blob/master/packages/themes/README.md#literal-values) that are available in IDEs like VSCode, e.g. Nord.

## Examples of usage

### Simple

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-shiki`,
          options: {
            theme: 'zeit', // Default: 'nord'
          },
        },
      ],
    },
  },
];
```

### Add your own TextMate language

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-shiki`,
          options: {
            langs: [
              {
                id: `wowlang`,
                scopeName: `source.wowlang`,
                path: cwd_join(`langs/wowlang.tmLanguage.json`),
              },
            ],
          },
        },
      ],
    },
  },
];
```

## How to contribute

Feel free to file an issue here: https://github.com/jlkiri/gatsby-remark-shiki/issues
