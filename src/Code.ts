const env: any = getEnv();

/**
 * Главная функция
 */
function main() {
  Logger.log(env);
}

/**
 * Функция, которая будет вызываться, когда открываем приложение по ссылке
 * @returns Функция возвращает JSON (object)
 */
function doGet(e) {
  try {
    myLog(JSON.stringify(e, null, 2), 'doGet');

    const data = {
      message: 'Приложение работает',
      more: { e },
    };

    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    myLog(err, 'doGet');
  }
}

/**
 * Эта функция которую будет вызывать бот, когда ему пришлют сообщение
 * @return Функция не возвращает ничего (undefined).
 */
function doPost(e) {
  try {
    myLog(JSON.stringify(e, null, 2), 'doPost');

    if (!e?.postData?.contents) {
      throw new Error('нет тела запроса у POST');
    }
  } catch (err) {
    myLog(err, 'doPost');
  }
}

/**
 * Функция возвращает JS объект из env файла
 * @returns object
 */
function getEnv() {
  const env = {};
  const envFile = HtmlService.createHtmlOutputFromFile('env.html').getContent();
  const lines = envFile.split('\n');

  lines.forEach((el) => {
    if (el.length == 0) return;

    const myRe = new RegExp('.*=.*', 'g');
    const [result]: any = myRe.exec(el);

    if (!result) return;

    const key = result.split('=')[0];
    const value = result.split('=')[1];

    env[key] = value;
  });

  return env;
}

/**
 * Функция сохраняет array в Google Таблицу на лист sheet
 * @param sheet - лист
 * @param array - массив значений в колонках
 */
function saveToGoogleTable(sheet, array) {
  const ss = SpreadsheetApp.openById(env.APP__GOOGLE_SHEETS_ID);
  const messagesTable = ss.getSheetByName(sheet);
  messagesTable?.appendRow(array);
}

/**
 * Фукнция сохраняет сообщение message в Google Таблицу
 * @param message - сообщение
 * @param func - функция от которой пришло сообщение
 */
function myLog(message, func) {
  saveToGoogleTable('logs', [new Date(), `${message}`, func]);
}
