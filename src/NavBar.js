import React, { Component } from 'react';
//import Navbar from 'react-bootstrap/Navbar';

// export class Global extends React.Component {
    

    
//     render() {
//         return (
//             <NavBar />
//             <Footer />
//         );
//     }
// }

export class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue navbar-expand-sm">

                <a className="navbar-brand" href="index.html">Walk Buddy</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fas fa-bars fa-1x"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">

                    <ul className="nav navbar-nav">

                        <li className="nav-item">
                            <a className="nav-link" href="index.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="how-to.html">How-To</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="places.html">Places</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="login.html">Log-In <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

// export class Footer extends React.Component {
//     render() {
//         return (
//             <footer>
//                 <p>© 2020 Jocelyn Afandi &amp; Anna Zhou</p>
//             </footer>
//         );
//     }
// }