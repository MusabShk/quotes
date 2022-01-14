import React, { useEffect, useState } from "react";
// import { useState } from "react/cjs/react.development";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";
import { MdDelete } from "react-icons/md";

const QuoteComments = (props) => {
  const [userComment, setUserComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState({});
  const [refresh, setRefresh] = useState(true);

  const notify = () =>
    toast("Please type in a comment", {
      position: "bottom-center",
      type: "warning",
    });

  const commentChangeHandler = (event) => {
    setUserComment(event.target.value);
  };

  useEffect(() => {
    // setLoading(true);
    fetch(
      `https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes/${props.quoteid}/comments.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setComments(data);
        setLoading(false);
        // console.log(comments);
      })
      .catch((error) => {
        setComments(false);
        // console.log(error, "commm");
      });
  }, []);

  const addCommentHandler = () => {
    if (userComment === "") {
      return notify();
    }
    setCommentLoading(true);
    // const comment = { userComment };
    // console.log(comment);
    // console.log(userComment);
    fetch(
      `https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes/${props.quoteid}/comments.json`,
      {
        method: "POST",
        body: JSON.stringify(userComment),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetch(
          `https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes/${props.quoteid}/comments.json`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            setComments(data);
            setCommentLoading(false);

            // setLoading(false);
            // console.log(comments);
          });
        // newData();
        // props.setReload(!props.reload);
        // console.log(data);
      });
    setUserComment("");
  };

  const deleteHandler = (comment) => {
    // console.log(comment, "caament");
    setCommentLoading(true);

    const key = Object.keys(comments).find((key) => comments[key] === comment);
    // console.log(key);
    fetch(
      `https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes/${props.quoteid}/comments/${key}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetch(
          `https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes/${props.quoteid}/comments.json`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            setComments(data);
            // setLoading(false);
            setCommentLoading(false);

            // console.log(comments);
          })
          .catch((error) => {
            setComments(false);
            // console.log(error, "commm");
          });
      });
  };

  // console.log(props.comments, "com");
  // console.log(Object.values(props.comments), "kalwa");
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="accordion " id="accordionExample">
          {/* {console.log(comments)} */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Comments
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {comments ? (
                  commentLoading ? (
                    <Spinner />
                  ) : (
                    <div>
                      {Object.values(comments).map((comment, index) => {
                        return (
                          <div
                            className="shadow-sm p-3 mb-5 bg-body rounded"
                            key={index}
                          >
                            <div className="d-flex justify-content-between">
                              {comment}
                              <MdDelete
                                onClick={() => deleteHandler(comment)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  <div></div>
                )}
                {commentLoading ? (
                  <div></div>
                ) : (
                  <div className="form-floating">
                    <p>
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        onChange={commentChangeHandler}
                      ></textarea>
                    </p>
                    <p>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={addCommentHandler}
                      >
                        Add Comment
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteComments;
