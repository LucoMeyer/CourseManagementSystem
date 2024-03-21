import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})




export class CoursesListComponent implements OnInit {

  courseDetails: Course = {

    id: '',
    name: '',
    duration: '',
    description: ''
  
  
  };

  courses: Course[] = [];
  
  constructor(private coursesService: CoursesService,  private router: Router) { }

  ngOnInit(): void {

    this.coursesService.getAllCourses()
    .subscribe({
      next: (courses)=>{
        this.courses = courses;

      },
      error: (response)=>{
        console.log(response);
      }

    })
      
  }

  

  deleteCourse(id: string){
    this.coursesService.deleteCourse(id)
      .subscribe({
        next: (response) => {

          this.courses = this.courses.filter(course => course.id !== id);

          this.router.navigate(['courses']);
        },
        error: (response) => {
          console.log(response);
        }
      });
  }
      
  

}
