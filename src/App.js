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
      d: 0.0000158,
      au: 1,
      propulsion: "Proton RD-253",
      thrust: 1830000,
      engineMass: 1260,
      acceleration: 0,
      time: 0,
      accelerationAU: 0,
      speed: 0
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
  this.setState({star:data.name, d:data.distance, au:data.AU})
});
}

handleClick2(propulsion) {
  const db = firebase.firestore();
  db.collection("Propulsions")
  .doc(propulsion)
  .get()
  .then(doc => {
    const data = doc.data();
    this.setState({propulsion:data.name, thrust:data.Thrust, engineMass:data.EngineMass, speed:data.speed})
  });
}

calculate() {
  this.setState({acceleration: (this.state.thrust / this.state.engineMass)},() => {
    this.setState({accelerationAU: (this.state.acceleration * 149597870700/(31540000*31540000))}, () => {
      this.setState({time: ((4*this.state.au) / this.state.acceleration)**(1/2)})
    })
  });
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
  <Dropdown.Item onClick={this.handleClick.bind(this, "Luhman 16A")}>Luhman 16A</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Luhman 16B")}>Luhman 16B</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Luyten 726-8 A")}>Luyten 726-8 A</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Luyten 726-8 B")}>Luyten 726-8 B</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Proxima Centauri ")}>Proxima Centauri</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Sirius A")}>Sirius A</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Sirius B")}>Sirius B</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "Wolf 359 (CN Leonis)")}>Wolf 359 (CN Leonis)</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "α Centauri A")}>α Centauri A</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick.bind(this, "α Centauri B")}>α Centauri B</Dropdown.Item>
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

<Button style={{marginTop: 100}} onClick={this.calculate.bind()} variant="primary">Calculate</Button>{' '}

<h3 style={{paddingTop: 100}}>Time in years from the Earth to {this.state.star} using {this.state.propulsion} Propulsion for the entire journey: {this.state.time} years.</h3>
<h4 style={{paddingTop: 25}}>Acceleration with {this.state.propulsion}: {this.state.acceleration} m/s^2.</h4>
<h4 style={{paddingTop: 25}}>Distance from Earth to {this.state.star}: {this.state.au} Astronomical Units (AU).</h4>
<p style={{paddingTop: 25}}>This calculation assumes unlimited fuel with negligable fuel weight, which is not feasible.</p>
</div>
  );
  }
}

export default App;