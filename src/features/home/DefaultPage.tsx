import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
// @ts-ignore
import * as actions from './redux/actions';

export class DefaultPage extends React.Component {
  public render() {
    return (
      <div className="home-default-page">
        <header className="app-header">
          <img src={reactLogo} className="app-logo" alt="logo" />
          <img src={rekitLogo} className="rekit-logo" alt="logo" />
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <div className="app-intro">
          <h3>To get started:</h3>
          <ul>
            <li>test</li>
          </ul>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
