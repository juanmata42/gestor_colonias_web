/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import eyeIcon from '../../assets/eye.svg';
import pencilIcon from '../../assets/pencil.svg';
import trashIcon from '../../assets/trash.svg';
import permissionsIcon from '../../assets/permissions.svg';
import './styles.scss';
import { formatDate } from '../../utils/reusableFunctions';
import { TableActions } from '../../models/tableActions';

interface InfoTableProps {
  headers: string[];
  actions?: TableActions;
  keysToRender: string[];
  data: any[];
}

const InfoTable: React.FC<InfoTableProps> = ({
  headers, actions, keysToRender, data,
}) => {
  function tableCellRenderer(key: string, item: any, cellIndex: number) {
    let targetKey = key;
    if (key.includes('|or|')) {
      const keys = key.split('|or|');
      if (item[keys[0]]) {
        targetKey = keys[0];
      } else {
        targetKey = keys[1];
      }
    }
    return (
      <td className='info-table__cell' key={cellIndex}>
        {(item[targetKey] instanceof Date || (typeof item[targetKey] === 'string' && !isNaN(Date.parse(item[targetKey])))) ? formatDate(item[targetKey]) : item[targetKey]}
      </td>
    );
  }
  return (
    <div className='info-table__container'>
      <table className='info-table__content'>
        <thead className='info-table__head'>
          <tr className='info-table__head__row'>
            {headers.map((title, index) => (
              <th key={index} className='info-table__head__cell'>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='info-table__body'>
          {data.map((item, index) => (
            <tr className='info-table__row' key={index}>
              {keysToRender.map((key, cellIndex) => (
                tableCellRenderer(key, item, cellIndex)
              ))}
              {actions && (
                <td className='info-table__cell'>
                  {actions.read && (
                    <Link className='info-table__row__button' to={actions.read?.to(item) || ''} onClick={() => actions.read?.onClick(item)}>
                      <img className='info-table__row__button-icon' src={eyeIcon} alt='eye icon' title={actions.read.title} />
                    </Link>
                  )}
                  {actions.edit && (
                    <Link className='info-table__row__button' to={actions.edit?.to(item) || ''} onClick={() => actions.edit?.onClick(item)}>
                      <img className='info-table__row__button-icon' src={pencilIcon} alt='pencil icon' title={actions.edit.title} />
                    </Link>
                  )}
                  {actions.permissions && (
                    <Link className='info-table__row__button' to={actions.permissions?.to(item) || ''} onClick={() => actions.permissions?.onClick(item)}>
                      <img className='info-table__row__button-icon' src={permissionsIcon} alt='Lock icon' title={actions.permissions.title} />
                    </Link>
                  )}
                  {actions.delete && (
                    <button type='button' className='info-table__row__button' onClick={() => actions.delete?.onClick(item)}>
                      <img className='info-table__row__button-icon' src={trashIcon} alt='trash icon' title={actions.delete.title} />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Default props
InfoTable.defaultProps = {
  actions: undefined,
};

export default InfoTable;
