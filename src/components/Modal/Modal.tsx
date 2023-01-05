import React from "react";
import "./modal.css";

type ModalProps = {
  heading?: string,
  children?: React.ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({ heading, children, setShowModal }) => {
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        e.stopPropagation()
        setShowModal(false);
      }}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p className="modal-heading">{heading}</p>
          <button className="close-modal-btn" onClick={() => {setShowModal(false)}}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default Modal;
