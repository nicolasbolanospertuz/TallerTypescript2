import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const btnfilterByCredit: HTMLElement = document.getElementById("button-filterByCreditNumber")!;
const inputMinCred: HTMLInputElement = <HTMLInputElement> document.getElementById("credMin-Box")!;
const inputMaxCred: HTMLInputElement = <HTMLInputElement> document.getElementById("credMax-Box")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredit.onclick = () => applyFilterByCreditsRange();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(students: Student[]): void {
    console.log('Desplegando estudiante');
    students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${'Código'}</td>
                             <td>${student.codigo}</td>`;
      studentTbody.appendChild(trElement);
      trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${'Cédula'}</td>
                             <td>${student.cedula}</td>`;
      studentTbody.appendChild(trElement);
      trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${'Edad'}</td>
                             <td>${student.edad}</td>`;
      studentTbody.appendChild(trElement);
      trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${'Direccion'}</td>
                             <td>${student.direccion}</td>`;
      studentTbody.appendChild(trElement);
      trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${'Teléfono'}</td>
                             <td>${student.telefono}</td>`;                                              
      studentTbody.appendChild(trElement);
    });
  }
 
  function applyFilterByCreditsRange() { 
    let minCheck = inputMinCred.value;
    let minCred = inputMinCred.valueAsNumber;
    var min: number = (minCred == null || minCheck == '')? 0 : minCred;
    let maxCheck = inputMinCred.value;
    let maxCred = inputMaxCred.valueAsNumber;
    var max: number = (maxCred == null || maxCheck == '')? 100 : maxCred;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCreditRange(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCreditRange(minimum: number, maximum: number, courses: Course[]) {
    var coursesInRange: Course[] = [];
    courses.forEach((course) => {
        if(course.credits >= minimum && course.credits <= maximum){
            coursesInRange.push(course);
        }
    });
    return coursesInRange;
  }


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}