import React from 'react';
import './App.css';
import firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      speed: 10
    };
}

componentDidMount() {
const db = firebase.firestore();
db.collection("Stars")
.doc('Sun')
.get()
.then(doc => {
  const data = doc.data();
  this.setState({speed:data.name})
});
}

render() {
  return (
  <div className = "App"><h1>{this.state.speed}</h1></div>
  );
  }
}

export default App;
