import './App.css';

import Subject from './components/Subject';
import TOD from './components/TOD';
import Content from './components/Content';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'welcome',
      welcome: { title: 'Welcome', desc: 'Hello, React JS!!' },
      subject: { title: 'WEB', sub: 'World Wide Web' },
      contents: [
        { id:1, title: 'HTML', sub: 'HTML is .......'},
        { id:2, title: 'CSS', sub: 'CSS is .......'},
        { id:3, title: 'JAVASCRIPT', sub: 'JAVASCRIPT is .......'},
      ]
    }
  }

  render() {
    console.log("App.js 렌더링 완료!")

    var _title, _desc = null;
    if(this.state.mode == 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else{
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].sub;
    }

    return (
      <div>
        {/* <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>   */}
        <header>
          <h1>
            <a href="#" onClick={function(e){ 
                // alert("Hi!!!");
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
