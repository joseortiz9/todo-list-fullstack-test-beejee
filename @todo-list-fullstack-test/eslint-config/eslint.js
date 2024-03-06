module.exports = {
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
   parser: '@typescript-eslint/parser',
   plugins: [
      '@typescript-eslint',
      'prettier',
      'unused-imports',
      'prefer-arrow-functions',
   ],
   ignorePatterns: ['node_modules', '.turbo', 'dist', 'dev-dist', 'coverage'],
   rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-return-await': ['error'],
      'prefer-destructuring': ['error'],
      'object-shorthand': ['error'],
      'no-unneeded-ternary': ['error'],
      'prefer-template': ['error'],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
         'error',
         {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
         },
      ],
      "@typescript-eslint/ban-types": [
         "error",
         {
            "types": {
               "String": {
                  "message": "Use string instead",
                  "fixWith": "string"
               },
               "{}": {
                  "message": "Use Record<type, type> instead",
                  "fixWith": "object"
               }
            }
         }
      ],
      'object-curly-newline': [
         'warn',
         {
            ObjectExpression: {
               multiline: true,
               minProperties: 2,
            },
         },
      ],
      'prefer-arrow-functions/prefer-arrow-functions': 'error',
      '@typescript-eslint/naming-convention': [
         'error',
         {
            'selector': 'typeLike',
            'format': ['PascalCase']
         }
      ],
   },
}
