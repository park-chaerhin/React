// firebase 사용~
import {db} from './firebase';
import {collection, getDocs, doc, addDoc} from '@firebase/firestore';
// 내부 데이터를 공용 데이터(변수)로 사용하기 위해
import {useEffect, useState} from 'react';

import './App.css';

function App() {
  // firebase에 추가할 데이터
  var [newList, setNewList] = useState("");
  // console.log(newList)


  // 데이터 저장할 state 생성
  var [todos, setList] = useState([]);

  // 데이터베이스 연결 객체 생성
  const todosCollectionRef = collection(db, 'todos');
  useEffect(()=>{
    const getLists = async () => {
      //getDocs : 데이터베이스, 문서 가져와
      const data = await getDocs(todosCollectionRef)
        // console.log(data)
      setList(
        data.docs.map(
          (doc) => ({...doc.data(), id: doc.id})
          )
        );
    };

    getLists();
  // }, []); 새로고침 못하게 막는 ㅅㄲ
  });

  // DB에 입력할 날짜 생성
  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
  // console.log(now_date)

  // 파이어베이스에 데이터 추가
  const createList = () => {
    // addDoc(DB 연결 객체, 저장할 데이터)
    // const input_data = ;
    addDoc(todosCollectionRef, {content:newList, d_date:now_date})
  };

  const showList = todos.map(
    (value) => (
      //console.log(value)
      <div key={value.id}>
        <h2>
          {value.content}
        </h2>
        {value.d_date}
      </div>
    )
  )

  return (
    <div className="App">
      <input 
        type="text" 
        placeholder="할 일 입력"
        onChange = {function(e){
          setNewList(e.target.value)
        }}
      ></input>
      <button
        type="submit"
        onClick={createList}
      >목록 추가</button>
      <hr />
      {showList}
    </div>
  );
}

export default App;