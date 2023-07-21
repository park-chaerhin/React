import './App.css';
import {Component} from 'react';

import TOC from './components/TOC'
import Subject from './components/Subject'
import Content from './components/Content'

class App extends Component {
  render(){
    return (
      <div className="App">
        <Subject title="React" sub="For UI"></Subject>
        <Subject title="WEB" sub="world wide web"></Subject>
        <TOC></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
