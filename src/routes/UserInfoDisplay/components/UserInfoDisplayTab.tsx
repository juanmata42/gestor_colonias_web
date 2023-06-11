import React from 'react';
import './styles.scss';
import { useLocation, Link } from 'react-router-dom';
import { adminToolLang } from '../../../models/lang';
import { User, CreateUser, EditUser } from '../../../models/user';
import { formatDate } from '../../../utils/reusableFunctions';

interface UserInfoDisplayTabProps {
  literals: adminToolLang;
  userInfo: CreateUser | EditUser | User;
}

const UserInfoDisplayTab: React.FC<UserInfoDisplayTabProps> = ({ literals, userInfo }) => {
  const location = useLocation();

  const renderInfoItem = (label: string, value: string | undefined) => {
    return (
      <div className='userDisplay__info-container'>
        <label className='userDisplay__info-label'>
          {label}
          :
        </label>
        <p className='userDisplay__info-value'>{value || ''}</p>
      </div>
    );
  };

  return (
    <>
      {renderInfoItem(literals.name, userInfo.name)}
      {renderInfoItem(literals.lastName, userInfo.lastname)}
      {renderInfoItem(literals.email, userInfo.email)}
      {renderInfoItem(literals.telephone, userInfo.telephone)}
      {renderInfoItem(literals.nid, userInfo.nid)}
      {renderInfoItem(literals.gender, userInfo.gender)}
      {renderInfoItem(literals.birthdate, userInfo.birthdate ? formatDate(new Date(userInfo.birthdate)) : '')}
      {renderInfoItem(literals.address, userInfo.address)}
      {renderInfoItem(literals.country, userInfo.country)}
      <div className='userDisplay__toEditBtn-container'>
        <Link
          to={location.pathname.includes('/profile') ? '/profile/personalInfo/edit' : `/admin/userManagement/edit/info/${userInfo.name}`}
          className='userDisplay__toEditBtn'
        >
          {literals.editUserInfo.toUpperCase()}
        </Link>
      </div>
    </>
  );
};

UserInfoDisplayTab.displayName = 'UserInfoDisplayTab';

export default UserInfoDisplayTab;
