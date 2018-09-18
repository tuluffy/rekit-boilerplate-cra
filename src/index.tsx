import * as React from 'react';
import { render } from 'react-dom';
import * as Immutable from 'immutable';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

import './styles/index.less';

const store = configStore(Immutable.Map());

// export type RootState = typeof store;

function renderApp(app: any) {
  render(
    app,
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
    import('./common/routeConfig').then(
      ({ default: nextRouteConfig }) => renderApp(<Root store={store} routeConfig={nextRouteConfig} />)
    )
  });
  // @ts-ignore
  module.hot.accept('./Root', () => {
    import('./Root').then(
      () => renderApp(<Root store={store} routeConfig={routeConfig} />)
    )
  });
}
