import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import { Button, ButtonProps } from 'antd';
import { SpinSize } from 'antd/lib/spin';

// eslint-disable-next-line max-len
import { ReactComponent as Spinner } from '@/assets/icons/comps/page-loading-spinner.svg';

import styles from './styles.module.less';

interface IProps extends ButtonProps {
  size?: SpinSize | any;
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

export const LoadingButton: React.FC<IProps> = (props) => {
  const iconSize = props.size;

  const buttonProps = _.omit(props, ['className', 'alwaysDarkMode']);

  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
      loading={false}
      icon={props.loading ? <span /> : props.icon}
      type={props.type || 'primary'}
      className={cx(
        styles['loading-button'],
        styles[`loading-button-type--${props.type}`],
        styles[`loading-button-size--${iconSize}`],
        { [styles['loading-button--loading']]: props.loading },
        props.className,
        `g-comp--${LoadingButton.displayName}`,
      )}
      style={props.style}
    >
      {props.loading ? (
        <Spinner className={cx('g-icon-spin')} />
      ) : (
        props.children
      )}
    </Button>
  );
};
