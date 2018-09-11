import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

import './styles/index.less';

const store = configStore({});

function renderApp(app: any) {
  render(
    <AppContainer>
      {app}
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(<Root store={store} routeConfig={routeConfig} />);

// Hot Module Replacement API
/* istanbul ignore if  */
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default;
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
  // @ts-ignore
  module.hot.accept('./Root', () => {
    // @ts-ignore
    const nextRoot = require('./Root').default;
    renderApp(<Root store={store} routeConfig={routeConfig} />);
  });
}
