import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { iloToolLang } from '../../../models/lang';
import './styles.scss';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import { PieChart } from '../../../components/Graph/PieChart';
import colors from '../../../styles/_colors.module.scss';
import ToolDataTable from '../../../components/Graph/ToolDataTable';
import { BarChart } from '../../../components/Graph/BarChart';
import { BarAndLineDataType } from '../../../models/statistics';
import { LineChart } from '../../../components/Graph/LineChart';

interface Props {
  getData: (initDate: string, endDate: string) => void;
  ilo: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryActivity: Record<string, Record<string, Record<string, number>>>;
    summaryAge: Record<string, Record<string, Record<string, number>>>;
    summaryWage: Record<string, Record<string, Record<string, number>>>;
    summaryOvertime: Record<string, Record<string, Record<string, number>>>;
    summaryAllowance: Record<string, Record<string, Record<string, number>>>;
    summaryCostCare: Record<string, Record<string, Record<string, number>>>;
    summaryDaysAbsence: Record<string, Record<string, Record<string, number>>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
    summaryPaidAbsence: Record<string, Record<string, Record<string, number>>>;
    summaryFrequency: Record<string, Record<string, Record<string, number>>>;
    summaryTitle: Record<string, Record<string, Record<string, number>>>;
    summaryDate: Record<string, Record<string, number>>;
  }
  literals: iloToolLang,
  factories: {
    list: any[],
  },
}
interface PieDataType {
  legends: string[];
  data: number[];
}

