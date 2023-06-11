import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import { User, CreateUser, EditUser } from '../../../models/user';
import { Factory } from '../../../models/factory';
import UserPermissionsDisplayTab from './UserPermissionsDisplayTab';
import UserInfoDisplayTab from './UserInfoDisplayTab';
import { App } from '../../../models/app';
import RouteHeader from '../../../components/RouteSimpleHeader';

interface UserEditProps {
  adminUser: User;
  literals: adminToolLang;
  userToEdit: EditUser;
  appList: App[];
  language: string;
  getAllApps: () => void;
  loading: number;
  getUserFactories: () => void;
  factories: Factory[];
}

const UserInfoDisplay: React.FC<UserEditProps> = ({
  literals,
  adminUser,
  userToEdit,
  appList,
  language,
  getAllApps,
  loading,
  getUserFactories,
  factories,
}) => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<CreateUser | EditUser | User>({
    id: '',
    name: '',
    email: '',
    password: '',
  });
  const [tab, setTab] = useState<string>('info');
  const isMounted = useRef<boolean | null>(null);
  const history = useHistory();

  useEffect(() => {
    isMounted.current = true;

    if (!location.pathname.includes('/profile') && userToEdit.id === '-1' && loading === 0) {
      history.push('/home');
    }
    if (location.pathname.includes('/profile')) {
      const { password, ...userInfoWithoutPassword } = adminUser;
      setUserInfo(userInfoWithoutPassword);
    }
    if (location.pathname.includes('/userInfo')) {
      const { password, ...userInfoWithoutPassword } = userToEdit;
      setUserInfo(userInfoWithoutPassword);
    }

    return () => {
      isMounted.current = false;
    };
  }, [userToEdit]);

  useEffect(() => {
    getAllApps();
    getUserFactories();
  }, []);

  const handleTabChange = (selectedTab: string) => {
    setTab(selectedTab);
  };

  return (
    <section className='userDisplay__main-body'>
      {userInfo && (
        <>
          <RouteHeader title={literals.title} subtitle={`${tab === 'info' ? literals.userInfo : literals.userPermissions} ${userInfo.name}`} />
          <section className='userDisplay__info-body'>
            {!location.pathname.includes('/profile') && (
              <nav className='userDisplay__info-body__tab-container'>
                <button
                  className={`userDisplay__info-body__tab-button ${tab === 'info' ? 'active' : 'inactive'}`}
                  type='button'
                  onClick={() => handleTabChange('info')}
                >
                  {literals.userInfo}
                </button>
                <button
                  className={`userDisplay__info-body__tab-button ${tab === 'permissions' ? 'active' : 'inactive'}`}
                  type='button'
                  onClick={() => handleTabChange('permissions')}
                >
                  {literals.userPermissions}
                </button>
              </nav>
            )}
            {tab === 'info' && <UserInfoDisplayTab literals={literals} userInfo={userInfo} />}
            {tab === 'permissions' && appList.length > 0 && (
              <UserPermissionsDisplayTab literals={literals} userInfo={userInfo} appList={appList} language={language} factories={factories} />
            )}
          </section>
        </>
      )}
    </section>
  );
};

UserInfoDisplay.displayName = 'UserInfoDisplay';

export default UserInfoDisplay;
