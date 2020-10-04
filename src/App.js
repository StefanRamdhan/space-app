import React from 'react';
import './App.css';
import firebase from 'firebase';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      star: "Sun",
      d: 0,
      au: 0,
      propulsion: "Proton RD-253",
      thrust: 0,
      EngineMass: 1,
      acceleration: 0,
      time: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.calculate = this.calculate.bind(this);

}

componentDidMount() {
const db = firebase.firestore();
db.collection("Stars")
.doc(this.state.star)
.get()
.then(doc => {
  const data = doc.data();
  this.setState({star:data.name, d:data.distance, au:data.AU})

});
}

handleClick(star) {
const db = firebase.firestore();
db.collection("Stars")
.doc(star)
.get()
.then(doc => {
  const data = doc.data();
  this.setState({star:data.name, d:data.distance, au:data.au})
});
}

handleClick2(propulsion) {
  const db = firebase.firestore();
  db.collection("Propulsions")
  .doc(propulsion)
  .get()
  .then(doc => {
    const data = doc.data();
    this.setState({propulsion:data.name, thrust:data.Thrust, engineMass:data.EngineMass})
  });
}

calculate() {
  this.setState({acceleration: this.state.thrust / this.state.EngineMass})
  this.setState({acceleration: this.state.acceleration / 0.000150222861})
  this.setState({time: (4*this.state.au) / this.state.acceleration})
}


render() {
  return (
  <div style={{paddingTop: 100}} className = "App">
    <h1>Selected Star: {this.state.star}</h1>
<Dropdown>
<Dropdown.Toggle variant="success" id="dropdown-basic">
  Change Star
</Dropdown.Toggle>

<Dropdown.Menu>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Sun")}>Sun</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Barnard's Star")}>Barnard's Star</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Lalande 21185")}>Lalande 21185</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>

<h1 style={{paddingTop: 100}}>Selected Propulsion: {this.state.propulsion}</h1>
<Dropdown>
<Dropdown.Toggle variant="success" id="dropdown-basic">
  Change Propulsion
</Dropdown.Toggle>

<Dropdown.Menu>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "Proton RD-253")}>Proton RD-253</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "Aluminum (LOX)")}>Aluminum (LOX)</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "Magnetoplasmadynamic (MPD)")}>Magnetoplasmadynamic (MPD)</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "Project Orion")}>Project Orion</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>

<Button onClick={this.calculate.bind()} variant="primary">Calculate</Button>{' '}

<h3 style={{paddingTop: 100}}>Time in years from Earth to {this.state.star} using {this.state.propulsion}: {this.state.time} years.</h3>
<h4 style={{paddingTop: 25}}>Acceleration with {this.state.propulsion}: {this.state.acceleration} m/s^2.</h4>
<h4 style={{paddingTop: 25}}>Distance from Earth to {this.state.star}: {this.state.au} Astronomical Units (AU).</h4>

</div>
  );
  }
}

export default App;