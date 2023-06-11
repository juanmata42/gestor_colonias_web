import React, { useState } from 'react';
import { App, ModifiedApp } from '../../../models/app';
import {
  API, createApp, deleteApp, getAllApps, updateApp,
} from '../../../utils/apiCalls';
import { app } from '../../../utils/mockData';

const AppsCalls : React.FC = () => {
  const [getDropdown, setGetDropdown] = useState<boolean>(false);
  const [putDropdown, setPutDropdown] = useState<boolean>(false);
  const [postDropdown, setPostDropdown] = useState<boolean>(false);
  const [deleteDropdown, setDeleteDropdown] = useState<boolean>(false);
  const [getApps, setGetApps] = useState<App[]>();
  const [postApp, setPostApp] = useState<ModifiedApp>();
  const [putApp, setPutApp] = useState<ModifiedApp>();
  const [delApp, setDelApp] = useState<ModifiedApp>();

  const handleClick = async (e: any) => {
    switch (e.target.id) {
      case 'get':
        if (!getDropdown) {
          setGetApps(await getAllApps());
        }
        setGetDropdown(!getDropdown);
        break;
      case 'put':
        if (!putDropdown && postApp) {
          const toUpdate = {
            report: true,
          };
          setPutApp(await updateApp(postApp.id, toUpdate));
        }
        setPutDropdown(!putDropdown);
        break;
      case 'post':
        if (!postDropdown) {
          setPostApp(await createApp(app));
        }
        setPostDropdown(!postDropdown);
        break;
      case 'delete':
        if (!deleteDropdown && postApp) {
          setDelApp(await deleteApp(postApp.id));
        }
        setDeleteDropdown(!deleteDropdown);
        break;
      default:
        break;
    }
  };
  return (
    <section className='appsCalls'>
      <h2>apps calls</h2>
      <button type='button' id='get' onClick={handleClick}>Get</button>
      {getDropdown && <div className='dropdown'>{JSON.stringify(getApps)}</div>}
      <button type='button' id='put' onClick={handleClick}>Put</button>
      {putDropdown && <div className='dropdown'>{JSON.stringify(putApp)}</div>}
      <button type='button' id='post' onClick={handleClick}>Post</button>
      {postDropdown && <div className='dropdown'>{JSON.stringify(postApp)}</div>}
      <button type='button' id='delete' onClick={handleClick}>Delete</button>
      {deleteDropdown && <div className='dropdown'>{JSON.stringify(delApp)}</div>}
    </section>
  );
};
export default AppsCalls;
