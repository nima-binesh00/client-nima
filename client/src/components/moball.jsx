import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import List from "./List";

function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-xxl-none position-relative">
      <Button
        variant="light"
        className="position-relative z-3"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-list fs-2"></i>
      </Button>

      {open && (
        <div
          className="position-absolute top-100 start-0 mt-2 bg-white shadow rounded p-3 z-2"
          style={{ minWidth: "200px" }}
        >
          <List />
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
