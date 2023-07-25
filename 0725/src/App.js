import './App.css';
import {Component} from 'react';

import Subject from './components/Subject'
import TOC from './components/TOC'
import Control from './components/Control'
import Content from './components/Content'
import CreateContent from './components/CreateContent'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode:'create',
      selected_content_id: 0,
      max_content_id: 3,
      subject:{
        title: 'HELLO',
        sub: 'THIS IS REACT'
      },
      contents:[
        {id:1, title:'HTML', desc:'HTML is...'},
        {id:2, title:'CSS', desc:'CSS is...'},
        {id:3, title:'JAVASCRIPT', desc:'JAVASCRIPT is...'},
      ],
      welcome:{
        title:'WELCOME',
        desc:'웰컴모드 쨔잔'
      }
    }
  }
  
  render(){
    /*
      Contents component에 
      mode state 값이 welcome이면 welcome text 출력
      mode state 값이 welcome이 아니면 contents[0] 출력
    */
    var _title, _desc, _article = null; //변수 초기화

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <Content title={_title} desc={_desc}></Content>;
    } else if(this.state.mode === 'read'){
      
      /*
        if(this.state.selected_content_id === 1){ // id == 1 또는 id === "1" 로 표기 가능
          _title = this.state.contents[0].title;
          _desc = this.state.contents[0].desc
        } else if(this.state.selected_content_id === 2){
            _title = this.state.contents[1].title;
            _desc = this.state.contents[1].desc
        } else if(this.state.selected_content_id === 3){
            _title = this.state.contents[2].title;
            _desc = this.state.contents[2].desc
        }
      */
      
      for(var i=0; i < this.state.contents.length; i++){
        if(this.state.selected_content_id === this.state.contents[i].id){
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].desc;
          _article = <Content title={_title} desc={_desc}></Content>;

          break;

        } 

        /* 위의 if문이랑 같음. 
        var data = this.state.contents[i];
        if (this.state.selected_content_id === data.id) {
          _title = data.title;
          _desc = data.desc;

          break;
        } 
        */

      }
      _article = <Content title={_title} desc={_desc}></Content>;

    } else if(this.state.mode === 'create'){
      _article = 
      <CreateContent
        onReturnSubmit={function(_title, _desc){
          // 중간에 지워지는 경우, id 중복 값 발생할 수 있는 확률 높아
          var _id = this.state.max_content_id+1
          this.state.contents.push(
            {id: _id, title: _title, desc: _desc}
          )
          this.setState(
            {
              contents: this.state.contents,
              // submit 버튼 누르면 방금 작성한글 띄우기
              mode: 'read',
              selected_content_id: _id
            }
          )


        }.bind(this)}
      ></CreateContent>
    }

    return (
      <div className="App">
        <h1>
          <a 
            href='#'
            onClick={()=>{
              // this.state.mode = 'welcome'
              this.setState({
                mode: 'welcome'
              })
            }}
            >CHANGE STATE</a>
        </h1>

        {/* <Subject title="A" sub="a"></Subject> */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangeMode={function(){
            this.setState({
              mode: 'read'
            })
          }.bind(this)}
        ></Subject>

        <TOC 
          /*title={this.state.contents[0].title}*/ 
          data={this.state.contents}
          onChangePage={function(_mode, id){
            console.log(id)
            this.setState({
              mode: _mode,
              selected_content_id: Number(id)
            })
          }.bind(this)}
        ></TOC>

        <Control
          onChangeMode={function(_mode){
            //console.log(_mode)
            this.setState({
              mode: _mode
            })
          }.bind(this)}
        ></Control>

        {/*
          한 자리에 
            mode : welcome or read - <Content title={_title} desc={_desc}></Content>
            mode : create - <CreateContent></CreateContent>
        */}
        {_article}

        
      </div>
    );
  }
}

export default App;
