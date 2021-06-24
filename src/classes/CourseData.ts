import { Course } from "./Course";
export class CourseData {
  public groupedBySem: { [sem: string]: Course[] };

  constructor(public version: number, public AY: string, public courses: Course[]) {
    this.groupedBySem = this.groupBySem();
  }

  private groupBySem() {
    const _groupedCourses: { [sem: string]: Course[] } = {};
    const specialCourses: { [name: string]: string[] } = {
      PE: ["1Y-1S", "1Y-2S", "2Y-1S", "2Y-2S"],
      NSTP: ["2Y-1S", "2Y-2S"],
    };

    const pushGroupedCourses = (sem: string, course: Course) => {
      if (sem in _groupedCourses) {
        _groupedCourses[sem].push(course);
      } else {
        _groupedCourses[sem] = [course];
      }
    };

    this.courses.forEach((course) => {
      if (course.subject in specialCourses) {
        specialCourses[course.subject].forEach((sem) => pushGroupedCourses(sem, course));
        return;
      }
      pushGroupedCourses(course.offered, course);
    });

    return _groupedCourses;
  }
}
