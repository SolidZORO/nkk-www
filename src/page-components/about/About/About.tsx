import cx from 'classnames';
import React from 'react';
import { BiWater } from 'react-icons/bi';

import { IPageBaseProps } from '@/types';
import { HtmlMeta, PageWrapper } from '@/components';
import { configs } from '@/configs';

import styles from './styles.module.less';

interface IProps extends IPageBaseProps {}

export const About: React.FC<IProps> = (props) => {
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

      <div className={styles['build-version']}>v{configs.app.VERSION}</div>
    </PageWrapper>
  );
};
