import cx from 'classnames';
import React from 'react';
import { FooterNav, HeaderNavbar } from '@/components';
import { ILayoutBaseProps } from '@/types/comp.type';

import styles from './styles.module.less';

export interface IProps extends ILayoutBaseProps {
  disableHeader?: boolean;
  disableFooter?: boolean;
}

export const AuthLayout: React.FC<IProps> = (props) => {
  return (
    <div
      id={`g-layout--${AuthLayout?.displayName}`}
      className={cx(
        styles['comp-wrapper'],
        `g-comp--${AuthLayout?.displayName}`,
        // `g-comp--${props.routeProps?.pathname}`,
      )}
    >
      {props?.disableHeader ? null : (
        <div className={cx(styles['layout-header'], 'g-layout-header--master')}>
          <HeaderNavbar />
        </div>
      )}

      <div
        className={cx(styles['layout-container'], 'g-layout-container--master')}
      >
        <props.mainComp router={props.routeProps} pageProps={props.pageProps} />
      </div>

      <div className={cx(styles['layout-footer'], 'g-layout-footer--master')}>
        <FooterNav />
      </div>
    </div>
  );
};
