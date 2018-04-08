import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import logo from './logo.svg';
import './App.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class App extends Component {



  constructor(props) {
  super(props);
  this.startCost = 12;
  this.bedtimeCost = 8;
  this.midnightCost = 16;
  this.marks = {
    0:'5PM',
    1:'6PM',
    2:'7PM',
    3:'8PM',
    4:'9PM',
    5:'10PM',
    6:'11PM',
    7:'12AM',
    8:'1AM',
    9:'2AM',
    10:'3AM',
    11:'4AM',
  }
  this.state = {
    value: [0, 5, 11],
    fare: 0,
  }
}

moreThanZero =(firstNum, secondNum)=> {
  if((firstNum - secondNum) > 0){
    return true;
  }
  else{
    return false;
  }
}

calculateFare = ()=> {
  let startHours = 0;
  let bedtimeHours = 0;
  let midnightHours = 0;
console.log(this.state.value);

  if(this.state.value[1] >=8){
    //bed time is after midnight for some reason
    startHours = (7 - this.state.value[0]) * this.startCost;
    if(this.state.value[0] >= 8){
      startHours = 0;
    }
  }
  else{
    startHours = (this.state.value[1] - this.state.value[0]) * this.startCost;
  }




  if(this.moreThanZero(7, this.state.value[1]) && this.state.value[1] <= 7){



      bedtimeHours = (7 - this.state.value[1]) * this.bedtimeCost;


  }
  else{
    bedtimeHours = 0;
  }


  if(this.moreThanZero(this.state.value[2], 7)){
    console.log(this.state.value[2] - 7);

    if(this.state.value[0] >= 8){
      midnightHours = (this.state.value[2] - this.state.value[0]) * this.midnightCost;
    }
    else{
      midnightHours = (this.state.value[2] - 7) * this.midnightCost;
    }

  }
  else{
    console.log("midnight not calculated");
    midnightHours = 0;
  }


  let totalCost = startHours + bedtimeHours + midnightHours;

  console.log(startHours + " start " + bedtimeHours + " bedtime " + midnightHours + " midnight ");
  console.log(totalCost);

  this.setState({
    fare: totalCost
  });

}

  onSliderChange = (value) => {
    console.log(value);
    this.setState({
      value,
    }, ()=>{
      this.calculateFare();
    });

  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
          <div className="main-container">
            <Paper className="calc-container" zDepth={2}>
              <div className="fare-display">
                ${this.state.fare}
              </div>
              <div className="info-display">
                <div className="info-item"><h4>Start Time</h4><h2>{this.marks[this.state.value[0]]}</h2></div>
                <div className="info-item"><h4>Bed Time</h4> <h2>{this.marks[this.state.value[1]]}</h2></div>
                <div className="info-item"><h4>End Time</h4> <h2>{this.marks[this.state.value[2]]}</h2></div>
              </div>
              <Range
                className="range-select"
                pushable
                min={0}
                max={11}
                allowCross={false}
                marks={this.marks}
                defaultValue={this.state.value}
                handleStyle={[{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }, {backgroundColor: 'green' }]}
                onChange={this.onSliderChange}  ></Range>
            </Paper>
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
