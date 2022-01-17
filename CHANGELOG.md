# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/SolidZORO/nkk-www/compare/v0.1.1...v0.2.0) (2022-01-17)


### Features

* 清理掉 metadata 模块 ([4758d81](https://github.com/SolidZORO/nkk-www/commit/4758d810bc4d29f15fabae66a408e337db7bfd33))

### [0.1.1](https://github.com/SolidZORO/nkk-www/compare/v0.1.0...v0.1.1) (2022-01-09)


### Features

* add buildinfo ([0c8e9bc](https://github.com/SolidZORO/nkk-www/commit/0c8e9bc78473a698e2d367a9cc2fd6589c4660dc))
* less 兼容 iOS safari 100vh 使用 -webkit-fill-available ([e9fcd14](https://github.com/SolidZORO/nkk-www/commit/e9fcd145181b624c4777788b6dc9ecd55413cf07))
* update deps ([ba70c38](https://github.com/SolidZORO/nkk-www/commit/ba70c38918a23f4aea29dec6d7e2e94f32309bf6))
* use gen-buildinfo-webpack-plugin ([aa94641](https://github.com/SolidZORO/nkk-www/commit/aa946412e310f95046e8701b98fb22fdcd56c56a))
* 优化 默认 logo ([77dd8b5](https://github.com/SolidZORO/nkk-www/commit/77dd8b53de97ceb4c4e18ac294d77713a9893aaf))
* 加入 next-plugin--watcher.js 自动化生成 variables-css.less ([b175b47](https://github.com/SolidZORO/nkk-www/commit/b175b477a301d4af72840216e84f6ed28b570519))
* 完成 i18n 全部内容 ([8459d4e](https://github.com/SolidZORO/nkk-www/commit/8459d4e60e3b3512d85206166faec6c7b1a126be))
* 对齐 admin ([0c70e22](https://github.com/SolidZORO/nkk-www/commit/0c70e221c19e1c207ee1e9fc0ea530f5cc446811))
* 登录新增翻译 ([047052f](https://github.com/SolidZORO/nkk-www/commit/047052f98e46dfd7fbef1df71fcab6a9492aae0d))


### Bug Fixes

* 修复部分页面无法居中对齐 ([3505724](https://github.com/SolidZORO/nkk-www/commit/3505724e396c98892bd605ea728b0bfa6f9e847d))
* 修复部署到 vercel i18n 的 localePath 问题 ([8350f3b](https://github.com/SolidZORO/nkk-www/commit/8350f3b795ddf0e78408907fe7ee0eb8f49bbc2c))


### Chore

* update deps ([4ec0ae7](https://github.com/SolidZORO/nkk-www/commit/4ec0ae7e8fc8f467f82c1d783709d69b07c43ed4))

## [0.1.0](https://github.com/SolidZORO/nkk-www/compare/v0.0.2...v0.1.0) (2021-12-26)


### Features

* add eslint ([1e027b2](https://github.com/SolidZORO/nkk-www/commit/1e027b2c6349bf59790909b78c4de58c21a6cfaa))
* add next.js eslint ([2839d41](https://github.com/SolidZORO/nkk-www/commit/2839d41707dc869b72784888304902c89d94feec))
* Server 和 Client 共享 Cookies ([04bc848](https://github.com/SolidZORO/nkk-www/commit/04bc8486c8a94f7f5788e9f31e56842fe685ea98))
* 从 mobx 迁移到 jotai ([e52fee1](https://github.com/SolidZORO/nkk-www/commit/e52fee1500c099c40529796a33c4a9ee06513269))
* 同步 admin 的 axios ([1c61719](https://github.com/SolidZORO/nkk-www/commit/1c617197db78170e8a81e78efb79ff7fca4944e3))
* 和 admin 统一 user.util ([c62e81d](https://github.com/SolidZORO/nkk-www/commit/c62e81d3c45802b59ba632c3fe5eb5be1f28431d))
* 添加 2 个 mock api ([86641c3](https://github.com/SolidZORO/nkk-www/commit/86641c38ba7799aba98307c4437ff334e45a422f))
* 添加 antd.less 样式 ([99d9631](https://github.com/SolidZORO/nkk-www/commit/99d963135fddb0ced33637f8a1b47c287cfa017c))
* 添加 hasky ([d55fc40](https://github.com/SolidZORO/nkk-www/commit/d55fc40e95655903e4e4ed6182e49b7443614e45))
* 添加 lint-staged ([743c010](https://github.com/SolidZORO/nkk-www/commit/743c01095ff43aca6310e2e7a99f583ee0c45746))
* 添加 lint-staged.config.js ([2e47cfc](https://github.com/SolidZORO/nkk-www/commit/2e47cfc2e12ab08f660a4f40c5a5e8c3d220b13b))
* 添加 NextNprogress ([d8ddf5b](https://github.com/SolidZORO/nkk-www/commit/d8ddf5b9903d1f118ca06767e1546e7c07878f54))
* 添加注册功能 ([d340fd8](https://github.com/SolidZORO/nkk-www/commit/d340fd82ed327c8a51f53f5bfc8b5a83559131e0))
* 试验性的使用 Next.js 自带的 API（Server 需要从 req 里面找到 host ([ca5efbe](https://github.com/SolidZORO/nkk-www/commit/ca5efbe84dd8708d3f33d934d1a39ef608f0f74f))
* 重新规划 icons 的生成 ([45f2d31](https://github.com/SolidZORO/nkk-www/commit/45f2d31bded3dd25808c23c635eaf41193fad325))


### Bug Fixes

* fix FORMAT_DATE_TIME_INT regx ([e35398a](https://github.com/SolidZORO/nkk-www/commit/e35398ac0c9e039e2f2cac3e8cacf46b42774e90))
* fix icon ([03dbcaf](https://github.com/SolidZORO/nkk-www/commit/03dbcaf999d4f5ef28c31f7e8ada42c76c99e8c8))
* update deps ([227e0f0](https://github.com/SolidZORO/nkk-www/commit/227e0f044eefe36e9db324be8b457672da0bba6a))
* 修复 antd variables.less 错误的使用了 antd es 不生效问题 ([9de4048](https://github.com/SolidZORO/nkk-www/commit/9de4048b8fddf11e25ca40b7cb9fb382a4c90fa7))

### [0.0.2](https://github.com/SolidZORO/nkk-www/compare/v0.0.1...v0.0.2) (2021-10-07)


### Features

* 加入 mobx store ([64df4fa](https://github.com/SolidZORO/nkk-www/commit/64df4faffecd9a03914d973aa4f9c3c7101e27eb))


### Bug Fixes

* 修复 _app.tsx 取不到数据直接 crash 的问题 ([8105f22](https://github.com/SolidZORO/nkk-www/commit/8105f22ea11a6a80112c5b7784abccbfc97f7fe1))

### 0.0.1 (2021-10-05)


### Features

* init d27d969
