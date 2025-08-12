import React, { useEffect, useState } from "react";
import { Card, Badge, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Example from "./Modal";
import { Chengcard } from "../stores/state";
import { useDispatch } from "react-redux";
import AddTaskModal from "./AddCardModuls";
function TaskCard({ indexcard, index }) {
  // console.log(indexcard.id);

  const {
    Title,
    important,
    completed,
    directory,
    Description,
    Date,
    id,
    initialSstatus,
  } = indexcard;
  // console.log(indexcard);s

  const [isStarred, setIsStarred] = useState(important);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showModal, setShowModal] = useState(false);
  const [showModaltwo, setShowModaltwo] = useState(false);
  const dispath = useDispatch();
  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  const toggleCompleted = () => {
    setIsCompleted((prev) => !prev);
  };
  useEffect(() => {
    setIsStarred(important);
    setIsCompleted(completed);
  }, [important, completed]);
  return (
    <Col xs={12} sm={6} md={4} lg={3} id={id}>
      <Card
        className="position-relative shadow-sm border-0 "
        style={{ borderRadius: "1rem", backgroundColor: "#edf1f7" }}
      >
        <Badge className="position-absolute toop end-0 m-2 px-3 py-1 btbgr">
          {directory}
        </Badge>

        <Card.Body
          className={`bgdarkblue borderred ${index == 0 && "Numberone"}`}
        >
          <Card.Title className="fw-bold">{Title}</Card.Title>
          <Card.Text
            className="mb-4 description-text"
            style={{
              fontSize: "0.85rem",
              lineHeight: "1.2rem",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2, // تا ۳ خط بیشتر نشه
              WebkitBoxOrient: "vertical",
            }}
          >
            {Description || <br />}
          </Card.Text>

          <div className="d-flex align-items-center gap-2 text-muted mb-3">
            <i className="bi bi-calendar"></i>
            <small>{Date}</small>
          </div>

          <hr className="my-3" />

          <div className="d-flex align-items-center justify-content-between">
            <Badge
              bg={isCompleted ? "success" : "secondary"}
              className={`px-3 py-2  ${
                isCompleted ? "falsecomplet" : "gradntcomplet"
              }`}
              style={{
                borderRadius: "999px",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
              onClick={() => {
                dispath(Chengcard({ id: id, name: "completed" }));
                toggleCompleted();
              }}
            >
              {isCompleted ? "completed" : "uncompleted"}
            </Badge>

            <div className="d-flex align-items-center gap-3">
              <i
                className={`bi ${
                  isStarred
                    ? "bi-star-fill text-danger"
                    : "bi-star text-secondary"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispath(Chengcard({ id: id, name: "important" }));
                  toggleStar();
                }}
              ></i>
              <i
                className="bi bi-trash icongr"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowModal(true);
                }}
              ></i>
              <i
                className="bi bi-three-dots"
                onClick={() => {
                  setShowModaltwo(true);
                }}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </Card.Body>
        <Example
          show={showModal}
          idCard={id}
          showtitel={{
            name: "Delete",
            title: "Are you sure ? ",
          }}
          handleClose={() => setShowModal(false)}
        />
        <AddTaskModal
          show={showModaltwo}
          onHide={() => setShowModaltwo(false)}
          data={{
            Title,
            status: initialSstatus,
            directory,
            Description,
            Date,
            id,
          }}
        />
      </Card>
    </Col>
  );
}

export default TaskCard;
