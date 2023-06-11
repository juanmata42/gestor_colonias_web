import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import DatePicker from 'react-multi-date-picker';
import dhakaUniversityLogo from '../../../assets/university-of-dhaka.svg';
import SupporterLogo from '../../../assets/associated-british-foods-logo.svg';
import { Map } from '../../../components/Graph/Map';
import { PieChart } from '../../../components/Graph/PieChart';
import { LineChart } from '../../../components/Graph/LineChart';
import { covidTool } from '../../../models/lang';
import colors from '../../../styles/_colors.module.scss';
import ToolDataTable from '../../../components/Graph/ToolDataTable';
import { BarAndLineDataType, MapDataType } from '../../../models/statistics';
import { getExcelData } from '../../../utils/apiCalls';

interface Props {
  getData: (initDate: string, endDate: string) => void;
  covid: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
  },
  factories:{
    list: any[],
  },
  literals: covidTool;
}
interface PieDataType {
  legends: string[];
  data: number[];
}

const CovidTool: React.FC<Props> = (props) => {
  const {
    literals, covid, getData, factories,
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
  const [dateOrTotal, setDateOrTotal] = useState('total');
  const [scopeFactory, setScopeFactory] = useState(0);
  const [summaryGeneralFiltered, setSummaryGeneralFiltered] = useState<Record<string, number>>({});
  const [summaryActivityFiltered, setSummaryActivityFiltered] = useState({});
  const [mapData, setMapData] = useState<MapDataType[]>([]);
  const [pieData, setPieData] = useState<PieDataType>({
    legends: [],
    data: [],
  });
  const [lineData, setLineData] = useState<BarAndLineDataType>({
    legends: [],
    labels: [],
    data: [],
  });

  const {
    summaryGeneral, summaryActivity, summaryRegion, summaryDate,
  } = covid;
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

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getData(selectedDate.initDate, selectedDate.endDate);
    }

    return () => { isMounted.current = false; };
  }, [selectedDate]);

  function filterSummaryGeneral() {
    if (summaryGeneral) {
      if (scope === 'group' || scope === 'sector') {
        setSummaryGeneralFiltered(summaryGeneral[scope][dateOrTotal] ?? { positive: 0, negative: 0 });
      } else if (summaryGeneral[factories.list[scopeFactory].id]) {
        setSummaryGeneralFiltered(summaryGeneral[factories.list[scopeFactory].id] ? summaryGeneral[factories.list[scopeFactory].id][dateOrTotal] : { positive: 0, negative: 0 });
      }
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
  function filterPieData() {
    const legends: string[] = [];
    const data: any = [];
    if (summaryGeneralFiltered) {
      Object.keys(summaryGeneralFiltered).forEach((key) => {
        data.push(summaryGeneralFiltered[key]);
        legends.push(key.charAt(0).toUpperCase() + key.slice(1));
      });
    }
    setPieData({ legends, data });
  }
  useEffect(() => {
    setMapData(summaryRegionToArrayOfCoordinates());
    filterSummaryGeneral();
    filterSummaryActivity();
    filterLineData();
  }, [filterType, dateOrTotal, summaryRegion, scope, scopeFactory]);

  useEffect(() => {
    filterPieData();
  }, [summaryGeneralFiltered]);

  const rangeHandler = (e: any) => {
    if (e.length > 1) {
      setSelectedDate({ initDate: e[0].format('YYYY-MM-DD'), endDate: e[1].format('YYYY-MM-DD') });
    }
  };

  async function getExcelDataAction() {
    getExcelData(selectedDate.initDate, selectedDate.endDate, 'covid').then((response) => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  return (
    <div className='CovidTool__body'>
      <header className='CovidTool__header'>
        <title className='CovidTool__header-title-subtitle'>
          <h1 className='CovidTool__header-title'>
            {`${literals.companyName}`}
            <strong className='CovidTool__header-title-bold'>{` ${literals.toolName.toUpperCase()}`}</strong>
          </h1>
          <h1 className='CovidTool__header-subtitle'>{`${literals.tool}`}</h1>
        </title>
        <figure className='CovidTool__header-logo'>
          <img className='CovidTool__header-university-logo' src={dhakaUniversityLogo} alt='Dhaka university Logo' />
          <img className='CovidTool__header-supported-box__img' src={SupporterLogo} alt='associated-british-foods' />
        </figure>
        <section className='CovidTool__header-dropdown-menu-container'>
          <details onChange={scopeFactoryHandler} className='CovidTool__header-dropdown-menu button-secondary'>
            <summary className='CovidTool__header-selector__dropdown'>
              {factories.list[scopeFactory].name}
              {factories.list.map((factory, index) => <input type='radio' key={`input${factory.name}`} value={index} id={factory.id} title={factory.name} name='factory' />)}
            </summary>
            <ul className='CovidTool__header-selector__dropdown__list dropdown-list'>
              {factories.list.map((factory) => (
                <li key={`label${factory.name}`}>
                  <label htmlFor={factory.id}>{factory.name}</label>
                </li>
              ))}
            </ul>
          </details>
        </section>
        <section className='CovidTool__header-dropdown-menu-container'>
          <details onChange={scopeHandler} className='CovidTool__header-dropdown-menu  button-secondary'>
            <summary className='CovidTool__header-selector__dropdown'>
              {filterTypeName}
              <input type='radio' value='factory' id='Factory' title='Factory' name='factoryORsector' />
              <input type='radio' value='sector' id='Sector' title='Sector' name='factoryORsector' />
              <input type='radio' value='group' id='Group' title='Group' name='factoryORsector' />
            </summary>
            <ul className='CovidTool__header-selector__dropdown__list dropdown-list'>
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
            <a rel='noreferrer' className='CovidTool_download-button button-secondary' style={{ textDecoration: 'none' }} href={`${window.MAIN_API_URL}/api/stats/excel?date1=${selectedDate.initDate}&date2=${selectedDate.endDate}&type=covid`} target='_blank'>Download data</a>
          </div>
        </section>
      </summary>
      {summaryRegion && (
        <div className='CovidTool__map'>
          {
            mapData.length > 0
          && (
            <Map
              id='CovidTool__map-id'
              data={mapData}
              colors={{ Negative: colors.azulTransparent, Positive: colors.primaryTransparent }}
              zoom={15}
              radius={30}
            />
          )
          }
        </div>
      )}

      <summary className='CovidTool__summary'>
        <div className='CovidTool__summary-menu-info'>
          <section className='CovidTool_summary-menu'>
            <title
              className={`CovidTool__summary-menu-item${dateOrTotal === 'date' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('date')}
            >
              {literals.defaultCountName.toUpperCase()}
            </title>
            <title
              className={`CovidTool__summary-menu-item${dateOrTotal === 'total' ? '-selected' : ''}`}
              onClick={() => setDateOrTotal('total')}
            >
              {literals.countTotalName.toUpperCase()}
            </title>
          </section>

          <section className='CovidTool__summary-info'>
            <div className='CovidTool__summary-info-current'>
              <h1 className='CovidTool__summary-info-current-amount'>{summaryGeneralFiltered?.positive ? summaryGeneralFiltered.positive : 0}</h1>
              <h1 className='CovidTool__summary-info-current-title__bold'>
                {`${literals.positive} ${filterType.toUpperCase()}`}
              </h1>
              <h1 className='CovidTool__summary-info-current-title'>{literals.measurement}</h1>
            </div>
            <div className='CovidTool__summary-info-slash'>
              /
            </div>
            <div className='CovidTool__summary-info-total'>
              <h1 className='CovidTool__summary-info-total-amount'>{summaryGeneralFiltered?.negative ? summaryGeneralFiltered.negative : 0}</h1>
              <h1 className='CovidTool__summary-info-total-title__bold'>
                {`${literals.negative} ${filterType.toUpperCase()}`}
              </h1>
              <h1 className='CovidTool__summary-info-total-title'>{literals.measurement}</h1>
            </div>
          </section>
        </div>

        <section className='CovidTool__pie'>
          <PieChart
            id='CovidTool__pie-covid-distribution__id'
            className='CovidTool__pie__svg'
            data={[pieData.data]}
            labels={['']}
            legends={pieData.legends}
            colors={[colors.azul, colors.primary]}
            innerRadius={0.75}
            rotate={135}
            donut
            spaceTop={0}
            spaceLeft={0}
            spaceBottom={0}
            spaceRight={0}
            legendX={0.60}
            legendY={0.22}
            legendSpacing={0.2}
            legendTextSpace={0.01}
            legendCircle
            legendRadius={0.05}
            legendFontSize={13}
            showLegend
          />
        </section>
      </summary>

      <section className='CovidTool__table-line'>
        {summaryActivity && <ToolDataTable data={summaryActivityFiltered} iloData={{}} literals={literals} filterType={filterType} factoryId={factories.list[scopeFactory].id} tableKey={literals.area} />}
        {summaryDate && (
          <section className='CovidTool__line'>
            <h1 className='CovidTool__line-title'>{literals.lineChartTitle}</h1>
            <LineChart
              id='CovidTool__line__id'
              width='100%'
              height='420px'
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
              spaceLeft={0.15}
              spaceBottom={0.22}
              spaceRight={0}
              legendX={0.02}
              legendY={0.05}
              legendCircle
              legendRadius={0.02}
              legendTextSpace={0.01}
              showLegend
              legendHorizontal
            />
          </section>
        )}
      </section>
    </div>
  );
};

CovidTool.displayName = 'CovidTool';

export default CovidTool;
