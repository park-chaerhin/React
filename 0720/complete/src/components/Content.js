import { Component } from 'react';

class Content extends Component {
  render() {
    // console.log("Content.js 렌더링 완료!")

    return (
      <article>
        <h2>{ this.props.title }</h2>
        <p>{ this.props.desc }</p>
      </article>
    )
  }
}

export default Content;