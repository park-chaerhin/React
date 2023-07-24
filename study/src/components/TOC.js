import {Component} from 'react';

class TOC extends Component{
    render(){
        console.log('TOC render')
        
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
            lists.push(<li key={data[i].id}><a href={"/content/"+data[i].id}> {data[i].title} </a></li>)
            i++
        }
        return(
            <nav>
                <ul>
                    {/* <li><a href="1.html">HTML</a></li>
                    <li><a href="2.CSS">CSS</a></li>
                    <li><a href="3.JavaScript">JavaScript</a></li> */}
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;