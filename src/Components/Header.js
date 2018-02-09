import React , {Component} from 'react';
import {NavLink} from 'react-router-dom';
class Header extends Component{
    render(){
        return(
            <header>
                <div className="header">
                    <div className="header__logo">
                        Logo Here
                    </div>
                    <ul className="navigation">
                        <li className="navigation__item"><NavLink exact activeClassName="active" className="navigation__link" to="/">Home</NavLink></li>
                        <li className="navigation__item"><NavLink activeClassName="active" className="navigation__link" to="/createPost">Add Post</NavLink></li>
                    </ul>
                    
                </div>
            </header>
        )
    }
}

export default Header;