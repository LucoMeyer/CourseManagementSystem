import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{


 AddCourseRequest: Course = {
id: '',
name: '',
duration: '',
description: ''


 } 
constructor(private courseService: CoursesService, private router: Router) { }

ngOnInit(): void {
    
}

addCourse(){

this.courseService.AddCourse(this.AddCourseRequest)
.subscribe({
  next: (course) => {
    this.router.navigate(['courses']);
  }

})
}

  

}
