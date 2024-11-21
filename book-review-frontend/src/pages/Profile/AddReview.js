import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddReview = () => {
  const { userID } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    reviewText: "",
    rating: 0,
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      title: formData.title,
      author: formData.author,
      reviewText: formData.reviewText,
      rating: parseInt(formData.rating),
    };
    try{
      axios.post(`http://localhost:8080/review/${userID}/createPost`, reviewData);
      console.log("Submitted Review:", { ...formData, userID });
      setFormData({ title: "", reviewText: "", rating: 0, author: "" });
    }catch(error){
      console.error(error)
    }
    
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">Submit Your Review</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="reviewTitle">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title of your review"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="authorName">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewText">
              <Form.Label>Review Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your review here..."
                name="reviewText"
                value={formData.reviewText}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewRating">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
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
            <Button variant="primary" type="submit" className="w-100">
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddReview;
