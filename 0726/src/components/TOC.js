import {Component} from 'react';

export class TOC extends Component{
    render(){
        var data = this.props.data;
        var lists = [];

        for(var i=0; i < data.length; i++){
            lists.push(
                <li key={data[i].id}>
                    <a 
                        href="#"
                        // data-id={data[i].id}
                        onClick={function(id, e){
                            e.preventDefault();
                            // this.props.onChangePage('read', e.target.dataset.id)
                            this.props.onChangePage('read', id)
                        }.bind(this, data[i].id)} /// 이벤트속성은 무조건 맨 마지막. // bind의 1번째인자/ this , 2번째인자/
                    > {data[i].title}
                    </a>
                </li>
            )
        }

        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        )
    }
}

export default TOC;