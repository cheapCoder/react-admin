const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		lessOptions: //问题解决：https://blog.csdn.net/Dong__Ni/article/details/108446699
		{
			javascriptEnabled: true,
			modifyVars: { '@primary-color': "#08a7fa" },
		}
	}),
	addDecoratorsLegacy()
);