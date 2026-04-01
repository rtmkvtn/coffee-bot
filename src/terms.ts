export const TERMS: Record<
  string,
  {
    text: string
    agree: string
    decline: string
    success: string
    welcomeBack: string
    declined: string
  }
> = {
  ru: {
    text:
      'Для продолжения необходимо принять условия использования сервиса.\n\n' +
      'Используя данный бот, вы соглашаетесь на обработку персональных данных ' +
      '(имя, имя пользователя Telegram) в целях оформления и выполнения заказов. ' +
      'Ваши данные не передаются третьим лицам и хранятся в соответствии с законодательством.',
    agree: 'Я согласен',
    decline: 'Отказаться',
    success: 'Спасибо! Условия приняты. Добро пожаловать!',
    welcomeBack: 'С возвращением!',
    declined: 'Без проблем! Возвращайтесь в любое время с /start',
  },
  en: {
    text:
      'To continue, please accept the terms of service.\n\n' +
      'By using this bot, you agree to the processing of your personal data ' +
      '(name, Telegram username) for the purpose of placing and fulfilling orders. ' +
      'Your data is not shared with third parties and is stored in accordance with applicable law.',
    agree: 'I agree',
    decline: 'Decline',
    success: 'Thank you! Terms accepted. Welcome!',
    welcomeBack: 'Welcome back!',
    declined: 'No problem! Come back anytime with /start',
  },
  zh: {
    text:
      '请先接受服务条款才能继续。\n\n' +
      '使用此机器人即表示您同意处理您的个人数据' +
      '（姓名、Telegram 用户名），以便下单和完成订单。' +
      '您的数据不会分享给第三方，并按照相关法律法规存储。',
    agree: '我同意',
    decline: '拒绝',
    success: '谢谢！条款已接受。欢迎！',
    welcomeBack: '欢迎回来！',
    declined: '没问题！随时使用 /start 回来',
  },
}

export function getTerms(languageCode?: string) {
  if (languageCode && languageCode in TERMS) {
    return TERMS[languageCode]
  }
  return TERMS.en
}
