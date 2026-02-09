import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "explicit",

            overrides: {
                constructors: "no-public",
            },
        }],

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
        }],

        "@typescript-eslint/no-explicit-any": "error",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-non-null-assertion": "error",

        "@typescript-eslint/strict-boolean-expressions": ["error", {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
        }],

        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/require-await": "error",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "default",
            format: ["camelCase"],
        }, {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
        }, {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "allow",
        }, {
            selector: "class",
            format: ["PascalCase"],
        }, {
            selector: "interface",
            format: ["PascalCase"],
            prefix: ["I"],
        }, {
            selector: "typeAlias",
            format: ["PascalCase"],
        }, {
            selector: "enum",
            format: ["PascalCase"],
        }, {
            selector: "enumMember",
            format: ["UPPER_CASE"],
        }],

        "no-console": ["warn", {
            allow: ["warn", "error"],
        }],

        "no-debugger": "error",
        eqeqeq: ["error", "always"],
        curly: ["error", "all"],
        "no-var": "error",
        "prefer-const": "error",
        "prefer-arrow-callback": "error",
        "no-duplicate-imports": "error",

        "max-len": ["warn", {
            code: 100,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreComments: true,
        }],
    },
}]);