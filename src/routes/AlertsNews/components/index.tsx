import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import newsImg from '../../../assets/new.svg';
// import alertsImg from '../../../assets/alert.svg';
import { MainpageLang } from '../../../models/lang';
import { AlertNew } from '../../../models/alertNew';

interface alertsNewsProps {
  // eslint-disable-next-line no-unused-vars
  getNews: () => void;
  news: {
    localNews: AlertNew[];
    globalNews: AlertNew[];
  }
  literals: MainpageLang;

}

const AlertsNews: React.FC<alertsNewsProps> = (props) => {
  const { literals } = props;
  const [scope, setScope] = useState('global');
  const [list, setList] = useState<JSX.Element[]>();
  const { getNews, news } = props;

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    let scopeNews = news.globalNews;
    if (scope === 'local') {
      scopeNews = news.localNews;
    }
    const auxList = scopeNews.map((anData) => {
      const position = scopeNews.indexOf(anData);
      return (
        <li className='alertsNews__li' key={anData.id}>
          <NavLink to={`/alertsnews/${scope}/${position}`}>
            <img className='alertsNews__icon' src={newsImg} alt='News' />
            {anData.title}
          </NavLink>
        </li>
      );
    });
    setList(auxList);
  }, [news, scope]);

  const scopeHandler = () => {
    if (scope === 'global') {
      setScope('local');
    } else {
      setScope('global');
    }
  };

  return (
    <section className='alertsNews__body'>
      <div className='alertsNews__header'>
        <input className='alertsNews__header-search button-tertiary' type='text' placeholder='Search' />
        <details onChange={scopeHandler} className='alertsNews__header-selector button-secondary'>
          <summary className='alertsNews__header-selector__dropdown'>
            {scope === 'global' ? 'Global alerts & news' : 'Local alerts & news'}
            <input type='radio' value='global' id='global' title='Global alerts & news' name='alertsORnews' />
            <input type='radio' value='local' id='local' title='Local alerts & news' name='alertsORnews' />
          </summary>
          <ul className='alertsNews__header-selector__dropdown__list dropdown-list'>
            <li>
              <label htmlFor='global'>Global alerts & news</label>
            </li>
            <li>
              <label htmlFor='local'>Local alerts & news</label>
            </li>
          </ul>
        </details>
      </div>
      <h1 className='alertsNews__title'>
        <span className='alertsNews__scope'>{scope.toUpperCase()}</span>
        {' '}
        <span>{`${literals.alerts}`}</span>
        {` ${literals.and} `}
        <span>{`${literals.news}`}</span>
      </h1>
      <ul className='alertsNews__block'>
        {list}
      </ul>
    </section>
  );
};

AlertsNews.displayName = 'AlertsNews';

export default AlertsNews;
