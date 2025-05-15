type Language = 'en' | 'ru' | 'zh'
type CommandKey = 'start' | 'menu'

interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

type CommandTranslations = {
  [K in CommandKey]: {
    [L in Language]: string
  }
}

class LocalizationService {
  private translations: Translations = {
    welcome: {
      en: 'Welcome to Coffee Bot! 🎉\n\nUse /menu to see our menu.',
      ru: 'Добро пожаловать в Coffee Bot! 🎉\n\nИспользуйте /menu чтобы увидеть наше меню.',
      zh: '欢迎使用 Coffee Bot！🎉\n\n使用 /menu 查看我们的菜单。',
    },
    menu: {
      en: 'Our menu:\n\n☕️ Coffee:\n- Espresso\n- Americano\n- Cappuccino\n- Latte\n\n🍵 Tea:\n- Black Tea\n- Green Tea\n- Herbal Tea',
      ru: 'Наше меню:\n\n☕️ Кофе:\n- Эспрессо\n- Американо\n- Капучино\n- Латте\n\n🍵 Чай:\n- Черный чай\n- Зеленый чай\n- Травяной чай',
      zh: '我们的菜单：\n\n☕️ 咖啡：\n- 浓缩咖啡\n- 美式咖啡\n- 卡布奇诺\n- 拿铁\n\n🍵 茶：\n- 红茶\n- 绿茶\n- 花草茶',
    },
    error: {
      en: 'Sorry, something went wrong. Please try again later.',
      ru: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.',
      zh: '抱歉，出现错误。请稍后再试。',
    },
  }

  private commandTranslations: CommandTranslations = {
    start: {
      en: 'Start the bot',
      ru: 'Начать работу с ботом',
      zh: '启动机器人',
    },
    menu: {
      en: 'Show the menu',
      ru: 'Показать меню',
      zh: '显示菜单',
    },
  }

  getText(key: string, languageCode: string = 'en'): string {
    const language = this.getLanguage(languageCode)
    return (
      this.translations[key]?.[language] ||
      this.translations[key]?.['en'] ||
      key
    )
  }

  getCommandDescription(
    command: CommandKey,
    languageCode: string = 'en'
  ): string {
    const language = this.getLanguage(languageCode)
    return (
      this.commandTranslations[command][language] ||
      this.commandTranslations[command]['en'] ||
      command
    )
  }

  private getLanguage(languageCode: string): Language {
    const code = languageCode.toLowerCase().split('-')[0]
    return code === 'ru' || code === 'zh' ? code : 'en'
  }
}

export const localizationService = new LocalizationService()
