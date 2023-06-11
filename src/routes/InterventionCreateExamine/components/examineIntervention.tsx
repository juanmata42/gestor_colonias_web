import React from 'react';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import { Intervention } from '../../../models/intervention';
import { formatDate } from '../../../utils/reusableFunctions';

interface ExamineInterventionProps {
    literals: adminToolLang;
    intervention: Intervention;
    factoryName: string;
}

const ExamineIntervention: React.FC<ExamineInterventionProps> = ({ literals, intervention, factoryName }) => {
  const renderInfoItem = (label: string, value: string | undefined) => {
    return (
      <div className='examineIntervention__info-container'>
        <label className='examineIntervention__info-label'>
          {label}
          :
        </label>
        <p className='examineIntervention__info-value'>{value || ''}</p>
      </div>
    );
  };

  return (
    <>
      {renderInfoItem(literals.factory, factoryName)}
      {renderInfoItem(literals.factoryContact, intervention.factory_contact)}
      {renderInfoItem(literals.type, intervention.type)}
      {renderInfoItem(literals.date, intervention.date ? formatDate(new Date(intervention.date)) : '')}
      {renderInfoItem(literals.arrivalTime, intervention.arrival_time)}
      {renderInfoItem(literals.departureTime, intervention.leave_time)}
      {renderInfoItem(literals.discrepancies, intervention.discrepancies.toString())}
      {renderInfoItem(literals.descriptionEnglish, intervention.description_EN)}
      {renderInfoItem(literals.descriptionBangla, intervention.description_BN)}
    </>
  );
};

ExamineIntervention.displayName = 'ExamineIntervention';

export default ExamineIntervention;
