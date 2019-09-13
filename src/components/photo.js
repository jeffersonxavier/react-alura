import React from 'react';

function PhotoHeader({ photo }) {
  return (
    <header className="foto-header">
      <figure className="foto-usuario">
        <img src={photo.urlPerfil} alt="foto do usuario"/>
        <figcaption className="foto-usuario">
          <a href="/">{photo.loginUsario}</a>
        </figcaption>
      </figure>
      <time className="foto-data">{photo.horario}</time>
    </header>
  );
}

function PhotoInfo({ photo }) {
  return (
    <div className="foto-info">
      <div className="foto-info-likes">
        { photo.likers.map(liker => {
          return <a href="/" key={liker.login}>{liker.login},</a>;
        })}
        curtiram
      </div>

      <p className="foto-info-legenda">
        <a className="foto-info-autor" href="/">autor </a>
        {photo.comentario}
      </p>

      <ul className="foto-info-comentarios">
        { photo.comentarios.map(comment => {
          return (
            <li className="comentario" key={comment.id}>
              <a className="foto-info-autor" href="/">{ comment.login } </a>
              { comment.texto }
            </li>
          )  
        })}
      </ul>
    </div>
  );
}

function PhotoUpdates() {
  return(
    <section className="fotoAtualizacoes">
      <a href="/" className="fotoAtualizacoes-like">Likar</a>
      <form className="fotoAtualizacoes-form">
        <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
        <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
      </form>
    </section>
  )
}

export default function Photo({ photo }) {
  return (
    <div className="foto">
      <PhotoHeader photo={photo} />
      <img alt="foto" className="foto-src" src={photo.urlFoto} />
      <PhotoInfo photo={photo} />
      <PhotoUpdates />
    </div>
  );
}