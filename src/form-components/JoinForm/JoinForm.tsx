import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Tooltip } from 'antd';

import { ICompBaseProps } from '@/types';
import { IApiUserItem } from '@/types/api';
import { useStore } from '@/stores';
import { useQueryItemCaptcha } from '@/querys/captcha';
import { getCookieVisitorToken } from '@/utils/user.util';

import styles from './styles.module.less';

interface IProps extends ICompBaseProps {
  item?: IApiUserItem | undefined;
  //
  onSubmit?: () => void;
  ref?: any;
}

// eslint-disable-next-line import/no-mutable-exports
let JoinForm: React.FC<IProps> = forwardRef((props, ref) => {
  const { appStore } = useStore();

  const [form] = Form.useForm();
  const [token, setToken] = useState<string>('');



  useImperativeHandle(ref, () => ({ form }));

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
      </Form>
    </div>
  );
});

JoinForm = observer(JoinForm);
export { JoinForm };
