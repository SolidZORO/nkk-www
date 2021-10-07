import cx from 'classnames';
import React from 'react';
import { observer } from 'mobx-react';
import { BiWater } from 'react-icons/bi';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, PageWrapper } from '@/components';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

// eslint-disable-next-line import/no-mutable-exports
let About: React.FC<IProps> = (props) => {
  return (
    <PageWrapper
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${About.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <HtmlMeta title="About" />

      <div className={styles['about-box']}>
        <BiWater />
      </div>
    </PageWrapper>
  );
};

About = observer(About);
export { About };
