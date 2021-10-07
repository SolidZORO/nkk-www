/* eslint-disable no-template-curly-in-string */
const typeTemplate = '${label} 不能为 ${type}';

export const text = {
  ERROR_MESSAGE: '未知错误',
  SUCCESS_MESSAGE: '成功',

  ERROR_MESSAGE_OFFLINE: '设备已离线',

  REGX_PHONE: /^\d{7,15}$/,
  REGX_EMAIL: /\S+@\S+\.\S+/,

  REGX_MESSAGE_PHONE: '请输入正确的手机号码',
  REQUIRED_MESSAGE_PHONE: '请输入手机号码',

  DEFAULT_VALIDATE_MESSAGES: {
    default: '${label}填写有误',
    required: '请输入${label}',
    enum: '${label}必须为[${enum}]',
    whitespace: '${label}不能为空',
    date: {
      format: '${label}为无效的格式',
      parse: '${label}无法解析',
      invalid: '${label}为无效数据',
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate,
    },
    string: {
      len: '${label}的长度必须为 ${len}',
      min: '${label}不能少于 ${min} 个字符',
      max: '${label}不能大于 ${min} 个字符',
      range: '${label} must be between ${min} and ${max} characters',
    },
    number: {
      len: '${label}的长度必须为 ${len}',
      min: '${label}不能少于 ${min} 个字符',
      max: '${label}不能大于 ${min} 个字符',
      range: '${label} must be between ${min} and ${max}',
    },
    array: {
      len: '${label}的长度必须为 ${len}',
      min: '${label}不能少于 ${min} 个字符',
      max: '${label}不能大于 ${min} 个字符',
      range: '${label} must be between ${min} and ${max} in length',
    },
    pattern: {
      mismatch: '${label}与设定的 ${pattern} 不匹配',
    },
  },
};
