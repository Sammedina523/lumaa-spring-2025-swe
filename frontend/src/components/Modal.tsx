import React, { useState, FormEvent, ChangeEvent } from "react";
import { useCookies } from "react-cookie";

interface Task {
  id: string;
  user_email: string;
  title: string;
  progress: number;
  date: string;
}

interface ModalProps {
  mode: "edit" | "new";
  setShowModal: (show: boolean) => void;
  getData: () => void;
  task?: Task;
}

const Modal: React.FC<ModalProps> = ({ mode, setShowModal, getData, task }) => {
  const [cookies] = useCookies(["AuthToken", "Email"]);
  const editMode = mode === "edit";

  const [data, setData] = useState<Task>({
    id: task?.id || "",
    user_email: editMode ? task?.user_email || "" : cookies.Email,
    title: editMode ? task?.title || "" : "",
    progress: editMode ? task?.progress || 0 : 0,
    date: editMode ? task?.date || "" : new Date().toISOString().split("T")[0],
  });

  const postData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      console.log("Task added successfully");
      setShowModal(false);
      getData();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const editData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      console.log("Task updated successfully");
      setShowModal(false);
      getData();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-container">
          <h3>{editMode ? "Edit your task" : "Add a new task"}</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form onSubmit={editMode ? editData : postData}>
          <input
            required
            maxLength={30}
            placeholder="Your task"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <input className={mode} type="submit" value={editMode ? "Update Task" : "Add Task"} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
