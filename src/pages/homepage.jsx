import { Button, Container, Table } from "react-bootstrap";

import CustomModal from "../components/CustomModal";
import { useState } from "react";

const Homepage = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow((prevState) => !prevState);

  return (
    <Container fluid className="pt-3">
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <th>Movie Name</th>
            <th>Review</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>Ram Leela</td>
            <td>
              Good Movie by deepika padukone and ranveer singh.Directed by
              Sanjay Leela Bansali.
            </td>
            <td>
              <Button className="btn-secondary">Update</Button>
            </td>
            <td>
              <Button className="btn-danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="text-center">
        <Button onClick={handleShow}>Add Review</Button>
      </div>
      <CustomModal show={show} handleShow={handleShow} />
    </Container>
  );
};

export default Homepage;
