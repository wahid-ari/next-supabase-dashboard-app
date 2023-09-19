'use client';

import { useState } from 'react';
import { z } from 'zod';

import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';

export default function DemoValidationZod() {
  const { updateToast, pushToast, dismissToast } = useToast();

  const zodSchema = z
    .object({
      usernamee: z
        .string()
        .regex(/^[A-Za-z]+$/, { message: 'Username must be alphabet without space' })
        .min(1, { message: 'Username is required' }),
      emaill: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
      age: z
        .number({
          required_error: 'Age is required',
          invalid_type_error: 'Age is required',
        })
        .positive({ message: 'Age must be a positive number' })
        .gt(17, { message: 'Age must be a greater than 17' })
        .int({ message: 'Age must be an integer' }),
      password: z
        .string()
        .nonempty({
          message: 'Password is required',
        })
        .min(8, { message: 'Password length minimal is 8' }),
      confirmPassword: z.string().nonempty({
        message: 'Confirm Password is required',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Oops! Password doesnt match',
    });
  const [admin, setAdmin] = useState({
    usernamee: '',
    emaill: '',
    age: '',
    password: '',
    confirmPassword: '',
  });
  function handleAdminChange(e: any) {
    let valueNumber = e.target.name == 'age' ? Number(e.target.value) : e.target.value;
    setAdmin({
      ...admin,
      // [e.target.name]: e.target.value,
      [e.target.name]: valueNumber,
    });
  }
  async function checkValidZod(e: any) {
    e.preventDefault();
    try {
      const validZod = zodSchema.safeParse(admin);
      if (validZod.success === false) {
        dismissToast();
        // console.log(validZod.error);
        // console.log(validZod.error.issues);
        validZod.error.issues.forEach((el) => {
          pushToast({ message: el.message, isError: true });
        });
      } else {
        const toastId = pushToast({
          message: 'Posting ZOD Data',
          isLoading: true,
        });
        setTimeout(() => {
          updateToast({ toastId, message: 'Success Posting ZOD Data', isError: false });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <form onSubmit={checkValidZod}>
      <LabeledInput
        data-testid='username-zod'
        label='Username'
        name='usernamee'
        value={admin.usernamee}
        placeholder='Username'
        onChange={handleAdminChange}
      />
      <LabeledInput
        data-testid='email-zod'
        label='Email'
        name='emaill'
        type='email'
        value={admin.emaill}
        placeholder='Email'
        onChange={handleAdminChange}
      />
      <LabeledInput
        data-testid='age-zod'
        type='number'
        label='Age'
        name='age'
        value={admin.age}
        placeholder='Number'
        onChange={handleAdminChange}
      />
      <LabeledInput
        data-testid='password-zod'
        type='password'
        label='Password'
        name='password'
        value={admin.password}
        placeholder='Password'
        onChange={handleAdminChange}
      />
      <LabeledInput
        data-testid='confirmPassword-zod'
        type='password'
        label='Confirm Password'
        name='confirmPassword'
        value={admin.confirmPassword}
        placeholder='Confirm Password'
        onChange={handleAdminChange}
      />
      <Button type='submit'>Submit Zod</Button>
    </form>
  );
}
