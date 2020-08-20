// module.exports = {
//     "extends":[],
//     "plugins":["react-hooks"],
//     "rules":{
//         "react/no-deprecated": 0,
//         "no-unused-vars": 0,
//         "no-case-declarations": 0,
//         "guard-for-in": 0,
//         "implicit-arrow-linebreak": 0,
//         "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
//         "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
//     }
// }
module.exports = {
    root: true,
    "parser": "babel-eslint",
    parserOptions: {
        sourceType: 'module',
    },
    'env': {
        'es6': true, // 启用es6语法
        "browser": true, // 允许 window document localstorage 等浏览器全局变量
    },
    'extends': [
        'airbnb-base',
    ],
    "plugins":["react-hooks"],
    'globals': {
        "MOCK": false,
    },
    'rules': {
        "no-multi-spaces": "off", // 不允许在代码后面注释
        "object-curly-newline": "off", // 对象每项都新开一行
        "spaced-comment": ["off"], // 注释规范
        "function-paren-newline": ["error", { "minItems": 3 }], // 函数参数换行
        "eqeqeq": "off", // 全等
        'one-var': 'off', // 强制函数中的变量要么一起声明要么分开声明
        'one-var-declaration-per-line': 'off', // 要求或禁止在变量声明周围换行
        'vars-on-top': 'off', // 要求所有的 var 声明出现在它们所在的作用域顶部
        'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
        'no-mixed-operators': 'off', // 禁止混合使用不同的操作符
        'prefer-template': 'off', // 要求使用模板字面量而非字符串连接
        'no-bitwise': 'off', // 禁用位运算符
        'no-multiple-empty-lines': 'off', // 禁止出现多行空行
        'no-unused-expressions': 'warn', // 禁止出现未使用过的表达式
        'no-lonely-if': 'off', // 禁止 if 作为唯一的语句出现在 else 语句中
        'block-scoped-var': 'error', // 强制把变量的使用限制在其定义的作用域范围内
        'global-require': 'off', // 要求 require() 出现在顶层模块作用域中

        'no-shadow': 'warn', // 禁止变量声明与外层作用域的变量同名

        'object-shorthand': 'off', // 要求对象字面量中方法和属性使用简写语法
        'quote-props': 'off', // 要求对象字面量属性名称使用引号
        'padded-blocks': 'off', // 要求块前后不能出现空行

        'prefer-arrow-callback': 'off', // 要求使用箭头函数作为回调
        'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
        'no-param-reassign': 'warn', // 禁止对 function 的参数进行重新赋值
        'prefer-spread': 'off', // 要求使用扩展运算符而非 .apply()

        'camelcase': 'off', // 骆驼命名,
        'no-prototype-builtins': 'error', // 禁止使用对象默认属性
        'max-len': ['warn', { // 忽略最大长度
            'code': 160,
            'ignoreComments': true, // 忽略注释
            'ignoreTrailingComments': true, // 忽略尾随的注释
            'ignoreUrls': true, // 忽略url
            'ignoreStrings': true, // 忽略字符串
            'ignoreTemplateLiterals': true, // 忽略字符串模板
            'ignoreRegExpLiterals': true, // 忽略正则
        }],
        'no-unused-vars': [ // 定义了变量没有使用
            'error',
            {
                'vars': 'all',
                'args': 'all',
            },
        ],
        'no-debugger': 'error',
        'no-console': 'error',
        'no-continue': 'off', // 不允许有 continue
        'no-restricted-syntax': ['error', 'WithStatement'], // 不让用with
        'no-underscore-dangle': 'off', // 只允许 this 后面有下划线,no-prototype-builtins

        'import/prefer-default-export': 'off',
        'no-new': 'off',
        'linebreak-style': 'off', // 换行符
        'prefer-const': 'error', // 没有修改的变量必须用 const
        'import/no-unresolved': 'off', // import路径找不到,
        'import/extensions': 'off',
        'import/order': 'error',
        'import/no-extraneous-dependencies': 'off',
        'default-case': 'error',
        'no-nested-ternary': 'warn', // 三目嵌套太多
        'prefer-destructuring': 'off',
        'no-restricted-globals': 'off', // 使用不严谨的全局变量,
        'import/first': 'error', // import以后使用
        "no-script-url": 'error',//关闭Script URL is a form of eval
        "prefer-rest-params":0,
        "func-names":0,//关闭匿名函数warning
        "semi":"error", //关闭分号检查
        "brace-style":"error",//关闭es6 大括号位置检查
        "no-else-return":"off",//关闭else return检查
        "class-methods-use-this":"off",//关闭类静态方式检查
        "import/no-webpack-loader-syntax":"off", //关闭import 里面 ！检测
        "import/no-named-as-default": "off", //关闭import里面导出多个报错
        "import/no-named-as-default-member": "off", //关闭本地导出本地导入
		"no-tabs":"off",// 关闭tabs
        "no-return-assign":"off",
        "lines-between-class-members": "error", // class内函数需要有空格
        "no-multi-assign": "error", // 链式赋值会让变量提升到全局

        "react/no-deprecated": 0,
        "no-unused-vars": 0,
        "no-case-declarations": 0,
        "guard-for-in": 0,
        "implicit-arrow-linebreak": 0,
        "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
        "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
    },
}
