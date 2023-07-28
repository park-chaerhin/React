import {Component} from 'react';

class UpdateContent extends Component{
    render(){
        console.log('UpdateContent render')
        
        return(
            <article>
                <h2>Update</h2>
                <form 
                    action="/create_process" 
                    method="post"
                    onSubmit={function(e){
                        e.preventDefault();
                        //console.log('submit')
                        //debugger
                        this.props.onSubmit(e.target.title.value, e.target.desc.value);
                    }.bind(this)}
                >
                    <p><input 
                        type='text' 
                        name="title" 
                        placeholder="title"
                    ></input></p>
                    <p><textarea
                        name="desc"
                        placeholder="desc"
                    ></textarea></p>
                    <button 
                        type="submit"
                    >SUBMIT</button>
                </form>
            </article>
        )
    }
}

export default UpdateContent;