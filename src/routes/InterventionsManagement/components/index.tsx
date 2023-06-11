import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import { Intervention } from '../../../models/intervention';
import { User } from '../../../models/user';
import { Factory } from '../../../models/factory';
import { TableActions } from '../../../models/tableActions';
import { formatDate } from '../../../utils/reusableFunctions';
import { deleteIntervention } from '../../../utils/apiCalls';
import RouteHeader from '../../../components/RouteSimpleHeader';
import Modal from '../../../components/Modal';
import InfoTable from '../../../components/InfoTable';

interface interventionsManagementProps {
  // eslint-disable-next-line no-unused-vars
  literals: adminToolLang;
  adminUser: User;
  createIntervention: (InterventionData: Intervention, callback: CallableFunction) => void;
  deleteIntervention: (id: string, callback: CallableFunction) => void;
  getInterventions: () => void;
  selectIntervention: (intervention: Intervention) => void;
  interventions: Intervention[];
  getUserFactories: () => void;
  factories: Factory[],
}

const InterventionsManagement: React.FC<interventionsManagementProps> = (props) => {
  const {
    literals, createIntervention, getInterventions, selectIntervention, interventions, adminUser,
    getUserFactories, factories,
  } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [interventionToDelete, setInterventionToDelete] = useState<Intervention>();
  const isMounted: React.MutableRefObject<boolean | null> = useRef(null);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getInterventions();
      getUserFactories();
    }
    return () => { isMounted.current = false; };
  }, []);

  // for the table
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [keysToRender, setKeysToRender] = useState<string[]>([]);
  const [tableData, setTableData] = useState<Intervention[]>(interventions);
  const [actions, setActions] = useState<TableActions>();
  const interventionSelectionHandler = (intervention: Intervention) => {
    selectIntervention(intervention);
  };
  const interventionToDeleteHandler = (intervention: Intervention) => {
    setInterventionToDelete(intervention);
    setIsDeleteModalOpen(true);
  };
  const deleteInterventionHandler = () => {
    if (interventionToDelete) {
      deleteIntervention(interventionToDelete.id).then(() => {
        getInterventions();
        setIsDeleteModalOpen(false);
      });
    }
  };
  useEffect(() => {
    setTableHeaders([
      literals.factory,
      literals.date,
      literals.manager,
      literals.type,
      literals.actions,
    ]);
    setKeysToRender([
      'factory_id',
      'date',
      'factory_contact',
      'type',
    ]);
    const actionsObj: TableActions = {};
    actionsObj.read = {
      title: literals.examineIntervention,
      onClick: (intervention: Intervention) => {
        interventionSelectionHandler(intervention);
      },
      to: (intervention: Intervention) => `/admin/interventions/examine/${formatDate(intervention.date)}`,
    };
    if (adminUser.su || adminUser.appPermissions?.find((permission) => permission.app_id === 'Interventions')) {
      const interventionsPermission = adminUser.appPermissions?.find((permission) => permission.app_id === 'Interventions');
      if (!interventionsPermission || interventionsPermission.level > 0) {
        actionsObj.delete = {
          title: literals.deleteIntervention,
          onClick: (intervention: Intervention) => interventionToDeleteHandler(intervention),
          to: (intervention: Intervention) => '',
        };
      }
    }
    setActions(actionsObj);
    setTableData(interventions);
  }, [interventions]);
  return (
    <>
      <section className='interventions__body'>
        <RouteHeader title={literals.title} subtitle={literals.interventionsPanel} />
        <section className='interventions__body__content'>
          <div className='interventions__button-wrapper'>
            <Link className='interventions__create-btn' to='/admin/interventions/create'>
              +
              {' '}
              {literals.newIntervention.toUpperCase()}
            </Link>
          </div>
          {tableData && tableData.length > 0 ? (
            <InfoTable headers={tableHeaders} data={tableData} keysToRender={keysToRender} actions={actions} />
          ) : null}
        </section>
      </section>
      {isDeleteModalOpen && interventionToDelete && (
        <Modal
          title={literals.deleteIntervention}
          text={(
            <>
              <p className='modal__body__text'>
                {literals.deleteInterventionConfirmation}
              </p>
              <p className='modal__body__targetName'>
                {`${factories.find((item) => item.id === interventionToDelete.factory_id)?.name} ${formatDate(interventionToDelete.date)} ${interventionToDelete.factory_contact}`}
              </p>
            </>
          )}
          buttonActionText={literals.delete.toUpperCase()}
          actionFunction={deleteInterventionHandler}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}
    </>
  );
};

InterventionsManagement.displayName = 'InterventionsManagement';

export default InterventionsManagement;
