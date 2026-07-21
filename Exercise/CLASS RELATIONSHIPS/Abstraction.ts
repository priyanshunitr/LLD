// Online Course Platform

class Instructor {
    private name: string;
    private courses: Course[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addCourse(course: Course): void {
        // TODO: Add course to list and set this as the course's instructor
        this.courses.push(course);
        course.setInstructor(this);
    }

    getName(): string { return this.name; }
    getCourses(): Course[] { return this.courses; }
}

class Course {
    private title: string;
    private instructor?: Instructor;
    private students: Student[] = [];

    constructor(title: string) {
        this.title = title;
    }

    setInstructor(instructor: Instructor): void {
        // TODO: Set the instructor reference
        this.instructor=instructor;
    }

    enrollStudent(student: Student): void {
        // TODO: Add student to list and set this as the student's enrolled course
        this.students.push(student);
        student.setEnrolledCourse(this);
    }

    getTitle(): string { return this.title; }
    getInstructor(): Instructor | undefined { return this.instructor; }
    getStudents(): Student[] { return this.students; }
}

class Student {
    private name: string;
    private enrolledCourse?: Course;

    constructor(name: string) {
        this.name = name;
    }

    setEnrolledCourse(course: Course): void {
        // TODO: Set the enrolled course reference
        this.enrolledCourse = course ; 
    }

    getInstructorName(): string {
        // TODO: Navigate through enrolledCourse to get the instructor's name
        // Return "No instructor" if course or instructor is undefined
        return this.enrolledCourse?.getInstructor()?.getName() ?? "No instructor";
    }

    getName(): string { return this.name; }
    getEnrolledCourse(): Course | undefined { return this.enrolledCourse; }
}

const alice = new Instructor("Alice");
const dsa = new Course("Data Structures");
const sysDesign = new Course("System Design");

alice.addCourse(dsa);
alice.addCourse(sysDesign);

const bob = new Student("Bob");
const charlie = new Student("Charlie");

dsa.enrollStudent(bob);
dsa.enrollStudent(charlie);
sysDesign.enrollStudent(charlie);

console.log(`${alice.getName()}'s courses:`);
for (const c of alice.getCourses())
    console.log(`  - ${c.getTitle()}`);

console.log(`Students in ${dsa.getTitle()}:`);
for (const s of dsa.getStudents())
    console.log(`  - ${s.getName()}`);

console.log(`${bob.getName()}'s instructor: ${bob.getInstructorName()}`);