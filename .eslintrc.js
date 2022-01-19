module.exports = {
	env: {
		'browser': true,
		'es2021': true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	parserOptions: {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	plugins: [
		'react',
		'react-hooks', 
		'prettier'
	],
	rules: {
		'indent': [
			'error',
			'space'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
