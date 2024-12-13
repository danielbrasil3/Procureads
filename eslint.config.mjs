import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Configuração para arquivos específicos
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser, // Define os globais do ambiente browser
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
    },
    rules: {
      // Regras recomendadas do TypeScript
      ...tseslint.configs.recommended.rules,
      // Regras recomendadas do React
      ...pluginReact.configs.recommended.rules,

      // Personalizações
      "no-unused-vars": "off", // já gerenciado pelo TS
      "@typescript-eslint/no-unused-vars": "warn", // Deixa como aviso
      "react/prop-types": "off", // Desabilita validação de PropTypes (se você usa TypeScript)
      "react/react-in-jsx-scope": "off", // Desabilita escopo do React
    },
  },
];
