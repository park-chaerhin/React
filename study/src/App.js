import './App.css';
import {Component} from 'react';

import TOC from './components/TOC'
import Subject from './components/Subject'
import Content from './components/Content'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject:{title: 'WEB', sub: 'World Wide Web'}
    }
  }
  render(){
    return (
      <div className="App">
        <Subject title="React" sub="For UI"></Subject>
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}>
        </Subject>

        <TOC></TOC>
        
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
