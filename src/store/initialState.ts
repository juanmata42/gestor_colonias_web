import i18n from '../i18n';
import { State } from '../models/state';

const INITIAL_STATE: State = {
  session: {
    user: {
      id: '-1',
      email: '',
      hashemail: '',
      password: '',
      name: '',
      lastname: '',
      userFactories: [],
      birthdate: '',
      gender: '',
      nid: '',
      hashnid: '',
      telephone: '',
      address: '',
      country: '',
    },
    authenticated: localStorage.getItem('logged') === 'true',
    checked: false,
    error: '',
  },
  Apps: { appsArray: [] },
  adminTool: {
    error: '',
    userManagement: [],
    userToEdit: {
      id: '-1',
      email: '',
      hashemail: '',
      password: '',
      name: '',
      lastname: '',
      userFactories: [],
      birthdate: '',
      gender: '',
      nid: '',
      hashnid: '',
      telephone: '',
      address: '',
      country: '',
    },
    interventions: [],
    selectedIntervention: '',
  },
  loading: {
    count: 0,
  },
  i18n: {
    language: 'EN',
    literals: i18n.EN,
  },
  AlertNews: {
    localNews: [{
      id: -1,
      title: '',
      titleShort: '',
      subtitle: '',
      preTitle: '',
      body: '',
      sectionName: '',
      imageSrc: '',
      date: '',
    }],
    globalNews: [{
      id: -1,
      title: '',
      titleShort: '',
      subtitle: '',
      preTitle: '',
      body: '',
      sectionName: '',
      imageSrc: '',
      date: '',
    }],
  },
  CovidTool: {
    summaryGeneral: {
      Factory: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
      group: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
      sector: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
    },
    summaryActivity: {
      Activity: {
        Factory: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        group: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        sector: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
      },
    },
    summaryRegion: {
      Coordinates: {
        Factory: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        group: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        sector: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
      },
    },
    summaryDate: {
      date: {
        Factory: 0,
        group: 0,
        sector: 0,
      },
    },
  },
  HealthIssuesTool: {
    summaryGeneral: {
      Factory: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
      group: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
      sector: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
    },
    summaryActivity: {
      Activity: {
        Factory: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        group: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        sector: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
      },
    },
    summaryRegion: {
      Coordinates: {
        Factory: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        group: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        sector: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
      },
    },
    summaryDate: {
      date: {
        Factory: 0,
        group: 0,
        sector: 0,
      },
    },
    summaryGender: {
      Female: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
      Male: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
  },
  MinorInjuriesTool: {
    summaryGeneral: {
      Factory: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
      group: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
      sector: {
        date: {
          positive: 0,
          negative: 0,
        },
        total: {
          positive: 0,
          negative: 0,
        },
      },
    },
    summaryActivity: {
      Activity: {
        Factory: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        group: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        sector: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
      },
    },
    summaryRegion: {
      Coordinates: {
        Factory: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        group: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
        sector: {
          date: {
            positive: 0,
            negative: 0,
          },
          total: {
            positive: 0,
            negative: 0,
          },
        },
      },
    },
    summaryDate: {
      date: {
        Factory: 0,
        group: 0,
        sector: 0,
      },
    },
    summaryGender: {
      Female: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
      Male: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
  },
  iloTool: {
    summaryGeneral: {
      Illness: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryActivity: {
      Activity: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryAge: {
      AgeRange: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryWage: {
      WageRange: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryOvertime: {
      OvertimeRange: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryAllowance: {
      AllowanceRange: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryCostCare: {
      CostCareRange: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryDaysAbsence: {
      DaysAbsenceRange: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryGender: {
      Female: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
      Male: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryPaidAbsence: {
      PaidBoolean: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryFrequency: {
      None: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryTitle: {
      Injury: {
        MAIN: {
          total: 0,
          date: 0,
        },
        group: {
          total: 0,
          date: 0,
        },
        sector: {
          total: 0,
          date: 0,
        },
      },
    },
    summaryDate: {
      date: {
        Factory: 0,
        group: 0,
        sector: 0,
      },
    },
  },
  Factories: {
    list: [],
  },
};

export default INITIAL_STATE;
