import React from 'react';
import Uwin from "./images/uwin.png";
import Retry from "./images/retry.png";
export default class Win extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render(){
      const uwin = <img  alt="You Win!" src={Uwin}/>;
      const retry = <img style={{ height: "150px" , width:"150px" , cursor: "pointer"}} alt="Try Again!" src={Retry}/>;
      return(
        <div>
          {uwin}
          <div className="status" onClick={this.props.Retry} >{retry}</div>
        </div>
        
      );
    }
  }