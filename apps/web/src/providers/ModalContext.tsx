import { type ComponentType, type PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';

import { type ModalProps } from '@/ui';

import noop from '@/utils/noop';

export enum ModalOpenState {
  Closed = 'closed',
  Closing = 'closing',
  Opened = 'opened',
}

type ModalState =
  | { status: ModalOpenState.Closed; CurrentModal: null; props: null }
  | {
      status: ModalOpenState.Closing | ModalOpenState.Opened;
      CurrentModal: ComponentType<ModalProps>;
      props: ModalProps;
    };
type ModalContext = {
  openModal: <T extends Partial<ModalProps>>(
    Modal: ComponentType<T>,
    props: Omit<T, 'isOpen' | 'onClose'> & { onClose?: () => void },
  ) => void;
  closeModal: () => void;
  getModalStatus: () => ModalState['status'];
};

const defaultState: ModalState = { status: ModalOpenState.Closed, CurrentModal: null, props: null };
export const ModalContext = createContext<ModalContext>({
  openModal: noop,
  closeModal: noop,
  getModalStatus: () => ModalOpenState.Closed,
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ModalState>(defaultState);
  const onCloseComplete = useCallback(() => setState(defaultState), []);

  const contextValue = useMemo(
    () => ({
      openModal: <T extends Partial<ModalProps>>(
        Modal: ComponentType<T>,
        props: Omit<T, 'isOpen' | 'onClose'> & { onClose?: () => void },
      ) => {
        const wrapperOnClose = () => {
          setState((prev) =>
            prev.status === ModalOpenState.Closed ||
            (prev.status === ModalOpenState.Closing && (prev.CurrentModal as unknown) !== Modal)
              ? prev
              : {
                  status: ModalOpenState.Closing,
                  CurrentModal: prev.CurrentModal,
                  props: { ...prev.props, status: false },
                },
          );
          props.onClose?.();
        };
        const wrappedOnCloseComplete = () => {
          onCloseComplete();
          props.onCloseComplete?.();
        };
        setState({
          status: ModalOpenState.Opened,
          CurrentModal: Modal as unknown as ComponentType<ModalProps>,
          props: {
            ...props,
            isOpen: true,
            children: props.children ?? <></>,
            onCloseComplete: wrappedOnCloseComplete,
            onClose: wrapperOnClose,
          },
        });
      },
      closeModal: () => onCloseComplete(),
    }),
    [onCloseComplete],
  );

  const getModalStatus = useCallback(() => state.status, [state.status]);

  return (
    <ModalContext.Provider value={{ ...contextValue, getModalStatus }}>
      {children}
      {state.status === ModalOpenState.Opened && <state.CurrentModal {...state.props} />}
    </ModalContext.Provider>
  );
};
