import { useAtom } from 'jotai';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Form, Input, Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';

import { ICompBaseProps } from '@/types';
import { IApiUserItem } from '@/types/api';
import { useQueryItemCaptcha } from '@/querys/captcha';
import { getCookieVisitorToken } from '@/utils/user.util';
import { appStore } from '@/stores';

import styles from './styles.module.less';

interface IProps extends ICompBaseProps {
  item?: IApiUserItem | undefined;
  //
  onSubmit?: () => void;
  ref?: any;
}

export const LoginForm: React.FC<IProps> = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [token, setToken] = useState<string>('');
  const [setting] = useAtom(appStore.setting);

  const enabledCaptcha = `${setting?.enabled_captcha}` === '1';

  const { data: captcha, refetch: refetchCaptcha } = useQueryItemCaptcha(
    { token },
    { enabled: Boolean(token && enabledCaptcha) },
  );

  useEffect(() => {
    // token 需要只能异步获取，获取完成后再发起 query 验证码
    getCookieVisitorToken().then((tk: string) => {
      setToken(tk);
    });
  }, []);

  useImperativeHandle(ref, () => ({ form, refetchCaptcha }));

  const initForm = (user?: IApiUserItem) => {
    if (!user) return form.setFieldsValue({ status: 0 });

    form.resetFields();
    form.setFieldsValue(user);

    return undefined;
  };

  useEffect(() => {
    initForm(props.item);
  }, [form, props.item]);

  return (
    <div>
      <Form
        form={form}
        hideRequiredMark
        requiredMark={false}
        layout="vertical"
        size="large"
        className={styles['container']}
      >
        <Form.Item
          label={t('auth.account')}
          name="account"
          required
          rules={[{ required: true }]}
        >
          <Input
            placeholder={t('auth.account')}
            className={styles['login-input-size']}
            onPressEnter={props.onSubmit}
          />
        </Form.Item>

        <Form.Item
          label={t('auth.password')}
          name="password"
          required
          rules={[{ required: true, min: 8 }]}
        >
          <Input.Password
            type="password"
            placeholder={t('auth.password')}
            className={styles['login-input-size']}
            onPressEnter={props.onSubmit}
          />
        </Form.Item>

        {enabledCaptcha ? (
          <div className={styles['form-item--captcha']}>
            <Form.Item
              label={t('auth.captcha')}
              name="captcha"
              required
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('auth.captcha_case_insensitive')}
                className={styles['login-input-size']}
                onPressEnter={props.onSubmit}
              />
            </Form.Item>

            <Tooltip title={t('auth.click_refresh_captcha')}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div
                className={styles['captcha-image']}
                onClick={() => refetchCaptcha()}
              >
                <span
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: captcha?.captcha || '' }}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}
      </Form>
    </div>
  );
});
