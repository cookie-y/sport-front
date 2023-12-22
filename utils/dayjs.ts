import calendar from 'dayjs/plugin/calendar';
import UpdateLocale from 'dayjs/plugin/UpdateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(UpdateLocale);

dayjs.updateLocale('zh-cn', {
  calendar: {
    lastDay: '[昨天] h:mm',
    sameDay: '[今天] h:mm',
    nextDay: '[明天] h:mm',
    lastWeek: 'dddd h:mm',
    nextWeek: '[下] ddd h:mm',
    sameElse: 'YYYY.MM.DD A h:mm',
  },
});
