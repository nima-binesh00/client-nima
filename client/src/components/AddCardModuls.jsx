import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Addcard, EditeCard } from "../stores/state";
import { useEffect } from "react";

const AddTaskModal = ({
  show,
  onHide,
  data = {
    Title: "",
    Date: "2024-10-18",
    Description: "",
    directory: "",
    status: "",
  },
}) => {
  // console.log(data);

  const dispath = useDispatch();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: { ...data },
  });
  useEffect(() => {
    if (show) {
      reset({ ...data });
    }
  }, [show]);

  function Submit(dataitem) {
    if (!data.id) {
      dispath(Addcard({ ...dataitem }));
    } else {
      dispath(EditeCard({ ...dataitem }));
    }
    // console.log(data);
    // console.log(dataitem);

    reset();
    onHide();
  }

  const selected = watch("status");
  const menu = useSelector((e) => e.Card.menudrop);
  // console.log(menu);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="custom-modal">
        <h4 className="modal-title">Add a task</h4>

        <Form onSubmit={handleSubmit(Submit)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Title">Title</Form.Label>
            <Form.Control
              id="Title"
              isInvalid={!!errors.Title}
              {...register("Title", {
                required: "Title is required",
                maxLength: {
                  value: 22,
                  message: "Max length is 22 characters",
                },
                minLength: { value: 5, message: "Min length is 5 characters" },
              })}
              type="text"
              placeholder="e.g. study for the test"
            />
            <Form.Text className="text-danger">
              {errors.Title?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="Date">Date</Form.Label>
            <Form.Control
              id="Date"
              isInvalid={!!errors.Date}
              {...register("Date", {
                required: "Date is required",
              })}
              type="date"
              defaultValue="2024-10-18"
            />
            <Form.Text className="text-danger">
              {errors.Date?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="Description">
              Description (optional)
            </Form.Label>
            <Form.Control
              id="Description"
              as="textarea"
              rows={3}
              placeholder="e.g. study for the test"
              isInvalid={!!errors.Description}
              {...register("Description", {
                maxLength: {
                  value: 30,
                  message: "Max 100 characters allowed",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.Description?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="directory">Select a directory</Form.Label>
            <Form.Select
              id="directory"
              isInvalid={!!errors.directory}
              {...register("directory", {
                required: "Please select a directory",
              })}
            >
              <option value="">-- Select --</option>
              <option value="Main">Main</option>
              {menu.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.directory?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Mark as important"
              value="important"
              checked={selected === "important"}
              onChange={() =>
                setValue("status", selected === "important" ? "" : "important")
              }
            />
            <Form.Check
              type="checkbox"
              label="Mark as completed"
              value="completed"
              checked={selected === "completed"}
              onChange={() =>
                setValue("status", selected === "completed" ? "" : "completed")
              }
            />
            <Form.Text className="text-muted">
              Only one status can be selected.
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 neon-btn"
          >
            Add a task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
