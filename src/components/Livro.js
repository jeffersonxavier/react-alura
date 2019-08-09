import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Input from './Input';

class FormularioLivro extends Component {

    constructor(props) {
        super(props);
        this.state = { titulo: '', preco: 0, autorId: 0 };
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        const data = { titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId };
        axios.post('http://localhost:8080/api/livros', data)
            .then(res => {
                this.setState({ titulo: '', preco: 0, autorId: 0 });
                PubSub.publish('atualiza-lista-livros', res.data);
            }).catch(error => console.log(error));
    }

    setTitulo(evento){
        this.setState({titulo:evento.target.value});
    }
    
    setPreco(evento){
        this.setState({preco:evento.target.value});
    }
    
    setAutorId(evento){
        this.setState({autorId:evento.target.value});
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <Input label="Título" id="titulo" name="titulo" type="text" value={this.state.titulo} onChange={this.setTitulo}/>
                    <Input label="Preço" id="preco" name="preco" type="number" value={this.state.preco} onChange={this.setPreco}/>

                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select name="autorId" onChange={this.setAutorId}>
                            <option value="">Selecione autor</option>
                            { 
                                this.props.autores.map(autor => {
                                return <option key={ autor.id } value={ autor.id }>
                                            { autor.nome }
                                        </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>             
            </div>
        );
    }
}

function TabelaLivros(props) {
    return(
        <div>            
            <table className="pure-table">
                <thead>
                <tr>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Autor</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.livros.map((livro) => {
                        return (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>                
                                <td>{livro.preco}</td>                
                                <td>{livro.autor.nome}</td>                
                            </tr>
                        );
                    })
                }
                </tbody>
            </table> 
        </div>
    );
}

export default class LivroBox extends Component {

    constructor(props) {
        super(props);
        this.state = { livros: [], autores: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/livros')
            .then(res => {
                this.setState({ livros: res.data });
            }).catch(erro => console.log(erro));
        
        axios.get('http://localhost:8080/api/autores')
            .then(res => {
                this.setState({ autores: res.data });
            }).catch(erro => console.log(erro));

        PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => {
            this.setState({ livros: novaLista });
        });
    }

    render() {
        return (
            <div>
                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Livros!</h1>
                    </div>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros livros={this.state.livros} />
                </div>
            </div>
        );
    }
}