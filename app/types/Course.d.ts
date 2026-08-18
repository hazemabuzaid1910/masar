export interface Course{
    title:string,
    discription:string,
    image:string,
    price?:number,
    categories?:string[],
    mentor?:string,

}
export interface Lesson {
  id: number;
  title: string;
  duration: number;
}

interface LessonCardProps {
  lesson: Lesson;
  active: boolean;
}