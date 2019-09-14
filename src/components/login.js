import React, { Component } from 'react';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { msg: '' };
  }
  
  sigin(event) {
    event.preventDefault();
    fetch('http://localhost:8080/api/public/login', {
      method: 'POST',
      body: JSON.stringify({ login: this.login.value, senha: this.password.value }),
      headers: new Headers({
        'Content-type': 'application/json',
      })
    })
    .then(res => {
      if (res.ok) {
        return res.text();
      } else {
        throw new Error('Login Inválido!');
      }
    })
    .then(token => {
      localStorage.setItem('authToken', token);
      this.props.history.push('/timeline');
    })
    .catch(error => this.setState({ msg: error.message }))
  }

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        <span>{this.state.msg}</span>
        <form onSubmit={this.sigin.bind(this)}> 
          <input type="text" ref={(input) => this.login = input} />
          <input type="password" ref={(input) => this.password = input}/>
          <input type="submit" value="login"/>
        </form>
      </div>
    );
  }
}
