require('babel-polyfill');

import { Schedule, ScheduleError } from '../../dist/schedule.bundle.js';
import { tablify } from './tablify';

async function log(msg) {
	console.log(msg);
	await sleep(5000);
};
async function logLong(msg) {
	console.log(msg);
	await sleep(15000);
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const prepareLessonForDisplay = l => ({
  ...l,
  classroom: l.classroom.title,
  schools: l.schools.map(s => s.title),
});

const getDisplayLessons = (lessons) => {
  const displayLessons = lessons.map(prepareLessonForDisplay);
  return tablify(displayLessons);
};

const getDisplayObjects = (objects) => {
	tablify(objects)
};

async function runForSchool (schedule) {
	await log('Получим лекции для Школы разработки интерфейсов');

  const frontendLessons = schedule.getScheduleForSchool('frontend');
	await log(getDisplayLessons(frontendLessons));

  const dateRange = {
    min: {
      date: '10.04.2017',
    },
    max: {
      date: '25.04.2017',
    }
  };
	await log('Получим лекции для Школы разработки интерфейсов в период с 10.04.2017 по 25.04.2017');
	const frontendLessonsForDate = schedule.getScheduleForSchool('frontend', dateRange);
	await log(getDisplayLessons(frontendLessonsForDate));
};

async function runForClassRoom (schedule) {
	await log('Получим лекции для аудитории с id=1');
	const lessonsForClassroom = schedule.getScheduleForClassroom('1');
	await log(getDisplayLessons(lessonsForClassroom));

	const dateRange = {
		min: {
			date: '25.04.2017',
		},
		max: {
			date: '18.05.2017',
		}
	};
	await log('Получим лекции для аудитории с id=1 в период с 25.04.2017 по 18.05.2017');
	const lessonsForClassroomAndDate = schedule.getScheduleForClassroom('1', dateRange);
	await log(getDisplayLessons(lessonsForClassroomAndDate));
};

async function runLessson () {
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
		await log('Попытка добавить лекцию с указанием несуществующих идентификаторов аудитории и школы');
		schedule.addLesson(newLesson);
	} catch (err) {
	  if (err instanceof ScheduleError) {
			await log(`Получили ошибку с текстом: ${err.message}`);
    } else {
	    throw err; // произошла не предусмотренная ошибка
    }
  }

	/** Пример корректного добавления лекции "с нуля". */

  await log('Добавим аудиторию');
	schedule.addClassroom(newClassroom);

	await log('Добавим школу');
	schedule.addSchool(newSchool);

	await log('Теперь существую валидные школа и аудитория, которую можно указать в лекции. Добавим лекциюю.');
	schedule.addLesson(newLesson);
  await log(getDisplayLessons(schedule.getLessons()));

	await log('Изменим название и преподавателя лекции');
	schedule.updateLesson('BJie7ZKPfAx', { title: 'Резиновая верстка', teacherName: 'Александр Газизов' });
	await log(getDisplayLessons(schedule.getLessons()));

  await log('Выведем все аудитории');
	await log(tablify(schedule.getClassrooms()));

	await log('Изменим название аудитории с id = 1');
	schedule.updateClassroom('1', { title: 'Красный кит' });
	await log(tablify(schedule.getClassrooms()));
};

async function runExamples () {
	const schedule = new Schedule({ mockMode: true });
	await runForSchool(schedule);
	await runForClassRoom(schedule);
	await runLessson();
}

runExamples();