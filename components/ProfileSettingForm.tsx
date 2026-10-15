'use client'
import React from 'react'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useCompleteProfile } from '@/hooks/useCompleteProfile'
import { CldUploadButton } from 'next-cloudinary'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useHyderation } from '@/hooks/useHyderation'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import Loading from '@/components/Loading'
import { firstNamePattern, lastNamePattern, userNamePattern } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useUser } from '@/providers/userProvider'
const ProfileSettingForm = () => {
  const { user } = useUser()
  const { isMount } = useHyderation(user)
  const router = useRouter()
  const { firstName, lastName, image, userName } = user || {}
  const pathName = usePathname()
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      image,
      userName,
    },
  })
  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, { shouldValidate: true })
  }
  const imageUrl = watch('image')
  const { data: Data, isPending, completeProfileMutate } = useCompleteProfile()
  const onSubmit: SubmitHandler<FieldValues> = data => {
    completeProfileMutate(data, {
      onSuccess: () => {
        pathName === '/mobile/completeProfile' &&
          router.push('/mobile/messages')
      },
    })
  }
  if (!isMount) {
    return null
  }

  return (
    <div className="h-full w-full flex items-center md:p-5 2xl:justify-center flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          'flex flex-col md:gap-5 2xl:gap-10 gap-4  max-h-screen overflow-y-auto items-center',
          pathName === '/completeProfile' ? 'w-[25%]' : 'w-full mt-2'
        )}>
        <p className="md:text-2xl text-md font-poppins text-center">
          {!firstName && 'Please complete your profile'}
        </p>
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-center object-cover">
            <Avatar imageUrl={imageUrl || image} className="w-32 h-32" />
          </div>
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="l7osseh6">
            <Button type="button" title="Change image" danger />
          </CldUploadButton>
        </div>
        <div className="md:space-y-3 2xl:space-y-6 space-y-5 w-full">
          <Input
            register={register}
            defaultValue={firstName}
            label="First name"
            errors={errors}
            required
            pattern={firstNamePattern}
            text="first name is invalid"
            id="firstName"
          />
          <Input
            register={register}
            defaultValue={lastName}
            label="Last name"
            errors={errors}
            required
            pattern={lastNamePattern}
            text="last name is invalid"
            id="lastName"
          />
          <Input
            register={register}
            defaultValue={userName}
            label="User name"
            errors={errors}
            pattern={userNamePattern}
            text="user name is invalid"
            id="userName"
          />
        </div>
        <div className="w-full">
          <Button
            type="submit"
            isLoading={isPending}
            primary
            title={
              pathName === '/completeProfile' ||
              pathName === '/mobile/completeProfile'
                ? 'Submit'
                : 'Edit'
            }
          />
        </div>
      </form>
    </div>
  )
}

export default ProfileSettingForm
