import React from 'react'

function PhotoHeader() {
  return (
    <header class="foto-header">
      <figure class="foto-usuario">
        <img src="https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzkxOTI1MjYy/scarlett-johansson-13671719-1-402.jpg" alt="foto do usuario"/>
        <figcaption class="foto-usuario">
          <a href="/">
            Black Widow
          </a>  
        </figcaption>
      </figure>
      <time class="foto-data">03/10/2016 20:13</time>
    </header>
  );
}

function PhotoInfo() {
  return (
    <div class="foto-info">
      <div class="foto-info-likes">
        <a href="/">alots_ssa</a>
        ,
        <a href="/">rafael_rollo</a>
        curtiram
      </div>

      <p class="foto-info-legenda">
        <a class="foto-info-autor" href="/">autor </a>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
      </p>

      <ul class="foto-info-comentarios">
        <li class="comentario">
          <a class="foto-info-autor" href="/">seguidor </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
        </li>
        <li class="comentario">
          <a class="foto-info-autor" href="/">seguidor </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora expedita, laborum ex soluta hic maiores veritatis deserunt.
        </li>
        <li class="comentario">
          <a class="foto-info-autor" href="/">seguidor </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio delectus maiores voluptatibus sit commodi quidem.
        </li>
      </ul>
    </div>
  );
}

function PhotoUpdates() {
  return(
    <section class="fotoAtualizacoes">
      <a href="/" class="fotoAtualizacoes-like">Likar</a>
      <form class="fotoAtualizacoes-form">
        <input type="text" placeholder="Adicione um comentário..." class="fotoAtualizacoes-form-campo"/>
        <input type="submit" value="Comentar!" class="fotoAtualizacoes-form-submit"/>
      </form>
    </section>
  )
}

export default function Photo() {
  return (
    <div class="foto">
      <PhotoHeader />

      <img alt="foto" class="foto-src" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg"/>

      <PhotoInfo />
      <PhotoUpdates />
    </div>
  );
}