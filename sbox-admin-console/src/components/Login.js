// Import Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

// Import imgs, css, components, and actions
import { authorizeUser } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      code: '',
      error: '',
    };
  }

  render = () => {
    return (
      <div className="row">
        <div style={{paddingLeft:50, paddingRight:50}}>
          <Panel
            title="Sign In"
            hasTitle={true}>
            <div className="col-md-5 col-xs-12 col-md-offset-1" style={{paddingTop:20}}>
              <p>Signing in is easier than ever.</p>
              <p>No need to remember another password.</p>
              <p>1) Enter your email address</p>
              <p>2) Submit the code from your email</p>
              <p>3) We'll remember you in the future</p>
            </div>
            <div className="col-md-5 col-xs-12 col-md-offset-1" style={{paddingTop:10}}>
              <label>Email:</label>
              <input
                type='text'
                className='form-control'
                placeholder='Your email address'
                value={this.state.email}
                style={{ width: 300 }}
                onChange={event => this.setState({ email: event.target.value }) }
              />
              <div style={{paddingTop:20}} />
              <label>Administrator Password:</label>
              <input
                type='password'
                className='form-control'
                placeholder='Your email address'
                value={this.state.code}
                style={{ width: 300 }}
                onChange={event => this.setState({ code: event.target.value }) }
                onKeyPress={this.handleKeyPress}
              />
              <div style={{paddingLeft:240, paddingTop:20}}>
              <button
                  type='button'
                  className='btn btn-primary row-centered'
                  onClick={this.handleSubmit}
                >
                  Login
                </button>
              </div>
              {this.maybeRenderErrorMessage()}
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  handleSubmit = () => {
    const { email, code } = this.state;
    
    if (email === '') this.setState({ error: 'Please enter a username'});
    else if (code === '') this.setState({ error: 'Please enter a password'});
    else {
      this.setState({ error: '' });
      this.props.authorizeUser({ email, code });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const { email, code } = this.state;
      this.props.authorizeUser({ email, code });
    }
  }

  maybeRenderErrorMessage = () => {
    if (this.state.error)
      return (
        <div style={{ color: 'red' }}>
          {this.state.error}
        </div>
      );

    if (this.props.auth.error)
      return (
        <div style={{ color: 'red' }}>
          The entered username and password combination was not recognized in our server.
        </div>
      );

    return null;
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth };
}

export default connect(mapStateToProps, { authorizeUser })(Login);