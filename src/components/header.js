import React from 'react'

export default function Header() {
  return(
    <header class="header container">
      <h1 class="header-logo">
        Instalura
      </h1>

      <form class="header-busca">
        <input type="text" name="search" placeholder="Pesquisa" class="header-busca-campo"/>
        <input type="submit" value="Buscar" class="header-busca-submit"/>
      </form>


      <nav>
        <ul class="header-nav">
          <li class="header-nav-item">
            <a href="/">
              {/* ♡
              <!--                 ♥-->
              <!--Quem deu like nas minhas fotos?--> */}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
