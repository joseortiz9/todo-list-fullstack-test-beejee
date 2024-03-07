import { useContext } from 'react';

import { ModalContext } from '@/providers/ModalContext';

export const useModal = () => useContext(ModalContext);
