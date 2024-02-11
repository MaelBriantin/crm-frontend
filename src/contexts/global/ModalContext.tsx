import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal } from '../../components/Modal';

type ModalContextType = {
  isOpen: boolean;
  showModal: (content: ReactNode, title: string, onSave: () => void) => void;
  closeModal: () => void;
}

export type ModalProviderProps = {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  showModal: () => { },
  closeModal: () => { },
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState('');
  const [onSave, setOnSave] = useState<() => void>(() => { });

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = (content: ReactNode, title: string, onSave: () => void) => {
    setContent(content);
    setTitle(title);
    setOnSave(onSave);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ isOpen, closeModal, showModal }}>
      {children}
      {isOpen &&
        <Modal title={title} onClose={closeModal} onSave={onSave} children={content} />}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);
