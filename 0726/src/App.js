import './App.css';
import {Component} from 'react';

import Subject from './components/Subject'
import TOC from './components/TOC'
import Control from './components/Control'
import Content from './components/Content'
import CreateContent from './components/CreateContent'
import Update from './components/Update'

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
  
  getReadContent(){
    // 'read' mode의 조건문만 짤라서 함수 안에 넣고, return해주기
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
      var data = this.state.contents[i];
      if (this.state.selected_content_id === data.id){
        /* 
        하나씩 리턴하지 말고 전체 데이터 리턴!
        _title = data.title;
        _desc = data.desc;
        */
        return data; //update에서 id 필요할 수 있어서 전체 데이터 리턴
      }
      /* 위랑 같은 내용~
      for(var i=0; i < this.state.contents.length; i++){
        if(this.state.selected_content_id === this.state.contents[i].id){
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].desc;
          _article = <Content title={_title} desc={_desc}></Content>;
        
          // break;
        }
      */ 
      // return _title, _desc => return으로 반환할 수 있는 값은 반드시 1개!
        /* 여러개의 값 return */
          // 배열, 객체 형식으로 : return [_title, _desc]  
          // var 변수명 = [return 값이 있는 함수]
          // 변수명[0]
          
          /* 
          ex/
            => var return_data = this.getReadContent() : _title,_desc 두 개의 값 return
               var first_data = return_data[0] : _title
               var second_data = return_data[1] : _desc
          */
    }
  }

  getContent(){
    /*
      Contents component에 
      mode state 값이 welcome이면 welcome text 출력
      mode state 값이 welcome이 아니면 contents[0] 출력
    */
    var _title, _desc, _article = null; //변수 초기화

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = 
      <Content 
        title={_title} 
        desc={_desc}
      ></Content>;
    } else if(this.state.mode === 'read'){
      var _readContent = this.getReadContent()
      _article = 
      <Content 
        title={_readContent.title} 
        desc={_readContent.desc}
      ></Content>;
    } else if(this.state.mode === 'create'){
      _article = 
      <CreateContent
        onReturnSubmit={function(_title, _desc){
          // 중간에 지워지는 경우, id 중복 값 발생할 수 있는 확률 높아
          var _id = this.state.max_content_id+1
          
          /*
          // 원본말고, 복사해서 뒤에 추가~(concat)
          this.state.contents.push(
            {id: _id, title: _title, desc: _desc}
          )
          */
          var _contents = this.state.contents.concat(
            {id:_id, title:_title, desc:_desc}
          )
  
          this.setState(
            {
                //contents: this.state.contents, _contents로 바꾸기!
              contents: _contents,
                // submit 버튼 누르면 방금 작성한글 띄우기
              mode: 'read',
                /*
                  max_content_id 설정 안하면 에러: key값 중복 
                  -> maxId값이 3으로 설정되어 있어, 새로 push하는 값의 id는 계속 4!
                */
              max_content_id: _id,
              selected_content_id: _id
            }
          )

  
        }.bind(this)}
      ></CreateContent>
    } else if(this.state.mode === 'update'){
      // 'data' return
      var _content = this.getReadContent()
      _article = 
      <Update
        data={_content}
        onReturnSubmit = {function(_id,_title,_desc){
          // console.log("App : ", _id, " : ", _title, " : ", _desc, " : ")
          var _contents = this.state.contents;
          /*
          if(_contents[0].id === _id){
            _contents = [
              /// 전체 데이터 중 한 개의 값 바꾸려면 전체 데이터 다 불러와야해, 바꿀 한 개만 불러오면 나머지 데이터 사라짐
              {id:1, title: _title, desc: _desc},
              {id:2, title:'CSS', desc:'CSS is...'},
              {id:3, title:'JAVASCRIPT', desc:'JAVASCRIPT is...'},
            ]
          } else if(_contents[1].id === _id){
            _contents = [
              {id:1, title: 'HTML', desc: 'HTML is...'},
              {id:2, title: _title, desc: _desc},
              {id:3, title:'JAVASCRIPT', desc:'JAVASCRIPT is...'},
            ]
          }
          */
          // var _contents = Array.from(this.state.contents) 복제 배열 생성
          var _contents = this.state.contents.concat();
          for (var i=0; i < _contents.length; i++){
            if(_id === _contents[i].id){
              // _contents = [{id: _id, title: _title, desc: _desc},] 이렇게 쓰면 데이터 1개로 바뀜
              _contents[i] = [{id: _id, title: _title, desc: _desc},]
              break;
            }
          }

          this.setState({
            contents: _contents,
            mode: 'read',
            selected_content_id: _id
          })
        }.bind(this)}
      ></Update>
    }

    return _article
  }

  render(){
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

            if(_mode === 'delete'){
              // 데이터 삭제
              var del_ck = window.confirm('정말 삭제하시겠습닉까?');
              //if(del_ck == 'true')
              if(del_ck){
                var _contents = Array.from(this.state.contents);
                for(var i=0; i < _contents.length; i++){
                  if(this.state.selected_content_id === _contents[i].id){
                    _contents.splice(i, 1)
                    break;
                  }
                }
              }

            } else{
              // 페이지 전환
              this.setState({
                mode: _mode
              })
            }
          }.bind(this)}
        ></Control>

        {/*
          한 자리에 
            mode : welcome or read - <Content title={_title} desc={_desc}></Content>
            mode : create - <CreateContent></CreateContent>
        */}
        {/*
          {_article} 에러
          -> getContent()로 직접 입력 
        */}
        {this.getContent()}        
      </div>
    );
  }
}

export default App;
