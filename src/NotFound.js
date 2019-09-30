import React from 'react'
import {Container,Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import styles from "./assets/css/styles.module.css"
import jwt_decode from 'jwt-decode'
import store from "./store";
import {setCurrentUser,logoutUser} from './actions/authActions'

if(localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded))
    const currenDate = Date.now()/1000;
  
    if(decoded.exp < currenDate){
      store.dispatch(logoutUser());
      window.location.href = './login'
    }
  }
class NotFound extends React.Component{

    render(){
        return(
            <Container className={styles.wrapper}>
                 <Col lg={{ span: 6, offset: 3 }} xs={12} className={styles.container}>
                    <h1 className={styles.notFound}>4<span>0</span>4</h1>
                    <h2>Page Not Found, <Link to="/">Back to Home</Link></h2>
                 </Col>
            </Container>
        )
    }
}

export default NotFound