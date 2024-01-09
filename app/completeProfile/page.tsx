'use client'

import Loading from '@/components/Loading'
import ProfileSettingForm from '@/components/ProfileSettingForm'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useRouter } from 'next/navigation'

const CompleteProfile = () => {
  const { isSuccess, user } = useIsSuccessUser()
  const router = useRouter()
  if (user?.firstName) {
    router.push('/messages')
    return
  }
  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center h-full bg-light dark:bg-secondary">
        <Loading width={200} height={100} />
      </div>
    )
  }
  return <ProfileSettingForm />
}

export default CompleteProfile
