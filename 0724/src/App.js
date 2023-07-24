import {Component, useState, useEffect} from 'react'; 

import './App.css'

var funcStyle = 'color:white; background:palevioletred;'; //class방식과 구분
var funcId = 0; //출력된 메시지 구분

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

  //DidMount, WillUnmount로 사용하기
  useEffect(function(){
    console.log('%cfunc => DidMount 형식으로 실행'+(++funcId), funcStyle);

    return function(){
      console.log('%cfunc => WillUnmount 형식으로 실행'+(++funcId), funcStyle);
    }
  }, []); // none state


  console.log('%cfunc => render 실행'+(++funcId), funcStyle);
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


var classStyle = 'color:white; background:palevioletred;'
class ClassComp extends Component{
  state = {
    number: 2,
    number: this.props.initNumber,
    time: new Date().toString(),
  }

  //WillMount : render전에 실행
  /*UNSAFE_componentWillMount(){
    console.log('%cclass => WillMount 실행', classStyle)
  }*/

  //DidMount : render후에 실행  // didmount render전에 작성했지만, render후 실행
  /*componentDidMount(){
    console.log('%cclass => DidMount 실행', classStyle)
  }*/

  //sould Update : state값이 변결될 때 render 실행 여부 결정
  //return값이 true면 실행, false면 실행하지 않음
  /*shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => should Update 실행', classStyle);
    return true
  }*/

  //componentWillUnmount
  /*componentWillUnmount(){
    console.log("%cclsas => WillUnmount 실행", classStyle)
  }*/

  //componentDidUpdate
  /*componentDidUpdate(){
    console.log("%cclsas => DidUpdate 실행", classStyle)
  }*/


  render(){
    // console.log('%cclass => render 실행', classStyle)
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
            this.setState({
              Time : new Date().toString()
            });
          }.bind(this)
        }>Time</button>
      </div>
    )
  }
}



function App (){
  var [classCompShow, setClassCompShow] = useState(true)
  var [funcCompShow, setfuncCompShow] = useState(true)

  return ( 
    <div className="App">
      <h1>HI</h1>

      <button 
        type="button" 
        onClick={function(){
          setfuncCompShow(false)
        }}>
        Remove Function Component
      </button>

      <button 
        type="button" 
        onClick={function(){
          //alert('test')
          setClassCompShow(false)
      }}>Remove Class Component</button>

      <hr />
      
      {/* <FuncComp initNumber={2} initTime={0}></FuncComp> */}
      {/* {classCompShow? true : false} = 삼항연산~*/}
      {classCompShow? <ClassComp initNumber={2}></ClassComp> : null}

      {funcCompShow? <FuncComp initNumber={2}></FuncComp> : null}
    </div>
  );
}

export default App;