const IloTool: React.FC<Props> = (props) => {
  const {
    literals, ilo, getData, factories,
  } = props;

  const {
    summaryActivity, summaryAge, summaryAllowance, summaryCostCare, summaryDaysAbsence,
    summaryGender, summaryGeneral, summaryOvertime, summaryPaidAbsence, summaryWage, summaryFrequency, summaryDate,
  } = ilo;

  const isMounted: React.MutableRefObject<boolean | null> = useRef(null);
  const today = new Date();
  const year = today.getFullYear();
  const mes = today.getMonth() + 1;
  const dia = today.getDate();
  const fecha = `${year}-${mes}-${dia}`;
  const [selectedDate, setSelectedDate] = useState({ initDate: fecha, endDate: fecha });
  const [filterFirst, setFilterFirst] = useState('Injury');
  const [filterSecond, setFilterSecond] = useState('Age');
  const [filterTitle, setFilterTitle] = useState('Injury');
  const [dateOrTotal, setDateOrTotal] = useState('total');
  const [summaryCountFiltered, setSummarCountFiltered] = useState(0);
  const [summaryFactoryFiltered, setSummaryFactoryFiltered] = useState(0);
  const [filterType, setFilterType] = useState(literals.defaultFilter);
  const [filterTypeName, setFilterTypeName] = useState(literals.defaultFilterName);
  const [scope, setScope] = useState('factory');
  const [scopeFactory, setScopeFactory] = useState(0);
  const [barData, setBarData] = useState<BarAndLineDataType>({
    legends: [],
    labels: [],
    data: [],
  });
  const [lineData, setLineData] = useState<BarAndLineDataType>({
    legends: [],
    labels: [],
    data: [],
  });
  const [buttonActive, setButtonActive] = useState<Record<string, boolean>>({
    Activity: false, Injury: true, CostCare: false, Allowance: false,
  });
  const [pieData, setPieData] = useState<PieDataType>({
    legends: [],
    data: [],
  });

  const summaryTable = {
    Activity: summaryActivity, MonthlyWage: summaryWage, Age: summaryAge, CostCare: summaryCostCare, Allowance: summaryAllowance, DaysAbsence: summaryDaysAbsence, Overtime: summaryOvertime, PaidAbsence: summaryPaidAbsence, Injury: summaryGeneral,
  } as Record<string, any>;

  const scopeFactoryHandler = (e: any) => {
    setScopeFactory(e.target.value);
  };
  const scopeHandler = (e: any) => {
    if (e.target.value === 'factory') {
      setScope('factory');
      setFilterType(literals.defaultFilter);
      setFilterTypeName(literals.defaultFilterName);
    }
    if (e.target.value === 'sector') {
      setScope('sector');
      setFilterType(literals.filterSector);
      setFilterTypeName(literals.filterSectorName);
    }
    if (e.target.value === 'group') {
      setScope('group');
      setFilterType(literals.filterGroup);
      setFilterTypeName(literals.filterGroupName);
    }
  };
  const rangeHandler = (e: any) => {
    if (e.length > 1) {
      setSelectedDate({ initDate: e[0].format('YYYY-MM-DD'), endDate: e[1].format('YYYY-MM-DD') });
    }
  };
  const activeHandler = (typeSelected: string) => {
    switch (typeSelected) {
      case literals.activity:
        setButtonActive({
          Activity: true, Injury: false, CostCare: false, Allowance: false,
        });
        setFilterFirst('Activity');
        setFilterSecond('MonthlyWage');
        setFilterTitle(literals.injury);
        break;
      case literals.injury:
        setButtonActive({
          Activity: false, Injury: true, CostCare: false, Allowance: false,
        });
        setFilterFirst('Injury');
        setFilterSecond('Age');
        setFilterTitle(literals.injury);
        break;
      case literals.costCare:
        setButtonActive({
          Activity: false, Injury: false, CostCare: true, Allowance: false,
        });
        setFilterFirst('CostCare');
        setFilterSecond('DaysAbsence');
        setFilterTitle(literals.injury);
        break;
      case literals.allowance:
        setButtonActive({
          Activity: false, Injury: false, CostCare: false, Allowance: true,
        });
        setFilterFirst('Allowance');
        setFilterSecond('Overtime');
        setFilterTitle(literals.injury);
        break;
      default:
        setButtonActive({
          Activity: true, Injury: false, CostCare: false, Allowance: false,
        });
        setFilterFirst('Injury');
        setFilterSecond('Age');
        setFilterTitle(literals.injury);
        break;
    }
  };

  function filterPieData() {
    const data: number[] = [];
    const legends: string[] = [];
    if (filterFirst === 'Injury') {
      Object.entries(summaryFrequency).forEach((entry) => {
        const [key] = entry;
        data.push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] : 0);
        legends.push(key.charAt(0).toUpperCase() + key.slice(1));
      });
    } else if (filterFirst === 'Activity') {
      Object.entries(summaryGender).forEach((entry) => {
        const [key] = entry;
        data.push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] : 0);
        legends.push(key.charAt(0).toUpperCase() + key.slice(1));
      });
    } else if (filterFirst === 'CostCare') {
      Object.entries(summaryPaidAbsence).forEach((entry) => {
        let legend = '';
        const [key] = entry;
        if (key === 'true') {
          legend = literals.paidCare;
        } else if (key === 'false') {
          legend = literals.unpaidCare;
        } else {
          legend = literals.nA;
        }
        data.push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] : 0);
        legends.push(legend);
      });
    } else if (filterFirst === 'Allowance') {
      Object.entries(summaryGender).forEach((entry) => {
        const [key] = entry;
        data.push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] : 0);
        legends.push(key.charAt(0).toUpperCase() + key.slice(1));
      });
    }
    setPieData({ data, legends });
  }

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getData(selectedDate.initDate, selectedDate.endDate);
    }

    return () => { isMounted.current = false; };
  }, [selectedDate]);

  function filterSummaryCount() {
    let amount = 0;
    let amountFactory = 0;
    let summary = null;

    switch (filterFirst) {
      case 'Injury':
        summary = summaryGeneral;
        break;
      case 'Activity':
        summary = summaryGeneral;
        break;
      case 'CostCare':
        summary = summaryGeneral;
        break;
      case 'Allowance':
        summary = summaryGeneral;
        break;
      default:
        break;
    }

    if (summary) {
      Object.entries(summary).forEach((entry) => {
        if (entry[1][factories.list[scopeFactory].id]) {
          amountFactory += entry[1][factories.list[scopeFactory].id][dateOrTotal] ?? 0;
        }

        if (scope === 'group' || scope === 'sector') {
          amount += entry[1][scope] ? entry[1][scope][dateOrTotal] ?? 0 : 0;
        }
      });
    }

    if (scope === 'group' || scope === 'sector') {
      setSummarCountFiltered(amount);
    }

    setSummaryFactoryFiltered(amountFactory);
  }

  function filterBarData() {
    const legends: string[] = [];
    const labels: string[] = [];
    const data: any = [[], []];
    if (summaryGeneral) {
      legends.push('Factory');
      if (scope === 'group' || scope === 'sector') {
        legends.push(scope);
      }
      Object.entries(summaryGeneral).forEach((entry) => {
        const [key] = entry;
        if (key !== 'counter') {
          labels.push(key);
          if (scope === 'group' || scope === 'sector') {
            data[0].push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] ?? 0 : 0);
            data[1].push(entry[1][scope] ? entry[1][scope][dateOrTotal] ?? 0 : 0);
          } else {
            data[0].push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] ?? 0 : 0);
          }
        }
      });
    }
    setBarData({ legends, labels, data });
  }

  function filterLineData() {
    const legends: string[] = [];
    const labels: string[] = [];
    const data: any = [[], []];
    if (summaryDate) {
      legends.push('Factory');
      if (scope === 'group' || scope === 'sector') {
        legends.push(scope);
      }
      Object.entries(summaryDate).forEach((entry) => {
        const [key] = entry;
        labels.push(key);
        if (scope === 'group' || scope === 'sector') {
          data[0].push([entry[1][factories.list[scopeFactory].id] ?? 0]);
          data[1].push([entry[1][scope] ?? 0]);
        } else {
          data[0].push([entry[1][factories.list[scopeFactory].id] ?? 0]);
        }
      });
    }
    setLineData({ legends, labels, data });
  }

  useEffect(() => {
    filterBarData();
    filterLineData();
    filterSummaryCount();
    filterPieData();
  }, [filterType, filterFirst, filterSecond, selectedDate, dateOrTotal, summaryGeneral, summaryFrequency, summaryGender, summaryCostCare, summaryAllowance, scope, scopeFactory]);
  return (
    <div className='ILOTool__body'>
      <header className='ILOTool__header'>
        <title className='ILOTool__header-title-subtitle'>
          <h1 className='ILOTool__header-title'>
            {`${literals.companyName}`}
            <strong className='ILOTool__header-title-bold'>{` ${literals.toolName.toUpperCase()}`}</strong>
          </h1>
          <h1 className='ILOTool__header-subtitle'>{`${literals.tool}`}</h1>
        </title>
        <figure className='ILOTool__header-logo'>
          <img className='ILOTool__header-university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
          <img className='ILOTool__header-supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
        </figure>
        <section className='ILOTool__header-dropdown-menu-container'>
          <details onChange={scopeFactoryHandler} className='ILOTool__header-dropdown-menu button-secondary'>
            <summary className='ILOTool__header-selector__dropdown'>
              {factories.list[scopeFactory].name}
              {factories.list.map((factory, index) => <input type='radio' key={`input${factory.name}`} value={index} id={factory.id} title={factory.name} name='factory' />)}
            </summary>
            <ul className='ILOTool__header-selector__dropdown__list dropdown-list'>
              {factories.list.map((factory) => (
                <li key={`label${factory.name}`}>
                  <label htmlFor={factory.id}>{factory.name}</label>
                </li>
              ))}
            </ul>
          </details>
        </section>
        <section className='ILOTool__header-dropdown-menu-container'>
          <details onChange={scopeHandler} className='ILOTool__header-dropdown-menu button-secondary'>
            <summary className='ILOTool__header-selector__dropdown'>
              {filterTypeName}
              <input type='radio' value='factory' id='Factory' title='Factory' name='factoryORsector' />
              <input type='radio' value='sector' id='Sector' title='Sector' name='factoryORsector' />
              <input type='radio' value='group' id='Group' title='Group' name='factoryORsector' />
            </summary>
            <ul className='ILOTool__header-selector__dropdown__list dropdown-list'>
              <li>
                <label htmlFor='Factory'>{literals.defaultFilterName}</label>
              </li>
              <li>
                <label htmlFor='Sector'>{literals.filterSectorName}</label>
              </li>
              <li>
                <label htmlFor='Group'>{literals.filterGroupName}</label>
              </li>
            </ul>
          </details>
        </section>
      </header>

      <summary className='rdmp-container'>
        <section className='ILOTool__summary-menu'>
          <div>
            <title
              className='rdmp-label'
            >
              {literals.range.toUpperCase()}
            </title>
          </div>
          <div>
            <DatePicker
              className='red'
              value={`${dia}-${mes}-${year}`}
              onChange={rangeHandler}
              range
              rangeHover
              format='DD/MM/YYYY'
            />
          </div>
        </section>
        <section className='ILOTool__summary-menu'>
          <div>
            <a rel='noreferrer' className='CovidTool_download-button button-secondary' style={{ textDecoration: 'none' }} href={`${window.MAIN_API_URL}/api/stats/excel?date1=${selectedDate.initDate}&date2=${selectedDate.endDate}&type=ILO${scope === 'factory' ? `&factory=${factories.list[scopeFactory].id}` : ''}`} target='_blank'>Download data</a>
          </div>
        </section>
      </summary>

      <div className='ILOTool__bar-line'>
        <section className='ILOTool__bar'>
          <h1 className='ILOTool__bar-line-title'>{literals.barChartTitle}</h1>
          {barData.data.length && (
            <BarChart
              id='ILOTool__bar__id'
              width='100%'
              height='100%'
              data={[barData.data[0].slice(0, 10), barData.data[1].slice(0, 10)]}
              labels={barData.labels.slice(0, 10)}
              legends={barData.legends}
              colors={
                barData.legends.length === 1
                  ? [colors.darkGray]
                  : [colors.gray, colors.primary]
              }
              xAxisCategory='linear'
              yAxisCategory='categorical'
              xAxisLabel=''
              yAxisLabel=''
              horizontal
              showLegend
              spaceTop={0.1}
              spaceLeft={0.18}
              spaceBottom={0.1}
              spaceRight={0.02}
              spacing={0.3}
              legendX={0.02}
              legendY={0.05}
              legendCircle
              legendHorizontal
              legendRadius={0.02}
              legendTextSpace={0.01}
            />
          )}
        </section>

        <section className='ILOTool__line'>
          <h1 className='ILOTool__bar-line-title'>{literals.lineChartTitle}</h1>
          <LineChart
            id='ILOTool__line__id'
            width='100%'
            height='360px'
            data={lineData.data}
            labels={lineData.labels}
            legends={lineData.legends}
            colors={
              lineData.legends.length === 1
                ? [colors.darkGray]
                : [colors.gray, colors.primary]
            }
            xAxisCategory='categorical'
            yAxisCategory='linear'
            xAxisLabel=''
            yAxisLabel=''
            spaceTop={0.1}
            spaceLeft={0.1}
            spaceBottom={0.22}
            spaceRight={0.01}
            legendX={0.02}
            legendY={0.05}
            legendCircle
            legendRadius={0.02}
            legendTextSpace={0.01}
            showLegend
            legendHorizontal
          />
        </section>

        <section className='ILOTool__button__container'>
          <button type='button' onClick={() => activeHandler(literals.injury)} className={`ILOTool_button ${buttonActive.Injury ? 'ILOTool_button_active' : ''}`}>{literals.injury}</button>
          <button type='button' onClick={() => activeHandler(literals.activity)} className={`ILOTool_button ${buttonActive.Activity ? 'ILOTool_button_active' : ''}`}>{literals.activity}</button>
          <button type='button' onClick={() => activeHandler(literals.allowance)} className={`ILOTool_button ${buttonActive.Allowance ? 'ILOTool_button_active' : ''}`}>{literals.allowance}</button>
          <button type='button' onClick={() => activeHandler(literals.costCare)} className={`ILOTool_button ${buttonActive.CostCare ? 'ILOTool_button_active' : ''}`}>{literals.costCare}</button>

        </section>
      </div>

      <summary className='ILOTool__summary'>
        <div className='ILOTool__summary-menu-info'>
          <section className='ILOTool__summary-menu'>
            <title
              className={`ILOTool__summary-menu-item${dateOrTotal === 'date' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('date')}
            >
              {literals.defaultCountName.toUpperCase()}
            </title>
            <title
              className={`ILOTool__summary-menu-item${dateOrTotal === 'total' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('total')}
            >
              {literals.countTotalName.toUpperCase()}
            </title>
          </section>
          <section className='ILOTool__summary-info'>
            <div className='ILOTool__summary-info-current'>
              <h1 className='ILOTool__summary-info-current-amount'>{summaryFactoryFiltered}</h1>
              <h1 className='ILOTool__summary-info-current-title__bold'>
                {`${literals.defaultFilterName.toUpperCase()}`}
              </h1>
              <h1 className='ILOTool__summary-info-current-title'>{`${filterTitle.toUpperCase()} ${literals.cases.toUpperCase()}`}</h1>
            </div>
            {
              filterType !== literals.defaultFilter
              && (
                <div className='ILOTool__summary-info-slash'>
                  /
                </div>
              )
            }
            {
              filterType !== literals.defaultFilter
              && (
                <div className='ILOTool__summary-info-total'>
                  <h1 className='ILOTool__summary-info-current-amount'>{summaryCountFiltered}</h1>
                  <h1 className='ILOTool__summary-info-total-title__bold'>
                    {`${literals.filterSectorName}`}
                  </h1>
                  <h1 className='ILOTool__summary-info-current-title'>{`${filterTitle.toUpperCase()} ${literals.cases.toUpperCase()}`}</h1>
                </div>
              )
            }
          </section>
        </div>

        <section className='ILOTool__pie'>
          <PieChart
            id='ILOTool__pie-covid-distribution__id'
            className='ILOTool__pie__svg'
            width='100%'
            height='100%'
            data={[pieData.data]}
            labels={['']}
            legends={pieData.legends}
            colors={[colors.lightPink, colors.darkPink, colors.darkBrown, colors.lightBrown, colors.lightViolet, colors.azul, colors.gray, colors.azulTransparent, colors.backgroundGray, colors.darkGray]}
            innerRadius={0.75}
            rotate={135}
            donut
            spaceTop={0}
            spaceLeft={0.06}
            spaceBottom={0}
            spaceRight={0}
            legendX={0.63}
            legendY={0.2}
            legendSpacing={0.12}
            legendCircle
            legendRadius={0.05}
            showLegend
            legendFontSize={13}
          />
        </section>
      </summary>
      <section className='ILOTool__table__container'>
        <ToolDataTable data={{}} iloData={summaryTable[filterFirst]} literals={literals} filterType={scope !== 'factory' ? scope : factories.list[scopeFactory].id} factoryId={factories.list[scopeFactory].id} tableKey={filterFirst} />
        <ToolDataTable data={{}} iloData={summaryTable[filterSecond]} literals={literals} filterType={scope !== 'factory' ? scope : factories.list[scopeFactory].id} factoryId={factories.list[scopeFactory].id} tableKey={filterSecond} />
      </section>
    </div>
  );
};

IloTool.displayName = 'IloTool';

export default IloTool;
