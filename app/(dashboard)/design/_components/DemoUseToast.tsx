'use client';

import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import Code from '@/components/systems/Code';

export default function DemoUseToast() {
  const { updateToast, pushToast, dismissToast } = useToast();
  function addToast() {
    pushToast({ message: 'This is a success toast message', isError: false });
  }

  function addToastError() {
    pushToast({ message: 'This is a error toast message', isError: true });
  }

  function toastAsync() {
    const toastId = pushToast({
      message: 'Loading Posting Async Data',
      isLoading: true,
    });
    setTimeout(() => {
      updateToast({ toastId, message: 'Posting Data Async Success', isError: false });
    }, 2000);
  }

  function dissmissAllToast() {
    dismissToast();
  }

  return (
    <>
      <Code
        code={`import useToast from '@utils/useToast()'

const { updateToast, pushToast, dismissToast } = useToast();

function addToast() {
  pushToast({ message: "This is a toast message", isError: false });
};

function addToastError() {
  pushToast({ message: "This is a toast message", isError: true });};

function toastAsync() {
  const toastId = pushToast({
    message: "Loading Posting Data",
    isLoading: true,
  });
  setTimeout(() => {
    updateToast({ toastId, message: "Posting Data Success", isError: false });
  }, 3000);
};

function dissmissAllToast() {
  dismissToast()
}`}
      />
      <div className='mt-4 flex flex-wrap items-center gap-2'>
        <Button data-testid='toastbutton' onClick={addToast}>
          Show Me Toast
        </Button>
        <Button.danger data-testid='toastbutton-error' onClick={addToastError}>
          Show Me Error Toast
        </Button.danger>
        <Button.success data-testid='toastbutton-async' onClick={toastAsync}>
          Toast with async
        </Button.success>
        <Button.secondary data-testid='toastbutton-dismiss' onClick={dissmissAllToast}>
          Dismiss Toast
        </Button.secondary>
      </div>
    </>
  );
}
