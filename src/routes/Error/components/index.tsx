import React from 'react';
import { Link } from 'react-router-dom';
import goBackArrow from '../../../assets/arrow_left_white.svg';
import { ROUTE_PATH } from '../..';
import { errorLang } from '../../../models/lang';

import './styles.scss';

//* RCT* --> revise any types
interface Props {
  match: {
    params: {
      status: string
    }
  },
  literals: errorLang;
}

const Error: React.FC<Props> = (props) => {
  const { match: { params: { status } }, literals } = props;
  const availableStatus = ['500', '401', '404', '400'];
  if (!availableStatus.includes(status)) {
    return (
      <>
        <header className='header'>
          <Link
            className='btn btn-primary mt-3'
            to={ROUTE_PATH.BASE}
          >
            <div className='header-back-nav'>
              <img src={goBackArrow} alt='go back' />
              {literals.back}
            </div>
          </Link>
        </header>
        <div className='Container ErrorPage mx-auto position-relative'>
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
        </div>
      </>
    );
  }

  if (status && status === '500') {
    return (
      <>
        <header className='header'>
          <Link
            className='btn btn-primary mt-3'
            to={ROUTE_PATH.BASE}
          >
            <div className='header-back-nav'>
              <img src={goBackArrow} alt='go back' />
              {literals.back}
            </div>
          </Link>
        </header>
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
      </>
    );
  }

  const titleStatus = `title${status}`;
  const descriptionStatus = `description${status}`;
  const reason1Status = `reason1${status}`;
  const reason2Status = `reason2${status}`;

  return (
    <>
      <header className='header'>
        <Link
          className='btn btn-primary mt-3'
          to={ROUTE_PATH.BASE}
        >
          <div className='header-back-nav'>
            <img src={goBackArrow} alt='go back' />
            {literals.back}
          </div>
        </Link>
      </header>
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
    </>
  );
};

Error.displayName = 'Error';

export default Error;
