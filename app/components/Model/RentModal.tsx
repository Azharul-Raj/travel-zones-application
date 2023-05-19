"use client"
import React from 'react'
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';

function RentModal() {
    const rentModal=useRentModal()
  return (
    <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={rentModal.onClose}
    actionLabel='Rent'
    title='Rent the property'
    />
  )
}

export default RentModal;