import { Button, Container, Table } from "react-bootstrap";
import { baseURL, http } from "../services/httpService";
import { useCallback, useEffect, useState } from "react";

import CustomModal from "../components/CustomModal";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleShow = () => setShow((prevState) => !prevState);

  const fetchMoviesReview = useCallback(async () => {
    try {
      const { data } = await http({
        method: "GET",
        url: baseURL + "movieReview.json",
      });
      const temp = [];
      for (const key in data) {
        temp.push({ movieID: key, ...data[key] });
      }
      setMovies((prevState) => temp);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteMovie = async (movieID) => {
    try {
      const response = await http({
        method: "DELETE",
        url: `${baseURL}movieReview/${movieID}.json`,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMoviesReview();
  }, [fetchMoviesReview, movies]);

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
          {movies.map((movie) => (
            <tr key={movie.movieID} className="text-center">
              <td>{movie.movieName}</td>
              <td>{movie.review}</td>
              <td>
                <Button className="btn-secondary">Update</Button>
              </td>
              <td>
                <Button
                  onClick={() => deleteMovie(movie.movieID)}
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
      <CustomModal show={show} handleShow={handleShow} setMovies={setMovies} />
    </Container>
  );
};

export default Homepage;
