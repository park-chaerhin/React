import {Component} from 'react';

class TOC extends Component{
    render(){
        return(
            <nav>
                <ul>
                    <li><a href="1.html">HTML</a></li>
                    <li><a href="2.CSS">CSS</a></li>
                    <li><a href="3.JavaScript">JavaScript</a></li>
                </ul>
            </nav>
        );
    }
}

export default TOC;