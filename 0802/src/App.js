// firebase 사용~
import {db} from './firebase';
import {collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy} from '@firebase/firestore';
// 내부 데이터를 공용 데이터(변수)로 사용하기 위해
import {useEffect, useState} from 'react';

import './App.css';

function App() {
  // 렌더링 상태를 체크하기 위한 state 추가
  const [changed, setChanged] = useState(false);

  // firebase에 추가할 데이터
  var [newList, setNewList] = useState("");
  // console.log(newList)


  // 데이터 저장할 state 생성
  var [todos, setList] = useState([]);

  // 데이터베이스 연결 객체 생성
  const todosCollectionRef = collection(db, 'todos');

  useEffect(()=>{
    const getLists = async () => {
      //getDocs(DB 연결객체)로 데이터 가져오기
      // query(DB 연결객체, orderBy('기준열', '정렬방식'))
      const data = await getDocs(
        // query(todosCollectionRef, orderBy("content", "asc"))
        query(todosCollectionRef, orderBy("timeStamp", "desc"))
      )
        // console.log(data)
      setList(
        data.docs.map(
          (doc) => ({...doc.data(), id: doc.id})
          )
        );
    };

    getLists();
    setChanged(false);
   }, [changed]); // 새로고침 못하게 막는 친구~ 필수! 안쓰면 데이터읽기용량 초과뜸
  //});

  // DB에 입력할 날짜 생성
  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
  // console.log(now_date)

  // 파이어베이스에 데이터 추가
  const createList = () => {
    // addDoc(DB 연결 객체, 저장할 데이터)
    // const input_data = ;
    addDoc(todosCollectionRef,
      {
        content:newList,
        d_date:now_date,
        // 최신 글 순으로 출력될 수 있도록 timeStamp
        timeStamp: date 
      }
    )
    setChanged(true)
  };

  const updateList = async (id, content) => {
    console.log(id,'/', content)
    const msg = prompt('내용 수정', content)

    if(msg){
      // id를 이용하여 데이터베이스에서 수정할 데이터 검색
      // doc('데이터베이스', '콜렉션', 검색할 key(id))
      const listDoc = doc(db, 'todos', id); //데이터베이스에서 찾을 데이터

      // 수정할 데이터
      const editData = {
        content: msg,
        d_date: now_date,
        timeStamp: date
      }

      // updateDoc(변경될 데이터. 수정할 데이터)
      await updateDoc(listDoc, editData)
      setChanged(true)
    }
  }

  const deleteList = async (id) => {
    var del_ck = window.confirm('정말 삭제하시겠습니까?');

    if(del_ck){
      // id를 이용하여 데이터베이스에서 수정할 데이터 검색
      // doc('데이터베이스', '콜렉션', 검색할 key(id))
      const listDoc = doc(db, 'todos', id); //데이터베이스에서 찾을 데이터

      // deleteDoc(삭제할 데이터)
      await deleteDoc(listDoc)
      setChanged(true)
    }
  }

  const showList = todos.map(
    (value) => (
      //console.log(value)
      <div key={value.id}>
        <h2>
          {value.content}
          <span className="d_date">{value.d_date}</span>
          <button 
            type = "button"
            onClick = {function(){
              updateList(value.id, value.content)
            }}
          >수정</button>
          <button
            type="button"
            onClick={()=>{deleteList(value.id)}}
          >삭제</button>
        </h2>
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