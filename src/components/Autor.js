import React, { Component } from 'react';
import Input from './Input';
import axios from 'axios';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {

    constructor(props) {
        super(props);
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        const data = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };
        axios.post('http://localhost:8080/api/autores', data)
            .then(res => {
                this.setState({ nome: '', email: '', senha: '' });
                PubSub.publish('atualiza-lista-autores', res.data);
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
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <Input label={'Nome'} id="nome" name="nome" type="text" value={this.state.nome} onChange={this.setNome}/>
                    <Input label={'Email'} id="email" name="email" type="text" value={this.state.email} onChange={this.setEmail}/>
                    <Input label={'Senha'} id="senha" name="senha" type="password" value={this.state.senha} onChange={this.setSenha}/>
                    <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>             
            </div>
        );
    }
}

function TabelaAutores(props) {
    return(
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
                    props.lista.map((autor) => {
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
    );
}

export default class AutorBox extends Component {

    constructor(props) {
        super(props);
        this.state = { lista: [] };
    }

    componentWillMount() {
        axios.get('http://localhost:8080/api/autores')
            .then(res => {
                this.setState({ lista: res.data });
            }).catch(erro => console.log(erro));

        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            this.setState({ lista: novaLista });
        });
    }

    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    }
}
