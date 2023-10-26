module.exports = {
  gameOption: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Текст кнопки', callback_data: '1' }],
        [{ text: 'Текст кнопки', callback_data: '2' }],
        [{ text: 'Текст кнопки', callback_data: '3' }],
        [{ text: 'Текст кнопки', callback_data: '4' }],
      ],
    }),
  },
  
  againOption: {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: 'Играть еще раз', callback_data: '/again' }]],
    }),
  }
}