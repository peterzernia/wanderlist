import React from 'react';


class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent bg-transparent">
      <a className="navbar-brand" href="/">Countries</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Search <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="/discover">Discover</a>
            <a className="nav-item nav-link" href="/map">My Map</a>
            <a className="nav-item nav-link" href="/profile">Profile</a>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
