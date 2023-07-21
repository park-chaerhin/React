import { Component } from 'react';

class Subject extends Component {
  render() {
    // console.log("Subject.js 렌더링 완료!")

    return (
      <header>
        <h1>
          <a href="#" onClick={function(e){ 
                // alert("Hi!!!");
                // console.log(e);
                e.preventDefault();

                // console.log(this.state.mode);
                // this.state.mode = 'read' // 변경되지 않음
                // this.setState( {mode: 'read'} ) // 하위 컴포넌트로 이동 시 동작하지 않음

                this.props.onChangePage()
              }.bind(this)
              }>
              { this.props.title }
            </a>
          </h1>
        <p>{ this.props.sub }</p>
        {/* {this.props.onChangePage()} */}
      </header>
    )
  }
}

export default Subject;