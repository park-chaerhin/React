import React from 'react';
import './App.css'

import {BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>HI</h1>

        <ul>
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/topics">TOPICS</NavLink></li>
          <li><NavLink to="/contact">CONTACT</NavLink></li>
        </ul>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/topics/*" element={<Topics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/*
function NotFound(){
  return(
    <div>
      <h2>잘못 된 주소 입력함</h2>
    </div>
  )
}
V 아래처럼 화살표함수로 변환 가능
*/
const NotFound = () => {
  return(
    <div>
      <h2>잘못 된 주소 입력함</h2>
    </div>
  )
}

function Home(){
  return(
    <div>
      <h2>HOME</h2>
      Home...
    </div>
  )
}

function Topic(){
  var params = useParams();
  //console.log(params)
  //console.log(params.topic_id)
  var topic_id = Number(params.topic_id)
  /*
  var selected_comp = null
  if(topic_id == 1){
    selected_comp = <Topics1></Topics1>
  } else if(topic_id == 2){
    selected_comp = <Topics2></Topics2>
  } else if(topic_id == 3){
    selected_comp = <Topics3></Topics3>
  } else{
    selected_comp = <NotFound></NotFound>
  }
  */

  var selected_comp = <NotFound />

  for(var i =0; i < contents.length; i++){
    if(topic_id === contents[i].id){
      //selected_comp = contents[i]
      selected_comp = contents[i].comp
      break;
    } 
  }

  return(
    <div>
      {/*{selected_comp.comp}*/}
      {selected_comp}
    </div>
  )
}
var contents =[
  {id:1, title:'HTML', comp:<Topics1 />},
  {id:2, title:'JS', comp:<Topics2 />},
  {id:3, title:'React', comp:<Topics3 />},
];

function Topics(){
  var lists = []
  for(var i=0; i < contents.length; i++){
    lists.push(
      <li key={contents[i].id}>
        <NavLink to={'topic/' + contents[i].id}>
          {contents[i].title}
        </NavLink>
      </li>
    )
  }

  return(
    <div>
      <h2>TOPICS</h2>
      <p>Topics...</p>
        <ul>
          {/*
          <li><NavLink to="topics/1">Topics 1</NavLink></li>
          <li><NavLink to="topics/2">Topics 2</NavLink></li>
          <li><NavLink to="topics/3">Topics 3</NavLink></li>
          */}
          {lists}
        </ul>
      
        <Routes>
          {/*
          <Route path="topics/1" element={<Topics1 />} />
          <Route path="topics/2" element={<Topics2 />} />
          <Route path="topics/3" element={<Topics3 />} />
          <Route path="/*" element={<NotFound />} />
          */}
          <Route path="topic/:topic_id" element={<Topic />} />
        </Routes>
    </div>
  )
}
function Topics1(){
  return(
    <div>
      <h2>HTML</h2>
      <p>HTML is...</p>
    </div>
  )
}
function Topics2(){
  return(
    <div>
      <h2>JS</h2>
      <p>JS is...</p>
    </div>
  )
}
function Topics3(){
  return(
    <div>
      <h2>React</h2>
      <p>React is...</p>
    </div>
  )
}


function Contact(){
  return(
    <div>
      <h2>CONTACT</h2>
      Contact...
    </div>
  )
}


export default App;