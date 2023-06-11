import React, { useState } from 'react';
import { User } from '../../../models/user';
import { API, getAllUsers } from '../../../utils/apiCalls';

const UserCalls : React.FC = () => {
  const [getDropdown, setGetDropdown] = useState<boolean>(false);
  const [putDropdown, setPutDropdown] = useState<boolean>(false);
  const [postDropdown, setPostDropdown] = useState<boolean>(false);
  const [deleteDropdown, setDeleteDropdown] = useState<boolean>(false);
  const [getUsers, setGetUsers] = useState<User[]>();

  const handleClick = async (e: any) => {
    switch (e.target.id) {
      case 'get':
        if (!getDropdown) {
          setGetUsers(await getAllUsers());
        }
        setGetDropdown(!getDropdown);
        break;
      case 'put':
        setPutDropdown(!putDropdown);
        break;
      case 'post':
        setPostDropdown(!postDropdown);
        break;
      case 'delete':
        setDeleteDropdown(!deleteDropdown);
        break;
      default:
        break;
    }
  };
  return (
    <section className='userCalls'>
      <h2>User calls</h2>
      <button type='button' id='get' onClick={handleClick}>Get</button>
      {getDropdown && <div className='dropdown'>{JSON.stringify(getUsers)}</div>}
      <button type='button' id='put' onClick={handleClick}>Put</button>
      {putDropdown && <div className='dropdown'>some data</div>}
      <button type='button' id='post' onClick={handleClick}>Post</button>
      {postDropdown && <div className='dropdown'>some data</div>}
      <button type='button' id='delete' onClick={handleClick}>Delete</button>
      {deleteDropdown && <div className='dropdown'>some data</div>}
    </section>
  );
};
export default UserCalls;
