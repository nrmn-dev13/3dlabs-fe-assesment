// src/Modal.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { closeModal } from "../store/modalSlice";
import { IoCloseCircle } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="icon-wrapper">
          <IoCloseCircle
            className="icon"
            onClick={() => dispatch(closeModal())}
          />
        </span>

        {/* <button onClick={() => dispatch(closeModal())}>Close</button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
