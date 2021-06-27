import * as Yup from "yup";

import { SubmitButton as Button, CustomForm, Input } from "./form";
import { baseURL, http } from "../services/httpService";

import { Modal } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  movieName: Yup.string().required().label("Movie Name"),
  review: Yup.string().required().label("Review"),
});

const CustomModal = ({ show, handleShow, setMovies }) => {
  const handleSubmit = async (values) => {
    handleShow();
    setMovies((prevState) => {
      prevState.push(values);
      return prevState;
    });
    try {
      await http({
        method: "POST",
        url: baseURL + "movieReview.json",
        data: values,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
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
          <Input
            name="movieName"
            type="text"
            className="my-3"
            autoComplete="off"
          />
          <Input name="review" as="textarea" rows={3} className="mb-3" />
          <Button onClick={handleShow} title="Add Review" />
        </CustomForm>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
