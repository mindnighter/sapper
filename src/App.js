import React from 'react';
import {Fill, NearClick, CheckWin} from "./Logic"
import Lose from "./Lose"
import Win from "./Win"
import Rows from "./Squares"
import Icons from './Icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      field: 1,
      click: true,
      flags: 0
    };
    Fill(this.state.arr)
  }

  ShowNearClick = (item) => {
    NearClick(this.state.arr, item.i, item.j);
    if (CheckWin(this.state.arr)) {
      this.setState({field: false})
    }
    this.forceUpdate();
  }

  StandFlags = (i,val,item) => {
    this.state.arr[item.i][item.j].flag = val;
    this.setState(function (prevState) {
      return { flags: prevState.flags + i }
    });
  }

  Retry = () => {
    Fill(this.state.arr);
    this.setState({ field: 1, click: true, flags: 0 })
  }

  Explosion = () => {
    this.setState({ click: false, field: 2})
    //setTimeout(this.Boom, 1500);

  };

  Boom = () => {
    this.setState({ field: 2 })
  }

  render() {
    let element = <Icons>{this.state.flags}</Icons>;
    if (this.state.field === 2){
      element = <Lose Retry={this.Retry} />
    }
    if (this.state.field) {
      return (
        <div>
          {element}
          <div>
            {this.state.arr.map(function (item, i) {
              return <Rows
                Show={this.ShowNearClick}
                click={this.state.click}
                flags={this.state.flags}
                StandFlags={this.StandFlags}
                Explosion={this.Explosion}
                field ={this.state.field}
                key={i} >
                {item}
              </Rows>
            }.bind(this))}
          </div>
        </div>

      );
    }  else if (!this.state.field) {
      return (
        <Win Retry={this.Retry} />
      );
    }

  }
}
