module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [ 'error', 'tab'],
		'linebreak-style': [ 'error', 'windows'],
		'quotes': [ 'error', 'single'],
		'semi': [ 'error', 'always'],
		'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }]
	}
};