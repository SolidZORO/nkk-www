import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/types';

import styles from './styles.module.less';

interface IProps extends ICompBaseProps {
  block?: boolean;
  onClick?: (e: any) => void;
  stopPropagation?: boolean;
}

export const EventButton: React.FC<IProps> = (props) => {
  const onClick = (e: any) => {
    if (props.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (props.onClick) props.onClick(e);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <span
      role="button"
      tabIndex={0}
      className={cx(
        styles['comp-wrapper'],
        {
          [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode,
          [styles['comp-wrapper--block']]: props.block,
        },
        props.className,
      )}
      style={props.style}
      onClick={onClick}
    >
      {props.children}
    </span>
  );
};
