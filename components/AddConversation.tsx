import React from 'react'
import Tooltips from './Tooltip'
import { BiSolidConversation } from 'react-icons/bi'
import { useAddConversation } from '@/hooks/useAddConversation'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import Loading from './Loading'
import { useUser } from '@/providers/userProvider'

interface AddConversationPrpos {
  data: any
  isCurrentUser?: boolean
  setOpen?: any
}

const AddConversation: React.FC<AddConversationPrpos> = ({
  data,
  isCurrentUser,
  setOpen,
}) => {
  const { _id: id, firstName, lastName } = data
  const { user } = useUser()
  const { firstName: currentFirstName, lastName: currentLastName } = user
  const { isPending, addConversationMutate } = useAddConversation()
  const handleAddConversation = () => {
    const sendData = {
      id,
      isGroup: false,
      name: `${currentFirstName} ${currentLastName} and ${firstName} ${lastName}`,
    }
    addConversationMutate(sendData, {
      onSuccess: () => setOpen(false),
    })
  }
  return (
    <>
      {isPending ? (
        <Loading width={30} height={30} />
      ) : (
        <Tooltips title={isCurrentUser ? 'Saved message' : 'Add conversation'}>
          <BiSolidConversation size={15} onClick={handleAddConversation} />
        </Tooltips>
      )}
    </>
  )
}

export default AddConversation
