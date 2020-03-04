import React, { Component } from 'react';
import { render } from 'react-dom';

export class StartSurvey extends React.Component {
    render() {
        return (
            <div id="begin" className="d-flex">
                <div className="card bg-light border-light text-center p-1">
                    <div className="card-body">
                        <p className="card-title">Let's Take a Walk...</p>
                        <a className="btn btn-primary shadow">Begin</a>
                    </div>
                </div>
            </div>
        );
    }
}