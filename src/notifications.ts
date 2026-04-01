const NOTIFICATION_MESSAGES: Record<
  string,
  Record<string, (orderId: string) => string>
> = {
  ru: {
    PREPARING: (orderId) => `Ваш заказ #${orderId} готовится!`,
    COMPLETED: (orderId) => `Ваш заказ #${orderId} готов к выдаче!`,
    CANCELED: (orderId) => `Ваш заказ #${orderId} отменён.`,
  },
  en: {
    PREPARING: (orderId) => `Your order #${orderId} is being prepared!`,
    COMPLETED: (orderId) => `Your order #${orderId} is ready for pickup!`,
    CANCELED: (orderId) => `Your order #${orderId} has been canceled.`,
  },
  zh: {
    PREPARING: (orderId) => `您的订单 #${orderId} 正在准备中！`,
    COMPLETED: (orderId) => `您的订单 #${orderId} 已准备好，请取餐！`,
    CANCELED: (orderId) => `您的订单 #${orderId} 已取消。`,
  },
}

export function getNotificationMessage(
  orderId: string,
  status: string,
  locale?: string
): string | null {
  const lang =
    locale && locale in NOTIFICATION_MESSAGES ? locale : 'en'
  const messages = NOTIFICATION_MESSAGES[lang]
  const formatter = messages[status]
  if (!formatter) return null
  return formatter(orderId)
}
