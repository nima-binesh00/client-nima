import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Example from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { chengeFilter } from "../stores/state";

function Dropdownitem({ setShowModal, setshowtitel, id, name }) {
  const dispath = useDispatch();

  return (
    <Dropdown.Item
      className="w-100 d-flex justify-content-between hovericon bgdark"
      id={id}
      as={NavLink}
      to={`/menu/${String(id + 1)}`}
      style={({ isActive }) =>
        isActive
          ? {
              border: "solid #8400ffff 3px",
              boxShadow: "0 0 10px #8a2be2, 0 0 20px #8a2be2 ",
            }
          : null
      }
      onClick={(e) => {
        dispath(chengeFilter({ name: "directory", fake: name }));
        e.stopPropagation();
      }}
    >
      <span> {name}</span>
      <span>
        <i
          className="bi bi-pencil-square p-1 d-none icondisply"
          onClick={() => {
            setshowtitel({
              name: "Edite",
              lastname: name,
              title: "Edite directory name ",
            });
            setShowModal(true);
          }}
        ></i>
        <i
          className="bi bi-trash3 p-1 d-none  icondisply"
          onClick={() => {
            setshowtitel({
              name: "Delete menu",
              lastname: name,

              title: "Are you sure ? ",
            });
            setShowModal(true);
          }}
        ></i>
      </span>
    </Dropdown.Item>
  );
}
function CustomDropdown() {
  const dispath = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showtitel, setshowtitel] = useState({
    name: "Edite",
    title: "Edite directory name ",
  });
  const itemdrop = useSelector((e) => e.Card.menudrop);
  // console.log(itemdrop);

  const toggleDropdown = () => setShowMenu((prev) => !prev);
  const [showModal, setShowModal] = useState(false);
  return (
    <Dropdown show={showMenu} className="ps-2 bgdark">
      <Dropdown.Toggle
        className="w-100 text-decoration-none rounded-3 ps-1 p-2 bgdark"
        as={NavLink}
        onClick={toggleDropdown}
        to="/menu"
        style={({ isActive }) =>
          isActive
            ? {
                border: "solid #8400ffff 3px",
                boxShadow: "0 0 10px #8a2be2, 0 0 20px #8a2be2 ",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                userSelect: "none",
              }
            : {
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                userSelect: "none",
              }
        }
      >
        menu
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100 nullborder bgdark">
        {itemdrop.map((item, index) => {
          return (
            <Dropdownitem
              setShowModal={setShowModal}
              setshowtitel={setshowtitel}
              id={index}
              name={item}
            />
          );
        })}
        <Dropdown.Item
          className="w-100 d-flex justify-content-between  bgdark"
          as={NavLink}
          to="/menu/0"
          style={({ isActive }) =>
            isActive
              ? {
                  border: "solid #8400ffff 3px",
                  boxShadow: "0 0 10px #8a2be2, 0 0 20px #8a2be2 ",
                }
              : null
          }
          onClick={(e) => {
            e.stopPropagation();

            dispath(chengeFilter({ name: "directory", fake: "Main" }));
          }}
        >
          <span> Main</span>
          <span>
            <i
              class="bi bi-pencil-square p-1 d-none icondisply"
              onClick={() => {
                setshowtitel({
                  name: "Edite",
                  title: "Edite directory name ",
                });
                setShowModal(true);
              }}
            ></i>
            <i
              class="bi bi-trash3 p-1 d-none icondisply"
              onClick={() => {
                setshowtitel({
                  name: "Delete",
                  title: "Are you sure ? ",
                });
                setShowModal(true);
              }}
            ></i>
          </span>
        </Dropdown.Item>

        <Dropdown
          className="w-100 mt-3"
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",

            userSelect: "none",
          }}
          onClick={() => {
            setshowtitel({
              name: "Create",
              title: "Create new directory",
            });
            setShowModal(true);
          }}
        >
          <span className="dashboredr p-1 rounded-3">
            <i className="bi bi-plus-circle p-1"></i>
            <span>New</span>
          </span>
        </Dropdown>
      </Dropdown.Menu>
      <Example
        show={showModal}
        showtitel={showtitel}
        handleClose={() => setShowModal(false)}
      />
    </Dropdown>
  );
}

export default CustomDropdown;
