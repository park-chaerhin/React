import { Component } from 'react';

class Subject extends Component {
  render() {
    console.log("Subject.js 렌더링 완료!")

    return (
      <header>
        <h1>{ this.props.title }</h1>
        <p>{ this.props.sub }</p>
      </header>
    )
  }
}

export default Subject;