import * as Immutable from 'immutable';

const pureInitialState = {
};

export type InitialState = typeof pureInitialState;

export interface IInitialState extends Immutable.Map<any, any> {
  get: <K extends keyof InitialState, N>(key: K, notSetValue?: Map<any, any> | undefined | any) => InitialState[K]
  set: <K extends keyof InitialState>(key: keyof InitialState, value: InitialState[K]) => any
}

const InitialState: IInitialState = Immutable.Map(pureInitialState);

export default InitialState;