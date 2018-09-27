(() => {
  const projectName = 'Keksobooking';
  const authorName = 'Svyatoslav Nesteruk';
  let currentCommand = null;
  let currentAnswer = 'default';
  const SUCCESS_EXIT_CODE = 0;
  const FAILURE_EXIT_CODE = 1;

  const commandsList = {
    '--help': () => console.log('Доступные команды:\n--help — печатает этот текст; \n--version — печатает версию приложения;'),
    '--version': () => console.log('v0.0.1'),
  };

  const msgList = {
    default: '',
    empty: () => `Привет пользователь!\nЭта программа будет запускать сервер ${projectName}.\nАвтор: ${authorName}.`,
    unknown: (commandName) => (
      `Неизвестная команда "${commandName}"\nЧтобы прочитать правила использования приложения, наберите "--help"`
    ),
  }

  function run(code) {
    if (commandsList.hasOwnProperty(currentCommand)) {
      commandsList[currentCommand]();
    } else {
      console.error(msgList[currentAnswer](currentCommand));
    }
  }

  function getCommand() {
    const result = [...process.argv].splice(2);
    return result.length ? result[0] : null;
  }

  function analizeCommand(commandName = null) {
    if (!commandName) {
      currentAnswer = 'empty';
      process.exit(SUCCESS_EXIT_CODE);
    }
    if (!commandsList.hasOwnProperty(commandName)) {
      currentAnswer = 'unknown';
      process.exit(FAILURE_EXIT_CODE);
    }
  }

  process.on('exit', (code) => run(code));

  currentCommand = getCommand();
  analizeCommand(currentCommand);
})();
