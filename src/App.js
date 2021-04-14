import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import Main from './containers/Main/Main';

class App extends Component {
  componentDidMount() {
    // this.props.onTryAutoSignup();
  }

  render () {
    return (
      <Switch>
        <Route path='/'      component={Main} exact />
        <Route path='/login' component={Auth} />
      </Switch>
    );
  }
}


const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);