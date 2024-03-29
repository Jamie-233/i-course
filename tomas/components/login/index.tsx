import { ChangeEvent, useState } from 'react';
import { message } from 'antd';
import { userLogin, sendVerifyCode } from 'config/api';
import styles from './index.module.scss';
import CountDown from 'components/count_down';

interface IProps {
  isShow: boolean;
  onClose: () => void;
}

const Login = (props: IProps) => {
  const { isShow = false, onClose } = props;

  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });

  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    userLogin({ ...form }).then((res: any) => {
      if (res.code === 0) {
        onClose && onClose();
      } else {
        message.error(res.msg || 'login error');
      }
    });
  };

  const handleGetVerifyCode = async () => {
    if (!form.phone) {
      message.warning('Place Input Phone Number');
      return;
    }

    setIsShowVerifyCode(true);
    const res = await sendVerifyCode({ to: 1, templateId: 1 });
    console.log('res', res);
  };

  const handleOAuthGithub = () => {};

  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return isShow ? (
    <div className={styles.login_area}>
      <div className={styles.login_box}>
        <div className={styles.login_title}>
          <div>Phone Number</div>
          <div className={styles.login_close} onClick={handleClose}>
            X
          </div>
        </div>
        <input
          value={form.phone}
          name="phone"
          type="text"
          placeholder="phone number"
          onChange={handleFormChange}
        />
        <div className={styles.verify_area}>
          <input name="verify" type="text" placeholder="verify code" />
          <span className={styles.verify_code} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              'Get Verify'
            )}
          </span>
        </div>
        <div className={styles.login_button} onClick={handleLogin}>
          Login
        </div>
        <div className={styles.other_login} onClick={handleOAuthGithub}>
          Github Login
        </div>
        <div className={styles.login_privacy}>
          xxxxxxxxx
          <a href="https://www.google.com/" target="_blank" rel="noreferrer">
            privacy
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
