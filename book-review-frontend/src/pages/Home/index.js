import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { StarFill, Star } from 'react-bootstrap-icons';
import axios from "axios";

const Home = () => {
  
  const [data, setData] = useState([])

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8080/review')
              setData(response.data)
          } catch (error) {
              console.error(error)
          }
      }
      fetchData()
  }, [])

  const [filteredRating, setFilteredRating] = useState(0);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#ffc107" : "#e4e5e9", marginRight: "5px", }}>
        {i < rating ? <StarFill /> : <Star />}
      </span>
    ));
  };

  const handleFilterChange = (e) => {
    setFilteredRating(parseInt(e.target.value, 10));
  };

  const filteredData = filteredRating
    ? data.filter((review) => review.rating === filteredRating)
    : data;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Book Reviews</h1>
      <Form className="mb-4 text-center">
        <Form.Group controlId="ratingFilter">
          <Form.Label>Filter by Rating:</Form.Label>
          <Form.Select
            value={filteredRating}
            onChange={handleFilterChange}
            className="w-50 mx-auto"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </Form.Select>
        </Form.Group>
      </Form>
      {filteredData.length > 0 ? (
        <Row>
          {filteredData.map((review) => (
            <Col key={review.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {review.title}
                  </Card.Title>
                  <Card.Text>
                    <small className="text-muted">
                      By: {review.author || "Anonymous"}
                    </small>
                  </Card.Text>
                  <Card.Text className="review-text">
                    {review.reviewText}
                  </Card.Text>
                  <div className="mb-2 text-center">
                    {renderStars(review.rating)}
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small className="text-muted">
                    Posted on: {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">
          No reviews available for the selected rating.
        </p>
      )}
    </Container>
  );
};

export default Home;
