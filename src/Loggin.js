import React, { Component } from 'react';

export class Loggin extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="card">
                    <form>
                        <div className="form-group row">
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="ex: johnsmith@aol.com">
                                    </input>
                            </div>

                            <label for="inputEmail3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputEmail3" placeholder="Password">
                                    </input>
                            </div>
                        </div>

                        <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}