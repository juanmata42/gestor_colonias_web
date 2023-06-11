/* eslint-disable react/function-component-definition */
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import constants from '../../../utils/defaultConstants';
import LogoImg from '../../../assets/logo_title.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import { LoginLang } from '../../../models/lang';
import Maintenance from '../components/maintenance';
import './styles.scss';

interface LoginProps {
  // *RCT* --> eslint disable is used here since this is a function declaration type and eslint does not understand it
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string, callback: CallableFunction) => boolean;
  sessionError: ReactNode;
  literals: {
    login: LoginLang
  }
}

const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    const { login } = props;
    e.preventDefault();
    setSending(true);
    login(email, password, () => {
      setSending(false);
      setErrorLogin(true);
    });
  };

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { literals: { login: literals } } = props;
  // Change this flag to false to disable maintenance screen at login
  if (constants.MAINT_MODE) {
    return (
      <div>
        <Maintenance />
      </div>
    );
  }
  return (
    (
      <div className='login'>
        <img src={LogoImg} className='login__main-logo' alt='Main Logo' />
        <h1 className='login__title'>{literals.welcome}</h1>
        <p className='login__subtitle'>{literals.workTogether}</p>
        <form className='login__form' onSubmit={handleLogin}>
          <div className='login__email-box'>
            <label htmlFor='floatingInput'>{literals.emailAddress}</label>
            <input
              required
              id='floatingInput'
              value={email}
              onChange={handleEmail}
              name='email'
              type='email'
              className=' login__input-box'
              placeholder='name@example.com'
              autoComplete='username'
            />
          </div>
          <div className='login__password-box'>
            <label htmlFor='floatingPassword'>{literals.password}</label>
            <input
              required
              id='floatingPassword'
              value={password}
              onChange={handlePassword}
              name='password'
              type={showPassword ? 'text' : 'password'}
              className=' login__input-box'
              placeholder={literals.password}
              autoComplete='current-password'
            />
            <button
              className='login__toggle-password'
              type='button'
              id='button-addon1'
              onClick={handleToggleShowPassword}
            >
              <i className={classnames('fa fa-lg', { 'fa-eye': !showPassword }, { 'fa-eye-slash': showPassword })} />
            </button>
            <Link to='/forgot-password' className='login__forgot-password'>{literals.forgotPassword}</Link>
          </div>
          <button
            className='button-primary login__enter-button login__input-box'
            type='submit'
            disabled={sending}
          >
            {!sending && literals.enter}
            {sending && (
              literals.loading
            )}
          </button>
        </form>
        {errorLogin && (
          <span className='login__error'>
            {literals.loginError}
          </span>
        )}
        <section className='login__undertext'>
          <p className='undertext__p'>
            {literals.partner}
            {' '}
            <a className='undertext__writeus'>{literals.writeUs}</a>
          </p>

        </section>
        <img className='login__university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
        <footer className='login__footer'>
          <div className='login__supported-box'>
            <p className='supported-box__p'>{literals.supportedBy}</p>
            <img className='supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
          </div>
          <p className='login__copyright'>{literals.copyright}</p>
        </footer>
      </div>
    ));
};

Login.displayName = 'Login';

export default Login;
