import React, { useEffect, useState } from "react";
// import { useState } from "react/cjs/react.development";
import Card from "./Card";
import Spinner from "./Spinner";

// const Dummy = [
//   {
//     id: "1",
//     quote:
//       "Spread love everywhere you go. Let no one ever come to you without leaving happier. ",
//     author: "Mother Teresa",
//     color: "bg-primary",
//   },
//   {
//     id: "2",
//     quote:
//       "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
//     author: "Benjamin Franklin",
//     color: "bg-warning",
//   },
// ];

const AllQuotes = () => {
  const [quoteData, setQuoteData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true),
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
          });
        }
        setLoading(false);
        setQuoteData(quotes);
      })
      .catch((error) => {
        setQuoteData(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : quoteData ? (
        quoteData.map((quote) => (
          <Card
            key={quote.id}
            id={quote.id}
            author={quote.author}
            quote={quote.quote}
            color={quote.color}
          />
        ))
      ) : (
        <p className="text-muted">No quotes</p>
      )}
    </div>
  );
};

export default AllQuotes;
