import React from 'react';
import Mine from "./images/mine.png";
import Flag from "./images/flag.png";
import {mine} from "./Logic"

const mineimg = <img alt="BOOM!" src={Mine}/>;

export default class Rows extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
      return(
        <div className="board-row">
          {this.props.children.map(function(item,i) {
           return <Square 
            Show = {this.props.Show} 
            flags={this.props.flags}
            StandFlags={this.props.StandFlags}
            click ={this.props.click} 
            Explosion = {this.props.Explosion}
            field ={this.props.field} 
            key = {i} >
            {item}
          </Square>
          }.bind(this))}
        </div>
      );
    }
  }
  
  class Square extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cell: " ",
        style: "rgba(68, 68, 68, 0.7)",
        flag: false,
        mine: true
      };
    }
  
    shouldComponentUpdate(nextProps, nextState){
      if(nextProps.flags === 0 && nextState.flag){
        this.setState({flag:false, cell: " ", style:"rgba(68, 68, 68, 0.7)"})
      }
      if(!nextProps.children.show && this.props.children.show){
        this.setState({ cell: " ", style:"rgba(68, 68, 68, 0.7)"})
      }
       if(nextProps.children.show && this.state.cell !== this.props.children.number &&
         this.props.children.number !== mine ){
        this.setState({cell: this.props.children.number, style:"rgba(130, 130, 130, 0.25)"})
      }
      if(nextProps.field === 1 && nextState.cell === mineimg){
        this.setState({ cell: " ", style:"rgba(68, 68, 68, 0.7)",mine:true})
      }
      if(nextProps.children.number === mine && nextProps.field === 2 && nextState.mine){
        this.setState({cell: mineimg, mine:false})
      }
      return true
    }
  
    handleChange = () => {
      this.props.Explosion();
    }
  
    putFlag = (e) => {
      e.preventDefault();
      if(this.props.click){
        const flag = <img alt="danger" src={Flag}/>;
        if(this.state.flag && !this.props.children.show){
          this.setState({cell:"",style:"rgba(68, 68, 68, 0.7)",flag:false})
          this.props.StandFlags(-1,false,this.props.children)
        } else if(!this.props.children.show){
            this.setState({cell:flag,style:"yellow",flag:true})
            this.props.StandFlags(1,true,this.props.children)
          }
      }
    }
  
    handleClick() {
      if(this.props.click && !this.state.flag){
        this.props.Show(this.props.children);
       
        if(this.props.children.number !== "mine" ){
        this.setState({cell: this.props.children.number, style:"rgba(130, 130, 130, 0.25)"})
        } else{
          this.setState({cell: mineimg, style:"red"})
          this.handleChange();
        }
      }
    }
  
    Color = () => {
      if(this.props.children.number !== "mine"){
        if(this.props.children.number === 1){
          return "blue"
        }
        if(this.props.children.number === 2){
          return "green"
        }
        if(this.props.children.number === 3){
          return "red"
        }
        if(this.props.children.number === 4){
          return "purple"
        }
      }
    }
  
    render() {
      //console.log(this.props.flags)
      return (
        <button style={{background:  this.state.style, color: this.Color()}}
         className="square"
          onClick={() => this.handleClick()} 
          onContextMenu = {(e) => this.putFlag(e)} 
          >
        {this.state.cell}
      </button>
      );
    }
  }