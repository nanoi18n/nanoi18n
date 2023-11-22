module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	settings: {
		'import/resolver': {
			typescript: true,
			node: true,
		},
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: 'tsconfig.json',
	},
	ignorePatterns: ['.eslintrc.js', 'dist'],
	overrides: [
		{
			files: ['*.test.ts'],
			rules: {
				'no-restricted-syntax': 'off',
				'@typescript-eslint/no-magic-numbers': 'off',
				'@typescript-eslint/naming-convention': [
					'off',
					{
						selector: 'objectLiteralProperty',
					},
				],
			},
		},
	],
	plugins: ['@typescript-eslint'],
	rules: {
		// NOTE: This is to prevent usage of a type where we have subclassed it with one that provides more/better details
		'no-restricted-syntax': [
			'error',
			{
				selector: "Identifier[name='HttpsError']",
				message:
					'This is meant to block usage of https.HttpsError (using the https import from firebase-functions) as there are specific subclasses meant to be used that contain more details to ease troubleshooting of errors (e.g. FunctionsContextualError, FunctionsInternalError, etc.)',
			},
			// NOTE: This will not catch all cases as it is not possible to make a selector for 'get element not followed by', it will only catch if there is element after the call to logError within the same statement (e.g. inside the specific if block).
			{
				selector:
					"ExpressionStatement:has(Identifier[name='logError']) ~ *:not(ReturnStatement)",
				message:
					'return should always be called after logError as it can otherwise cause problems.',
			},
		],
		'no-template-curly-in-string': 'error',
		'no-unreachable-loop': 'error',
		'no-useless-backreference': 'error',
		'require-atomic-updates': 'error',
		'block-scoped-var': 'error',
		'default-case': 'error',
		eqeqeq: 'error',
		'no-alert': 'error',
		'no-else-return': 'error',
		'no-empty-function': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-lone-blocks': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-param-reassign': 'error',
		'no-return-assign': 'error',
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-throw-literal': 'error',
		'no-useless-call': 'error',
		'no-useless-concat': 'error',
		yoda: 'error',
		camelcase: 'error',
		'prefer-promise-reject-errors': 'error',
		'prefer-template': 'error',
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/consistent-indexed-object-style': 'error',
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports' },
		],
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				leadingUnderscore: 'allow',
				format: ['camelCase', 'PascalCase'],
			},
			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},
		],
		'@typescript-eslint/no-base-to-string': 'error',
		'@typescript-eslint/no-confusing-non-null-assertion': 'error',
		'@typescript-eslint/no-confusing-void-expression': 'error',
		'@typescript-eslint/no-dynamic-delete': 'error',
		'@typescript-eslint/no-extraneous-class': 'error',
		'@typescript-eslint/no-invalid-void-type': 'error',
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'error',
		'@typescript-eslint/no-unnecessary-type-constraint': 'error',
		'@typescript-eslint/parameter-properties': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-literal-enum-member': 'error',
		'@typescript-eslint/prefer-includes': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'error',
		'@typescript-eslint/prefer-optional-chain': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/prefer-readonly-parameter-types': [
			'error',
			{ ignoreInferredTypes: true },
		],
		'@typescript-eslint/prefer-reduce-type-parameter': 'error',
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',
		'@typescript-eslint/prefer-ts-expect-error': 'error',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/require-array-sort-compare': 'error',
		'@typescript-eslint/strict-boolean-expressions': [
			'error',
			{
				allowString: false,
				allowNumber: false,
			},
		],
		'@typescript-eslint/switch-exhaustiveness-check': 'error',
		'@typescript-eslint/default-param-last': 'error',
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': 'error',
		'no-duplicate-imports': 'off',
		'no-loss-of-precision': 'off',
		'@typescript-eslint/no-loss-of-precision': 'error',
		'no-magic-numbers': 'off',
		'@typescript-eslint/no-magic-numbers': [
			'error',
			{ ignore: [0], ignoreEnums: true },
		],
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': 'error',
		'@typescript-eslint/no-throw-literal': 'error',
		'no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-expressions': 'error',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'error',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'no-return-await': 'off',
		'@typescript-eslint/return-await': 'error',
		'import/export': 'error',
		'import/no-deprecated': 'error',
		'import/no-empty-named-blocks': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'error',
		'import/no-unused-modules': 'error',
		'import/default': 'error',
		'import/named': 'error',
		'import/namespace': 'error',
		'import/no-absolute-path': 'error',
		'import/no-cycle': 'error',
		'import/no-dynamic-require': 'error',
		'import/no-relative-packages': 'error',
		'import/no-restricted-paths': 'error',
		'import/no-self-import': 'error',
		'import/no-unresolved': [
			'error',
			{
				ignore: ['firebase-admin/firestore'],
			},
		],
		'import/no-useless-path-segments': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/consistent-type-specifier-style': 'error',
		'import/extensions': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-named-default': 'error',
		'import/no-namespace': 'error',
	},
}
