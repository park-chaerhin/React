import React, {Component} from 'react';

import './App.css';

class Nav extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  /* 이 컴포넌트 내부에서만 사용 시 constructor 필요X
  state={
    list:[]
  }
  */

  componentDidMount(){
    /*
    데이터 양이 많으면 변환 전에 데이터 다 못 불러올 수 있어(보장X)
    var result = "list.json" // 데이터 가져오기
    var json = result.json() // 변환하기
    this.setState({data:json}) //사용하기
    */

    fetch('list.json') //list.json 가져와
    .then(function(result){ //가져오기 "끝나면" 변환하기
      return result.json() //다음 then한테 자동 전달안됨, 그래서 return 사용
    })
    .then(function(json){ //변환이 "끝나면" 사용하기
      //console.log(json)
      this.setState({
        list: json
      })
    }.bind(this))
  }

  render(){
    var list_data = [];
    for(var i =0; i < this.state.list.length; i++){
      var list_item = this. state.list[i]
      list_data.push(
        <li key={list_item.id}>
          <a 
            href={list_item.id}
            onClick={function(id, e){
              e.preventDefault();
              //console.log(list_item.id) //HTML, CSS, JS - 3나옴
              //console.log(e.target)
              this.props.onGetData(id);
            }.bind(this, list_item.id)}
          >
            {list_item.title}
          </a>
        </li>
      )
    }
    return(
      <nav>
        <ul>
          {/*
          <li><a href="1">HTML</a></li>
          <li><a href="2">CSS</a></li>
          <li><a href="3">JAVASCRIPT</a></li>
          */}
          {list_data}
        </ul>
      </nav>
    )
  }
}

class Article extends Component{
  render(){
    return(
      <article>
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
      </article>
    )
  }
}

class App extends Component{
  state = {
    article : {title: 'WELCOME', desc: 'HELLO, REACT & AJAX is...'}
  }
  render(){
    return (
      <div className="App">
        <h1>WEB</h1>

        <Nav
          onGetData={function(get_id){
            //console.log('Nav 컴포넌트에서 받은 값: ', get_id)
            fetch(get_id+'.json')
            .then(function(result){
              return result.json()
            })
            .then(function(json){
              this.setState({
                article: {
                  title : json.title,
                  desc : json.desc
                }
              })
            }.bind(this))
          }.bind(this)}
        ></Nav>
        
        <Article
          title={this.state.article.title}
          desc={this.state.article.desc}
        ></Article>
      </div>
    );
  }
}

export default App;
