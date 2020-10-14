import React from 'react';
import Ulose from "./images/ulose.png";
import Retry from "./images/retry.png";
export default class Lose extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render(){
      const ulose = <img style={{ height: "300px" , width:"300px"}} alt="You Lose" src={Ulose}/>;
      const retry = <img style={{ height: "150px" , width:"150px" , cursor: "pointer"}} 
      alt="Try Again!" src={Retry}/>;
      return(
        <div className="left">
          {ulose}
          <div className="status" onClick={this.props.Retry} >{retry}</div>
        </div>
        
      );
    }
  }