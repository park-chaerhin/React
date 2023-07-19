import './App.css';
import React, {Component} from 'react';

import Subject from './components/Subject';
import TOD from './components/TOD';
import Content from './components/Content';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        mode: 'welcome',
        welcome: {title: 'welcome', desc: 'hello, React'},
        subject: {title:'Milka', sub: 'Choco Moo'},
        contents: [
          {id:1, title:'HTML', sub: 'HTML is for information'},
          {id:2, title:'CSS', sub: 'CSS is for design'},
          {id:3, title:'Javascript', sub: 'Javascript is for interactive'},
        ]
    }
  }

  render(){
    console.log('app.js 렌더링 완료')

    var _title, _desc = null;
    if(this.state.mode == 'welcome'){
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
    } else{
      _title = this.state.contents[0].title,
      _desc = this.state.contents[0].sub
    }

    return (
      <div>
        {/* <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject> */}
        <header>
          <h1>
            <a href="#none" onClick={function(e){
              alert('hi');
              console.log(e);
              e.preventDefault();
              
              }}>
              { this.state.subject.title }
              </a>
          </h1>
          <p>{ this.state.subject.sub }</p>
        </header>

  
        <TOD data={this.state.contents}></TOD>

        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
