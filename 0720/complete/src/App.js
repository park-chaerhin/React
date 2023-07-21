import './App.css';

import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'welcome',
      selected_content_id: 0,
      welcome: { title: 'Welcome', desc: 'Hello, React JS!!' },
      subject: { title: 'WEB', sub: 'World Wide Web' },
      contents: [
        { id:1, title: 'HTML', sub: 'HTML is .......'},
        { id:2, title: 'CSS', sub: 'CSS is .......'},
        { id:3, title: 'JAVASCRIPT', sub: 'JAVASCRIPT is .......'},
      ]
    }
  }

  render() {/// class 방식 : state/props 값 바뀌면 -> render 함수 재실행
    // console.log("App.js 렌더링 완료!")

    var _title, _desc = null;
    if(this.state.mode == 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode == 'read'){
      /* if(this.state.selected_content_id === 1){
        _title = this.state.contents[0].title;
        _desc = this.state.contents[0].sub;
      }
      if(this.state.selected_content_id === 2){
        _title = this.state.contents[1].title;
        _desc = this.state.contents[1].sub;
      }
      if(this.state.selected_content_id === 3){
        _title = this.state.contents[2].title;
        _desc = this.state.contents[2].sub;
      } */
      var i = 0
      while(i < this.state.contents.length){
        var data = this.state.contents[i]
        if(this.state.selected_content_id === data.id){
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].sub;

          break;
        }
        // console.log(i);
        i++;
      }
    }
    // console.log("render", this)
    return ( 
      <div>
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={
            function(){
              // alert("Hello!!!")
              /// this.state.mode = "read" 이건 a 내부에서 변화
              this.setState( {mode: 'welcome'} ) /// setState해야 위쪽에 명시한 mode값 바꿀 수 있어 -> 조건문 바뀜
            }.bind(this)  ///외부의 this를 가리키고 싶으면 bind 연결
          }
          ></Subject>  
        <TOC
         data={this.state.contents}
         onChangePage={
          function(id){
            // alert("Hi!!!!")
            // this.setState( {mode: 'read'} )
            
            // console.log(id)
            // this.setState( {selected_content_id: id} )

            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            })
          }.bind(this)
        }
        ></TOC>        
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
