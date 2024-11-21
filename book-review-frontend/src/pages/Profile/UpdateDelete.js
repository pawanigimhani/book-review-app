import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from "axios";

const UpdateDelete = () => {
    
  const { reviewID } = useParams(); 
  const navigate = useNavigate(); 
  const [review, setReview] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedReview, setUpdatedReview] = useState({
    title: "",
    reviewText: "",
    rating: 0,
    author: "",
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/review/${reviewID}`); 
        setReview(response.data);
        setUpdatedReview({
          title: response.data.title,
          reviewText: response.data.reviewText,
          author: response.data.author,
          rating: response.data.rating,
        });
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [reviewID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview({
      ...updatedReview,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const reviewData = {
      title: updatedReview.title,
      reviewText: updatedReview.reviewText,
      rating: parseInt(updatedReview.rating),
      author: updatedReview.author,
    };
    try {
      const response = await axios.patch(`http://localhost:8080/review/${reviewID}`, reviewData); 
      console.log("Review updated:", response.data);
      setReview(response.data);
      navigate(`/profile/${reviewID}`);
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/review/${reviewID}`); 
      console.log("Review deleted successfully.");
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#ffc107" : "#e4e5e9", marginRight: "5px", }}>
        {i < rating ? <StarFill /> : <Star />}
      </span>
    ));
  };

  return (
    <Container className="my-5">
      {review ? (
        <Row>
          <Col md={8} className="mx-auto">
            {!isEditing ? (
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>{review.title}</Card.Title>
                  <Card.Text>
                    <strong>Review:</strong> {review.reviewText}
                  </Card.Text>
                  <Card.Text>
                    <strong>Rating:</strong> {renderStars(review.rating)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            ) : (
              <Form onSubmit={handleUpdate} className="shadow p-4">
                <h3 className="mb-3">Edit Review</h3>
                <Form.Group className="mb-3" controlId="reviewTitle">
                  <Form.Label>Review Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={updatedReview.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="authorName">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={updatedReview.author}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="reviewText">
                  <Form.Label>Review Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="reviewText"
                    value={updatedReview.reviewText}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="reviewRating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    name="rating"
                    value={updatedReview.rating}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={0}>Select Rating</option>
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <p className="text-center text-muted">Loading review...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UpdateDelete;
