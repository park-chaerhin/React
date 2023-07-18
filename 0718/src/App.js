import './App.css';
import {Component} from 'react';

import Subject from './components/Subject'
import TOD from './components/TOD'
import Content from './components/Content'

/* 
//함수방식 
function Subject(){
  return(
    <header>
        <h1>WEB</h1>
        world wide web
    </header>
  );
}

function TOD(){
  return(
    <nav>
      <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
      </ul>
    </nav>
  )
}

function Content(){
  return(
    <article>
      <h2>HTML</h2>
      <p>HTML is HyperText Markup Language.</p>
    </article>
)
}
*/

/* 
// class방식 
class Subject extends Component{  
  render(){
      return(
        <header>
            <h1>WEB</h1>
            world wide web
        </header>
      )
  }
}

class TOD extends Component{
  render(){
    return(
      <nav>
        <ul>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    )
  }
}

class Content extends Component{
  render(){
    return(
      <article>
        <h2>HTML</h2>
        <p>HTML is HyperText Markup Language.</p>
      </article>
    )
  }
}

/*
function App() {
  return (
    <div>
      <Subject></Subject>
      <Subject></Subject>
    </div>
  );
}
*/

/*
class Subject extends Component{
  render(){
    return(
      <header>
          <h1>{this.props.title}</h1>
          <p>{this.props.sub}</p>
      </header>
    )
  }
}
*/

function App (){
    return(
      <div className="App">
        <Subject></Subject>
        <TOD></TOD> 
        <Content></Content>
      </div>
    )
  }
export default App;
