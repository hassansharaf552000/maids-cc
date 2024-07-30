import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit {
  student: any;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const studentId = +id;
      if (!isNaN(studentId)) {
        this.loading = true;
        this.studentService.getStudentDetails(studentId).subscribe(
          (data) => {
            this.student = data.data;
            this.loading = false;
          },
          (error) => {
            this.error = 'Failed to load student details';
            this.loading = false;
          }
        );
      } else {
        this.error = 'Invalid student ID';
      }
    } else {
      this.error = 'Student ID not provided';
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
