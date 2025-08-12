import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import TaskCard from "./Cards";
import HamburgerMenu from "./moball";
import AddTaskModal from "./AddCardModuls";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../utils/Filter";
import { chengeFilter } from "../stores/state";

// import Form from "react-bootstrap/Form";
function Listtwo() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const dispath = useDispatch();
  const fakecard = useSelector((e) => e.Card.fakecard);

  const cards = Filter(fakecard, search);

  return (
    <div>
      <section className="w-100 d-flex mt-3 m-2 bgdark">
        <Form className="w-100 d-flex justify-content-between pe-2">
          <div className="w-25 d-flex gap-2">
            <HamburgerMenu />
            <Form.Control
              type="text"
              onChange={(e) => {
                // console.log(Search);
                setSearch(e.target.value);
              }}
              placeholder="Search"
              className="buttenww d-none d-md-inline-block text-primary"
            />
          </div>
          <div className="d-flex flex-column align-content-center flex-grow-1 ps-5  ms-5 flex-md-grow-0 ps-md-0">
            <h2 className=" d-md-none">TO-DO LIST</h2>
            <span className="d-block fasele">1403 , 5s , 77 </span>
          </div>
          <Button
            variant="primary"
            className="buttenww d-none d-md-block btb"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add New Task
          </Button>
        </Form>
      </section>
      <section className="m-2 mt-3">
        <Form.Control
          type="text"
          onChange={(e) => {
            // console.log(Search);
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Search"
          className="w-100 d-md-none text-primary"
        />
        <div className="fs-3 w-100 text-center text-md-start pt-2">
          Main`s Task ({cards.length})
        </div>
      </section>
      <section className="d d-flex justify-content-between m-2 boderbutten pb-2">
        <article className="d-flex gap-2 fs-5 ">
          <i className="bi bi-list-ol"></i>
          <i className="bi bi-bounding-box"></i>
        </article>
        <Form.Select
          onChange={(e) => {
            if (fakecard.name == "ALL") {
              dispath(chengeFilter({ name: "ALL", fake: e.target.value }));
            }
          }}
          aria-label="Default select example"
          className="wits"
        >
          <option>Open this select menu</option>
          <option value="1">order added</option>
          <option value="earlier-first">Ealier-first</option>
          <option value="last-first">last-first</option>
          <option value="completed">completed first</option>
          <option value="uncompleted">uncompleted first</option>
        </Form.Select>
      </section>
      <section className="mt-4 ">
        <Row className="d-flex row-gap-5 flex-wrap h-100">
          {cards.map((data, index) => (
            <TaskCard indexcard={data} index={index} />
          ))}
        </Row>
      </section>
      <AddTaskModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
}

export default Listtwo;
