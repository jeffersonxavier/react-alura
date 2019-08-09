import React from 'react';
import { Route, Link } from "react-router-dom";
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './components/Autor';
import Home from './components/Home';
import LivroBox from './components/Livro';
    
export default function App() {
    return (
        <div id="layout">
            <a href="#menu" id="menuLink" className="menu-link">
                <span></span>
            </a>

            <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="/">Company</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                        <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livros</Link></li>
                        <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autores</Link></li>
                    </ul>
                </div>
            </div>

            <Route exact path="/" component={Home} />
            <Route exact path="/autor" component={AutorBox} />
            <Route exact path="/livro" component={LivroBox} />
        </div>
    );
};
