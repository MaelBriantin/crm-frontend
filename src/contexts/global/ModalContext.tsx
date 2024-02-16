import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal } from '../../components/Modal';

type ModalContextType = {
  isOpen: boolean;
  showModal: (content: ReactNode, title: string) => void;
  closeModal: () => void;
  startCloseAnimation: boolean;
  setStartCloseAnimation: (value: boolean) => void;
}

export type ModalProviderProps = {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  showModal: () => { },
  closeModal: () => { },
  startCloseAnimation: false,
  setStartCloseAnimation: () => { }
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState('');
  const [startCloseAnimation, setStartCloseAnimation] = useState(false);

  const closeModal = () => {
    setStartCloseAnimation(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 225);
  };

  const showModal = (content: ReactNode, title: string) => {
    setContent(content);
    setTitle(title);
    setIsOpen(true);
  };



  return (
    <ModalContext.Provider value={{ isOpen, closeModal, showModal, startCloseAnimation, setStartCloseAnimation }}>
      {children}
      {isOpen &&
        <Modal title={title} onClose={closeModal} children={content} />}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);
