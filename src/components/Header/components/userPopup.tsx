import React, { useRef, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import placeholderUserImg from '../../../assets/placeholderUserImg.png';
import securityIcon from '../../../assets/security.svg';
import personalInfoIcon from '../../../assets/personal-info.svg';
import { MainpageLang } from '../../../models/lang';

export default function UserPopup({
  show, setPopupShow, email, userName, literals,
}: { show: boolean, setPopupShow: (value: boolean | ((prevVar: boolean) => boolean)) => void, email: string, userName: string, literals: MainpageLang; }) {
  /**
 * Hook that alerts clicks outside of the passed ref
 */
  function useOutsideAlerter(ref: React.RefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (show) {
          if (ref.current && !ref.current.contains(event.target)) {
            setPopupShow(!show);
          }
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
      // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <aside className='header__user-popup' ref={wrapperRef}>
      <div className='user-popup__top-container'>
        <img src={placeholderUserImg} className='user-popup__user-img' alt='User profile pic' />
        <div className='user-popup__user-info'>
          <h2 className='user-popup__user-name'>{userName}</h2>
          <h3 className='user-popup__user-email'>{email}</h3>
        </div>
        <Link className='user-popup__link' to='/profile/personalInfo'>
          <img className='user-popup__link-icon' src={personalInfoIcon} alt='personal info icon' />
          {literals.personalInfo}
        </Link>
        <Link className='user-popup__link' to='/profile/security'>
          <img className='user-popup__link-icon' src={securityIcon} alt='security icon' />
          {literals.security}
        </Link>
      </div>
      <div className='user-popup__bottom-container'>
        <Link to='/logout' className='user-popup__logout-button button-tertiary'>LOG OUT</Link>
      </div>
    </aside>
  );
}
