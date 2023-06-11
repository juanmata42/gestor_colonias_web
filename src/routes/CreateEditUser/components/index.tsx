/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import {
  User, CreateUser, EditUser,
} from '../../../models/user';
import { Factory } from '../../../models/factory';
import CreateEditPermissions from './CreateEditPermissions';
import CreateEditInfo from './CreateEditInfo';
import { App } from '../../../models/app';
import RouteHeader from '../../../components/RouteSimpleHeader';

interface UserEditProps {
  literals: adminToolLang;
  adminUser: User;
  createUser: (userData: CreateUser | EditUser | User, callback: CallableFunction) => void;
  editUser: (userData: CreateUser | EditUser | User, callback: CallableFunction, id: string) => void;
  getCurrentUser: () => void;
  updateCurrentUser: (userData: CreateUser | EditUser | User, callback: CallableFunction) => void;
  getAllUsers: () => void;
  userToEdit: EditUser,
  appList: App[],
  language: string,
  getAllApps: () => void;
  loading: number,
  editInCreationUser: (userData: CreateUser | EditUser | User) => void;
  getUserFactories: () => void;
  factories: Factory[],
}
const CreateEditUser: React.FC<UserEditProps> = ({
  literals,
  createUser,
  editUser,
  adminUser,
  userToEdit,
  getCurrentUser,
  getAllUsers,
  updateCurrentUser,
  appList,
  language,
  getAllApps,
  loading,
  editInCreationUser,
  getUserFactories, factories,
}) => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<CreateUser | EditUser | User>({
    id: '',
    name: '',
    email: '',
    password: '',
  });
  const isMounted = useRef<boolean | null>(null);
  const history = useHistory();

  useEffect(() => {
    isMounted.current = true;
    if (!location.pathname.includes('/profile')) {
      if (!location.pathname.includes('/create')) {
        if (userToEdit.id === '-1' && loading === 0) {
          history.push('/home');
        }
        const { password, ...userInfoWithoutPassword } = userToEdit;
        setUserInfo(userInfoWithoutPassword);
      } else {
        setUserInfo(userToEdit);
      }
    } else {
      const { password, ...userInfoWithoutPassword } = adminUser;
      setUserInfo(userInfoWithoutPassword);
    }
    return () => {
      isMounted.current = false;
    };
  }, [userToEdit, adminUser]);
  useEffect(() => {
    if (location.pathname.includes('/permissions')) {
      getAllApps();
      getUserFactories();
    }
  }, []);
  interface Specifics {
    usage: string;
    title: string;
    callbackFunction: () => void;
  }

  const [specifics, setSpecifics] = useState<Specifics>({
    usage: '',
    title: '',
    callbackFunction: () => { },
  });
  useEffect(() => {
    let specificsTemp = {
      usage: '', title: '', callbackFunction: () => { },
    };
    if (location.pathname.includes('/admin/userManagement/create/info')) {
      specificsTemp = {
        usage: 'createInfo', title: literals.createUserInfo, callbackFunction: getAllUsers,
      };
    } else if (location.pathname.includes('/admin/userManagement/create/permissions')) {
      specificsTemp = {
        usage: 'createPermissions', title: literals.createUserPermissions, callbackFunction: getAllUsers,
      };
    } else if (location.pathname.includes('/admin/userManagement/edit/info')) {
      specificsTemp = {
        usage: 'editInfo', title: `${literals.editUserInfo} ${userToEdit.name}`, callbackFunction: getAllUsers,
      };
    } else if (location.pathname.includes('/admin/userManagement/edit/permissions')) {
      specificsTemp = {
        usage: 'editPermissions', title: `${literals.editUserPermissions} ${userToEdit.name}`, callbackFunction: getAllUsers,
      };
    } else if (location.pathname.includes('/profile/personalInfo')) {
      specificsTemp = {
        usage: 'editPersonalInfo', title: literals.editUserInfo, callbackFunction: getCurrentUser,
      };
    } else if (location.pathname.includes('/profile/security')) {
      specificsTemp = {
        usage: 'editPersonalSecurityInfo', title: literals.userSecurity, callbackFunction: getCurrentUser,
      };
    }
    setSpecifics(specificsTemp);
  }, [location.pathname, literals, userInfo, appList]);
  return (
    <section className='userEdit__main-body'>
      {userInfo && (
        <>
          <RouteHeader title={literals.title} subtitle={specifics.title} />
          {specifics.usage.includes('Info') && <CreateEditInfo literals={literals} updateCurrentUser={updateCurrentUser} editUser={editUser} userToEdit={userToEdit} userInfo={userInfo} setUserInfo={setUserInfo} specifics={specifics} editInCreationUser={editInCreationUser} />}
          {specifics.usage.includes('Permissions') && appList.length > 0 && <CreateEditPermissions literals={literals} adminUser={adminUser} updateCurrentUser={updateCurrentUser} createUser={createUser} editUser={editUser} userToEdit={userToEdit} userInfo={userInfo} setUserInfo={setUserInfo} specifics={specifics} appList={appList} language={language} factories={factories} />}
        </>
      )}
    </section>
  );
};

CreateEditUser.displayName = 'CreateEditUser';

export default CreateEditUser;
