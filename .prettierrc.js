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

      "^helpers$",
      "(.*)helpers$",

      "^utils$",
      "(.*)utils$",

      "^types(.*)",
      "(.*)types$",

      "^[./]"
   ]
}

module.exports = config;
