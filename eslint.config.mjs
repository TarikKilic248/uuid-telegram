import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-undef': 'off',
    'no-alert': 'off',
  },
  typescript: true,
  vue: true,

})
