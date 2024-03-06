module.exports = {
   extends: ['./eslint', 'plugin:react/recommended'],
   plugins: ['react-hooks', '@tanstack/query'],
   settings: { react: { version: '18.2.0' } },
   rules: {
      '@typescript-eslint/ban-types': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react/react-in-jsx-scope': 'off',
      // Checks rules of Hooks
      "react-hooks/rules-of-hooks": "error",
      // Checks effect dependencies
      "react-hooks/exhaustive-deps": [
         "error",
         {
            "additionalHooks": "useIsomorphicLayoutEffect"
         }
      ],
      "@tanstack/query/exhaustive-deps": "warn",
      "@tanstack/query/prefer-query-object-syntax": "warn",
   },
}
