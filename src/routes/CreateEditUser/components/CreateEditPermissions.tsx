/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { adminToolLang } from '../../../models/lang';
import {
  User, CreateUser, EditUser, UserPermission,
} from '../../../models/user';
import { App, langApp } from '../../../models/app';
import { Factory } from '../../../models/factory';
import alertIcon from '../../../assets/alert.svg';
import trashIcon from '../../../assets/trash.svg';
import searchIcon from '../../../assets/searchIcon.svg';

interface UserManagementProps {
  literals: adminToolLang;
  adminUser: User;
  createUser: (userData: CreateUser | EditUser | User, callback: CallableFunction) => void;
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
  appList: App[],
  language: string,
  factories: Factory[],
}

const CreateEditPermissions: React.FC<UserManagementProps> = (props) => {
  const {
    literals, createUser, editUser, adminUser, userToEdit, specifics, setUserInfo, userInfo, updateCurrentUser, appList, language, factories,
  } = props;
  const [permissionsError, setPermissionsError] = useState<boolean>(true);
  const editHandler = () => {
    if (specifics.usage === 'editPermissions') {
      editUser(userInfo, specifics.callbackFunction, userToEdit.id || '');
    } else if (specifics.usage.includes('Personal')) {
      updateCurrentUser(userInfo, specifics.callbackFunction);
    }
  };
  useEffect(() => {
    if (userInfo.su) {
      setPermissionsError(false);
    } else if (userInfo.appPermissions && userInfo.appPermissions.length > 0 && userInfo.userFactories && userInfo.userFactories.length > 0) {
      setPermissionsError(false);
    } else {
      setPermissionsError(true);
    }
  }, [userInfo]);
  const createHandler = () => {
    createUser(userInfo, specifics.callbackFunction);
  };

  const saveContinueRenderer = () => {
    if (permissionsError) {
      return (
        <>
          <div className='userEdit__error-contaier'>
            <img src={alertIcon} alt='alert' />
            <p className='userEdit__error-text'>{literals.permissionsFormatError}</p>
          </div>
          <div className='userEdit__saveContinueBtn-disabled'>
            {specifics.usage === 'createPermissions' && literals.createUser.toUpperCase()}
            {specifics.usage === 'editPermissions' && literals.save.toUpperCase()}
          </div>
        </>
      );
    }
    if (specifics.usage === 'createPermissions') {
      return (
        <Link to='/admin/userManagement' className='userEdit__saveContinueBtn' onClick={createHandler}>
          {literals.createUser.toUpperCase()}
        </Link>
      );
    } if (specifics.usage === 'editPermissions') {
      return (
        <Link to='/admin/userManagement' className='userEdit__saveContinueBtn' onClick={editHandler}>
          {literals.save.toUpperCase()}
        </Link>
      );
    }
    return null;
  };

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    if (e.target.type === 'checkbox') {
      setUserInfo({
        ...userInfo,
        [id]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setUserInfo({ ...userInfo, [id]: value });
    }
  }
  function handleFactoryInput(action: string, id: string) {
    if (userInfo.userFactories) {
      if (action === 'add') {
        setUserInfo({
          ...userInfo,
          userFactories: [...userInfo.userFactories, { factory_id: id }],
        });
      } else if (action === 'remove') {
        setUserInfo({ ...userInfo, userFactories: userInfo.userFactories.filter((factory) => factory.factory_id !== id) });
      }
    }
  }
  function titleFinder(appId: string) {
    const app = appList.find((appItem) => appItem.id === appId);
    return app?.i18nApp.find((appItem: langApp) => appItem.language === language)?.short_header || appId;
  }

  function findUserNode(nodeId: string) {
    if (userInfo.appPermissions) {
      return userInfo.appPermissions.find((node) => node.app_id === nodeId);
    }
    return null;
  }

  function removeNodeAndChildren(app_id: string, nodes: UserPermission[]): UserPermission[] {
    const filteredNodes: UserPermission[] = nodes.filter((node) => node.app_id !== app_id);

    const removeChildren = (parentId: string) => {
      const children = nodes.filter((node) => node.parent_app_id === parentId);
      children.forEach((child) => {
        filteredNodes.splice(filteredNodes.findIndex((node) => node.app_id === child.app_id), 1);
        removeChildren(child.app_id);
      });
    };

    const rootNode = nodes.find((node) => node.app_id === app_id);
    if (rootNode) {
      removeChildren(rootNode.app_id);
    }

    return filteredNodes;
  }

  function handleTreeSelection(targetNode: UserPermission, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { checked, value } = e.target as HTMLInputElement;

    if (typeof checked === 'boolean') {
      if (checked) {
        if (!userInfo.appPermissions) {
          setUserInfo({
            ...userInfo,
            appPermissions: [{ app_id: targetNode.app_id, level: 0, parent_app_id: targetNode.parent_app_id }],
          });
        } else {
          setUserInfo({
            ...userInfo,
            appPermissions: [...userInfo.appPermissions, { app_id: targetNode.app_id, level: 0, parent_app_id: targetNode.parent_app_id }],
          });
        }
      } else {
        setUserInfo({
          ...userInfo,
          appPermissions: removeNodeAndChildren(targetNode.app_id, userInfo.appPermissions || []),
        });
      }
    } else {
      setUserInfo({
        ...userInfo,
        appPermissions: userInfo.appPermissions?.map((node) => {
          if (node.app_id === targetNode.app_id) {
            return { ...node, level: Number(value) };
          }
          return node;
        }),
      });
    }
  }

  function nodeRenderer(node: UserPermission) {
    const userNode = findUserNode(node.app_id);
    const childrenIdArray = adminUser.appPermissions?.filter((child) => child.parent_app_id === node.app_id);

    return (
      <div key={`${node.app_id}_${node.level}`} className='userEdit__permissions__app-container'>
        <div className='userEdit__permissions__app-container-top'>
          <h4 className='userEdit__permissions__app-title'>{titleFinder(node.app_id)}</h4>
          <div className='userEdit__permissions__inputs-container'>
            <input className='userEdit__input' id={node.app_id} type='checkbox' checked={!!userNode} onChange={(e) => handleTreeSelection(node, e)} />
            {userNode && (
              <select className='userEdit__input' id={`${node.app_id}_role`} value={userNode.level || 0} onChange={(e) => handleTreeSelection(userNode, e)}>
                <option value={0}>{literals.reader}</option>
                <option value={1}>{literals.editor}</option>
                <option value={2}>{literals.admin}</option>
              </select>
            )}
          </div>
        </div>
        {userNode && childrenIdArray?.length ? (
          <div className='userEdit__permissions__app-container-bottom'>
            {childrenIdArray.map((child) => nodeRenderer(child))}
          </div>
        ) : null}
      </div>
    );
  }
  function permissionTreeRenderer() {
    if (adminUser?.appPermissions) {
      return adminUser.appPermissions.filter((node) => node.parent_app_id === null).map((node) => nodeRenderer(node));
    }
    return null;
  }
  const [factorySearch, setFactorySearch] = useState('');
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  function handleClickOutside(event: MouseEvent) {
    if (
      searchContainerRef.current
      && dropdownRef.current
      && !searchContainerRef.current.contains(event.target as Node)
      && !dropdownRef.current.contains(event.target as Node)
    ) {
      setFactorySearch('');
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function factorySearchBarRenderer() {
    const filteredFactories = factorySearch
      ? factories.filter((factory) => factory.name.toLowerCase().includes(factorySearch.toLowerCase()) && !userInfo.userFactories?.find((userFactory) => userFactory.factory_id === factory.id))
      : [];

    return (
      <div className='userEdit__permissions-factory-search-container'>
        <div className='userEdit__input-container' ref={searchContainerRef}>
          <input
            className='userEdit__input'
            id='factorySearch'
            type='text'
            placeholder={literals.addFactory}
            value={factorySearch}
            onChange={(e) => setFactorySearch(e.target.value)}
            autoComplete='off'
          />
          <img className='userEdit__input-icon' src={searchIcon} alt='search' />
          {filteredFactories.length > 0 && (
            <ul className='userEdit__permissions-factory-dropdown dropdown-list' ref={dropdownRef}>
              {filteredFactories.map((factory, index) => (
                <li
                  key={factory.id}
                  className='userEdit__permissions-factory-dropdown-item'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFactoryInput('add', factory.id);
                  }}
                >
                  <p className='userEdit__permissions-factory-dropdown-item-name'>{factory.name}</p>
                  <span>
                    {literals.add}
                    {' '}
                    <b>+</b>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  function factoriesSelectorRenderer() {
    if (factories?.length) {
      return (
        <div className='userEdit__permission-factories-container'>
          {factories.map((factory) => (userInfo.userFactories?.find((userFactory) => userFactory.factory_id === factory.id) && (
            <div className='userEdit__permission-container-factory' key={factory.id}>
              <label className='userEdit__permissions-factory-label' htmlFor={factory.id}>{factory.name}</label>
              <button type='button' className='userEdit__permissions-factory-button' onClick={() => handleFactoryInput('remove', factory.id)}>
                <img className='userEdit__permissions-factory-button-icon' src={trashIcon} alt='trash icon' title={literals.deleteUser} />
              </button>
            </div>
          )))}
        </div>
      );
    }
    return null;
  }
  return (
    <section className='userEdit__body'>
      <form className='userEdit__form'>
        {adminUser?.su && (
          <div className='userEdit__input-container userEdit__input-container__SUPermissions'>
            <label className='userEdit__input-label' htmlFor='su'>{literals.giveSuperUserPermissions}</label>
            <input className='userEdit__input' id='su' type='checkbox' checked={userInfo?.su || false} onChange={handleInput} />
            <span className='userEdit__input-extra-info'>{literals.giveSuperUserPermissionsInfo}</span>
          </div>
        )}
        {!userInfo?.su && (
          <>
            <h3 className='userEdit__form-title'>{literals.allowedFactories.toUpperCase()}</h3>
            {factories?.length && factorySearchBarRenderer()}
            {factories?.length && factoriesSelectorRenderer()}
            <h3 className='userEdit__form-title'>{literals.baseApps.toUpperCase()}</h3>
            {appList?.length && (
              <div className='userEdit__permissions__available-apps-container'>
                {userInfo && userInfo.appPermissions && permissionTreeRenderer()}
              </div>
            )}
          </>
        )}
      </form>
      {saveContinueRenderer()}
    </section>
  );
};

CreateEditPermissions.displayName = 'CreateEditPermissions';

export default CreateEditPermissions;
