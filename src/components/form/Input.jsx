import { ErrorMessage, useFormikContext } from "formik";

import { Form } from "react-bootstrap";

const Input = ({ name, ...otherProps }) => {
  const { handleChange, handleBlur } = useFormikContext();
  return (
    <>
      <Form.Control
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherProps}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </>
  );
};

export default Input;
