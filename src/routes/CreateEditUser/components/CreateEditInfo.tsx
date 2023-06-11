import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { adminToolLang } from '../../../models/lang';
import alertIcon from '../../../assets/alert.svg';
import {
  User, CreateUser, EditUser,
} from '../../../models/user';
import countryArray from '../../../utils/countryArray';

interface userManagementProps {
  // eslint-disable-next-line no-unused-vars
  literals: adminToolLang;
  editUser: (userData: CreateUser | EditUser | User, callback: CallableFunction, id: string) => void;
  setUserInfo: (userData: CreateUser | EditUser | User) => void;
  updateCurrentUser: (userData: CreateUser | EditUser | User, callback: CallableFunction) => void;
  userToEdit: EditUser,
  userInfo: CreateUser | EditUser | User,
  specifics: {
    usage: string;
    title: string;
    callbackFunction: () => void;
  },
  editInCreationUser: (userData: CreateUser | EditUser | User) => void;
}

const CreateEditInfo: React.FC<userManagementProps> = (props) => {
  const {
    literals, editUser, userToEdit, specifics, setUserInfo, userInfo, updateCurrentUser, editInCreationUser,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('empty');
  const [telephoneError, setTelephoneError] = useState('empty');
  useEffect(() => {
    if (specifics.usage.includes('edit')) {
      setUserInfo({ ...userInfo, password: '' });
    }
  }, []);
  const editHandler = () => {
    if (specifics.usage === 'editInfo') {
      editUser(userInfo, specifics.callbackFunction, userToEdit.id || '');
    } else if (specifics.usage.includes('Personal')) {
      if (!specifics.usage.includes('Security')) {
        delete userInfo.password;
      }
      updateCurrentUser(userInfo, specifics.callbackFunction);
    }
  };
  const editInCreationHandler = () => {
    editInCreationUser({
      ...userInfo, su: false, appPermissions: [], userFactories: [],
    });
  };
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const passwordCheck = () => {
    if (userInfo.password === '') {
      setPasswordError('empty');
    } else if (userInfo.password !== confirmPassword) {
      setPasswordError('notMatch');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(userInfo.password)
    ) {
      setPasswordError('invalid');
    } else {
      setPasswordError('valid');
    }
  };
  const telephoneCheck = () => {
    if (userInfo.telephone === '') {
      setTelephoneError('empty');
    } else if (userInfo?.telephone) {
      const regexPhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s.]?[0-9]{3})([-\s.]?[0-9]{3,4})/;
      if (!regexPhone.test(userInfo.telephone)) {
        setTelephoneError('invalid');
      } else {
        setTelephoneError('valid');
      }
    }
  };

  useEffect(() => {
    passwordCheck();
  }, [userInfo.password, confirmPassword]);

  useEffect(() => {
    telephoneCheck();
  }, [userInfo.telephone]);
  const saveContinueRenderer = () => {
    if (['createInfo', 'editPersonalSecurityInfo'].includes(specifics.usage)) {
      if (passwordError !== 'valid') {
        let errorText = '';
        switch (passwordError) {
          case 'empty':
            errorText = literals.passwordEmpty;
            break;
          case 'notMatch':
            errorText = literals.passwordNotMatch;
            break;
          case 'invalid':
            errorText = literals.passwordRequirements;
            break;
          default:
            errorText = literals.passwordEmpty;
        }
        return (
          <>
            <div className='userEdit__error-contaier'>
              <img src={alertIcon} alt='alert' />
              <p className='userEdit__error-text'>{errorText}</p>
            </div>
            <div className='userEdit__saveContinueBtn-disabled' onClick={editHandler}>
              {specifics.usage === 'editPersonalSecurityInfo' && literals.save.toUpperCase()}
              {specifics.usage === 'createInfo' && literals.saveAndContinue.toUpperCase()}
            </div>
          </>
        );
      }
    }
    if (telephoneError !== 'valid') {
      let errorText = '';
      switch (telephoneError) {
        case 'empty':
          errorText = literals.telephoneEmpty;
          break;
        case 'invalid':
          errorText = literals.telephoneInvalid;
          break;
        default:
          errorText = literals.telephoneInvalid;
      }
      return (
        <>
          <div className='userEdit__error-contaier'>
            <img src={alertIcon} className='userEdit__error-image-big' alt='alert' />
            <div className='userEdit__error-text'>
              {errorText}
              <p className='userEdit__error-subtext'>
                - +1 (555) 555-5555
                <br />
                - (123)456-7890
                <br />
                - +91-9876543210
                <br />
                - (01234)567890
                <br />
                - +1 123-456-7890
              </p>
            </div>
          </div>
          <div className='userEdit__saveContinueBtn-disabled'>
            {specifics.usage === 'editInfo' && literals.save.toUpperCase()}
            {specifics.usage === 'createInfo' && literals.saveAndContinue.toUpperCase()}
          </div>
        </>
      );
    }

    if (specifics.usage === 'createInfo') {
      if (passwordError === 'valid' && telephoneError === 'valid') {
        return (
          <Link to='/admin/userManagement/create/permissions' className='userEdit__saveContinueBtn' onClick={editInCreationHandler}>
            {literals.saveAndContinue.toUpperCase()}
          </Link>
        );
      }
    } if (specifics.usage === 'editInfo' && telephoneError === 'valid') {
      return (
        <Link to='/admin/userManagement' className='userEdit__saveContinueBtn' onClick={editHandler}>
          {literals.save.toUpperCase()}
        </Link>
      );
    } if (specifics.usage === 'editPersonalInfo' && telephoneError === 'valid') {
      return (
        <Link to='/home' className='userEdit__saveContinueBtn' onClick={editHandler}>
          {literals.save.toUpperCase()}
        </Link>
      );
    } if (specifics.usage === 'editPersonalSecurityInfo') {
      if (passwordError === 'valid') {
        return (
          <Link to='/home' className='userEdit__saveContinueBtn' onClick={editHandler}>
            {literals.save.toUpperCase()}
          </Link>
        );
      }
    }
    return null;
  };
  function formatDate(date: string) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

    return [year, month, day].join('-');
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    if (e.target.type === 'select-one') {
      setUserInfo({ ...userInfo, [id]: value });
    } else if (id === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUserInfo({ ...userInfo, [id]: value });
    }
  }
  return (
    <section className='userEdit__body'>
      <form className='userEdit__form'>
        {specifics.usage !== 'editPersonalSecurityInfo' && (
          <>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='name'>{literals.name}</label>
              <input className='userEdit__input' id='name' type='text' value={userInfo.name || ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='lastName'>{literals.lastName}</label>
              <input className='userEdit__input' id='lastname' type='text' value={userInfo.lastname || ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='email'>{literals.email}</label>
              <input className='userEdit__input' id='email' type='text' value={userInfo.email || ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='telephone'>{literals.telephone}</label>
              <input className='userEdit__input' id='telephone' type='text' value={userInfo.telephone || ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='nid'>{literals.nid}</label>
              <input className='userEdit__input' id='nid' type='text' value={userInfo.nid || ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='gender'>{literals.gender}</label>
              <select className='userEdit__input' id='gender' value={userInfo.gender || ''} onChange={handleInput}>
                <option value='' disabled>{literals.select}</option>
                <option value='male'>{literals.male}</option>
                <option value='female'>{literals.female}</option>
              </select>
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='birthdate'>{literals.birthdate}</label>
              <input className='userEdit__input' id='birthdate' type='date' value={userInfo.birthdate ? formatDate(userInfo.birthdate) : ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='address'>{literals.address}</label>
              <input className='userEdit__input' id='address' type='text' value={userInfo.address || ''} onChange={handleInput} />
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='country'>{literals.country}</label>
              <select className='userEdit__input' id='country' value={userInfo.country || ''} onChange={handleInput}>
                <option value='' disabled>{literals.select}</option>
                {countryArray.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </>
        )}
        {(specifics.usage === 'editPersonalSecurityInfo' || specifics.usage === 'createInfo') && (
          <>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='password'>{literals.password}</label>
              <input
                required
                id='password'
                value={userInfo.password || ''}
                onChange={handleInput}
                name='password'
                type={showPassword ? 'text' : 'password'}
                className='userEdit__input'
                placeholder={literals.password}
                autoComplete='current-password'
              />
              <button
                className='userEdit__toggle-password'
                type='button'
                onClick={handleToggleShowPassword}
              >
                <i className={classnames('fa fa-lg', { 'fa-eye': !showPassword }, { 'fa-eye-slash': showPassword })} />
              </button>
            </div>
            <div className='userEdit__input-container'>
              <label className='userEdit__input-label' htmlFor='confirmPassword'>{literals.confirmPassword}</label>
              <input
                required
                id='confirmPassword'
                value={confirmPassword || ''}
                onChange={handleInput}
                name='confirmPassword'
                type={showPassword ? 'text' : 'password'}
                className='userEdit__input'
                placeholder={literals.password}
                autoComplete='current-password'
              />
              <button
                className='userEdit__toggle-password'
                type='button'
                onClick={handleToggleShowPassword}
              >
                <i className={classnames('fa fa-lg', { 'fa-eye': !showPassword }, { 'fa-eye-slash': showPassword })} />
              </button>
            </div>
          </>
        )}
      </form>
      {saveContinueRenderer()}
    </section>
  );
};

CreateEditInfo.displayName = 'CreateEditInfo';

export default CreateEditInfo;
