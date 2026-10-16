import { getMessages } from '@/Services/messageService'
import { useQuery } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
export function useGetMessages(id: FieldValues) {
  const { data: messages, isPending } = useQuery({
    queryFn: () => getMessages({ id }),
    // id در کلید است تا پیام‌های یک گفتگو داخل گفتگوی دیگر نمایش/ارسال نشود
    queryKey: ['get-messages', id],
  })
  return { messages, isPending }
}
