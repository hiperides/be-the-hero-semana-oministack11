import React from 'react';

import './global.css'

import Routes from './routes';

//Quando o HTML tá escrito dentro do arquivo de JS, se chama  JSX (JavaScript XML - É a sintaxe do HTML)
function App() {
  
  return (
      <Routes />
  );
}
//Componente no React é uma função que retorna HTML e pode ter funcionalidades JS, CSS...

export default App;
