import React from "react";
import "./modal.css";

type ModalProps = {
  children?: React.ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({ children, setShowModal }) => {
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        e.stopPropagation()
        setShowModal(false);
      }}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => {setShowModal(false)}}>
          <span className="material-symbols-rounded">close</span>
        </button>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default Modal;
