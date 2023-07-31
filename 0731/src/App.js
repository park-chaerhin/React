import {Component} from 'react';
import AddNumberRoot from './Components/AddNumberRoot'
import DisplayNumberRoot from './Components/DisplayNumberRoot'

import './App.css';


class App extends Component {
  state = {
    number: 0
  }

  render(){
    return (
      <div className="App">
        <h1>Root Component</h1>
        {/*<AddNumberRoot onClick={function(size){
          this.setState({
            number: this.state.number + size
          })
        }.bind(this)}
        ></AddNumberRoot>*/}
        <AddNumberRoot></AddNumberRoot>
        
        {/*<DisplayNumberRoot number={this.state.number}></DisplayNumberRoot>*/}
        <DisplayNumberRoot></DisplayNumberRoot>
      </div>
    );
  }
}

export default App;
