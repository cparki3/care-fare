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
  this.state = {
    value: [0, 5, 11],
    marks: {
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
    },
    };
  }

  onSliderChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
          <div className="main-container">
            <Paper className="calc-container" zDepth={2}>
              <div className="info-display">
                <div className="info-item"><h4>Start Time</h4><h2>{this.state.value[0]}</h2></div>
                <div className="info-item"><h4>Bed Time</h4> <h2>{this.state.value[1]}</h2></div>
                <div className="info-item"><h4>End Time</h4> <h2>{this.state.value[2]}</h2></div>
              </div>
              <Range
                className="range-select"
                pushable
                min={0}
                max={11}
                allowCross={false}
                marks={this.state.marks}
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
