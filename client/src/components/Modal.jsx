import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { DeleteCard, Addmenu, Editemenu, Deletemenu } from "../stores/state";
import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";

function Example({ show, handleClose, showtitel, idCard = 99 }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { name, title } = showtitel;
  // console.log(idCard);
  const dispath = useDispatch();
  const submet = (data) => {
    // console.log("ok");

    if (name === "Delete") {
      dispath(DeleteCard({ id: idCard }));
    } else if (name == "Create") {
      dispath(Addmenu({ name: data.name }));
    } else if (name == "Edite") {
      const { lastname } = showtitel;
      dispath(Editemenu({ name: lastname, newname: data.name }));
    } else {
      console.log(data);
    }

    reset();
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(submet)}>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="name" className="mb-2">
              {name === "Delete"
                ? "This task will be deleted permanently"
                : "Title"}
              {name == "Delete menu"
                ? "This task will be deleted permanently"
                : "Title"}
            </Form.Label>

            {name !== "Delete" && name !== "Delete menu" && (
              <>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Enter a directory name"
                  className="p-2"
                  isInvalid={!!errors.name}
                  {...register("name", {
                    required: "Directory name is required",
                    maxLength: {
                      value: 15,
                      message: "Maximum 15 characters allowed",
                    },
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters required",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.name?.message}
                </Form.Text>
              </>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {(name === "Delete" || name == "Delete menu") && (
            <Button
              variant="secondary"
              onClick={handleClose}
              className="d-flex align-items-center gap-2 px-4"
            >
              <i className="bi bi-x-circle"></i>
              Cancel
            </Button>
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              if (name == "Delete menu") {
                const { lastname } = showtitel;
                // console.log(lastname);
                dispath(Deletemenu({ name: lastname }));
                reset();
                handleClose();
              }
              // console.log("popop");
            }}
            className="d-flex align-items-center gap-2 px-4"
            style={{ backgroundColor: "#530cafff", border: "none" }}
          >
            <i className="bi bi-folder-plus"></i>
            {name}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Example;
