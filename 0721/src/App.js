import {Component, useState} from 'react'; 

import './App.css'

function App (){
    return ( 
      <div className="App">
        <h1>HI</h1>
        <hr />
        <FuncComp initNumber={2} initTime={0}></FuncComp>
        <ClassComp initNumber={2}></ClassComp>
      </div>
    );
  }

function FuncComp(props){
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];
  // var numberState[1] = 11111 <- : 11111로 값 변경하기 , 배열형식으로 접근해서 값 바꾸기
  // console.log('numberState', numberState)

  var timeState = useState((new Date()).toString()); //new Date :공백때문에 괄호로 묶기 / type=object이니까 toString
  var time = timeState[0];
  var setTime = timeState[1];
  /// var [time, setTime] = useState((new Date()).toString());

  return(
    <div className="container">
      <h2>Function Style Component</h2>

      <p>Number : {number}</p>
      <button type="button" onClick={
        function(){
          setNumber(Math.random());
        }
        }>random</button>
      
      <hr />

      <p>Time : {time}</p>
      <button type="button" onClick={
        function(){
          setTime((new Date()).toString());
        }
      }>Time</button>
    </div>
  )
}

class ClassComp extends Component{
  state = {
    number: 2,
    number: this.props.initNumber,
    time: new Date().toString(),
  }

  render(){
    return(
      <div className="container">
        <h2>Class Style Component</h2>

        <p>Props Number : {this.props.initNumber}</p>
        <p>State Number : {this.state.number}</p>
        <button type="button" onClick={
          function(){
            this.setState({number: Math.random()}); // Math.~
          }.bind(this)
        }>random</button>

        <hr />
        
        <p>Time : {this.state.time}</p>
        <button type="button" onClick={
          function(){
            this.setTime({
              Time : new Date().toString()
            });
          }.bind(this)
        }>Time</button>
      </div>
    )
  }
}

export default App;