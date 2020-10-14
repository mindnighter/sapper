import React from 'react';
import Mine from "./images/mine.png";
import Flag from "./images/flag.png";

export default class Icons extends React.Component {
    constructor(props) {
        super(props);
      }
      render(){
        const flag = <img className="icon"  style={{margin: "50px" ,height: "100px" , 
        width:"100px"}} alt="danger" align="middle" src={Flag}/>;

        const mine = <img  style={{margin: "50px" ,height: "100px" , 
        width:"100px"}} alt="BOOM!" align="middle" src={Mine}/>;

        return(
            <div className="left">
                <div>{mine} x 10</div>
                <div>{flag} x {this.props.children}</div>
            </div>
        )
      }
}