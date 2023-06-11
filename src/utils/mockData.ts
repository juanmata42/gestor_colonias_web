import { App } from '../models/app';
import { Patient } from '../models/patient';
import MockImg from '../assets/mockImg.jpg';

export const patient: Patient = {
  id: '',
  hashnid: '',
  name: 'Sergio',
  lastname: 'García',
  factory_id: 'f005',
  birthdate: '2000-03-04',
  gender: 'male',
  nid: Math.random().toString(),
  telephone: '+34680768934',
  email: 'ruben.capote@gmail.com',
  address: 'Market street 12',
  country: 'spanish',
  religion: 'agnostic',
  qualification: 'undergraduate',
  access_house: true,
  access_water: true,
  access_police: false,
  medical_service: true,
  access_school: true,
  description: 'severed arm',
  contacts: [{
    name: 'test',
    lastname: 'test',
    gender: 'male',
    birthdate: '1998-07-12',
    nid: '1111111',
    telephone: '34620423315',
    email: 'test@gmail.com',
    address: 'test street 123',
  }],
};

export const app: App = {
  id: 'Test',
  active: true,
  color: 'red',
  route_patients_page: 'test',
  route_page: 'test',
  lang:
    [{
      name: 'GI4L Covid Assessment Tool',
      header_title: 'GI4L Covid Assessment Tool',
      short_header: 'Covid',
      tool_name: 'GI4L Covid Assessment Tool',
      language: 'EN',
    },
    ],
  tree_list: [
    {
      tree_id: 'MAIN-7ffSteAzgDDpKvTn5m9r',
      order: 1,
    },
  ],
  report: false,
  component: 'test',
};

export const globalAlertsNewsData = [{
  id: 1,
  type: 'new',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 2,
  type: 'new',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 3,
  type: 'new',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 4,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 5,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 6,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 7,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 8,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 9,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 10,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 11,
  type: 'alert',
  date: '31-05-2022',
  title: 'Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
}];

export const localAlertsNewsData = [{
  id: 1,
  type: 'new',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 2,
  type: 'new',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 3,
  type: 'new',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 4,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 5,
  type: 'alert',
  date: '31-05-2022',
  title: 'local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 6,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 7,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 8,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 9,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consec[tetur adipisci] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
},
{
  id: 10,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
{
  id: 11,
  type: 'alert',
  date: '31-05-2022',
  title: 'Local Far far away, behind the Word of the new mountains, far from the countries',
  content: 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt. A quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius mneque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt.',
  img: MockImg,
},
];

export const covidMapData = [
  {
    coordinates: [90.410055486, 23.741851061],
    amount: 200,
    type: 'Positive',
  },
  {
    coordinates: [90.4071990847, 23.7425573798],
    amount: 100,
    type: 'Negative',
  },
  {
    coordinates: [90.412600, 23.743500],
    amount: 300,
    type: 'Negative',
  },
];

export const covidMapColors = {
  Positive: '#c21832',
  Negative: '#54bec7',
};

export const covidData: Record<string, Record<string, number>> = {
  Factory: {
    today: 35,
    total: 2100,
  },
  Sector: {
    today: 3,
    total: 210,
  },
};

export const covidPieData = [
  [80, 20],
];

export const covidPieLabel = ['Covid Cases'];

export const covidPieLegends = ['Positive', 'Negative'];

export const covidPieColors = ['#c21832', '#54bec7'];

export const covidPieDistributionData = [
  [80, 15, 5],
];

export const covidPieDistributionLabel = ['Covid Distribution'];

export const covidPieDistributionLegends = ['Hospital', 'Home', 'Factory'];

export const covidPieDistributionColors = ['#fdd5db', '#470b14', '#df697b'];

export const tableData: Record<string, Record<string, Record<string, number>>> = {
  Cutting: {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 2,
      total: 3,
    },
  },
  Sewing: {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 0,
      total: 3,
    },
  },
  'Finishing/Ironing': {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 0,
      total: 3,
    },
  },
  Packing: {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 0,
      total: 3,
    },
  },
  'RAW material store': {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 0,
      total: 3,
    },
  },
  'Accessories store': {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 0,
      total: 3,
    },
  },
  Warehouse: {
    Factory: {
      today: 5,
      total: 30,
    },
    Sector: {
      today: 0,
      total: 3,
    },
  },
};

export const covidLineData = [
  [1200, 1300, 1400],
  [1000, 1100, 1200],
];

export const covidLineLabels = ['February', 'March', 'April'];

export const covidLineLegends = ['Factory', 'Sector'];

export const covidLineColors = ['#73767c', '#c21832'];

export const minorBarData = [
  [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
  [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
];

export const minorBarLabels = ['Headache', 'Toothache', 'Sore throat',
  'Red painful eye', 'Cervical pain', 'Cough', 'Lorem ipsum', 'Lorem ipsum',
  'Lorem ipsum', 'Lorem ipsum'];

export const minorBarLegends = ['Factory', 'Sector'];

export const validatedPermissionTree = [
  {
    app_id: 'Token',
    level: 2,
  },
  {
    app_id: 'Evaluations',
    level: 2,
    sub_permissions: [{
      app_id: 'Covid',
      level: 2,
    }, {
      app_id: 'Health',
      level: 2,
    }, {
      app_id: 'MinorInjuries',
      level: 2,
    }, {
      app_id: 'Disabilities',
      level: 2,
    }, {
      app_id: 'Injuries',
      level: 2,
    },
    ],
  },
  {
    app_id: 'Dashboard',
    level: 2,
    sub_permissions: [{
      app_id: 'ILO',
      level: 2,
    }, {
      app_id: 'Admin',
      level: 2,
      sub_permissions: [{
        app_id: 'UserManagement',
        level: 2,
      }],
    }, {
      app_id: 'MinorInjuries',
      level: 2,
    }, {
      app_id: 'Covid',
      level: 2,
    }, {
      app_id: 'Health',
      level: 2,
    }],
  }];

export const userPermissionTree = [
  {
    app_id: 'Evaluations',
    level: 0,
    sub_permissions: [{
      app_id: 'Covid',
      level: 1,
    }, {
      app_id: 'Health',
      level: 2,
    }, {
      app_id: 'MinorInjuries',
      level: 0,
    },
    ],
  },
  {
    app_id: 'Dashboard',
    level: 1,
    sub_permissions: [{
      app_id: 'ILO',
      level: 2,
    }, {
      app_id: 'Admin',
      level: 1,
    }, {
      app_id: 'MinorInjuries',
      level: 2,
    }, {
      app_id: 'Health',
      level: 0,
    }],
  },
];
