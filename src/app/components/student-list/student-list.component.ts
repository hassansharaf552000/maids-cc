import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  loading = false;
  page = 1;
  totalPages!: number;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.loading = true;
    this.studentService.getStudents(this.page).subscribe((data) => {
      this.students = data.data;
      this.totalPages = data.total_pages;
      this.loading = false;
    });
  }

  viewStudentDetails(id: number): void {
    this.router.navigate(['/student', id]);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchStudents();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchStudents();
    }
  }
}
