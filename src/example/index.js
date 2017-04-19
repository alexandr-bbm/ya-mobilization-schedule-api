import { Schedule, ScheduleError } from '../../dist/schedule.bundle.js';
import { tablify } from './tablify';

const log = console.log;

const prepareLessonForDisplay = l => ({
  ...l,
  classroom: l.classroom.title,
  schools: l.schools.map(s => s.title),
});

const getDisplayLessons = (lessons) => {
  console.log(`Results found: ${lessons.length}`);
  const displayLessons = lessons.map(prepareLessonForDisplay);
  return tablify(displayLessons);
};

const getDisplayObjects = (objects) => {
	tablify(objects)
};

const runForSchool = (schedule) => {
  const frontendLessons = schedule.getScheduleForSchool('frontend');
  console.log(getDisplayLessons(frontendLessons));

  const dateRange = {
    min: {
      date: '10.04.2017',
    },
    max: {
      date: '25.04.2017',
    }
  };
  const frontendLessonsForDate = schedule.getScheduleForSchool('frontend', dateRange);
  console.log(getDisplayLessons(frontendLessonsForDate));
};

const runForClassRoom = (schedule) => {
	const lessonsForClassroom = schedule.getScheduleForClassroom('1');
	console.log(getDisplayLessons(lessonsForClassroom));


	const dateRange = {
		min: {
			date: '25.04.2017',
		},
		max: {
			date: '18.05.2017',
		}
	};
	const lessonsForClassroomAndDate = schedule.getScheduleForClassroom('1', dateRange);
	console.log(getDisplayLessons(lessonsForClassroomAndDate));
};

const runLessson = () => {
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
		"title": "Адаптивная вёрстка",
		"teacherName": "Дмитрий Душкин",
		"id": "BJie7ZKPfAx",
		"schoolIds": ["frontend"],
		"classroomId": "1",
		"date": "08.05.2017",
		"timeStart": "14:00",
		"timeEnd": "16:00"
  };

	/** Пример работы с ошибками при добавлении лекции с несуществующей аудиторией и школой */
	try {
		schedule.addLesson(newLesson);
	} catch (err) {
	  if (err instanceof ScheduleError) {
	    console.error(err.message + '\n');
    } else {
	    throw err;
    }
  }

	/** Пример корректного добавления лекции "с нуля". */

  /** Добавим аудиторию */
	schedule.addClassroom(newClassroom);

	/** Добавим школу */
	schedule.addSchool(newSchool);

	/** Теперь существует школа и аудитория, которую можно указать в лекции. Добавим лекциюю. */
	schedule.addLesson(newLesson);
  log(getDisplayLessons(schedule.getLessons()));

	/** Изменим лекцию */
	schedule.updateLesson('BJie7ZKPfAx', { title: 'Резиновая верстка', teacherName: 'Александр Газизов' });
  log(getDisplayLessons(schedule.getLessons()));

  /** Изменим аудиторию */
	log(tablify(schedule.getClassrooms()));
	schedule.updateClassroom('1', { title: 'Красный кит' });
	log(tablify(schedule.getClassrooms()));
};

const runExamples = () => {
	const schedule = new Schedule({ mockMode: true });
	// runForSchool(schedule);
	// runForClassRoom(schedule);
	runLessson();
};

runExamples();