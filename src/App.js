import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Loggin} from './Loggin.js';

import {NavBar} from './NavBar.js';
import {StartSurvey} from './StartSurvey.js'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export class App extends React.Component {
  render() {
    return (
      
      // <Loggin />
      <body>
        <NavBar />
        <StartSurvey />
      
      </body>
    );
  }
}
