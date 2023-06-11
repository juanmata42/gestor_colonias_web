import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { healthIssuesTool } from '../../../models/lang';
import './styles.scss';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import { Map } from '../../../components/Graph/Map';
import { PieChart } from '../../../components/Graph/PieChart';
import { BarChart } from '../../../components/Graph/BarChart';
import colors from '../../../styles/_colors.module.scss';
import ToolDataTable from '../../../components/Graph/ToolDataTable';
import dotgridicon from '../../../assets/dot-grid.svg';
import bargraphicon from '../../../assets/bar-graph.svg';
import { BarAndLineDataType, MapDataType } from '../../../models/statistics';

interface Props {
  getData: (initDate: string, endDate: string) => void;
  healthIssues: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
  };
  factories: {
    list: any[],
  },
  literals: healthIssuesTool;
}
interface PieDataType {
  legends: string[];
  data: number[];
}

const HealthIssuesTool: React.FC<Props> = (props) => {
  const {
    literals, healthIssues, getData, factories,
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
  const [tableSelected, setTableSelected] = useState(true);
  const [dateOrTotal, setDateOrTotal] = useState('total');
  const [summaryGeneralFiltered, setSummaryGeneralFiltered] = useState({});
  const [summaryGeneralCountFiltered, setSummaryGeneralCountFiltered] = useState(0);
  const [summaryGeneralFactoryFiltered, setSummaryGeneralFactoryFiltered] = useState(0);
  const [summaryActivityFiltered, setSummaryActivityFiltered] = useState({});
  const [scope, setScope] = useState('factory');
  const [scopeFactory, setScopeFactory] = useState(0);
  const [mapData, setMapData] = useState<MapDataType[]>([]);
  const [pieData, setPieData] = useState<PieDataType>({
    legends: [],
    data: [],
  });
  const [barData, setBarData] = useState<BarAndLineDataType>({
    legends: [],
    labels: [],
    data: [],
  });

  const {
    summaryActivity, summaryDate, summaryGeneral, summaryRegion, summaryGender,
  } = healthIssues;

  function summaryRegionToArrayOfCoordinates() {
    const summaryRegionArray: any = [];
    if (summaryRegion) {
      Object.entries(summaryRegion).forEach((entry) => {
        const [key] = entry;
        const coordinates = key.split(',').map((coordinate) => parseFloat(coordinate));
        let ammount = 0;
        if (scope === 'group') {
          Object.entries(entry[1]).forEach((value: any) => {
            if (value[0] === 'group') {
              ammount += value[1][dateOrTotal];
            }
          });
        } else if (scope === 'sector') {
          Object.entries(entry[1]).forEach((value: any) => {
            if (value[0] === 'sector') {
              ammount += value[1][dateOrTotal];
            }
          });
        } else {
          Object.entries(entry[1]).forEach((value: any) => {
            if (value[0] !== 'group' && value[0] !== 'sector') {
              ammount += value[1][dateOrTotal];
            }
          });
        }
        summaryRegionArray.push({ coordinates, ammount, type: 'Positive' });
      });
    }
    return summaryRegionArray;
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

  const tableSelectedHandler = () => {
    setTableSelected(() => { return true; });
  };

  const graphSelectedHandler = () => {
    setTableSelected(() => { return false; });
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
  const scopeFactoryHandler = (e: any) => {
    setScopeFactory(e.target.value);
  };
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
    isMounted.current = true;
    if (isMounted.current) {
      getData(selectedDate.initDate, selectedDate.endDate);
    }

    return () => { isMounted.current = false; };
  }, [selectedDate]);

  useEffect(() => {
    setMapData(summaryRegionToArrayOfCoordinates());
    filterSummaryGeneral();
    filterSummaryActivity();
    filterSummaryGeneralCount();
    filterBarData();
    filterPieData();
  }, [filterType, dateOrTotal, summaryRegion, scope, scopeFactory, summaryGender, summaryGeneral, summaryActivity]);

  return (
    <div className='HealthIssuesTool__body'>
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
            <a rel='noreferrer' className='CovidTool_download-button button-secondary' style={{ textDecoration: 'none' }} href={`${window.MAIN_API_URL}/api/stats/excel?date1=${selectedDate.initDate}&date2=${selectedDate.endDate}&type=health`} target='_blank'>Download data</a>
          </div>
        </section>
      </summary>
      {summaryRegion && (
        <section className='HealthIssuesTool__map'>
          {
            mapData.length > 0
            && (
              <Map
                id='HealthIssuesTool__map-id'
                data={mapData}
                colors={{ Negative: colors.azulTransparent, Positive: colors.primaryTransparent }}
                zoom={15}
                radius={30}
              />
            )
          }
        </section>
      )}
      <summary className='HealthIssuesTool__summary'>
        <div className='HealthIssuesTool__summary-menu-info'>
          <section className='HealthIssuesTool__summary-menu'>
            <title
              className={`HealthIssuesTool__summary-menu-item${dateOrTotal === 'date' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('date')}
            >
              {literals.defaultCountName.toUpperCase()}
            </title>
            <title
              className={`HealthIssuesTool__summary-menu-item${dateOrTotal === 'total' ? '-selected' : ''}`}
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
        <section className='HealthIssuesTool__pie'>
          <PieChart
            id='HealthIssuesTool__pie-healthIssues-distribution__id'
            className='HealthIssuesTool__pie__svg'
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
            showLegend
            legendCircle
            legendX={0.57}
            legendY={0.2}
            legendRadius={0.05}
            legendSpacing={0.2}
            legendFontSize={13}
          />
        </section>
      </summary>

      <div className='HealthIssuesTool__table-bar__container'>
        {summaryGeneral && <ToolDataTable data={summaryActivityFiltered} iloData={{}} literals={literals} filterType={filterType} factoryId={factories.list[scopeFactory].id} tableKey={literals.area} />}
        <div className='HealthIssuesTool__bar-table__container'>
          <section className='HealthIssuesTool__bar-table__filter'>
            <button className={`HealthIssuesTool__bar-table__filter-button${tableSelected ? '-selected' : ''}`} type='button' onClick={tableSelectedHandler}><img src={dotgridicon} alt='dotgridicon' /></button>
            <button className={`HealthIssuesTool__bar-table__filter-button${tableSelected ? '' : '-selected'}`} type='button' onClick={graphSelectedHandler}><img src={bargraphicon} alt='bargraphicon' /></button>
          </section>
          {
            tableSelected
              ? (<ToolDataTable data={summaryGeneralFiltered} iloData={{}} literals={literals} filterType={filterType} tableKey={literals.barChartTitle} factoryId={factories.list[scopeFactory].id} />)
              : (
                <section className='HealthIssuesTool__bar'>
                  <h1 className='HealthIssuesTool__bar-title'>{literals.barChartTitle}</h1>
                  <BarChart
                    id='HealthIssuesTool__bar__id'
                    width='100%'
                    height='50vh'
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
                    spaceLeft={0.25}
                    spaceBottom={0.1}
                    spaceRight={0.03}
                    legendX={0.02}
                    legendY={0.05}
                    spacing={0.2}
                    legendCircle
                    legendHorizontal
                    legendRadius={0.02}
                    legendTextSpace={0.01}
                  />
                </section>
              )
          }
        </div>
      </div>
    </div>
  );
};

HealthIssuesTool.displayName = 'HealthIssuesTool';

export default HealthIssuesTool;
