import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from 'axios'

const ProfileView = () => {
  const { userID } = useParams(); 
  const navigate = useNavigate(); 

  const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/review/user/${userID}`)
                setReviews(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const renderStars = (rating) => {
      return [...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#ffc107" : "#e4e5e9", marginRight: "5px", }}>
          {i < rating ? <StarFill /> : <Star />}
        </span>
      ));
    };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Reviews by You</h2>
      <Row>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Col key={review.id} xs={12} sm={6} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{review.title}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {review.author}
                  </Card.Text>
                  <Card.Text>{review.reviewText}</Card.Text>
                  <Card.Text>
                    <strong>Rating:</strong> {renderStars(review.rating)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/profile/${review.id}`)}
                  >
                    View
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">
              No reviews available.
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProfileView;
