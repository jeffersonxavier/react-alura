import React from 'react';
import Header from './components/header';
import Timeline from './components/timeline';

function App({ match }) {
  return (
    <div className="main">
      <Header />
      <Timeline login={match && match.params ? match.params.login : null} />
    </div>
  );
}

export default App;
