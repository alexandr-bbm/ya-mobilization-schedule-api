## Описание библиотеки

### Общие сведения
* Библиотека написана на TypeScript. TypeScript добавляет в JavaScript типизацию,
становится легче писать, поддерживать и документировать код, особенно при работе с моделями данных.
* Основная функциональность библиотеки покрыта тестами на Jest.
* Конечный бандл библиотеки `dist/schedule.bundle.js` является UMD-модулем.

### Подключение
#### Через скрипт тег

Вставьте скрипт-тег на вашу страницу.
```
<script src="https://alexandr-bbm.github.io/ya-mobilization-schedule-api/dist/schedule.bundle.js"></script>
<script>
    var Schedule = ScheduleLib.Schedule;
    var ScheduleError = ScheduleLib.ScheduleError;
    var schedule = new Schedule();
</script>
```

#### Через npm
Установите зависимость:
```
npm i alexandr-bbm/ya-mobilization-schedule-api -D
```

Подключите библиотеку в вашем проекте:
```
import { Schedule, ScheduleError } from 'ya-mobilization-schedule-api/dist/schedule.bundle.js';
const schedule = new Schedule();
```

#### Базовый пример использования библиотеки:

```
const newClassroom = {
    id: '1',
    title: 'ауд. Синий кит',
    capacity: 63,
    locationDescription: 'Прямо направо по лестнице в синий кит',
};
const newSchool =   {
    id: 'frontend',
    title: 'Школа разработки интерфейсов',
    studentsNumber: 43,
};
const newLesson = {
    title: "Адаптивная вёрстка",
    teacherName: "Дмитрий Душкин",
    id: "BJie7ZKPfAx",
    schoolIds: ["frontend"],
    classroomId: "1",
    date: "08.05.2017",
    timeStart: "14:00",
    timeEnd: "16:00"
};
const dateRange = {
    min: {
        date: '25.04.2017',
    },
    max: {
        date: '18.05.2017',
    }
};
schedule.addClassroom(newClassroom);
schedule.addSchool(newSchool);
schedule.addLesson(newLesson);
console.log(schedule.getScheduleForSchool('frontend', dateRange));
/* output:
[{
    title: "Адаптивная вёрстка",
    teacherName: "Дмитрий Душкин",
    id: "BJie7ZKPfAx",
    schools: [{
        id: 'frontend',
        title: 'Школа разработки интерфейсов',
        studentsNumber: 43,
    }],
    classroom: {
       id: '1',
       title: 'ауд. Синий кит',
       capacity: 63,
       locationDescription: 'Прямо направо по лестнице в синий кит',
    },
    date: "08.05.2017",
    timeStart: "14:00",
    timeEnd: "16:00"
}];
*/
```
Больше примеров можно найти в `src/example/index.js`

### Интерфейсы
#### ISchedule
Реализован в классе Schedule.
```
{
  lessons: ILesson[],
  schools: ISchool[],
  classrooms: IClassroom[];
}
```
#### IScheduleConstructorOptions
Интерфейс объекта настроек, передаваемый в конструктор класса Schedule
```
{
    data?: ISchedule // данные для инициализации расписания.
    mockMode?: boolean // флаг для создания расписания с тестовыми данными.
}
```
#### ILesson
Интерфейс лекции. Реализован в классе Lesson.
```
{
  id: string;
  title: string;
  teacherName: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  classroomId: string;
  schoolIds: string[];
}
```
#### IScheduleLesson
Интерфейс лекции для вывода (в отличии от ILesson вместо полей classroomId
и schoolIds имеет classroom и schools)
```
{
  id: string;
  title: string;
  teacherName: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  classroom: IClassroom;
  schools: ISchool[];
}
```
#### IClassroom
Интерфейс аудитории. Реализован в классе Classroom.
```
{
  id: string;
  title: string;
  capacity: number;
  locationDescription: string;
}
```
#### ISchool
Интерфейс школы. Реализован в классе School.
```
{
  id: string;
  title: string;
  studentsNumber: number;
}
```

#### IInputDateRange
Интерфейс ввода интервала дат для фильтрации расписания.
```
{
  min: {
    date: string; // формат 'dd.mm.yyyy'
    time?: string; // формат 'hh:mm'
  };
  max: {
    date: string;
    time?: string;
  };
}
```

### Класс Schedule
#### constructor(options?: IScheduleConstructorOptions): Schedule

#### getScheduleForSchool (schoolId: string, dateRange?: IInputDateRange): IScheduleLesson[]
Просмотр расписания школы в заданный интервал дат.
* schoolId - идентификатор школы.
* dateRange - интервал дат.

