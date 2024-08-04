import React from 'react';

import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
