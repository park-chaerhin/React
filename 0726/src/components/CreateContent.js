import {Component} from 'react';

class CreateContent extends Component{
    render(){
        return(
            <article>
                <h2>CREATE</h2>
                {/*
                    action : 데이터 전달할 페이지,
                    method : 데이터 전달 방법 (get / post)
                        get = abc.com?변수=값&변수=값... (주소창에 노출)
                        post = 데이터 감추기
                */}
                <form 
                    action="/create-process" 
                    method="post" 
                    className="txt"
                    onSubmit={function(e){
                        e.preventDefault();
                            //console.log(e)
                        var _title = e.target.title.value
                        var _desc = e.target.desc.value
                            //console.log(_title, _desc)
                            this.props.onReturnSubmit(_title, _desc)
                    }.bind(this)}
                >
                    <p><input type="text" name="title" placeholder="title"></input></p>
                    <p><textarea name="desc" placeholder="description"></textarea></p>
                    <p><button type="submit">CREATE</button></p>
                </form>
            </article>
        )
    }
}

export default CreateContent;