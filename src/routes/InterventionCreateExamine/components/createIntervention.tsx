import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { adminToolLang } from '../../../models/lang';
import { Factory } from '../../../models/factory';
import { User } from '../../../models/user';
import searchIcon from '../../../assets/search.svg';
import alertIcon from '../../../assets/alert.svg';
import { InterventionInput } from '../../../models/intervention';

interface createInterventionProps {
    // eslint-disable-next-line no-unused-vars
    literals: adminToolLang;
    createIntervention: (intervention: InterventionInput, callback: CallableFunction) => void;
    interventionInput: InterventionInput;
    setInterventionInput: (intervention: InterventionInput) => void;
    getInterventions: () => void;
    factories: Factory[],
    adminUser: User;
}

const CreateIntervention: React.FC<createInterventionProps> = (props) => {
  const {
    literals, createIntervention, interventionInput, setInterventionInput, getInterventions, factories, adminUser,
  } = props;

  const handleInput = () => {
    /* something */
  };
  function handleFactoryInput(id: string) {
    if (adminUser.userFactories) {
      setInterventionInput({
        ...interventionInput,
        factory_id: id,
      });
    }
  }

  const saveRenderer = () => {
    /* if (['createInfo', 'editPersonalSecurityInfo'].includes(specifics.usage)) {
                              if (passwordError !== 'valid') {
                                let errorText = '';
                                switch (passwordError) {
                                  case 'empty':
                                    errorText = literals.passwordEmpty;
                                    break;
                                  case 'notMatch':
                                    errorText = literals.passwordNotMatch;
                                    break;
                                  case 'invalid':
                                    errorText = literals.passwordRequirements;
                                    break;
                                  default:
                                    errorText = literals.passwordEmpty;
                                }
                                return (
                                  <>
                                    <div className='userEdit__error-contaier'>
                                      <img src={alertIcon} alt='alert' />
                                      <p className='userEdit__error-text'>{errorText}</p>
                                    </div>
                                    <div className='userEdit__saveContinueBtn-disabled' onClick={editHandler}>
                                      {specifics.usage === 'editPersonalSecurityInfo' && literals.save.toUpperCase()}
                                      {specifics.usage === 'createInfo' && literals.saveAndContinue.toUpperCase()}
                                    </div>
                                  </>
                                );
                              }
                            } */
  };
  const [factorySearch, setFactorySearch] = useState('');
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  function handleClickOutside(event: MouseEvent) {
    if (
      searchContainerRef.current
            && dropdownRef.current
            && !searchContainerRef.current.contains(event.target as Node)
            && !dropdownRef.current.contains(event.target as Node)
    ) {
      setFactorySearch('');
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function factorySearchBarRenderer() {
    const filteredFactories = factorySearch
      ? factories.filter((factory) => factory.name.toLowerCase().includes(factorySearch.toLowerCase()) && !adminUser.userFactories?.find((userFactory) => userFactory.factory_id === factory.id))
      : [];

    return (
      <div className='userEdit__permissions-factory-search-container'>
        <div className='userEdit__input-container' ref={searchContainerRef}>
          <input
            className='userEdit__input'
            id='factorySearch'
            type='text'
            placeholder={literals.addFactory}
            value={factorySearch}
            onChange={(e) => setFactorySearch(e.target.value)}
            autoComplete='off'
          />
          <img className='userEdit__input-icon' src={searchIcon} alt='search' />
          {filteredFactories.length > 0 && (
            <ul className='userEdit__permissions-factory-dropdown dropdown-list' ref={dropdownRef}>
              {filteredFactories.map((factory) => (
                <li
                  key={factory.id}
                  className='userEdit__permissions-factory-dropdown-item'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFactoryInput(factory.id);
                  }}
                >
                  <p className='userEdit__permissions-factory-dropdown-item-name'>{factory.name}</p>
                  <span>
                    {literals.add}
                    {' '}
                    asdasdasdas
                    <b>+</b>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className='createIntervention__input-container'>
        <label className='createIntervention__input-label' htmlFor='factory_contact'>{literals.name}</label>
        <input className='createIntervention__input' id='factory_contact' type='text' value={interventionInput.factory_contact || ''} onChange={handleInput} />
      </div>
      <div className='createIntervention__input-container'>
        <label className='createIntervention__input-label' htmlFor='factory'>{literals.factory}</label>
        {factories?.length && factorySearchBarRenderer()}
        <span>{interventionInput.factory_id}</span>
        {/* <div className='createIntervention__input-container'>
          <label className='createIntervention__input-label' htmlFor='gender'>{literals.gender}</label>
          <select className='createIntervention__input' id='gender' value={interventionInput.gender || ''} onChange={handleInput}>
            <option value='' disabled>{literals.select}</option>
            <option value='male'>{literals.male}</option>
            <option value='female'>{literals.female}</option>
          </select>
        </div> */}
        {/* <div className='createIntervention__input-container'>
          <label className='createIntervention__input-label' htmlFor='birthdate'>{literals.birthdate}</label>
          <input className='createIntervention__input' id='birthdate' type='date' value={interventionInput.birthdate ? formatDate(interventionInput.birthdate) : ''} onChange={handleInput} />
        </div> */}
      </div>
    </>
  );
};

CreateIntervention.displayName = 'CreateIntervention';

export default CreateIntervention;
