// src/store/useModalStore.ts
import React from "react";
import { create } from "zustand";

interface IModalContent {
  title?: string;
  description?: string;
  node?: React.ReactNode;
  buttonText?: string;
  callbackOnClose?: () => void;
}

interface ModalState {
  isVisible: boolean;
  modalContent?: IModalContent;
  openModal: (modalContent?: IModalContent) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isVisible: false,
  openModal: (modalContent?: IModalContent) =>
    set({ isVisible: true, modalContent }),
  closeModal: () => set({ isVisible: false, modalContent: undefined }),
}));
