import { Component } from 'react';

class TOD extends Component {
  constructor(props){
    super(props)
    this.state={
      dddd: []
    }
    for(var i=0; i<this.props.data.length; i++){
      this.state.dddd.push(
        <li key={this.props.data[i].id}><a href={"content/" + this.props.data[i].id}>{this.props.data[i].title}</a></li>
      )
    }
  }
    render() {
      console.log('TOD 렌더링')

    return (
      <nav>
        <ul>
          {this.state.dddd}
        </ul>
      </nav>
    )
  }
}

export default TOD;