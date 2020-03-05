import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Loggin} from './Loggin.js';

import {NavBar} from './NavBar.js';
import {StartSurvey} from './StartSurvey.js';
import {HowTo} from './HowTo.js';
import {FindRoute} from './FindRoute.js';
import {ResultsMap} from './ResultsMap.js';
import {PlaceGroup} from './PlaceCards';
import cardPlaces from './data/cardPlaces.json';
import {CarouselPlace} from './Carousel.js';

export class App extends React.Component {
	render() {
    	return (
      
      // <Loggin />
			<main>
				{/* <StartSurvey />*/}
				
				<NavBar />
			</main>
    	);
  	}
}