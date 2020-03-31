import React from 'react';

import Container from "reactstrap/lib/Container";
import Button from "reactstrap/lib/Button";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";


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