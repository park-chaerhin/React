import {Component} from 'react'; 
import store from '../store'

export default class AddNumber extends Component{
    state = {
        size: 0
    }

    render(){
        return(
            <div>
                <h3>Add Number</h3>
                <input 
                    type="button" 
                    value="+"
                    onClick={function(){
                        /*
                        this.setState({
                            number: this.state.number + this.state.size
                        })
                        */
                        /*
                        this.props.onClick(Number(this.state.size))
                        */
                        store.dispatch({
                            type:'INCREMENT',
                            size: Number(this.state.size)
                        })
                    }.bind(this)}
                ></input>
                <input 
                    type="text" 
                    value={this.state.size} 
                    onChange={function(e){
                        this.setState({
                            size: e.target.value
                        })
                    }.bind(this)}
                ></input>
            </div>
        )
    }
}