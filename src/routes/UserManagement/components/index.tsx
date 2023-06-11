import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import { User, dependantUser } from '../../../models/user';
import { TableActions } from '../../../models/tableActions';
import RouteHeader from '../../../components/RouteSimpleHeader';
import Modal from '../../../components/Modal';
import InfoTable from '../../../components/InfoTable';

interface userManagementProps {
  // eslint-disable-next-line no-unused-vars
  literals: adminToolLang;
  adminUser: User;
  getAllUsers: () => void;
  deleteUser: (id: string, callback: CallableFunction) => void;
  getUserByID: (id: string) => void;
  userManagement: dependantUser[];
}

const UserManagement: React.FC<userManagementProps> = (props) => {
  const {
    literals, userManagement, getAllUsers, deleteUser, adminUser, getUserByID,
  } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<dependantUser>();
  const isMounted: React.MutableRefObject<boolean | null> = useRef(null);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getAllUsers();
    }
    return () => { isMounted.current = false; };
  }, []);

  // for the table
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [keysToRender, setKeysToRender] = useState<string[]>([]);
  const [tableData, setTableData] = useState<dependantUser[]>(userManagement);
  const [actions, setActions] = useState<TableActions>();
  const userToDeleteHandler = (user: dependantUser) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  const userToEditHandler = (id: string) => {
    getUserByID(id);
  };
  const userManagementDeleteHandler = (id: string) => {
    const updatedUserManagement = userManagement.filter((user) => user.id !== id);
    setTableData(updatedUserManagement);
    getAllUsers();
  };
  const deleteUserHandler = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id, getAllUsers);
      userManagementDeleteHandler(userToDelete.id);
    }
    setIsDeleteModalOpen(false);
  };
  useEffect(() => {
    setTableHeaders([literals.name, literals.lastName, literals.email, literals.updated, literals.actions]);
    setKeysToRender(['name', 'lastname', 'email', 'updated_at|or|created_at']);
    const actionsObj: TableActions = {};
    actionsObj.read = {
      title: literals.seeUserInfo,
      onClick: (user: dependantUser) => userToEditHandler(user.id),
      to: (user: dependantUser) => `userManagement/userInfo/${user.name}`,
    };
    if (adminUser.su || (adminUser.appPermissions?.find((permission) => permission.app_id === 'UserManagement'))) {
      const userManagementPermission = adminUser.appPermissions?.find((permission) => permission.app_id === 'UserManagement');
      if (!userManagementPermission || userManagementPermission.level > 0) {
        actionsObj.delete = {
          title: literals.deleteUser,
          onClick: (user: dependantUser) => userToDeleteHandler(user),
          to: (user: dependantUser) => '',
        };
        actionsObj.permissions = {
          title: literals.editUserPermissions,
          onClick: (user: dependantUser) => userToEditHandler(user.id),
          to: (user: dependantUser) => `userManagement/edit/permissions/${user.name}`,
        };
        actionsObj.edit = {
          title: literals.editUserInfo,
          onClick: (user: dependantUser) => userToEditHandler(user.id),
          to: (user: dependantUser) => `userManagement/edit/info/${user.name}`,
        };
      }
    }

    setActions(actionsObj);
    setTableData(userManagement.filter((user) => user.id !== adminUser.id));
  }, [userManagement]);
  return (
    <>
      <section className='userManagement__body'>
        <RouteHeader title={literals.title} subtitle={literals.userManagementPanel} />
        <section className='userManagement__body__content'>
          <div className='userManagement__button-wrapper'>
            <Link className='userManagement__create-user-btn' to='userManagement/create/info'>
              +
              {' '}
              {literals.newUser.toUpperCase()}
            </Link>
          </div>
          {tableData && tableData.length > 0 ? (
            <InfoTable headers={tableHeaders} data={tableData} keysToRender={keysToRender} actions={actions} />
          ) : null}
        </section>
      </section>
      {isDeleteModalOpen && (
        <Modal
          title={literals.deleteUser}
          text={(
            <>
              <p className='modal__body__text'>
                {literals.userDeleteConfirmation}
              </p>
              <p className='modal__body__targetName'>
                {`${userToDelete?.name} ${userToDelete?.lastname}`}
              </p>
            </>
          )}
          buttonActionText={literals.deleteUser.toUpperCase()}
          actionFunction={deleteUserHandler}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}
    </>
  );
};

UserManagement.displayName = 'UserManagement';

export default UserManagement;
