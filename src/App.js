import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Loggin} from './Loggin.js';

import {NavBar} from './NavBar.js';
import {StartSurvey} from './StartSurvey.js';
import {HowTo} from './HowTo.js';
import {FindRoute} from './FindRoute.js';
import {ResultsMap} from './ResultsMap.js';

export class App extends React.Component {
	render() {
    	return (
      
      // <Loggin />
			<main>
				{/* <StartSurvey />*/}
				<FindRoute />
				<ResultsMap />
				{/* <HowTo /> */}
			</main>
    	);
  	}
}