/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { MainpageLang } from '../../../models/lang';
import { App } from '../../../models/app';
import covidImg from '../../../assets/covid.svg';
import iloImg from '../../../assets/ilo-logo-vector.png';
import healthIssuesImg from '../../../assets/health_issues.svg';
import minorInjuriesImg from '../../../assets/minor_injuries.svg';
import adminToolImg from '../../../assets/admin_tool.svg';
import newsImg from '../../../assets/news.svg';
import './styles.scss';

interface Props {
  literals: MainpageLang;
  app: App;
}

const AppButtonSelector: React.FC<Props> = ({ literals, app }) => {
  const { route_patients_page } = app;
  const appRoute = route_patients_page;

  const appDetails: { [key: string]: { img: string; subtitle: string } } = {
    covidStats: { img: covidImg, subtitle: literals.assesmentTool },
    healthStats: { img: healthIssuesImg, subtitle: literals.assesmentTool },
    minorInjuriesStats: { img: minorInjuriesImg, subtitle: literals.assesmentTool },
    ILO: { img: iloImg, subtitle: literals.dataTool },
    admin: { img: adminToolImg, subtitle: literals.managementTool },
    news: { img: newsImg, subtitle: literals.news },
  };

  const { img: appImg = covidImg, subtitle = '' } = appDetails[appRoute as keyof typeof appDetails] ?? {};

  return (
    <Link className='appButtonSelector' to={appRoute}>
      <div className='appButtonSelector__img-container'>
        <img
          src={appImg}
          alt={app.i18nApp[0].short_header}
          className={`appButtonSelector__img ${appRoute === 'admin' ? 'admin__img' : ''}`}
        />
      </div>
      <div className='appButtonSelector__title-container'>
        <h2 className='appButtonSelector__title'>
          The GI4L
          {' '}
          <span>{app.i18nApp[0].short_header}</span>
        </h2>
        <h3 className='appButtonSelector__subtitle'>{subtitle}</h3>
      </div>
    </Link>
  );
};

export default AppButtonSelector;
