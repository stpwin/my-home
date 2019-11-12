import React, { Component } from 'react';
import './App.css';
import { Chart } from 'react-charts'

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBwfvkoffX7MNGrWrf7nYYQ9wmOwS5_yaI",
  authDomain: "stpwin-home.firebaseapp.com",
  databaseURL: "https://stpwin-home.firebaseio.com",
  projectId: "stpwin-home",
  storageBucket: "stpwin-home.appspot.com",
  messagingSenderId: "796798924451",
  appId: "1:796798924451:web:f0c42c137da2bdb69cf116"
};

firebase.initializeApp(firebaseConfig)

function MyChart(data) {
  // console.log(data)

  // data = [
  //   {label: "Pressure",  data: [{x: new Date(0),, y: 1}]}
  // ]
  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: false }
    ],
    []
  )

  return (

    <div
      style={{
        width: '800px',
        height: '300px',
        background: 'rgba(0, 27, 45, 0.9)'
      }}
    >
      <Chart data={data} series={series} axes={axes} tooltip dark />
    </div>
  )
}

class App extends Component {

  constructor(props){
    super(props);
    this.series = React.useMemo(
      () => ({
        showPoints: false
      }),
      []
    )

    this.axes = React.useMemo(
      () => [
        { primary: true, type: 'time', position: 'bottom' },
        { type: 'linear', position: 'left', stacked: false }
      ],
      []
    )
  }

  state = {
    data: [
      { label: "Pressure", data: [{x: new Date(0), y: 1}]}
    ]
  }

  componentDidMount(){
    const myData = []
    const db = firebase.database().ref("device/bmp280-01/pressure")
    db.on('value', snapshot => {
      snapshot.forEach(ref => {
        // console.log(ref.key)
        const _da = new Date(0)
        _da.setUTCSeconds(ref.key)
        myData.push({ x: _da, y: ref.val()})
      })
      this.setState({
        data: [{
          label: "Pressure",
          data: myData
        }]
      })
    });
  }

  

  

  render() {
    const {data} = this.state
    console.log(this.axes)
    return (
      <div>
        <div
          style={{
            width: '800px',
            height: '300px',
            background: 'rgba(0, 27, 45, 0.9)'
          }}
        >
        <Chart data={data} series={this.series} axes={this.axes} tooltip dark />
        </div>
        {/* <MyChart data={data}></MyChart> */}
      </div>
    );
  }
}

export default App;
