import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { AlertNew } from '../../../models/alertNew';
import './styles.scss';
import { MainpageLang } from '../../../models/lang';
import nextArrow from '../../../assets/arrow_right_white.svg';
import prevArrow from '../../../assets/arrow_left_red.svg';
import newsImg from '../../../assets/new.svg';

interface ANContentViewerProps {
  getNews: () => void;
  news: {
    localNews: AlertNew[];
    globalNews: AlertNew[];
  }
  literals: MainpageLang;

}

const ANContentViewer: React.FC<ANContentViewerProps> = (props) => {
  const { literals } = props;
  const { id, scope } = useParams<{ id: string, scope: string }>();
  const { news, getNews } = props;
  const history = useHistory();

  let newsList = news.globalNews;
  if (scope === 'local') {
    newsList = news.localNews;
  }

  useEffect(() => {
    if (newsList[0].id === -1) {
      getNews();
    }
  }, []);

  const buttonHandler = (e: { preventDefault: () => void; currentTarget: { value: string; }; }) => {
    e.preventDefault();
    if (e.currentTarget.value === 'prev') {
      history.push(`/alertsnews/${scope}/${+id - 1}`);
    } else {
      history.push(`/alertsnews/${scope}/${+id + 1}`);
    }
  };

  return (
    <section className='ANContentViewer__body'>
      <h1 className='alertsNews__title'>
        <span className='alertsNews__scope'>{scope.toUpperCase()}</span>
        {' '}
        <span>{`${literals.alerts}`}</span>
        {` ${literals.and} `}
        <span>{`${literals.news}`}</span>
      </h1>
      {newsList[+id] && (
        <div className='ANContentViewer__block'>
          <header className='ANContentViewer__block-heading'>
            {newsList[+id].date}
            <img className='alertsNews__icon' src={newsImg} alt='News' />
          </header>
          <h2 className='ANContentViewer__block-title'>
            {newsList[+id].title}
          </h2>
          <div className='ANContentViewer__block-text' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsList[+id].body) }} />
        </div>
      )}
      <div className='ANContentViewer__footer'>
        <div className='ANContentViewer__prevButton-box'>
          {+id > 0 && (
            <button type='button' value='prev' onClick={buttonHandler} className='ANContentViewer__prevButton button-secondary'>
              <img src={prevArrow} alt='prevarrow' />
              Previous
            </button>
          )}

        </div>
        <div className='ANContentViewer__nexButton-box'>
          {+id < newsList.length - 1 && (
            <button type='button' value='next' onClick={buttonHandler} className='ANContentViewer__nextButton button-primary'>
              Next
              <img src={nextArrow} alt='nextarrow' />
            </button>
          )}

        </div>

      </div>
    </section>
  );
};

export default ANContentViewer;
