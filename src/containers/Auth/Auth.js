import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprout from '../../asset/images/sprout.png';

import '@fortawesome/fontawesome-free/js/all.js';
import {Button} from 'react-bootstrap';

class Auth extends Component {
  state = {
    email: '',
    password: ''
  }

  onChangeEmail = event => {
    this.setState({[event.target.type]: event.target.value});
  }

  // TODO: verify authentication. Right now it just redirects
  onClickHandler = () => {
    // verify that this is a proper user

    // save data to local storage for auto sign-in

    // save token to local storage
    // saving to redux state for now
    this.props.onAddToken(this.state.email, this.state.password);

    // redirect user to main app page
    this.props.history.push('/');
  }


  render() {
    return (
      <div className='container'>
        <img src={sprout} className="Sprout d-block m-auto" alt={"Logo, a little sprout"} />
        <div className='row'>
          <div className='col-sm-8 offset-sm-2 col-md-6 offset-md-3'>

            <form>
              <p className="h5 text-center mb-4">Sign in</p>

              {/*email form*/}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"
                    id="basic-addon1"
                    style={{background: 'none', border: 'none'}}
                  >
                    <i className='fas fa-envelope'
                       style={{fontSize: '24px', color: 'Dodgerblue'}} />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  onChange={(event) => this.onChangeEmail(event)}
                  aria-label="Username"
                  aria-describedby="basic-addon1" />
              </div>

              {/*password form*/}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon2"
                        style={{background: 'none', border: 'none'}}
                  >
                    <i className='fas fa-unlock'
                       style={{fontSize: '24px', color: 'Dodgerblue', margin: '0 1.5px'}}/>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(event) => this.onChangeEmail(event)}
                  aria-label="Username"
                  aria-describedby="basic-addon1"/>
              </div>

              <div className="text-center">
                <Button
                  className="col-3"
                  onClick={this.onClickHandler}>
                  click me
                </Button>

              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToken: (email, password) => dispatch({ type: 'AUTH_ADD_TOKEN', email, password })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);