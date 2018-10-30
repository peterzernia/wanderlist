import React from 'react';


class NavBar extends React.Component {
  render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-white bg-white">
        <a class="navbar-brand" href="#">Countries</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link active" href="#">Search <span class="sr-only">(current)</span></a>
              <a class="nav-item nav-link" href="#">Discover</a>
              <a class="nav-item nav-link" href="#">My Map</a>
              <a class="nav-item nav-link" href="#">Profile</a>
            </div>
          </div>
        </nav>
    )
  }
}

export default NavBar;
