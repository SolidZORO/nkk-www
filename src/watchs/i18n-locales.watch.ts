import { configs } from '@/configs';
import { isServer } from '@/utils/env.util';

// One-liner for current directory
export const watchI18nLocales = () => {
  if (!configs.app.__DEV__ || !isServer()) return;

  console.log('1111111111, 进来');

  // eslint-disable-next-line global-require
  // const chokidar = require('chokidar');

  // console.log(chokidar);

  // chokidar
  //   .watch(`*/styles/variables.less`, {
  //     // persistent: true,
  //     // ignored: /\.(git|gz|map|interface\.ts)|node_modules|interfaces|types/,
  //   })
  //   .on('change', () => {
  //     console.log(3333333333333333333);
  //   });
};
