import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var btnfilterByCredit = document.getElementById("button-filterByCreditNumber");
var inputMinCred = document.getElementById("credMin-Box");
var inputMaxCred = document.getElementById("credMax-Box");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredit.onclick = function () { return applyFilterByCreditsRange(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + 'Código' + "</td>\n                             <td>" + student.codigo + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + 'Cédula' + "</td>\n                             <td>" + student.cedula + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + 'Edad' + "</td>\n                             <td>" + student.edad + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + 'Direccion' + "</td>\n                             <td>" + student.direccion + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + 'Teléfono' + "</td>\n                             <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByCreditsRange() {
    var minCheck = inputMinCred.value;
    var minCred = inputMinCred.valueAsNumber;
    var min = (minCred == null || minCheck == '') ? 0 : minCred;
    var maxCheck = inputMinCred.value;
    var maxCred = inputMaxCred.valueAsNumber;
    var max = (maxCred == null || maxCheck == '') ? 100 : maxCred;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditRange(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCreditRange(minimum, maximum, courses) {
    var coursesInRange = [];
    courses.forEach(function (course) {
        if (course.credits >= minimum && course.credits <= maximum) {
            coursesInRange.push(course);
        }
    });
    return coursesInRange;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
