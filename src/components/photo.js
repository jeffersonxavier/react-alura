import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';

function PhotoHeader({ photo }) {
  return (
    <header className="foto-header">
      <figure className="foto-usuario">
        <img src={photo.urlPerfil} alt="foto do usuario"/>
        <figcaption className="foto-usuario">
          <Link to={`/timeline/${photo.loginUsuario}`}>
            {photo.loginUsuario}
          </Link>
        </figcaption>
      </figure>
      <time className="foto-data">{photo.horario}</time>
    </header>
  );
}

class PhotoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { likers: this.props.photo.likers };
  }

  componentDidMount() {
    Pubsub.subscribe('atualiza-liker', (topic, infoLiker) => {
      if (this.props.photo.id === infoLiker.photoId) {
        const possibleLikers = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
        if (!possibleLikers) {
          this.setState({ likers: this.state.likers.concat(infoLiker.liker) });
        } else {
          const otherLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
          this.setState({ likers: otherLikers });
        }
      }
    });
  }
  
  render() {
    const { photo } = this.props;
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          { this.state.likers.map(liker => {
            return <Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login},</Link>;
          })}
          curtiram
        </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor" href="/timeline">autor </a>
          {photo.comentario}
        </p>

        <ul className="foto-info-comentarios">
          { photo.comentarios.map(comment => {
            return (
              <li className="comentario" key={comment.id}>
                <Link to={`/timeline/${comment.login}`}>
                  { comment.login }
                </Link>
                { comment.texto }
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

class PhotoUpdates extends Component {

  constructor(props) {
    super(props);
    this.state = { likeada: this.props.photo.likeada };
  }

  like() {
    fetch(`http://localhost:8080/api/fotos/${this.props.photo.id}/like?X-AUTH-TOKEN=${localStorage.getItem('authToken')}`, { method: 'POST' })
      .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("não foi possível realizar o like da foto");
        }
      })
      .then(liker => {
        this.setState({ likeada: !this.state.likeada });
        Pubsub.publish('atualiza-liker', { photoId: this.props.photo.id, liker});
      });
  }

  render() {
    const { likeada } = this.state;
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.like.bind(this)} href="#like"
          className={likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
        </form>
      </section>
    )
  }
}

export default function Photo({ photo }) {
  return (
    <div className="foto">
      <PhotoHeader photo={photo} />
      <img alt="foto" className="foto-src" src={photo.urlFoto} />
      <PhotoInfo photo={photo} />
      <PhotoUpdates photo={photo} />
    </div>
  );
}