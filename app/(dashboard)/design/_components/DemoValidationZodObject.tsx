'use client';

import { useState } from 'react';

import { validateFormObject } from '@/validations/zod';
import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';

export default function DemoValidationZodObject() {
  const { updateToast, pushToast } = useToast();
  const [userZod, setUserZod] = useState({
    username_object: '',
    email_object: '',
    age_object: '',
    password_object: '',
    confirmPassword_object: '',
  });
  const [errorsZod, setErrorsZod] = useState({
    username_object: '',
    email_object: '',
    age_object: '',
    password_object: '',
    confirmPassword_object: '',
  });
  function handleUserZodChange(e: any) {
    let valueNumber = e.target.name == 'age_object' ? Number(e.target.value) : e.target.value;
    setUserZod({
      ...userZod,
      // [e.target.name]: e.target.value,
      [e.target.name]: valueNumber,
    });
  }
  async function checkValidZodObject(e: any) {
    e.preventDefault();
    const { valid, errors } = await validateFormObject(userZod);
    if (valid) {
      const toastId = pushToast({
        message: 'Posting ZOD Object Data',
        isLoading: true,
      });
      setTimeout(() => {
        updateToast({ toastId, message: 'Success Posting ZOD Object Data', isError: false });
      }, 2000);
      setErrorsZod({
        username_object: '',
        email_object: '',
        age_object: '',
        password_object: '',
        confirmPassword_object: '',
      });
    } else {
      // @ts-ignore
      setErrorsZod(errors);
      return;
    }
  }

  return (
    <form onSubmit={checkValidZodObject}>
      <LabeledInput
        data-testid='username-object'
        label='Username'
        name='username_object'
        value={userZod.username_object}
        placeholder='Username'
        onChange={handleUserZodChange}
      />
      {errorsZod?.username_object && (
        <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.username_object}</span>
      )}
      <LabeledInput
        data-testid='email-object'
        label='Email'
        name='email_object'
        type='email'
        value={userZod.email_object}
        placeholder='Email'
        onChange={handleUserZodChange}
      />
      {errorsZod?.email_object && <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.email_object}</span>}
      <LabeledInput
        data-testid='age-object'
        type='number'
        label='Age'
        name='age_object'
        value={userZod.age_object}
        placeholder='Number'
        onChange={handleUserZodChange}
        min={0}
        onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
      />
      {errorsZod?.age_object && <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.age_object}</span>}

      <LabeledInput
        data-testid='password-object'
        type='password'
        label='Password'
        name='password_object'
        value={userZod.password_object}
        placeholder='Password'
        onChange={handleUserZodChange}
      />
      {errorsZod?.password_object && (
        <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.password_object}</span>
      )}
      <LabeledInput
        data-testid='confirmPassword-object'
        type='password'
        label='Confirm Password'
        name='confirmPassword_object'
        value={userZod.confirmPassword_object}
        placeholder='Confirm Password'
        onChange={handleUserZodChange}
      />
      {errorsZod?.confirmPassword_object && (
        <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.confirmPassword_object}</span>
      )}
      <Button type='submit'>Submit Zod Object</Button>
    </form>
  );
}
