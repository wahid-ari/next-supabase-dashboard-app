'use client';

import { useState } from 'react';

import Button from '@/components/systems/Button';
import Modal from '@/components/systems/Modal';

export default function DemoModal() {
  const [openModal, setOpenModal] = useState(false);
  const [openDangerModal, setOpenDangerModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
      <br />
      <br />

      <Modal
        data-testid='modal'
        title='Confirmation'
        open={openModal}
        showIcon
        onClose={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
      >
        Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
        consectetur aliquip mollit nisi irure quis Lorem eu non sit.
      </Modal>

      <Button.danger onClick={() => setOpenDangerModal(true)}>Open Danger Modal</Button.danger>

      <Modal
        data-testid='modal-danger'
        title='Delete Confirmation'
        open={openDangerModal}
        showIcon
        isDanger
        onClose={() => setOpenDangerModal(false)}
        onConfirm={() => setOpenDangerModal(false)}
      >
        Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
      </Modal>
    </>
  );
}
