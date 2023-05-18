"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io'
import Button from '../Nav/Button/Button';

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  actionLabel: string;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal: React.FC<modalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  actionLabel,
  title,
  body,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen])
  // handleClose func
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  // handleSubmit function
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit()
  }, [disabled, onSubmit])
  // handleSecondaryAction
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction()
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="
    flex justify-center items-center fixed overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none 
    focus:outline-none bg-neutral-700/70 
    ">
        <div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 md:h-auto">
          {/* Content  */}
          <div className={`transition duration-300 h-full ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}
        `}>
            <div className="flex flex-col shadow-lg rounded-lg relative h-full translate w-full bg-white md:h-auto border-0 outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-center justify-center relative border-b-[1px] rounded-t p-2">
                {/* close button */}
                <button
                onClick={handleClose}
                  className='p-1 border-0 transition absolute left-9 hover:opacity-70'
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {
                    title
                  }
                </div>
              </div>
              {/* Body */}
              <div className="relative px-6 py-3 flex-auto">
                  {
                    body
                  }
              </div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {
                      secondaryAction && secondaryActionLabel && (
                        <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} />
                      )
                  }
                  <Button label={actionLabel} disabled={disabled} onClick={handleSubmit} />
                </div>
                {footer}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default Modal;