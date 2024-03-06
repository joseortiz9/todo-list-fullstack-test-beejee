const config = {
   "printWidth": 120,
   "semi": true,
   "singleQuote": true,
   "trailingComma": "all",
   "plugins": ["@trivago/prettier-plugin-sort-imports"],
   "importOrderSeparation": true,
   "importOrderSortSpecifiers": true,
   "importOrder": [
      "<THIRD_PARTY_MODULES>",

      "^@todo-list-fullstack-test(.*)",

      "^@/(.*)",

      "^[./]"
   ]
}

module.exports = config;
