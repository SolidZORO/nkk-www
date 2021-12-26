import { useAtom } from 'jotai';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Form, Input, Tooltip } from 'antd';

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
    getCookieVisitorToken().then((t: string) => {
      setToken(t);
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
          label="账户"
          name="account"
          required
          rules={[{ required: true }]}
        >
          <Input
            placeholder="账户"
            className={styles['login-input-size']}
            onPressEnter={props.onSubmit}
          />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          required
          rules={[{ required: true, min: 8 }]}
        >
          <Input.Password
            type="password"
            placeholder="密码"
            className={styles['login-input-size']}
            onPressEnter={props.onSubmit}
          />
        </Form.Item>

        {enabledCaptcha ? (
          <div className={styles['form-item--captcha']}>
            <Form.Item
              label="验证码"
              name="captcha"
              required
              rules={[{ required: true }]}
            >
              <Input
                placeholder="验证码 (不区分大小写)"
                className={styles['login-input-size']}
                onPressEnter={props.onSubmit}
              />
            </Form.Item>

            <Tooltip title="点击刷新验证码">
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
