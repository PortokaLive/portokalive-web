import React from 'react'
import {Container} from 'react-bootstrap'
import Stream from './Stream'

class Live extends React.Component{

    render(){
        return(
            <div style={{marginTop:'80px'}}>
            <Container>
            <Stream></Stream>
            </Container>
            </div>
        )
    }
}

export default Live