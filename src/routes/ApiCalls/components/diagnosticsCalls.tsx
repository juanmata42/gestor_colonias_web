import React, { useState } from 'react';
import { Diagnostic, ModifiedDiagnostic } from '../../../models/diagnostic';
import { Patient } from '../../../models/patient';
import {
  API, createDiagnostic, deleteDiagnostic, getAllDiagnostics, getAllPatients, updateDiagnostic,
} from '../../../utils/apiCalls';

const DiagnosticsCalls : React.FC = () => {
  const [getDropdown, setGetDropdown] = useState<boolean>(false);
  const [putDropdown, setPutDropdown] = useState<boolean>(false);
  const [postDropdown, setPostDropdown] = useState<boolean>(false);
  const [deleteDropdown, setDeleteDropdown] = useState<boolean>(false);
  const [getDiagnostics, setgetDiagnostics] = useState<Diagnostic[]>();
  const [postDiagnostic, setPostDiagnostic] = useState<ModifiedDiagnostic>();
  const [putDiagnostic, setPutDiagnostic] = useState<ModifiedDiagnostic>();
  const [delDiagnostic, setDelDiagnostic] = useState<ModifiedDiagnostic>();

  const handleClick = async (e: any) => {
    switch (e.target.id) {
      case 'get':
        if (!getDropdown) {
          setgetDiagnostics(await getAllDiagnostics());
        }
        setGetDropdown(!getDropdown);
        break;
      case 'put':
        if (!putDropdown && postDiagnostic) {
          const toUpdate = {
            doctor_name: 'testUpdate',
          };
          setPutDiagnostic(await updateDiagnostic(postDiagnostic.id, toUpdate));
        }
        setPutDropdown(!putDropdown);
        break;
      case 'post':
        if (!postDropdown) {
          const res1: Patient[] = await getAllPatients();
          if (res1.length > 0) {
            const diag: Diagnostic = {
              id: 'test',
              app_id: 'Health',
              app_version: '1',
              patient_id: res1[0].id,
              doctor_id: '',
              doctor_name: 'test',
              doctor_lastname: 'test',
              factory_id: res1[0].factory_id,
              date: '2022-04-04',
              type: 'test',
              covid: false,
              status: false,
              comments: 'test',
            };
            setPostDiagnostic(await createDiagnostic(diag));
          }
        }

        setPostDropdown(!postDropdown);
        break;
      case 'delete':
        if (!deleteDropdown && postDiagnostic) {
          setDelDiagnostic(await deleteDiagnostic(postDiagnostic.id));
        }
        setDeleteDropdown(!deleteDropdown);
        break;
      default:
        break;
    }
  };
  return (
    <section className='diagnosticsCalls'>
      <h2>Diagnostics calls</h2>
      <button type='button' id='get' onClick={handleClick}>Get</button>
      {getDropdown && <div className='dropdown'>{JSON.stringify(getDiagnostics)}</div>}
      <button type='button' id='put' onClick={handleClick}>Put</button>
      {putDropdown && <div className='dropdown'>{JSON.stringify(putDiagnostic)}</div>}
      <button type='button' id='post' onClick={handleClick}>Post</button>
      {postDropdown && <div className='dropdown'>{JSON.stringify(postDiagnostic)}</div>}
      <button type='button' id='delete' onClick={handleClick}>Delete</button>
      {deleteDropdown && <div className='dropdown'>{JSON.stringify(delDiagnostic)}</div>}
    </section>
  );
};
export default DiagnosticsCalls;
