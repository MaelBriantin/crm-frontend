import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal } from '../../components/Modal';

type ModalContextType = {
  isOpen: boolean;
  showModal: (title: string, content: ReactNode, actions?: ReactNode) => void;
  closeModal: () => void;
  startCloseAnimation: boolean;
  setStartCloseAnimation: (value: boolean) => void;
  disableClose: boolean;
  setDisableClose: (value: boolean) => void;
}

export type ModalProviderProps = {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  showModal: () => { },
  closeModal: () => { },
  startCloseAnimation: false,
  setStartCloseAnimation: () => { },
  disableClose: false,
  setDisableClose: () => { }
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [disableClose, setDisableClose] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [actions, setActions] = useState<ReactNode>(null);
  const [title, setTitle] = useState('');
  const [startCloseAnimation, setStartCloseAnimation] = useState(false);

  const closeModal = () => {
    setStartCloseAnimation(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 225);
  };

  const showModal = (title: string, content: ReactNode, actions?: ReactNode) => {
    setContent(content);
    setActions(actions || null);
    setTitle(title);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ isOpen, closeModal, showModal, startCloseAnimation, setStartCloseAnimation, disableClose, setDisableClose }}>
      {children}
      {isOpen &&
        <Modal title={title} onClose={closeModal} children={content} disableClose={disableClose} actions={actions} />}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);
