import * as Yup from "yup";

import { SubmitButton as Button, CustomForm, Input } from "./form";

import { Modal } from "react-bootstrap";

const CustomModal = ({
  show,
  title,
  isUpdateModal,
  handleShow,
  handleSubmit,
}) => {
  let initialValues = {};
  let validationSchema = {};
  if (!isUpdateModal) {
    initialValues = { movieName: "", review: "" };

    validationSchema = Yup.object().shape({
      movieName: Yup.string().required().label("Movie Name"),
      review: Yup.string().required().label("Review"),
    });
  } else {
    initialValues = { review: "" };

    validationSchema = Yup.object().shape({
      review: Yup.string().required().label("Review"),
    });
  }
  return (
    <Modal show={show} onHide={handleShow} size="lg" centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {!isUpdateModal ? (
            <Input
              name="movieName"
              type="text"
              className="my-3"
              autoComplete="off"
              placeholder="Movie Name"
            />
          ) : null}
          <Input
            name="review"
            as="textarea"
            rows={3}
            className="mb-3"
            placeholder="Add your Review..."
          />
          <Button onClick={handleSubmit} title="Add Review" />
        </CustomForm>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
