import React from 'react';
import './App.css';
import firebase from 'firebase';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      star: "Sun",
      d: 0,
      au: 0,
      propulsion: "Engine",
      time: 0,
      speed: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick.bind(this);

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

handleClick2(star) {
  const db = firebase.firestore();
  db.collection("Stars")
  .doc(star)
  .get()
  .then(doc => {
    const data = doc.data();
    this.setState({star:data.name, d:data.distance, au:data.au})
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
</Dropdown.Menu>
</Dropdown>

<h1 style={{paddingTop: 100}}>Selected Propulsion: {this.state.propulsion}</h1>
<Dropdown>
<Dropdown.Toggle variant="success" id="dropdown-basic">
  Change Propulsion
</Dropdown.Toggle>

<Dropdown.Menu>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "1")}>1</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "2")}>2</Dropdown.Item>
  <Dropdown.Item onClick={this.handleClick2.bind(this, "3")}>3</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>

<h3 style={{paddingTop: 100}}>Time in years from Earth to {this.state.star} using {this.state.propulsion}: {this.state.time} years.</h3>
<h4 style={{paddingTop: 25}}>Velocity with {this.state.propulsion}: {this.state.speed} m/s</h4>
<h4 style={{paddingTop: 25}}>Distance from Earth to {this.state.star}: {this.state.au} AU</h4>

</div>
  );
  }
}

export default App;