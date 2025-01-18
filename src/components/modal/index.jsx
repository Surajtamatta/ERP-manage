import React, { useState, useEffect } from "react";
import { useModal } from "../../context/modalContext";
import { FaTimes } from "react-icons/fa";

const Modal = () => {
  const { isOpen, closeModal, content } = useModal();
  const [isContentLoaded, setIsContentLoaded] = useState(false);
 

  useEffect(() => {
    if (isOpen && content) {
      const loadContent = setTimeout(() => {
        setIsContentLoaded(true); 
      }, 500);  

      return () => clearTimeout(loadContent);
    } else {
      setIsContentLoaded(false);
    }
  }, [isOpen, content]);

  if (!isOpen) return null;
  if (!isContentLoaded) {
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        <div className="border-purple-200-200 h-20 w-20 animate-spin rounded-full border-8 border-t-[#d394e2]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 p-10 sm:p-5 z-50 flex items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
      <div className="relative min-w-28 rounded shadow-lg">
        {/* Close Button */}
       { isContentLoaded &&
         <button
         onClick={closeModal}
         className=" close-modal absolute z-50 top-6 right-6 text-1xl text-gray-500 hover:text-black"
       >
         <FaTimes />
       </button>
       }

        {/* Dynamic Content */}
        <div  >
          {content}
          </div>
      </div>
    </div>
  );
};

export default Modal;
