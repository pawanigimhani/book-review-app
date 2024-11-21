import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from "../../AuthProvider"; 
import "./Header.css";

function Header() {
  const { isLoggedIn, userId, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.id) {
          login(decoded.id);
        } else {
          throw new Error("Invalid token payload");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        logout();
      }
    }
  }, [login, logout]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <strong>Book Reviews Community</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to={`/${userId}`} className="nav-link">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-link">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup" className="nav-link">
                    Sign Up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="nav-link">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
