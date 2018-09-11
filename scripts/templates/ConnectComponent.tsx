import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface ICpProps {
  any
}

export class Cp extends React.Component<ICpProps> {
  public render() {
    return (
      <div/>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps() {
  return {};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cp)