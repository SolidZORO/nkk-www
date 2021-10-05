import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/types';

import styles from './style.module.less';

interface IProps extends ICompBaseProps {
  src: any;
  alt?: string;
}

export const LazyImage: React.FC<IProps> = (props) => {
  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${LazyImage.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <img className="lazyload" src={props.src?.src} alt={props.src?.src} />
    </div>
  );
};
