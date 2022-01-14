import React from "react";
import { useParams, Route, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import QuoteComments from "./QuoteComments";
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dummy = [
  {
    id: "1",
    quote:
      "Spread love everywhere you go. Let no one ever come to you without leaving happier. ",
    author: "Mother Teresa",
    color: "bg-primary",
  },
  {
    id: "2",
    quote:
      "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    color: "bg-warning",
  },
];

const QuoteDetail = () => {
  // const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [quote, setQuote] = useState();
  const [reload, setReload] = useState(true);
  const [newAuthor, setNewAuthor] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [updateQuote, setUpdateQuote] = useState(false);

  const notifyWarning = () =>
    toast("Please enter valid details", {
      position: "bottom-center",
      type: "warning",
    });
  const notifySuccess = () => {
    toast("Update successful", {
      position: "bottom-center",
      type: "success",
    });
  };

  // const rel = () => {
  //   setLoading(true),
  //     fetch(
  //       "https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes.json"
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // console.log(data);
  //         const quotes = [];
  //         for (const key in data) {
  //           quotes.push({
  //             id: key,
  //             quote: data[key].quote,
  //             author: data[key].author,
  //             color: data[key].color,
  //             comments: data[key].comments,
  //           });
  //         }
  //         setQuote(quotes.find((quote) => quote.id === params.quoteid));
  //         // setNewAuthor(quote.author);
  //         // setNewQuote(quote.quote);
  //         // console.log(quotes, "indetail");
  //         setLoading(false);

  //         // setQuoteData(quotes);
  //       });
  // };

  useEffect(() => {
    setLoading(true);
    fetch("https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        const quotes = [];
        for (const key in data) {
          quotes.push({
            id: key,
            quote: data[key].quote,
            author: data[key].author,
            color: data[key].color,
            comments: data[key].comments,
          });
        }
        setQuote(quotes.find((quote) => quote.id === params.quoteid));
        // setNewAuthor(quote.author);
        // setNewQuote(quote.quote);
        // console.log(quotes, "indetail");
        setLoading(false);

        // setQuoteData(quotes);
      });
  }, []);

  // const quote = quoteData.find((quote) => quote.id === params.quoteid);
  const history = useHistory();
  // console.log(quote, "daaaa");
  const showCommentsHandler = () => {
    history.push(`/quotes/${params.quoteid}/comments`);
  };

  const authorChangeHandler = (event) => {
    setQuote((prevState) => {
      return { ...prevState, author: event.target.value };
    });
    // setNewAuthor(event.target.value);
    setUpdateQuote(true);
  };

  const quoteChangeHandler = (event) => {
    // setNewQuote(event.target.value);
    setQuote((prevState) => {
      return { ...prevState, quote: event.target.value };
    });
    setUpdateQuote(true);
  };

  const updateHandler = () => {
    // event.preventDefault();
    if (quote.quote.length < 5 || quote.author.length < 3) {
      return notifyWarning();
    }
    setLoading(true);
    fetch(
      `https://react-quotes-e0a9e-default-rtdb.firebaseio.com/quotes/${params.quoteid}.json`,
      {
        method: "PUT",
        body: JSON.stringify(quote),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data, "newwww");
        setLoading(false);
        notifySuccess();
        setUpdateQuote(false);
      })
      .catch((error) => {
        console.log(error, "errrr");
      });
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <p className="text-muted text-center">Tap on field to edit</p>
          {/* {console.log(quote, "asad")} */}
          <ToastContainer />
          <div className="card text-dark bg-white  mb-3">
            <div className="card-header">
              <input
                type="text"
                className="form-control-plaintext"
                id="staticEmail"
                value={`${quote.author}`}
                onChange={authorChangeHandler}
                style={{ padding: 10 }}
              />
            </div>
            <div className={`card-body ${quote.color}`}>
              <div className="card-title ">
                <textarea
                  type="text"
                  className="form-control-plaintext"
                  id="staticEmail"
                  value={`${quote.quote}`}
                  onChange={quoteChangeHandler}
                  style={{}}
                />
              </div>
              <p className="card-text">
                <Route path={`/quotes/${params.quoteid}`} exact>
                  <button
                    className="btn btn-primary"
                    onClick={showCommentsHandler}
                  >
                    <b>Show Comments</b>
                  </button>
                </Route>{" "}
                &nbsp;&nbsp;
                {updateQuote ? (
                  <button className="btn btn-primary" onClick={updateHandler}>
                    <b>Update</b>
                  </button>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <Route path={`/quotes/${params.quoteid}/comments`}>
            <QuoteComments
              quoteid={params.quoteid}
              comments={quote.comments}
              setReload={setReload}
              reload={reload}
            />
          </Route>
        </div>
      )}
    </div>
  );
};

export default QuoteDetail;
