'use client';
import React, { useState } from 'react';
import Input from '@/components/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
import clsx from 'clsx';
import Loading from '../Loading';
import { phoneNumberPattern, userNamePattern } from '@/constants';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

type TVariant = 'LOGIN' | 'REGISTER';

type TData = {
  userName: string;
  password: string;
};

const LoginRegisterForm = () => {
  const [variant, setVariant] = useState<TVariant>('LOGIN');

  const onSubmit:SubmitHandler<TData> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TData>();
  return (
    <div className="flex flex-col gap-6 items-center mt-10 h-full font-poppins dark:text-white text-black">
      <Image src="/icons/messenger.png" width={200} height={200} alt="icon" />
      <div className="bg-neutral-200 rounded-md p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input id='userName' label='UserName' register={register} errors={errors} pattern={userNamePattern} text='Username must be at least 4 characters long' />

          <Button type='submit' primary title={variant === 'LOGIN' ? 'Login' : 'Register'} />
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
