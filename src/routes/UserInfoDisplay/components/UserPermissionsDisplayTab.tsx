import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { adminToolLang } from '../../../models/lang';
import {
  User, CreateUser, EditUser, UserPermission,
} from '../../../models/user';
import { App, langApp } from '../../../models/app';
import { Factory } from '../../../models/factory';

interface UserPermissionsDisplayTabProps {
  literals: adminToolLang;
  userInfo: CreateUser | EditUser | User;
  appList: App[];
  language: string;
  factories: Factory[];
}

const UserPermissionsDisplayTab: React.FC<UserPermissionsDisplayTabProps> = ({
  literals,
  userInfo,
  appList,
  language,
  factories,
}) => {
  const titleFinder = (appId: string) => {
    const app = appList.find((appItem) => appItem.id === appId);
    return app?.i18nApp.find((appItem: langApp) => appItem.language === language)?.short_header || appId;
  };

  const findUserNode = (nodeId: string) => {
    if (userInfo.appPermissions) {
      return userInfo.appPermissions.find((node) => node.app_id === nodeId);
    }
    return null;
  };

  const nodeRenderer = (node: UserPermission) => {
    const userNode = findUserNode(node.app_id);
    const childrenIdArray = userInfo.appPermissions?.filter((child) => child.parent_app_id === node.app_id);
    let level = '';
    switch (node.level) {
      case 0:
        level = literals.reader;
        break;
      case 1:
        level = literals.editor;
        break;
      case 2:
        level = literals.admin;
        break;
      default:
        level = literals.reader;
        break;
    }
    return (
      <div key={`${node.app_id}_${node.level}`} className='userDisplay__permissions__app-container'>
        <div className='userDisplay__permissions__app-container-top'>
          <h4 className='userDisplay__permissions__app-title'>{titleFinder(node.app_id)}</h4>
          <p className='userDisplay__info-value'>{level}</p>
        </div>
        {userNode && childrenIdArray?.length ? (
          <div className='userDisplay__permissions__app-container-bottom'>
            {childrenIdArray.map((child) => nodeRenderer(child))}
          </div>
        ) : null}
      </div>
    );
  };

  const permissionTreeRenderer = () => {
    if (userInfo?.appPermissions) {
      return userInfo.appPermissions.filter((node) => node.parent_app_id === null).map((node) => nodeRenderer(node));
    }
    return null;
  };

  const factoriesRenderer = () => {
    if (userInfo.userFactories?.length && factories?.length) {
      return (
        <ul className='userDisplay__permission-factories-container'>
          {userInfo.userFactories.map((factory) => (
            <li className='userDisplay__permissions-factory' key={factory.factory_id}>
              {factories.find((item) => item.id === factory.factory_id)?.name}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      {userInfo?.su && (
        <div className='userDisplay__info-container userDisplay__info-container__SUPermissions'>
          <label className='userDisplay__info-label'>{literals.userIsSuperUser}</label>
          <p className='userDisplay__info-extra-info'>{literals.userIsSuperUserInfo}</p>
        </div>
      )}
      {!userInfo?.su && (
        <>
          <section className='userDisplay__info-body-section'>
            <h3 className='userDisplay__title'>{literals.allowedFactories.toUpperCase()}</h3>
            {factories?.length && factoriesRenderer()}
          </section>
          <section className='userDisplay__info-body-section'>
            <h3 className='userDisplay__title'>{literals.baseApps.toUpperCase()}</h3>
            {appList?.length && (
              <div className='userDisplay__permissions__available-apps-container'>
                {userInfo && userInfo.appPermissions && permissionTreeRenderer()}
              </div>
            )}
          </section>
        </>
      )}
      <div className='userDisplay__toEditBtn-container'>
        <Link to={`/admin/userManagement/edit/permissions/${userInfo.name}`} className='userDisplay__toEditBtn'>
          {literals.editUserPermissions.toUpperCase()}
        </Link>
      </div>
    </>
  );
};

UserPermissionsDisplayTab.displayName = 'UserPermissionsDisplayTab';

export default UserPermissionsDisplayTab;
