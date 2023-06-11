import React from 'react';
import AppsCalls from './appsCalls';
import DiagnosticsCalls from './diagnosticsCalls';
import FactoriesCalls from './factoriesCalls';
import UserCalls from './userCalls';
import PatientCalls from './patientsCalls';

//* RCT* --> literals.logout should not be any type

const ApiCalls: React.FC = () => {
  return (
    <div>
      <h1>For testing  all api calls</h1>
      <UserCalls />
      <FactoriesCalls />
      <AppsCalls />
      <DiagnosticsCalls />
      <PatientCalls />
    </div>
  );
};

ApiCalls.displayName = 'ApiCalls';

export default ApiCalls;
