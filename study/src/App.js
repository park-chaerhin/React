import './App.css';
import {Component} from 'react';

import TOC from './components/TOC'
import Subject from './components/Subject'
import Content from './components/Content'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id:1,
      subject:{title: 'HI', sub: 'React Start'},
      welcome: {title: 'welcome', desc:'hello React'},
      contents: [
        {id:1, title: 'HTML', desc: 'HTML is for information ...'},
        {id:2, title: 'CSS', desc: 'CSS is for design...'},
        {id:3, title: 'Javascript', desc: 'Javascript is for interactive...'},
      ]
    }
  }
  render(){
    console.log('App Render');

    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++
      }
      
    }
    
    console.log('render', this) //this= render함수가 속해있는 component자신

    return (
      <div className="App">
        {/* <Subject title="React" sub="For UI"></Subject> */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(id){
            this.setState({
              mode:'welcome',
              selected_content_id: id,
            })
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1>
            <a href="/" onClick={function(e){
              console.log(e);
                // debugger;
              e.preventDefault();
              // this.state.mode = 'welcome' ;
              this.setState({
                mode: 'welcome'
              })
            }.bind(this)}>{this.state.subject.title}</a>
          </h1>
          {this.state.subject.sub}
        </header> */}

        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id),
            })
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
