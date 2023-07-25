import {Component} from 'react';

export class Content extends Component{
    render(){
        return(
            <div>
                <article>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.desc}</p>
                </article>
            </div>
        )
    }
}

export default Content;