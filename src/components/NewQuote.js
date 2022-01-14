import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./NewQuote.css";

const NewQuote = () => {
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const history = useHistory();
  const [color, setColor] = useState("");

  const notify = () =>
    toast("Select a background color theme for your quote", {
      position: "bottom-center",
      type: "warning",
    });

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value);
  };

  const colorSelectHandler = (event) => {
    // alert(event.target.value);
    setColor(event.target.value);
  };

  const quoteChangeHandler = (event) => {
    setQuote(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (color === "") {
      return notify();
    }
    const quoteDetails = {
      author: author,
      quote: quote,
      comments: {},
      color: color,
    };

    fetch(
      "https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes.json",
      {
        method: "POST",
        body: JSON.stringify(quoteDetails),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAuthor("");
        setQuote("");
        // console.log(quoteDetails);
        history.push("/quotes");
        // console.log(data);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="card ">
        <form onSubmit={submitHandler}>
          <div className="card-header ">
            <div className="form-floating">
              {/* <input
                type="email"
                className="form-control"
                id="floatingInputValue"
                placeholder="~ Author"
              /> */}
              <input
                type="text"
                className="form-control-plaintext"
                placeholder="Author Name"
                onChange={authorChangeHandler}
                required
                value={author}
              />

              {/* <label for="floatingInputValue"> ~ Author</label> */}
            </div>
          </div>
          <div className="card-body">
            <h6 className="card-text">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  onChange={quoteChangeHandler}
                  required
                  value={quote}
                ></textarea>
                <label htmlFor="floatingTextarea2">Quote...</label>
              </div>
            </h6>
            <p></p>
            <p className="fst-italic">
              Select backgroud color theme for your quote
            </p>
            <label>White &nbsp;</label>
            <input
              type="radio"
              name="color"
              value="bg-light"
              onClick={colorSelectHandler}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>Grey &nbsp;</label>
            <input
              type="radio"
              name="color"
              value="bg-secondary"
              onClick={colorSelectHandler}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>Green &nbsp;</label>
            <input
              type="radio"
              name="color"
              value="bg-success"
              onClick={colorSelectHandler}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>Red &nbsp;</label>
            <input
              type="radio"
              name="color"
              value="bg-danger"
              onClick={colorSelectHandler}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>Yellow &nbsp;</label>
            <input
              type="radio"
              name="color"
              value="bg-warning"
              onClick={colorSelectHandler}
            />
            {/* <div className="row ">
              <div className="form-check pad">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios1"
                  id="exampleRadios1"
                  value="bg-light"
                  checked
                  onClick={colorSelectHandler}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  White
                </label>

                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios2"
                  id="exampleRadios2"
                  value="bg-secondary"
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Grey
                </label>

                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios3"
                  id="exampleRadios3"
                  value="bg-success"
                />
                <label className="form-check-label" htmlFor="exampleRadios3">
                  Green
                </label>

                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios4"
                  id="exampleRadios4"
                  value="bg-danger"
                />
                <label className="form-check-label" htmlFor="exampleRadios4">
                  Red
                </label>

                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios5"
                  id="exampleRadios5"
                  value="bg-warning"
                />
                <label className="form-check-label" htmlFor="exampleRadios5">
                  Yellow
                </label>
              </div> */}
            {/* </div> */}
            <div className="row">&nbsp;</div>
            <button type="submit" className="btn btn-dark">
              <b>Add Quote</b>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuote;
