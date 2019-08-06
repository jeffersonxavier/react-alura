import React, { Component } from 'react';
import axios from 'axios';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { lista: [ ] };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:8080/api/autores')
            .then(res => {
                this.setState({ lista: res.data, nome: '', email: '', senha: '' });
            });
    }

    enviaForm(evento) {
        evento.preventDefault();
        const data = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };
        axios.post('http://localhost:8080/api/autores', data)
            .then(res => {
                console.log('\n\ncriado...', res);
            }).catch(error => console.log(error));
    }

    setNome(evento){
        this.setState({nome:evento.target.value});
    }
    
    setEmail(evento){
        this.setState({email:evento.target.value});
    }
    
    setSenha(evento){
        this.setState({senha:evento.target.value});
    }
      

    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>
    
                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>
    
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autores</a></li>
                        </ul>
                    </div>
                </div>
    
                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                </div>
                <div className="content" id="content">
                  <div className="pure-form pure-form-aligned">
                    <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                      <div className="pure-control-group">
                        <label htmlFor="nome">Nome</label> 
                        <input id="nome" type="text" name="nome" value={this.state.nome || ''} onChange={this.setNome}/>             
                      </div>
                      <div className="pure-control-group">
                        <label htmlFor="email">Email</label> 
                        <input id="email" type="email" name="email" value={this.state.email || ''} onChange={this.setEmail} />               
                      </div>
                      <div className="pure-control-group">
                        <label htmlFor="senha">Senha</label>
                        <input id="senha" type="password" name="senha" value={this.state.senha || ''} onChange={this.setSenha}/> 
                      </div>
                      <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                      </div>
                    </form>             
    
                  </div>  
                  <div>            
                    <table className="pure-table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            this.state.lista.map((autor) => {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>                
                                        <td>{autor.email}</td>                
                                    </tr>
                                );
                            })
                        }
                      </tbody>
                    </table> 
                  </div>             
                </div>
            </div>
        );
    }
}
    
export default App;
