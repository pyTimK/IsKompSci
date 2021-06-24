export class Course {
  constructor(
    public id: number,
    public subject: string,
    public title: string,
    public description: string,
    public recommended_textbooks: string,
    public recommended_websites: string,
    public units: number,
    public offered: string,
    public prerequisites: string,
    public requirements: string
  ) {}
}
