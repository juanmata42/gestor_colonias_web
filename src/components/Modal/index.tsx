import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { lang, adminToolLang } from '../../models/lang';

interface State {
  i18n: {
    language: string;
    literals: lang;
  };
}

interface ModalProps extends RouteComponentProps {
  title: string;
  text: JSX.Element;
  actionFunction: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  buttonActionText: string;
  literals: adminToolLang;
}

const mapStateToProps = (state: State) => {
  return {
    literals: state.i18n.literals.adminTool,
  };
};

const Modal: React.FC<ModalProps> = ({
  title,
  text,
  actionFunction,
  setIsModalOpen,
  buttonActionText,
  literals,
}) => {
  return (
    <>
      <div className='modal__overLays' onClick={() => setIsModalOpen(false)} />
      <div className='modal__container'>
        <div className='modal__content'>
          <button type='button' className='modal__close-btn' onClick={() => setIsModalOpen(false)}>
            X
          </button>
          <header className='modal__header'>
            <h2 className='modal__title'>{title}</h2>
          </header>
          <div className='modal__body'>
            {text}
            <div className='modal__body__button-wrapper'>
              <button
                type='button'
                className='modal__body__button-wrapper__cancel-btn'
                onClick={() => setIsModalOpen(false)}
              >
                {literals.cancel.toUpperCase()}
              </button>
              <button type='button' className='modal__body__button-wrapper__action-btn' onClick={actionFunction}>
                {buttonActionText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(connect(mapStateToProps)(Modal));
