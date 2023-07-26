import {Component} from 'react';

export class Update extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.data.id,
            title : this.props.data.title,
            desc: this.props.data.desc
        }
        // 함수 = 함수.bind(this) : this가 bind된 값으로 함수 부르기
        this.inputFormHandler = this.inputFormHandler.bind(this)

    }

    inputFormHandler(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render(){
        //console.log(this.props.data)
        return(
            <article>
                <h2>Update</h2>
                {/*
                    action : 데이터 전달할 페이지,
                    method : 데이터 전달 방법 (get / post)
                        get = abc.com?변수=값&변수=값... (주소창에 노출)
                        post = 데이터 감추기
                */}
                <form 
                    action="/update-process" 
                    method="post" 
                        //className="txt"
                    onSubmit={function(e){
                        e.preventDefault();

                        var _id = this.state.id
                        var _title = this.state.title
                        var _desc = this.state.desc
                            //console.log(_title, _desc)
                            console.log("Update : ", _id, _title, _desc)
                        this.props.onReturnSubmit(_id, _title, _desc)
                    }.bind(this)}
                >
                    <p>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="title" 
                            value={this.state.title}
                            //onChange={function(){this.setState({title:e.target.value})}.bind(this)}
                            // onChange={this.inputFormHandler.bind(this)}
                            onChange={this.inputFormHandler}
                        ></input>
                    </p>
                    <p>
                        <textarea 
                            name="desc" 
                            placeholder="description"
                            value={this.state.desc}
                            // onChange={this.inputFormHandler.bind(this)}
                            onChange={this.inputFormHandler}
                        ></textarea>
                    </p>
                    <p><button type="submit">UPDATE</button></p>
                </form>
            </article>
        )
    }
}

export default Update;