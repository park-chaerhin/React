import {Component} from 'react';

export class Subject extends Component{
    render(){
        return(
            <header>
                <h1>
                    <a 
                        href='#'
                        onClick={function(e){
                            e.preventDefault();
                            // this.state.mode = 'welcome'
                            this.props.onChangeMode()
                        }.bind(this)}
                    > {this.props.title}</a>
                </h1>
                <p>{this.props.sub}</p>
            </header>
        )
    }
}

export default Subject