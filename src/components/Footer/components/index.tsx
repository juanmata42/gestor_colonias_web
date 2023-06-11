import React from 'react';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import './styles.scss';

function Footer() {
  return (
    <footer className='footer'>
      <img className='footer__university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
      <img className='footer__supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
    </footer>
  );
}

export default Footer;
