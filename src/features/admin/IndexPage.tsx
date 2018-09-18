import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '@src/types';

// @ts-ignore
import * as actions from './redux/actions';

// own props
export interface IIndexPageProps {}

// own state
export interface IIndexPageState {}  

type StateProps  = ReturnType<typeof mapStateToProps>;
type DispatchProps  = ReturnType<typeof mapDispatchToProps>;

type Props = RouteComponentProps<any> & StateProps & DispatchProps & IIndexPageProps;

export class IndexPage extends React.Component<Props, IIndexPageState> {

  public render() {
    return (
      <div/>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: IRootState, ownProps: IIndexPageProps) {
  const admin = state.get('admin');
  const userInfo = admin.get('userInfo');
  return {
    admin,
    userInfo
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: Dispatch, ownProps: IIndexPageProps) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect<StateProps, DispatchProps, IIndexPageProps>(mapStateToProps, mapDispatchToProps)(IndexPage);