import React from 'react';

import {Container,Row,Col,Button} from "react-bootstrap";


class NavBar extends React.Component {
        render() {
                return (
<div>
                    <Container className='bg-primary'>
                        <Row >
                            <Col><Button color="primary">Manage Tournament</Button></Col>
                            <Col><Button color = "primary">Register For Tournament</Button></Col>
                        </Row>
                    </Container>
</div>
                )
        }
}

export default NavBar;