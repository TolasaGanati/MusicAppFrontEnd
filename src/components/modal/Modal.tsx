import React from "react";
import { Overlay, ModalContent } from "./modalStyle"; // Import your styled components

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Overlay onClick={onClose} open={true}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
