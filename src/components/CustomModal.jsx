import * as Yup from "yup";

import { SubmitButton as Button, CustomForm, Input } from "./form";

import { Modal } from "react-bootstrap";
import axios from "axios";

const validationSchema = Yup.object().shape({
  movieName: Yup.string().required().label("Movie Name"),
  review: Yup.string().required().label("Review"),
});

const handleSubmit = async (values) => {
  const result = await axios({
    method: "POST",
    url: "https://practice-realtime-db-default-rtdb.firebaseio.com/movieReview.json",
    data: values,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(result);
};

const CustomModal = ({ show, handleShow }) => {
  return (
    <Modal show={show} onHide={handleShow} size="lg" centered>
      <Modal.Header>
        <Modal.Title>Add Movie Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          initialValues={{ movieName: "", review: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Input name="movieName" type="text" className="my-3" />
          <Input name="review" as="textarea" rows={3} className="mb-3" />
          <Button onClick={handleShow} title="Add Review" />
        </CustomForm>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