#### getScheduleForClassroom (classroomId: string, dateRange?: IInputDateRange): IScheduleLesson[]
Просмотр графика лекций в аудитории в заданный интервал дат.
* classroomId - идентификатор аудитории.
* dateRange - интервал дат.

#### addLesson (lesson: ILesson): void
Добавить лекцию.
При добавлении осуществляются следующие проверки:
* Валидность `lesson.classroomId` и `lesson.schoolIds`
(объекты с этими идентификаторами должны существовать)
* Уникальность `lesson.id`.
* Вместимость аудитории должна быть больше или равной количеству студентов на лекции.
* Для одной школы не может быть двух лекций одновременно.
* В одной аудитории не может быть одновременно двух разных лекций.
* Время начала пары должно быть раньше времени конца.

#### addSchool (school: ISchool): void
Добавить школу.
* Проверка уникальности `school.id`.

#### addClassroom (classroom: IClassroom): void
Добавить аудиторию.
* Проверка уникальности `classroom.id`.


#### getLessons (): IScheduleLesson[]
Получить весь график лекций.
#### getClassrooms (): IClassroom[]
Получить все аудитории.
#### getSchools (): ISchool[]
Получить все школы.

#### updateLesson (id, lesson: ILesson): IScheduleLesson[]
Редактировать лекцию.
* `id` - идентификатор редактируемой лекции (проверяется валидность `id`)
* `lesson` - объект с новыми значениями (проверяется наличие переданных ключей `lesson` в редактируемом объекте)

#### updateClassroom (id: string, classroom: IClassroom): Classroom[]
Редактировать аудиторию.
* `id` - идентификатор редактируемой аудитории (проверяется валидность `id`)
* `classroom` - объект с новыми значениями (проверяется наличие переданных ключей `classroom` в редактируемом объекте)

#### updateSchool (id: string, school: ISchool): ISchool[]
Редактировать школу.
* `id` - идентификатор редактируемой школы (проверяется валидность `id`)
* `school` - объект с новыми значениями (проверяется наличие переданных ключей `school` в редактируемом объекте)

#### getScheduleData (): ISchedule
Получить снимок состояния данных библиотеки.
Результат может быть использован для последующего восстановления состояния.

#### reset (data?: ISchedule): void
Сбрасывает расписание: удаляет все лекции, школы и аудитории.
* data - данные, которыми необходимо заполнить расписание.

### Класс ScheduleError
При непрохождении любой из проверок библиотеки будет брошена ошибка класса `ScheduleError`
Пример:
```
import { Schedule, ScheduleError } from '../../dist/schedule.bundle.js';
const schedule = new Schedule();

/** Работа с ошибками на примере добавлении лекции с несуществующей аудиторией и школой */
try {
    log('Попытка добавить лекцию с указанием несуществующих идентификаторов аудитории и школы');
    schedule.addLesson(newLesson);
} catch (err) {
  if (err instanceof ScheduleError) {
        console.log(`Отловили библиотечную ошибку с текстом: ${err.message}`);
} else {
    throw err; // произошла непредусмотренная ошибка!
  }
}
```

## Пример использования
### Модульное подключение
* Пример использования библиотеки - файл  `src/example/index.js`. Он играет роль модуля проекта, в который подключается библиотека.
* В нем разработанная бибилотека подключается из бандла `dist/schedule.bundle.js`
* Демонстрируется работа основных функций.
* При знакомстве с возможностями библиотеки рекомендуется совместное изучение кода `src/example/index.js` вместе с выводом консоли.
* Бандл примера собирается в бандл `example.bundle.js`.

`npm run example` - исполняет демонстрационный бандл в среде NodeJS.

`open index.html` - открывает html страницу, вывод происходит в консоль браузера.

### Подключение при помощи скрипт-тега
Все методы библиотеки, описанные в примере для модульного подключения, справедливы и при подключении
бибилиотеки при помощи скрипт-тега напосредственно в html-странице. Но для наглядности приведен базовый пример в
`script-example.html`


## Разработка
`npm start` - разработка (одновременно для самой бибилиотеки и для файлов демонстрации)

`npm run test` - запустить тесты

`npm run example` - запуск файла демонстрации возможности библиотеки.

## Мысли
Неоднозначный для меня вопрос, как в этом задании следовало хранить данные в моделях на клиенте.
С одной стороны, нужно хранить id связанных моделей, чтобы не дублировать данные,
с другой - пользователю нужно получать всю информацию о связанных моделях: оставлять ли эту работу пользователю
или реализовывать в самой библиотеке? В реальной жизни это, в конечном итоге определяется решаемой задачей,
способом постоянного хранения данных, серверным API.