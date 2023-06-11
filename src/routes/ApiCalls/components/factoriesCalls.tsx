import React, { useState } from 'react';
import { Factory } from '../../../models/factory';
import { getAllFactories } from '../../../utils/apiCalls';

const FactoriesCalls : React.FC = () => {
  const [getDropdown, setGetDropdown] = useState<boolean>(false);
  const [putDropdown, setPutDropdown] = useState<boolean>(false);
  const [postDropdown, setPostDropdown] = useState<boolean>(false);
  const [deleteDropdown, setDeleteDropdown] = useState<boolean>(false);
  const [getFactories, setGetFactories] = useState<Factory[]>();

  const handleClick = async (e: any) => {
    switch (e.target.id) {
      case 'get':
        if (!getDropdown) {
          setGetFactories(await getAllFactories());
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
    <section className='factoriesCalls'>
      <h2>Factories calls</h2>
      <button type='button' id='get' onClick={handleClick}>Get</button>
      {getDropdown && <div className='dropdown'>{JSON.stringify(getFactories)}</div>}
      <button type='button' id='put' onClick={handleClick}>Put</button>
      {putDropdown && <div className='dropdown'>some data</div>}
      <button type='button' id='post' onClick={handleClick}>Post</button>
      {postDropdown && <div className='dropdown'>some data</div>}
      <button type='button' id='delete' onClick={handleClick}>Delete</button>
      {deleteDropdown && <div className='dropdown'>some data</div>}
    </section>
  );
};
export default FactoriesCalls;
