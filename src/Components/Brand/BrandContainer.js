import React from "react";
import BrandCard from "./BrandCard";
import { Container, Row, Spinner } from "react-bootstrap"; // تأكد من وجود Spinner هنا

const BrandContainer = ({ data ,loading}) => {

  return (
    <Container>
      <div className="admin-content-text mt-2">كل الماركات</div>
      <Row className="my-1 d-flex justify-content-between">
        {!loading ? (
          data ? (
            data?.map((item, index) => (
              <BrandCard key={index} img={item.image} />
            ))
          ) : null
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
};

export default BrandContainer;
