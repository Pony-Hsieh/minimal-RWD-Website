module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    // 'block-spacing': [2, 'always'],
    // 标签里面的内容独占一行
    'vue/multiline-html-element-content-newline': 'error',
    // 属性换行配置
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        // "max": 0, // 可以試試看設成 0 會不會標籤都在同一行
        "allowFirstLine": true
      }
    }],
    // 格式对齐配置
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": false,
      "ignores": []
    }],
  }
}