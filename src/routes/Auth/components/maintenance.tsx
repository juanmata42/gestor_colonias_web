/* eslint-disable react/function-component-definition */
import React from 'react';
import LogoImg from '../../../assets/logo_title.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import InterventionsLogo from '../../../assets/interventions.svg';
import en from '../../../i18n/EN';
import './styles.scss';

const Maintenance: React.FC = () => {
  // qwerty write us link and forgot password without functionality
  const literals = en.maintenance;
  return (

    <div className='login'>
      <img src={LogoImg} className='login__main-logo' alt='Main Logo' />
      <h1 className='login__title'>{literals.welcome}</h1>
      <img className='maint-logo' src={InterventionsLogo} width='4%' alt='Interventions Logo' />
      <p className='maint__subtitle'>{literals.workTogether}</p>
      <p className='maint__subtitle__1'>{literals.enter}</p>
      <p className='maint__subtitle__1'>{literals.send}</p>
      <img className='login__university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
      <footer className='login__footer'>
        <div className='login__supported-box'>
          <p className='supported-box__p'>{literals.supportedBy}</p>
          <img className='supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
        </div>
        <p className='login__copyright'>{literals.copyright}</p>
      </footer>
    </div>
  );
};

Maintenance.displayName = 'Maintenance';

export default Maintenance;
