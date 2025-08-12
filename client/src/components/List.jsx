import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CustomDropdown from "./Dropdown";
import AddTaskModal from "./AddCardModuls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addcard, chengeFilter } from "../stores/state";
// import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Addtoken } from "../stores/state";
function NavList({ name, path, Click }) {
  const dispath = useDispatch();
  return (
    <NavLink
      onClick={() => {
        dispath(chengeFilter(Click));
      }}
      to={path}
      style={({ isActive }) =>
        isActive
          ? {
              border: "solid #8400ffff 3px",
              boxShadow: "0 0 10px #8a2be2, 0 0 20px #8a2be2 ",
            }
          : undefined
      }
      className="w-100 ps-2 p-2 text-decoration-none rounded-3"
    >
      {name}
    </NavLink>
  );
}
function List() {
  const dispath = useDispatch();
  const data = useSelector((d) => d.Card);
  const [showModal, setShowModal] = useState(false);
  const [showModalleave, setShowModalleave] = useState(false);
  const navigator = useNavigate();
  return (
    <>
      <section className="d-flex flex-column align-items-center p-4 gap-2 mb-4 bgdark">
        <h1 className="fs-5">TO-DO LIDT</h1>
        <Button
          variant="primary"
          onClick={() => {
            // dispath(Addcard({}));
            setShowModal(true);
          }}
          className="w-100 btb"
        >
          Add New Task
        </Button>
      </section>
      <section className="d-flex flex-column p-3 bgdark">
        <NavList
          name={"All tasks"}
          path={"/"}
          Click={{ name: "ALL", fake: false }}
        />
        <NavList
          name={"Importaed tasks"}
          path={"/Importaed"}
          Click={{ name: "important", fake: true }}
        />
        <NavList
          name={"Completed tasks"}
          path={"/Completed"}
          Click={{ name: "completed", fake: true }}
        />
        <NavList
          name={"Uncompleted tasks"}
          path={"/Uncompleted"}
          Click={{ name: "completed", fake: false }}
        />
        <CustomDropdown />
        <Button
          variant="destructive mt-3"
          id="leave-button"
          onClick={() => {
            setShowModalleave(true);
          }}
        >
          <DoorOpen
            className="-ms-1 me-2 opacity-60"
            size={22}
            strokeWidth={2}
            aria-hidden="true"
          />
          leave account
        </Button>
      </section>

      <AddTaskModal show={showModal} onHide={() => setShowModal(false)} />
      {showModalleave && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div className="card shadow-sm" style={{ width: 360 }}>
            <div className="card-body">
              <h5 className="mb-3">Are you sure?</h5>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModalleave(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispath(Addtoken({ token: null }));
                    setShowModalleave(false);
                    navigator("/login", { replace: true });
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default List;
