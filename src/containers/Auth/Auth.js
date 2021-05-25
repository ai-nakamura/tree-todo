import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprout from '../../asset/images/sprout.png';

import '@fortawesome/fontawesome-free/js/all.js';
import {Button} from 'react-bootstrap';

import fnv1a from '../../FNV-1a';


class Auth extends Component {
  state = {
    email: '',
    password: '',
    emailError: null
  }

  onChangeEmail = event => {
    this.setState({[event.target.type]: event.target.value});
  }

  verifyEmail(email) {
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const emailValid = pattern.test(this.state.email);

    if (!emailValid) {
      this.state.emailError = <p>email error</p>;
    }
  }

  // TODO: verify authentication. Right now it just redirects
  onClickHandler = () => {
    // verify that this is a proper user

    this.verifyEmail(this.state.email);
    if (this.state.emailError) {
      return;
    }

    const token = fnv1a(this.state.email + this.state.password);
    this.props.onAddToken(this.state.email, this.state.password, token);

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
              {console.log(this.state.emailError)}
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
    onAddToken: (email, password, token) => dispatch({type: 'AUTH_ADD_TOKEN', email, password, token})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);