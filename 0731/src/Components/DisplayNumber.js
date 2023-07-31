import {Component} from 'react';
import store from '../store'

export default class DisplayNumber extends Component{
    /*
    constructor(props){
        super(props);
        store.subscribe(function(){
            this.state = store.getState().number
        }.bind(this))
    }
    */
    constructor(props) {
        super(props);
        this.state = {
            number: 0, // Set an initial value here
        };
        store.subscribe(() => {
            this.setState({ number: store.getState().number }); // Update the state when the store changes
        });
    }

    render(){
        return(
            <div>
                <h3>Display Number</h3>
                <input 
                    type="text" 
                    value={this.state.number} //this.state.number
                    readOnly
                ></input>
            </div>
        )
    }
}