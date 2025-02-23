import React, { useState } from "react";
import CheckIcon from "./CheckIcon";
import Modal from "./Modal";

interface Task {
  id: string;
  title: string;
  user_email: string;
  progress: number;
  date: string;
}

interface ListItemProps {
  task: Task;
  getData: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ task, getData }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="list-item">
      <div className="task-container">
        <CheckIcon />
        <p className="task-title">{task.title}</p>
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  );
};

export default ListItem;
