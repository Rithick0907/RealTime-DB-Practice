import { Button, Container, Table } from "react-bootstrap";
import { baseURL } from "../services/httpService";
import { useEffect, useState } from "react";
import useHttp from "../custom-hooks/useHttp";

import CustomModal from "../components/CustomModal";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { sendRequest } = useHttp();

  const handleShow = () => setShow((prevState) => !prevState);

  const handleShowUpdate = () => setShowUpdate((prevState) => !prevState);

  const addReview = (values) => {
    handleShow();
    setMovies((prevState) => {
      prevState.push(values);
      return prevState;
    });
    sendRequest({
      method: "POST",
      url: baseURL + "movieReview.json",
      data: values,
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const renderDisplay = (data) => {
    const temp = [];
    for (const key in data) {
      temp.push({ movieID: key, ...data[key] });
    }
    setMovies((prevState) => temp);
  };

  const fetchReview = () => {
    sendRequest(
      {
        method: "GET",
        url: baseURL + "movieReview.json"
      },
      renderDisplay
    );
  };

  const handleUpdate = (movieID) => {
    setSelectedMovie((prevState) => movieID);
    handleShowUpdate();
  };

  const updateReview = async (values) => {
    handleShowUpdate();
    sendRequest({
      method: "PATCH",
      url: `${baseURL}movieReview/${selectedMovie}.json`,
      data: values
    });
  };

  const deleteReview = (movieID) => {
    sendRequest({
      method: "DELETE",
      url: `${baseURL}movieReview/${movieID}.json`
    });
  };

  useEffect(() => {
    fetchReview();
  }, [fetchReview, movies]);

  return (
    <Container fluid className="py-4">
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
          {movies.map((movie) => (
            <tr key={movie.movieID} className="text-center">
              <td>{movie.movieName}</td>
              <td>{movie.review}</td>
              <td>
                <Button
                  onClick={() => handleUpdate(movie.movieID)}
                  className="btn-secondary"
                >
                  Update
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => deleteReview(movie.movieID)}
                  className="btn-danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Button onClick={handleShow}>Add Review</Button>
      </div>
      <CustomModal
        title="Add Movie Review"
        show={show}
        handleShow={handleShow}
        handleSubmit={addReview}
      />
      <CustomModal
        title="Update Movie Review"
        isUpdateModal={selectedMovie}
        show={showUpdate}
        handleShow={handleShowUpdate}
        handleSubmit={updateReview}
      />
    </Container>
  );
};

export default Homepage;
