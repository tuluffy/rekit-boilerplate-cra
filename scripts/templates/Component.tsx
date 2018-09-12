import * as React from 'react';<% if (connect) { %>
import Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// @ts-ignore
import * as actions from './redux/actions';
<% } %>

export interface I<%= Component %>Props {
}

export${connect ? '' : ' default'} class <%= Component %> extends React.<%= pure ? 'PureComponent' : 'Component' %><I<%= Component %>Props> {
  public render() {
    return (
      <div/>
    );
  }
}

<% if (connect) { %>
/* istanbul ignore next */
function mapStateToProps(state: Types.RootState, ownProps: I<%= Component %>Props) {
  return {};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= Component %>)
<% } %>