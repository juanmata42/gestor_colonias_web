import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import { User } from '../../../models/user';
import { Factory } from '../../../models/factory';
import { Intervention, InterventionInput } from '../../../models/intervention';
import ExamineIntervention from './examineIntervention';
import RouteHeader from '../../../components/RouteSimpleHeader';
import { formatDate } from '../../../utils/reusableFunctions';

interface InterventionsCreateExamineProps {
  adminUser: User;
  literals: adminToolLang;
  selectedIntervention: string;
  interventions: Intervention[];
  language: string;
  getInterventions: () => void;
  loading: number;
  getUserFactories: () => void;
  factories: Factory[];
  createIntervention: (intervention: InterventionInput, callback: CallableFunction) => void;
}

const InterventionsCreateExamine: React.FC<InterventionsCreateExamineProps> = ({
  literals,
  adminUser,
  selectedIntervention,
  getInterventions,
  loading,
  getUserFactories,
  factories,
  interventions,
}) => {
  const location = useLocation();
  const [intervention, setIntervention] = useState<Intervention>();
  const [interventionInput, setInterventionInput] = useState<InterventionInput>();
  const isMounted = useRef<boolean | null>(null);
  const history = useHistory();

  useEffect(() => {
    isMounted.current = true;
    if (location.pathname.includes('examine') && selectedIntervention === '' && loading === 0) {
      history.push('/home');
    }
    if (location.pathname.includes('examine')) {
      setIntervention(interventions.find((item) => item.id === selectedIntervention));
    }
    if (location.pathname.includes('create')) {
      setInterventionInput({
        factory_id: '',
        factory_contact: '',
        type: '',
        date: new Date(),
        description_EN: '',
        description_BN: '',
        arrival_time: '',
        leave_time: '',
        discrepancies: 0,
        user_id: adminUser.id,
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [loading, selectedIntervention]);

  useEffect(() => {
    getInterventions();
    getUserFactories();
  }, []);

  return (
    <section className='intervention__main-body'>
      <RouteHeader title={literals.title} subtitle={location.pathname.includes('examine') ? `${literals.examineIntervention} ${factories.find((item) => item.id === intervention?.factory_id)?.name || ''} ${intervention?.date ? formatDate(new Date(intervention.date)) : ''}` : literals.newIntervention} />
      <section className='intervention__info-body'>
        {(location.pathname.includes('examine') && intervention?.id) && (
          <ExamineIntervention literals={literals} intervention={intervention} factoryName={factories.find((item) => item.id === intervention.factory_id)?.name || ''} />
        )}
      </section>
    </section>
  );
};

InterventionsCreateExamine.displayName = 'InterventionsCreateExamine';

export default InterventionsCreateExamine;
