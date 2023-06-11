import React from 'react';
import './styles.scss';
import dhakaUniversityLogo from '../../assets/university-of-dhaka.svg';
import SupporterLogo from '../../assets/associated-british-foods-logo.svg';

interface RouteSimpleHeaderProps {
  title: string;
  subtitle: string | '';
}

const RouteSimpleHeader: React.FC<RouteSimpleHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <header className='routeHeader'>
      <div className='routeHeader__title__container'>
        <h1 className='routeHeader__title'>{title.toUpperCase()}</h1>
        {subtitle && <h2 className='routeHeader__subTitle'>{subtitle}</h2>}
      </div>
      <figure className='routeHeader__logo-container'>
        <img className='routeHeader__university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
        <img className='routeHeader__supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
      </figure>
    </header>
  );
};

RouteSimpleHeader.displayName = 'RouteSimpleHeader';

export default RouteSimpleHeader;
