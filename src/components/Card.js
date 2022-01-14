import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div style={{ paddingTop: 30 }}>
      <div className="card">
        <div className="card-header">~ {props.author}</div>
        <div className={`card-body ${props.color}`}>
          <h6 className="card-text">{props.quote}</h6>
          <h4>
            <Link
              className="badge bg-dark"
              style={{ textDecoration: "none" }}
              to={`/quotes/${props.id}`}
            >
              View
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
