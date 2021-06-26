import { Button } from "react-bootstrap";
import { useFormikContext } from "formik";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <div className="text-center">
      <Button onClick={handleSubmit}>{title}</Button>
    </div>
  );
};

export default SubmitButton;
