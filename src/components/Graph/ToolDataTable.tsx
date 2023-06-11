/* eslint-disable radix */
/* eslint-disable no-else-return */
import React from 'react';
import { covidTool, healthIssuesTool, minorInjuriesTool } from '../../models/lang';
import './styles.scss';

interface tableProps{
  data: Record<string, Record<string, Record<string, number>>>;
  iloData: Record<string, Record<string, Record<string, number>>>;
  filterType: string
  factoryId: string
  literals: covidTool|healthIssuesTool|minorInjuriesTool
  tableKey: string
  // eslint-disable-next-line react/require-default-props
  hasFather?: boolean
}
const ToolDataTable: React.FC<tableProps> = (props) => {
  const {
    literals, data, iloData, filterType, hasFather, tableKey, factoryId,
  } = props;
  const isIloData = Object.keys(iloData).length;
  function isNumeric(str: string) {
    return /^\d+$/.test(str);
  }

  // Sort the keys of the object
  const sortedIloData = Object.keys(iloData).sort((a, b) => {
    const numericRegex = /^(\d+)\s*–\s*(\d+)$/;

    const aMatch = a.match(numericRegex);
    const bMatch = b.match(numericRegex);

    if (aMatch && bMatch) {
      // both keys are numeric ranges
      const aMin = parseInt(aMatch[1]);
      const bMin = parseInt(bMatch[1]);

      return aMin - bMin || parseInt(aMatch[2]) - parseInt(bMatch[2]);
    } else if (aMatch) {
      // only a is numeric
      return -1;
    } else if (bMatch) {
      // only b is numeric
      return 1;
    } else {
      // neither key is numeric
      return a.localeCompare(b);
    }
  });
  return (
    <table className={`toolTable__container ${hasFather && 'toolTable-anti-shadow'}`}>
      <thead className='toolTable__header'>
        {(filterType.toLowerCase() !== literals.filterSector.toLowerCase() && filterType.toLowerCase() !== literals.filterGroup.toLowerCase()) ? (
          <tr className='toolTable__header-row-default'>
            <th className='toolTable__header-key-default' rowSpan={1}>
              {tableKey}
            </th>
            <th className='toolTable__header-value-default' colSpan={1}>
              {literals.defaultCount}
            </th>
            <th className='toolTable__header-value-default' colSpan={1}>
              {literals.countTotal}
            </th>
          </tr>
        ) : (
          <>
            <tr className='toolTable__header-row-total'>
              <th className='toolTable__header-key-total' rowSpan={2}>
                {tableKey}
              </th>
              <th className='toolTable__header-value-total' colSpan={2}>
                {literals.defaultCount}
              </th>
              <th className='toolTable__header-value-total' colSpan={2}>
                {literals.countTotal}
              </th>
            </tr>
            <tr className='toolTable__header-row-total-split'>
              <th className='toolTable__header-value-total-split'>
                {filterType}
              </th>
              <th className='toolTable__header-value-total-split'>
                {literals.defaultFilter}
              </th>
              <th className='toolTable__header-value-total-split'>
                {filterType}
              </th>
              <th className='toolTable__header-value-total-split'>
                {literals.defaultFilter}
              </th>
            </tr>
          </>
        )}
      </thead>
      <tbody className='toolTable__body'>
        {((isIloData === 0) && (
          Object.keys(data).map((key, idx) => {
            return (
              key !== 'counter' ? (
                <tr className='toolTable__body-row' key={idx}>
                  <td className={`toolTable__body-key${filterType === literals.defaultFilter ? '-default' : '-total-split'}`}>{key}</td>
                  <td className={`toolTable__body-value${filterType === literals.defaultFilter ? '-default' : '-total-split-gray'}`}>
                    {data[key][filterType][literals.defaultCount.toLowerCase()]}
                  </td>
                  {
                    filterType.toLowerCase() !== literals.defaultFilter.toLowerCase()
                        && (
                          <td className='toolTable__body-value-total-split'>
                            {data[key][literals.defaultFilter][literals.defaultCount.toLowerCase()]}
                          </td>
                        )
                  }
                  <td className={`toolTable__body-value${filterType === literals.defaultFilter ? '-default' : '-total-split-gray'}`}>
                    {data[key][filterType][literals.countTotal.toLowerCase()]}
                  </td>
                  {
                    filterType.toLowerCase() !== literals.defaultFilter.toLowerCase()
                        && (
                          <td className='toolTable__body-value-total-split'>
                            {data[key][literals.defaultFilter][literals.countTotal.toLowerCase()]}
                          </td>
                        )
                  }
                </tr>
              ) : null
            );
          })
        )) || ((isIloData !== 0) && (
          sortedIloData.map((key, idx) => {
            return (
              <tr className='toolTable__body-row' key={idx}>
                <td className={`toolTable__body-key${filterType === literals.defaultFilter ? '-default' : '-total-split'}`}>{key}</td>
                <td className={`toolTable__body-value${filterType === literals.defaultFilter ? '-default' : '-total-split-gray'}`}>
                  {iloData[key][filterType]?.[literals.defaultCount.toLowerCase()] || 0}
                </td>
                {
                  (filterType.toLowerCase() === literals.filterSector.toLowerCase() || filterType.toLowerCase() === literals.filterGroup.toLowerCase())
                  && (
                    <td className='toolTable__body-value-total-split'>
                      {iloData[key][factoryId]?.[literals.defaultCount.toLowerCase()] || 0}
                    </td>
                  )
                }
                <td className={`toolTable__body-value${filterType === literals.defaultFilter ? '-default' : '-total-split-gray'}`}>
                  {iloData[key][filterType]?.[literals.countTotal.toLowerCase()] || 0}
                </td>
                {
                  (filterType.toLowerCase() === literals.filterSector.toLowerCase() || filterType.toLowerCase() === literals.filterGroup.toLowerCase())
                  && (
                    <td className='toolTable__body-value-total-split'>
                      {iloData[key][factoryId]?.[literals.countTotal.toLowerCase()] || 0}
                    </td>
                  )
                }
              </tr>
            );
          })
        ))}
      </tbody>
    </table>
  );
};

export default ToolDataTable;
