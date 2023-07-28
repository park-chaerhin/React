import './App.css';
import {Component} from 'react';

import TOC from './components/TOC'
import Subject from './components/Subject'
import Control from './components/Control'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
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
  
  getContent(){
    var _title, _desc, _article = null;
    // mode에 따라 article의 내용 바뀜
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
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
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = 
      <CreateContent 
        onSubmit={function(_title, _desc){
          // TOC에 새로운 내용 추가
          this.max_content_id = this.max_content_id+1;
          
          /* 원본을 수정하지 말고, 복사본을 수정해서 저장~
          this.state.contents.push(
            {id:this.max_content_id, title: _title, desc: _desc}
          );*/
          var _contents = this.state.contents.concat(
            {id:this.max_content_id, title: _title, desc: _desc}
          )
          
          this.setState({
            // contents: this.state.contents
            contents : _contents
          })
          //console.log(_title, _desc)
        }.bind(this)}
      ></CreateContent>
    } else if(this.state.mode === 'update'){
      _article =
      <UpdateContent></UpdateContent>
    }
    
    return _article;
  }

  render(){
    //console.log('App Render');

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

        <Control
          onChangeMode={function(_mode){
            this.setState({
              mode: _mode
            })
          }.bind(this)}
        ></Control>

        {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}
        {this.getContent()}
      </div>
    );
  }
}

export default App;
