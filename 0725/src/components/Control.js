import {Component} from 'react';

class Control extends Component{
    render(){
        return(
            <ul>
                <li><a 
                    href="/create"
                    onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('create')
                    }.bind(this)}
                >CREATE</a></li>
                <li><a 
                    href="/update"
                    onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('update')
                    }.bind(this)}
                >UPDATE</a></li>
                <li><button 
                    type="button"
                    onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('delete')
                    }.bind(this)}
                >DELETE</button></li>
            </ul>
        )
    }
}

export default Control;