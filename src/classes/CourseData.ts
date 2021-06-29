import { Course } from "./Course";

export class CourseData {
  public courses: Course[];
  public groupedBySem: { [sem: string]: Course[] };

  constructor() {
    this.courses = this.initializeCourses();
    this.groupedBySem = this.initializeGroupBySem();
  }

  private initializeCourses() {
    const initialCourseData = require("../data/courses.json");
    const initialCourses: CourseFromJSON[] = initialCourseData.courses;
    const courses = initialCourses.map(
      (c) =>
        new Course(
          c.id,
          c.subject,
          c.title,
          c.description,
          c.recommended_textbooks,
          c.recommended_websites,
          c.units,
          c.offered,
          c.prerequisites,
          c.requirements
        )
    );
    return courses;
  }

  private initializeGroupBySem() {
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

interface CourseFromJSON {
  id: number;
  subject: string;
  title: string;
  description: string;
  recommended_textbooks: string;
  recommended_websites: string;
  units: number;
  offered: string;
  prerequisites: string;
  requirements: string;
}
