import React, { useState } from 'react';
import { ModifiedPatient, Patient } from '../../../models/patient';
import {
  API, createPatient, getAllPatients, updatePatient, deletePatient,
} from '../../../utils/apiCalls';
import { patient } from '../../../utils/mockData';

const PatientsCalls : React.FC = () => {
  const [getDropdown, setGetDropdown] = useState<boolean>(false);
  const [putDropdown, setPutDropdown] = useState<boolean>(false);
  const [postDropdown, setPostDropdown] = useState<boolean>(false);
  const [deleteDropdown, setDeleteDropdown] = useState<boolean>(false);
  const [getPatients, setGetPatients] = useState<Patient[]>();
  const [postPatient, setPostPatient] = useState<ModifiedPatient>();
  const [putPatient, setPutPatient] = useState<ModifiedPatient>();
  const [delPatient, setDelPatient] = useState<ModifiedPatient>();

  const handleClick = async (e: any) => {
    switch (e.target.id) {
      case 'get':
        if (!getDropdown) {
          setGetPatients(await getAllPatients());
        }
        setGetDropdown(!getDropdown);
        break;
      case 'put':
        if (!putDropdown && postPatient) {
          const toUpdate = {
            name: 'testUpdate',
          };
          setPutPatient(await updatePatient(postPatient.id, toUpdate));
        }
        setPutDropdown(!putDropdown);
        break;
      case 'post':
        if (!postDropdown) {
          setPostPatient(await createPatient(patient));
        }
        setPostDropdown(!postDropdown);
        break;
      case 'delete':
        if (!deleteDropdown && postPatient) {
          setDelPatient(await deletePatient(postPatient.id));
        }
        setDeleteDropdown(!deleteDropdown);
        break;
      default:
        break;
    }
  };
  return (
    <section className='patientsCalls'>
      <h2>Patients calls</h2>
      <button type='button' id='get' onClick={handleClick}>Get</button>
      {getDropdown && <div className='dropdown'>{JSON.stringify(getPatients)}</div>}
      <button type='button' id='put' onClick={handleClick}>Put</button>
      {putDropdown && <div className='dropdown'>{JSON.stringify(putPatient)}</div>}
      <button type='button' id='post' onClick={handleClick}>Post</button>
      {postDropdown && <div className='dropdown'>{JSON.stringify(postPatient)}</div>}
      <button type='button' id='delete' onClick={handleClick}>Delete</button>
      {deleteDropdown && <div className='dropdown'>{JSON.stringify(delPatient)}</div>}
    </section>
  );
};
export default PatientsCalls;
