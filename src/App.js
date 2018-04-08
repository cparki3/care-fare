import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import { Range } from "rc-slider";
import "./App.scss";
import "rc-slider/assets/index.css";

class App extends Component {
  constructor(props) {
    super(props);

    componentDidMount = () => {
      //shows initial fare total based on where slider locations are
      this.calculateFare();
    };

    //store cost values of different kinds of hours (could be useful if we need to customize it later on)
    this.startCost = 12;
    this.bedtimeCost = 8;
    this.midnightCost = 16;

    //range slider works on a range from 0 - 11... midnight is 7 in this case
    this.midnight = 7;

    //defines mark locations and label text
    this.marks = {
      0: "5PM",
      1: "6PM",
      2: "7PM",
      3: "8PM",
      4: "9PM",
      5: "10PM",
      6: "11PM",
      7: "12AM",
      8: "1AM",
      9: "2AM",
      10: "3AM",
      11: "4AM"
    };

    //style for the handles in the react slider component
    this.handleStyle = [
      {
        backgroundColor: "#E36D60",
        border: "none",
        height: "20px",
        width: "20px",
        marginLeft: "-10px",
        marginTop: "-9px"
      },
      {
        backgroundColor: "#9C4638",
        border: "none",
        height: "20px",
        width: "20px",
        marginLeft: "-10px",
        marginTop: "-9px"
      },
      {
        backgroundColor: "#33223B",
        border: "none",
        height: "20px",
        width: "20px",
        marginLeft: "-10px",
        marginTop: "-9px"
      }
    ];

    //style for the track in the react slider component
    this.trackStyle = [
      { backgroundColor: "#E36D60" },
      { backgroundColor: "#9C4638" },
      { backgroundColor: "#33223B" }
    ];

    //style for the rail in the react slider component
    this.railStyle = {
      backgroundColor: "#CCC"
    };

    //sets initial state values
    this.state = {
      value: [0, 5, 11],
      fare: 0
    };
  }

  //where the magic happens to calculate the fare for the sitter
  calculateFare = () => {
    //assigns slider locations to more meaningful varibles
    let startVal = this.state.value[0];
    let bedtimeVal = this.state.value[1];
    let endVal = this.state.value[2];
    let totalCost = 0;

    for (let i = startVal; i < endVal; i++) {
      //check for startTime hours
      if (i < this.midnight && i < bedtimeVal) {
        totalCost += this.startCost;
      }
      //check for bedtime hours
      if (i > bedtimeVal && i <= this.midnight) {
        totalCost += this.bedtimeCost;
      }
      //check for hours after midnight
      if (i > this.midnight) {
        totalCost += this.midnightCost;
      }
    }

    this.setState({
      fare: totalCost
    });
  };

  //updates values of the slider component when it is changed by the end user
  onSliderChange = value => {
    this.setState(
      {
        value
      },
      () => {
        this.calculateFare();
      }
    );
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="logo-container" />
          <div className="main-container">
            <Paper className="calc-container" zDepth={2}>
              <div className="fare-display">
                <h4>Total Fare</h4>
                <h1>${this.state.fare}</h1>
              </div>
              <div className="info-display">
                <div className="info-item start">
                  <h4>Start Time</h4>
                  <h2>{this.marks[this.state.value[0]]}</h2>
                </div>
                <div className="info-item bedtime">
                  <h4>Bed Time</h4> <h2>{this.marks[this.state.value[1]]}</h2>
                </div>
                <div className="info-item end">
                  <h4>End Time</h4> <h2>{this.marks[this.state.value[2]]}</h2>
                </div>
              </div>
              <Range
                className="range-select"
                pushable
                min={0}
                max={11}
                allowCross={false}
                marks={this.marks}
                defaultValue={this.state.value}
                handleStyle={this.handleStyle}
                trackStyle={this.trackStyle}
                railStyle={this.railStyle}
                onChange={this.onSliderChange}
              />
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
