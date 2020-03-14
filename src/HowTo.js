import React from "react";
import { Parallax } from "react-parallax";
import {StartSurvey} from './StartSurvey.js';
// import {NavBar,Footer} from './NavBar.js'

export class HowTo extends React.Component {
    constructor() {
        super();
        this.state = {
            imgs: ["https://images.unsplash.com/photo-1455594408994-253112b1b26e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
                   "https://images.unsplash.com/photo-1529911428236-64aeb97a6de2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80",
                   "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
                   "https://images.unsplash.com/photo-1559511332-cd0f6550aca1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"]
        }
    }

    render() {
        return (
            <div>
                <Parallax bgImage={this.state.imgs[0]} className="bg-img">
                    <div className="pWrap">
                        <div className="caption">
                            <span className="border rounded">Plan Your Stress Free Walk Today!</span>
                        </div>
                        <div className="unsplash-credit border rounded">
                            <span>Photo by <a href="https://unsplash.com/@akeenster?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank">Abigail Keenan</a></span>
                        </div>
                    </div>
                </Parallax>

                <div className="desc-text">
                    <div className="desc-wrapper">
                        <h1 className='desc-header'><em>Walk Buddy will help you find personalized walk routes that fit your needs
                            and help you destress!</em></h1>
                        <p>Life can get stressful, and a great way to cope with that and destress
                            is to go on walks. A study in Germany showed that mindful walking could reduce stress levels on
                            adults.
                            Going to places can help to brighten one’s day, but at the same time, we want to ensure that one
                            does
                            not encounter something stressful along the way. Oftentimes, people only
                            know of nice walking paths from experience or word of mouth. To make matters even more complicated,
                            destressing comes in many forms, and different populations have different versions of stress.
                            This is where we come in.</p>
                    </div>
                </div>
                
                <Parallax bgImage={this.state.imgs[1]} className="bg-img">
                    <div className="pWrap">
                        <div className="caption">
                            <span className="border rounded">Step 1: Figure out where to go</span>
                        </div>
                        <div className="unsplash-credit">
                            <span>Photo by <a href="https://unsplash.com/@milanseitler?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" >Milan Seitler</a></span>
                        </div>
                    </div>
                </Parallax>

                <div className="desc-text">
                    <div className="desc-wrapper">
                        <h1 className='desc-header'><em>Don't know where to go? No worries!</em></h1>
                        <p>Our survey will take you through a series of steps to figure out what and where you want to go.
                            You'll be
                            able to filter on categories like distance, location, sound level, destination type, level of
                            hilliness
                            and many more!</p>
                    </div>
                </div>

                <Parallax bgImage={this.state.imgs[2]} className="bg-img">
                    <div className="pWrap">
                        <div className="caption">
                            <span className="border rounded">Step 2: Choose your destination</span>
                        </div>
                        <div className="unsplash-credit">
                            <span>Photo by <a href="https://unsplash.com/@kfred?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank">Karl Fredrickson</a></span>
                        </div>
                    </div>
                </Parallax>

                <div className="desc-text">
                    <div className='desc-wrapper'>
                        <h1 className='desc-header'><em>Our survey will give you a list of personalized suggested locations to walk
                                to.</em></h1>
                        <p>Explore routes and learn more about your local area based off your personalized suggestions! We
                            utilize
                            user reviews to help you decide which routes would be best for you. If there are simply too many
                            routes
                            that you want to do, you will also have the option to save them for future use. </p>
                    </div>
                </div>

                <Parallax bgImage={this.state.imgs[3]} className="bg-img">
                    <div className="pWrap">
                        <div className="caption">
                            <span className="border rounded">Step 3: Start Walking!</span>
                        </div>
                        <div className="unsplash-credit">
                            <span>Photo by <a href="https://unsplash.com/@kfred?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge">Karl Fredrickson</a></span>
                        </div>
                    </div>
                </Parallax>

                <div className="desc-text">
                    <div className="desc-wrapper">                        
                        {<StartSurvey />}
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}