import literals from 'literals';
import { State } from 'models/state';

const INITIAL_STATE: State = {
  loading: {
    active: true,
  },
  literals: {
    language: 'EN',
    literals: literals.EN,
  },
};

export default INITIAL_STATE;
