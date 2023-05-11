'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MyPicIcon from './mypic/mypicicon';
import { ToastContainer, toast } from 'react-toastify';


const BSNavBar = () => {
    return (
        <Container>
        <Navbar bg="default" expand="lg" style={{borderBottom: "solid 1px lightgray"}}>
            <Container>
                <Navbar.Brand href="/" 
                    style={{color: "white", fontWeight: "bold"}}>
                        <i className="bi bi-house-fill" style={{paddingRight: "1vh", fontSize: "1.5em"}}></i>
                        BADIHBARAKAT.INFO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav >
                        <Nav.Link href="/aboutme"
                            style={{color: "white", fontSize: "2rem", marginRight: "1rem"}}>
                            About me
                        </Nav.Link>
                        {/* <Nav.Link href="#link"></Nav.Link> */}
                        <NavDropdown 
                            title={
                                <span style={{color: "white", fontSize: "2rem"}}>Showcase</span> 
                            }
                            id="basic-nav-dropdown">
                            <NavDropdown.Item 
                                href="/publications"
                                style={{fontSize: "1.5rem"}}>Publications</NavDropdown.Item>
                            <NavDropdown.Item 
                                onClick={() => {
                                    toast('🚧 Page Under Construction.', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });  
                                }}
                                style={{fontSize: "1.5rem"}}>Work Samples</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{fontSize: "0.75em"}}
            />
        </Container>
    )
}

export default BSNavBar;