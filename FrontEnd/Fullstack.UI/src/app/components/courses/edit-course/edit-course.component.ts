import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/courses.model';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit{


courseDetails: Course = {

  id: '',
  name: '',
  duration: '',
  description: ''


};

constructor(private route: ActivatedRoute, private courseService: CoursesService, private router: Router) { }

ngOnInit(): void {
    
  this.route.paramMap.subscribe({
    next: (params) => {

      const id = params.get('id')

      if (id) {
        //call API
        this.courseService.getCourse(id)
        .subscribe({
          next: (response) => {

            this.courseDetails = response;

          }


        })

      }
    }


  })

 }

 updateCourse(){

  this.courseService.updateCourse(this.courseDetails.id, this.courseDetails)

  .subscribe({

    next: (response) => {

      this.router.navigate(['courses']);

    }
  })

 }



}
