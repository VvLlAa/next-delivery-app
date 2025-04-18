import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import mainStore from './main/mainStore';

const combinedReducer = combineReducers({
  mainStore: mainStore,
});

type RootState = ReturnType<typeof combinedReducer>;

const reducer = (
  state: RootState | undefined,
  action: AnyAction
): RootState => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
