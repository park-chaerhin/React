import { Component } from 'react';

class TOD extends Component {
  render() {
    console.log("TOD.js 렌더링 완료!")

    var data = this.props.data;
    // var lists = [this.props.data[0].title, this.props.data[1].title, this.props.data[2].title];
    var lists = [];

    /* var i = 0;
    while ( i < data.length ){
      lists.push()
      i++;
    } */

    for ( var i = 0; i < data.length; i++ ){
      lists.push(
        <li key={data[i].id}><a href={"/content/" + data[i].id}>{data[i].title}</a></li>
      )
    }

    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default TOD;