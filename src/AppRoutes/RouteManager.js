import React , {Component} from 'react';
import {BrowserRouter , Route , Switch , Link} from 'react-router-dom';
import App from './../Components/App';
import AddPost from './../Components/AddPost';
import DetailPost from './../Components/DetailPost';

class RouteManager extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/createPost" component={AddPost} />
                    <Route path="/:category/:id" component={DetailPost} />
                    <Route render={()=>{
                        return(
                            <div>
                                <p>Eror 404 , Page not found</p>
                                <Link to="/">Back to HomPage</Link>

                            </div>
                        )
                        
                        }}/>
                </Switch>
            
            </BrowserRouter>
        )
    }
}

export default RouteManager;