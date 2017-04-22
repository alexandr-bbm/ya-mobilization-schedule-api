import { tablify } from './tablify';
import { Schedule, ScheduleError } from '../../dist/schedule.bundle.js';

const log = console.log;

const prepareLessonForDisplay = l => ({
  ...l,
  classroom: l.classroom.title,
  schools: l.schools.map(s => s.title),
});

const displayLessons = (lessons) => {
  const displayLessons = lessons.map(prepareLessonForDisplay);
  log(`Результат:\n${tablify(displayLessons)}\n`);
};

const runForSchool = (schedule) => {
	log('Получим лекции для Школы разработки интерфейсов');
  const frontendLessons = schedule.getScheduleForSchool('frontend');
  displayLessons(frontendLessons);

  const dateRange = {
    min: {
      date: '10.04.2017',
    },
    max: {
      date: '25.04.2017',
    }
  };
	log('Получим лекции для Школы разработки интерфейсов в период с 10.04.2017 по 25.04.2017');
	const frontendLessonsForDate = schedule.getScheduleForSchool('frontend', dateRange);
  displayLessons(frontendLessonsForDate);
};

const runForClassroom = (schedule) => {
	log('Получим лекции для аудитории с id=1');
	const lessonsForClassroom = schedule.getScheduleForClassroom('1');
	displayLessons(lessonsForClassroom);

	const dateRange = {
		min: {
			date: '25.04.2017',
		},
		max: {
			date: '18.05.2017',
		}
	};
	log('Получим лекции для аудитории с id=1 в период с 25.04.2017 по 18.05.2017');
	const lessonsForClassroomAndDate = schedule.getScheduleForClassroom('1', dateRange);
	displayLessons(lessonsForClassroomAndDate);
};

const runLesson = () => {
	const schedule = new Schedule();
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

	/** Пример работы с ошибками при добавлении лекции с несуществующей аудиторией и школой */
	try {
		log('Попытка добавить лекцию с указанием несуществующих идентификаторов аудитории и школы');
		schedule.addLesson(newLesson);
	} catch (err) {
	  if (err instanceof ScheduleError) {
			log(`Отловили ошибку с текстом: ${err.message}`);
    } else {
	    throw err; // произошла не предусмотренная ошибка!
    }
  }

	/** Пример корректного добавления лекции "с нуля". */

  log('\nДобавим аудиторию');
	schedule.addClassroom(newClassroom);

	log('Добавим школу');
	schedule.addSchool(newSchool);

	log('Теперь существую валидные школа и аудитория, которые можно указать в лекции. Добавим лекциюю.');
	schedule.addLesson(newLesson);
	displayLessons(schedule.getLessons());

	log('Изменим название и преподавателя лекции');
	schedule.updateLesson('BJie7ZKPfAx', { title: 'Резиновая верстка', teacherName: 'Александр Газизов' });
	displayLessons(schedule.getLessons());

  log('Выведем все аудитории');
	log(tablify(schedule.getClassrooms()) + '\n');

	log('Изменим название аудитории с id = 1');
	schedule.updateClassroom('1', { title: 'Красный кит' });
	log(tablify(schedule.getClassrooms()) + '\n');

  log('Выведем все школы');
	log(tablify(schedule.getSchools()));

	log('Изменим школу с id = frontend');
	schedule.updateSchool('frontend', { title: 'Школа разработчиков на ReactJS', studentsNumber: 12 });
	log(tablify(schedule.getSchools()));
};

const runExamples = () => {
	log('Добро пожаловать в демонстрацию возможностей библиотеки Ya-mobilization-schedule-api!');
	log('Создадим экземпляр расписания с предзаполненными данными для демонстрации возможностей фильтрации');
	const schedule = new Schedule({ mockMode: true });
	runForSchool(schedule);
	runForClassroom(schedule);
	runLesson();
};

runExamples();