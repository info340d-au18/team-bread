import React, {Component} from 'react';
import {useState} from 'react';
import {Carousel} from 'react-bootstrap';
import './index.css';
import {CarouselItemP} from './CarouselItemP.js';
import {Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
// library.add(faHeart);

// add to favorites button
export class FavButton extends React.Component {
    render() {
        return (
            <div className='favbut'>
                <Button variant = 'dark' size = 'lg'>
                    <FontAwesomeIcon icon = {faHeart} />
                    Favorite
                </Button>
            </div>
        );
    }
}

// place information
// export class PlaceHover extends React.Component {
//     render() {
//         return (
//             <div className = 'place-des'>
//                 <h3>Hello</h3>
//                 <h4>Description</h4>
//                 <div>
//                     <FavButton />
//                 </div>
//             </div>
//         );
//     }
// }


export class CarouselPlace extends React.Component {
    render() {
        return (
            // <Carousel>
            //     <CarouselItem />
            // </Carousel>
            // <Carousel>
            //     <CarouselItemP />
            <Carousel style = {{padding: '2rem'}}>
                <Carousel.Item>
                    <div className = 'wrap-item'>
                        <img
                        className="d-block w-100"
                        src = "https://raw.githubusercontent.com/info340d-au18/team-bread/master/src/img/GasWorksPark3.jpg?token=AJBI46OW2HJHNZIECT3UV3C6OATSE"
                        alt="First slide" />
                            {/* <div className = 'place-des'> */}
                            {/* <Carousel.Caption> */}
                                <h3>Burke Gilman Trail</h3>
                                <p> A 19.8 mile long trail for bikers, walkers, and runners. Stops on the trail include Gas Works Park, The Fremont Troll, and University of Washington</p>
                                <FavButton />
                            {/* </Carousel.Caption> */}
                            {/* </div> */}
                    </div>
                    
                </Carousel.Item>
                <Carousel.Item>
                    <div className = 'wrap-item'>
                        <img
                        className="d-block w-100"
                        src = "https://raw.githubusercontent.com/info340d-au18/team-bread/master/src/img/GasWorksPark3.jpg?token=AJBI46OW2HJHNZIECT3UV3C6OATSE"
                        alt="First slide" />
                        {/* <div className = 'place-des'> */}
                            <h3>Ravenna Park Trail</h3>
                            <p> A 1.7 mile loop with wild flower features. Good for an hour's walk! Near the University District and a perfect place to take your dog on a short walk.</p>
                            <FavButton />
                        {/* </div> */}
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className = 'wrap-item'>
                        <img
                        className="d-block w-100"
                        src = "https://raw.githubusercontent.com/info340d-au18/team-bread/master/src/img/GasWorksPark3.jpg?token=AJBI46OW2HJHNZIECT3UV3C6OATSE"
                        alt="First slide" />
                        {/* <div className = 'place-des'> */}
                            <h3>Rattlesnake Ridge Trail</h3>
                            <p> A 4.0 mile roundtrip hiking trail in the North Bend Area. Perfect for beginning hikers. Short hike with a beautiful view</p>
                            <FavButton />
                        {/* </div> */}
                    </div>
                </Carousel.Item>
            </Carousel>
        );

    }
}