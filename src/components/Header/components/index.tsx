import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoImg from '../../../assets/logo_title_white.svg';
import './styles.scss';
import placeholderUserImg from '../../../assets/placeholderUserImg.png';
import goBackArrow from '../../../assets/arrow_left_white.svg';
import UserPopup from './userPopup';
import { MainpageLang } from '../../../models/lang';
import { User } from '../../../models/user';
import { getCurrentUser } from '../../../utils/apiCalls';
import { sessionActions } from '../../../store/session';

interface Props {
  literals: MainpageLang;
  user: User;
}

const Header: React.FC<Props> = (props) => {
  const { literals, user } = props;
  const location = useLocation();
  const [popupShow, setPopupShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id === '-1') {
      getCurrentUser().then((userData) => {
        dispatch(sessionActions.success(userData));
      });
    }
  }, []);

  const wrapperRef = useRef(null);
  // eslint-disable-next-line
  const ref1: React.RefObject<any> = wrapperRef;

  useEffect(() => {
    // eslint-disable-next-line
    function handleClick(event: any) {
      if (!popupShow) {
        if (ref1.current && ref1.current.contains(event.target)) {
          setPopupShow(!popupShow);
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref1]);

  // add here locations that use the same back to home button
  const baseLocations = ['/alertsnews', '/health', '/minorInjuries', '/covid', '/ILO', '/admin'];
  const newsLocations = ['/alertsnews/global', '/alertsnews/local'];
  const adminTools = ['/admin/userManagement', '/admin/interventions'];
  const userEdit = '/admin/userManagement/edit';
  const userInfoDisplay = '/admin/userManagement/userInfo';
  const createUser = ['/admin/userManagement/create/info', '/admin/userManagement/create/permissions'];
  const profileEdit = ['/profile/personalInfo', '/profile/personalInfo/edit', '/profile/security'];
  const interventionsSubpages = ['/admin/interventions/create', '/admin/interventions/examine'];
  function goBackNav() {
    if (baseLocations.includes(location.pathname) || profileEdit.includes(location.pathname)) {
      return (
        <NavLink to='/home'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToHome}
          </div>
        </NavLink>
      );
    }
    if (location.pathname.includes(newsLocations[0])) {
      return (
        <NavLink to='/alertsnews'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToGlobalNews}
          </div>
        </NavLink>
      );
    }
    if (location.pathname.includes(newsLocations[1])) {
      return (
        <NavLink to='/alertsnews'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToLocalNews}
          </div>
        </NavLink>
      );
    }
    if (adminTools.includes(location.pathname)) {
      return (
        <NavLink to='/admin'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToAdminTools}
          </div>
        </NavLink>
      );
    }
    if (location.pathname.includes(userEdit)) {
      return (
        <NavLink to='/admin/userManagement'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToUserManagementPanel}
          </div>
        </NavLink>
      );
    }
    if (location.pathname.includes(createUser[0])) {
      return (
        <NavLink to={adminTools[0]}>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToUserManagementPanel}
          </div>
        </NavLink>
      );
    }
    if (location.pathname.includes(createUser[1])) {
      return (
        <NavLink to={createUser[0]}>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToCreateUserInfo}
          </div>
        </NavLink>
      );
    }
    if (location.pathname.includes(userInfoDisplay)) {
      return (
        <NavLink to='/admin/userManagement'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToUserManagementPanel}
          </div>
        </NavLink>
      );
    }
    if (interventionsSubpages.some((path) => location.pathname.includes(path))) {
      return (
        <NavLink to='/admin/interventions'>
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.backToInterventionsPanel}
          </div>
        </NavLink>
      );
    }
    return (<NavLink to='/home'><img src={LogoImg} className='main-logo' alt='Main Logo' /></NavLink>);
  }
  return (
    <header className='header'>
      {goBackNav()}
      <img src={placeholderUserImg} className='header__user-img' alt='User profile pic' ref={wrapperRef} />
      {popupShow && <UserPopup show={popupShow} setPopupShow={setPopupShow} email={user.email} userName={user.name} literals={literals} />}
    </header>
  );
};

export default Header;
