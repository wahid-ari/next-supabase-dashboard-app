'use client';

import { useState } from 'react';

import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';

export default function DemoDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDangerDialog, setOpenDangerDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
      <br />
      <br />

      <Dialog
        data-testid='dialog'
        title='Confirmation'
        open={openDialog}
        showIcon
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => setOpenDialog(false)}
      >
        Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
        consectetur aliquip mollit nisi irure quis Lorem eu non sit.
      </Dialog>

      <Button.danger onClick={() => setOpenDangerDialog(true)}>Open Danger Dialog</Button.danger>

      <Dialog
        data-testid='dialog-danger'
        title='Delete Confirmation'
        open={openDangerDialog}
        showIcon
        isDanger
        setOpen={setOpenDangerDialog}
        onClose={() => setOpenDangerDialog(false)}
        onConfirm={() => setOpenDangerDialog(false)}
      >
        Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
      </Dialog>
    </>
  );
}
