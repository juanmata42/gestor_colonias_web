import React from 'react';
import { errorLang } from 'models/lang';
import { State } from 'models/state';
import { useSelector } from 'react-redux';

import './ErrorStyles.scss';
import { useParams } from 'react-router-dom';

const Error: React.FC = () => {
  const { status } = useParams();
  const literals = useSelector((state : State) => state.literals.literals.notFound);
  const availableStatus = ['500', '401', '404', '400'];
  if (status) {
    if (!availableStatus.includes(status)) {
      return (
        <div className='ErrorPage__container'>
          <div className='ErrorPage__image'>
            <div className='ErrorPage__person ErrorPage__person--500' />
            <div className='ErrorPage__code'>{status}</div>
          </div>
          <div className='ErrorPage__content mt-5'>
            <p
              className='ErrorPage__title decoration-underline font-bold mb-4 pb-3 text-dark'
            >
              {literals.unknownStatus}
            </p>
          </div>
        </div>
      );
    }
  }

  if (status && status === '500') {
    return (
      <div className='ErrorPage__container'>
        <div className='ErrorPage__image'>
          <div className='ErrorPage__person ErrorPage__person--500' />
          <div className='ErrorPage__code'>500</div>
        </div>
        <div className='ErrorPage__content mt-5'>
          <p
            className='ErrorPage__title decoration-underline font-bold mb-4 pb-3 text-dark'
          >
            {literals.title500}
          </p>
          <p>{literals.description500}</p>
        </div>
      </div>
    );
  }

  const titleStatus = `title${status}`;
  const descriptionStatus = `description${status}`;
  const reason1Status = `reason1${status}`;
  const reason2Status = `reason2${status}`;

  return (
    <div className='ErrorPage__container'>
      <div className='ErrorPage__image'>
        <div className='ErrorPage__person ErrorPage__person--404' />
        <div className='ErrorPage__code'>{status}</div>
      </div>
      <div className='ErrorPage__content'>
        <p
          className='ErrorPage__title'
        >
          {literals[titleStatus as keyof errorLang]}
        </p>
        <p>{literals[descriptionStatus as keyof errorLang]}</p>
        <ul>
          <li>{literals[reason1Status as keyof errorLang]}</li>
          <li>{literals[reason2Status as keyof errorLang]}</li>
        </ul>
      </div>
    </div>
  );
};

Error.displayName = 'Error';

export default Error;
