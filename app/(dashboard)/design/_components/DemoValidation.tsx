'use client';

import { useState } from 'react';
import * as yup from 'yup';

import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';

export default function DemoValidation() {
  const { updateToast, pushToast, dismissToast } = useToast();

  let userSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username required')
      .matches(/^[A-Za-z]+$/, 'Username must be alphabet'),
    email: yup.string().required('Email required').email('Email must be valid').typeError('Email must be valid'),
    angka: yup
      .number()
      .required('Number required')
      .integer('Number must be integer not float')
      .typeError('Number must be valid'),
    angka_positif: yup
      .number()
      .required('Number positive required')
      .positive('Number positive must be positif')
      .integer('Number positive must be integer not float')
      .typeError('Number positive must be valid'),
  });
  const [user, setUser] = useState({
    username: '',
    email: '',
    angka: '',
    angka_positif: '',
  });
  function handleUserChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function checker(schema: any, param: any) {
    try {
      await schema.validate(param, { abortEarly: false });
      return { valid: true };
    } catch (err: any) {
      return { valid: false, errors: err.errors };
    }
  }
  async function checkValid() {
    try {
      const { valid, errors } = await checker(userSchema, user);
      if (!valid && errors) {
        dismissToast();
        errors.forEach((el: any) => {
          pushToast({ message: el, isError: true });
        });
      }
      // console.log(valid);
      // console.log(errors);
      if (valid) {
        const toastId = pushToast({
          message: 'Posting YUP Data',
          isLoading: true,
        });
        setTimeout(() => {
          updateToast({ toastId, message: 'Success Posting YUP Data', isError: false });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <LabeledInput
        data-testid='username-yup'
        label='Username'
        name='username'
        value={user.username}
        placeholder='Username'
        onChange={handleUserChange}
      />
      <LabeledInput
        data-testid='email-yup'
        label='Email'
        name='email'
        type='email'
        value={user.email}
        placeholder='Email'
        onChange={handleUserChange}
      />
      <LabeledInput
        data-testid='number-yup'
        type='number'
        label='Number'
        name='angka'
        value={user.angka}
        placeholder='Number'
        onChange={handleUserChange}
      />
      <LabeledInput
        data-testid='positive-yup'
        type='number'
        min={0}
        label='Positif Number'
        name='angka_positif'
        value={user.angka_positif}
        placeholder='Positif Number'
        onChange={handleUserChange}
      />
      <Button onClick={checkValid}>Submit Yup</Button>
    </>
  );
}
