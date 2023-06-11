import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { minorInjuriesTool } from '../../../models/lang';
import './styles.scss';
import './red.scss';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import { PieChart } from '../../../components/Graph/PieChart';
import { LineChart } from '../../../components/Graph/LineChart';
import { BarChart } from '../../../components/Graph/BarChart';
import colors from '../../../styles/_colors.module.scss';
import ToolDataTable from '../../../components/Graph/ToolDataTable';
import { BarAndLineDataType } from '../../../models/statistics';

interface Props {
  getData: (initDate: string, endDate: string) => void;
  minorInjuries: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
  }
  factories: {
    list: any[],
  }
  literals: minorInjuriesTool,
}
interface PieDataType {
  legends: string[];
  data: number[];
}

const MinorInjuriesTool: React.FC<Props> = (props) => {
  const {
    literals, minorInjuries, getData, factories,
  } = props;
  const isMounted: React.MutableRefObject<boolean | null> = useRef(null);
  const today = new Date();
  const year = today.getFullYear();
  const mes = today.getMonth() + 1;
  const dia = today.getDate();
  const fecha = `${year}-${mes}-${dia}`;
  const [selectedDate, setSelectedDate] = useState({ initDate: fecha, endDate: fecha });
  const [filterType, setFilterType] = useState(literals.defaultFilter);
  const [filterTypeName, setFilterTypeName] = useState(literals.defaultFilterName);
  const [scope, setScope] = useState('factory');
  const [summaryGeneralFiltered, setSummaryGeneralFiltered] = useState({});
  const [summaryGeneralCountFiltered, setSummaryGeneralCountFiltered] = useState(0);
  const [summaryGeneralFactoryFiltered, setSummaryGeneralFactoryFiltered] = useState(0);
  const [summaryActivityFiltered, setSummaryActivityFiltered] = useState({});
  const [dateOrTotal, setDateOrTotal] = useState('total');
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
  const [pieData, setPieData] = useState<PieDataType>({
    legends: [],
    data: [],
  });

  const {
    summaryActivity, summaryDate, summaryGeneral, summaryRegion, summaryGender,
  } = minorInjuries;

  const scopeFactoryHandler = (e: any) => {
    setScopeFactory(e.target.value);
  };

  const rangeHandler = (e: any) => {
    if (e.length > 1) {
      setSelectedDate({ initDate: e[0].format('YYYY-MM-DD'), endDate: e[1].format('YYYY-MM-DD') });
    }
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

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getData(selectedDate.initDate, selectedDate.endDate);
    }

    return () => { isMounted.current = false; };
  }, [selectedDate]);

  function filterSummaryActivity() {
    if (summaryActivity) {
      const summaryActivityFiltering: any = {};
      Object.entries(summaryActivity).forEach((entry) => {
        const groupActivity = entry[1].group;
        const sectorActivity = entry[1].sector;
        const factoryActivity = entry[1][factories.list[scopeFactory].id];
        summaryActivityFiltering[entry[0]] = {
          Group: groupActivity ? { total: groupActivity.total || 0, date: groupActivity.date || 0 } : { total: 0, date: 0 },
          Sector: sectorActivity ? { total: sectorActivity.total || 0, date: sectorActivity.date || 0 } : { total: 0, date: 0 },
          Factory: factoryActivity ? { total: factoryActivity.total || 0, date: factoryActivity.date || 0 } : { total: 0, date: 0 },
        };
      });
      setSummaryActivityFiltered(summaryActivityFiltering);
    }
  }

  function filterSummaryGeneral() {
    if (summaryGeneral) {
      const summaryGeneralFiltering: any = {};
      Object.entries(summaryGeneral).forEach((entry) => {
        const groupInjury = entry[1].group;
        const sectorInjury = entry[1].sector;
        const factoryInjury = entry[1][factories.list[scopeFactory].id];
        summaryGeneralFiltering[entry[0]] = {
          Group: groupInjury ? { total: groupInjury.total || 0, date: groupInjury.date || 0 } : { total: 0, date: 0 },
          Sector: sectorInjury ? { total: sectorInjury.total || 0, date: sectorInjury.date || 0 } : { total: 0, date: 0 },
          Factory: factoryInjury ? { total: factoryInjury.total || 0, date: factoryInjury.date || 0 } : { total: 0, date: 0 },
        };
      });
      setSummaryGeneralFiltered(summaryGeneralFiltering);
    }
  }

  function filterSummaryGeneralCount() {
    if (summaryGeneral) {
      let amount = 0;
      let amountFactory = 0;
      Object.entries(summaryGeneral).forEach((entry: any) => {
        if ((scope === 'group' || scope === 'sector')) {
          amount += entry[1][scope] ? entry[1][scope][dateOrTotal] ?? 0 : 0;
          amountFactory += entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] ?? 0 : 0;
        } else if (entry[1][factories.list[scopeFactory].id]) {
          amountFactory += entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] ?? 0 : 0;
        }
      });
      if (scope === 'group' || scope === 'sector') {
        setSummaryGeneralCountFiltered(amount);
        setSummaryGeneralFactoryFiltered(amountFactory);
      } else {
        setSummaryGeneralFactoryFiltered(amountFactory);
      }
    }
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

  function filterPieData() {
    const legends: string[] = [];
    const data: number[] = [];
    if (summaryGender) {
      Object.entries(summaryGender).forEach((entry) => {
        const [key] = entry;
        legends.push(key.charAt(0).toUpperCase() + key.slice(1));
        data.push(entry[1][factories.list[scopeFactory].id] ? entry[1][factories.list[scopeFactory].id][dateOrTotal] : 0);
      });
    }
    setPieData({ legends, data });
  }

  useEffect(() => {
    filterSummaryGeneral();
    filterSummaryGeneralCount();
    filterSummaryActivity();
    filterLineData();
    filterBarData();
    filterPieData();
  }, [filterType, dateOrTotal, summaryRegion, scope, scopeFactory, summaryGender, summaryDate, summaryGeneral, summaryActivity]);

  return (
    <div className='MinorInjuriesTool__body'>
      <header className='HealthIssuesTool__header'>
        <title className='HealthIssuesTool__header-title-subtitle'>
          <h1 className='HealthIssuesTool__header-title'>
            {`${literals.companyName}`}
            <strong className='HealthIssuesTool__header-title-bold'>{` ${literals.toolName.toUpperCase()}`}</strong>
          </h1>
          <h1 className='HealthIssuesTool__header-subtitle'>{`${literals.tool}`}</h1>
        </title>
        <figure className='HealthIssuesTool__header-logo'>
          <img className='HealthIssuesTool__header-university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
          <img className='HealthIssuesTool__header-supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
        </figure>
        <section className='HealthIssuesTool__header-dropdown-menu-container'>
          <details onChange={scopeFactoryHandler} className='HealthIssuesTool__header-dropdown-menu button-secondary'>
            <summary className='HealthIssuesTool__header-selector__dropdown'>
              {factories.list[scopeFactory].name}
              {factories.list.map((factory, index) => <input type='radio' key={`input${factory.name}`} value={index} id={factory.id} title={factory.name} name='factory' />)}
            </summary>
            <ul className='HealthIssuesTool__header-selector__dropdown__list dropdown-list'>
              {factories.list.map((factory) => (
                <li key={`label${factory.name}`}>
                  <label htmlFor={factory.id}>{factory.name}</label>
                </li>
              ))}
            </ul>
          </details>
        </section>
        <section className='HealthIssuesTool__header-dropdown-menu-container'>
          <details onChange={scopeHandler} className='HealthIssuesTool__header-dropdown-menu button-secondary'>
            <summary className='HealthIssuesTool__header-selector__dropdown'>
              {filterTypeName}
              <input type='radio' value='factory' id='Factory' title='Factory' name='factoryORsector' />
              <input type='radio' value='sector' id='Sector' title='Sector' name='factoryORsector' />
              <input type='radio' value='group' id='Group' title='Group' name='factoryORsector' />
            </summary>
            <ul className='HealthIssuesTool__header-selector__dropdown__list dropdown-list'>
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
        <section className='MinorInjuriesTool__summary-menu'>
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
        <section className='MinorInjuriesTool__summary-menu'>
          <div>
            <a rel='noreferrer' className='CovidTool_download-button button-secondary' style={{ textDecoration: 'none' }} href={`${window.MAIN_API_URL}/api/stats/excel?date1=${selectedDate.initDate}&date2=${selectedDate.endDate}&type=minorInjuries`} target='_blank'>Download data</a>
          </div>
        </section>
      </summary>
      <div className='MinorInjuriesTool__bar-line'>
        <section className='MinorInjuriesTool__bar'>
          <h1 className='MinorInjuriesTool__bar-line-title'>{literals.barChartTitle}</h1>
          {barData.data.length && (
            <BarChart
              id='MinorInjuriesTool__bar__id'
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
              legendX={0.02}
              legendY={0.05}
              legendCircle
              legendHorizontal
              legendRadius={0.02}
              legendTextSpace={0.01}
            />
          )}
        </section>

        <section className='MinorInjuriesTool__line'>
          <h1 className='MinorInjuriesTool__bar-line-title'>{literals.lineChartTitle}</h1>
          <LineChart
            id='MinorInjuriesTool__line__id'
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
      </div>

      <summary className='MinorInjuriesTool__summary'>
        <div className='MinorInjuriesTool__summary-menu-info'>
          <section className='MinorInjuriesTool__summary-menu'>
            <title
              className={`MinorInjuriesTool__summary-menu-item${dateOrTotal === 'date' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('date')}
            >
              {literals.defaultCountName.toUpperCase()}
            </title>
            <title
              className={`MinorInjuriesTool__summary-menu-item${dateOrTotal === 'total' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('total')}
            >
              {literals.countTotalName.toUpperCase()}
            </title>
          </section>

          <section className='MinorInjuriesTool__summary-info'>
            <div className='MinorInjuriesTool__summary-info-current'>
              <h1 className='MinorInjuriesTool__summary-info-current-amount'>{summaryGeneralFactoryFiltered}</h1>
              <h1 className='MinorInjuriesTool__summary-info-current-title__bold'>
                {`${literals.defaultFilterName.toUpperCase()}`}
              </h1>
              <h1 className='MinorInjuriesTool__summary-info-current-title'>{literals.measurement}</h1>
            </div>
            {
              filterType !== literals.defaultFilter
              && (
                <div className='MinorInjuriesTool__summary-info-slash'>
                  /
                </div>
              )
            }
            {
              filterType !== literals.defaultFilter
              && (
                <div className='MinorInjuriesTool__summary-info-total'>
                  <h1 className='MinorInjuriesTool__summary-info-current-amount'>{summaryGeneralCountFiltered}</h1>
                  <h1 className='MinorInjuriesTool__summary-info-total-title__bold'>
                    {`${literals.filterSectorName}`}
                  </h1>
                  <h1 className='MinorInjuriesTool__summary-info-total-title'>{literals.measurement}</h1>
                </div>
              )
            }
          </section>
        </div>

        <section className='MinorInjuriesTool__pie'>
          <PieChart
            id='MinorInjuriesTool__pie-covid-distribution__id'
            className='MinorInjuriesTool__pie__svg'
            width='100%'
            height='100%'
            data={[pieData.data]}
            labels={['']}
            legends={pieData.legends}
            colors={[colors.lightPink, colors.darkPink, colors.darkBrown, colors.lightBrown, colors.lightViolet]}
            innerRadius={0.75}
            rotate={135}
            donut
            spaceTop={0}
            spaceLeft={0}
            spaceBottom={0}
            spaceRight={0}
            legendX={0.57}
            legendY={0.2}
            legendSpacing={0.2}
            legendCircle
            legendRadius={0.05}
            showLegend
            legendFontSize={13}
          />
        </section>
      </summary>

      <section className='MinorInjuriesTool__table__container'>
        {summaryActivity && <ToolDataTable data={summaryActivityFiltered} iloData={{}} literals={literals} filterType={filterType} tableKey={literals.activity} factoryId={factories.list[scopeFactory].id} />}
        {summaryGeneral && <ToolDataTable data={summaryGeneralFiltered} iloData={{}} literals={literals} filterType={filterType} tableKey={literals.injury} factoryId={factories.list[scopeFactory].id} />}
      </section>
    </div>
  );
};

MinorInjuriesTool.displayName = 'MinorInjuriesTool';

export default MinorInjuriesTool;
