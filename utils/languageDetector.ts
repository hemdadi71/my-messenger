var persianRex = require('persian-rex')

export function languageDetector(text: string) {
  const persianAlphabets = [
    'ا',
    'آ',
    'ب',
    'پ',
    'ت',
    'ث',
    'ج',
    'چ',
    'ح',
    'خ',
    'د',
    'ذ',
    'ر',
    'ز',
    'ژ',
    'س',
    'ش',
    'ص',
    'ض',
    'ط',
    'ظ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ک',
    'گ',
    'ل',
    'م',
    'ن',
    'و',
    'ه',
    'ی',
    'ئ',
  ]
  const isPersian = persianAlphabets.some(item => text?.startsWith(item))
  return isPersian
}
