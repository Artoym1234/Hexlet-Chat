export default {
  translation: {
    header: {
      button_exit: 'Выйти',
      title: 'Hexlet chat',
    },

    logIn: {
      title: 'Войти',
      button: 'Войти',
      new_user: 'Нет аккаунта?',
      errors: {
        authorization: 'Неверные имя пользователя или пароль',
        network_error: 'Ой, что-то пошло не так',
      },
    },
    placeholder: {
      username: 'Имя пользователя',
      username_login: 'Ваш ник',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      input_message: 'Введите сообщение...',
      // new_message: 'Новое сообщение',
    },
    signUp: {
      title: 'Регистрация',
      button: 'Зарегистироваться',
      errors: {
        user_registered: 'Такой пользователь уже существует',
        network_error: 'Ой, что-то пошло не так',
      },
    },

    notFound: {
      title: 'Страница не найдена.',
      feedback: 'Но вы можете перейти',
      link: 'на главную страницу.',
    },

    channels: {
      title: 'Каналы',
      name: 'Имя канала',
      control: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
      modal: {
        add_title: 'Добавить канал',
        rename_title: 'Переименовать',
        remove_title: 'Удалить канал',
        confirm: 'Вы уверены?',
        send_button: 'Отправить',
        cancel_button: 'Отменить',
      },
    },
    chat_container: {
      message_one: '{{count}} сообщениe',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      send: 'Отправить',
    },
    feedback: {
      error: 'Ошибка',
      error_network: 'Ошибка соединения',
      channel_add: 'Канал создан',
      channel_remove: 'Канал удалён',
      channel_rename: 'Канал переименован',
    },
  },
};
