import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";

interface ListHeaderProps {
  listName: string;
  getData: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["AuthToken", "Email"]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const Logout = () => {
    console.log("Logout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="ListHeader">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="New" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="Logout" onClick={Logout}>
          Log Out
        </button>
      </div>
      {showModal && <Modal mode={"new"} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
};

export default ListHeader;
