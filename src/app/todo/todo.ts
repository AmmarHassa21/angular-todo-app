import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent {
  newTask: string = '';
  tasks: { name: string; completed: boolean }[] = [];
  editIndex: number | null = null;
  editedTask: string = '';

  constructor() {
    // ✅ Restore saved tasks from localStorage on page load
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  // ✅ Save tasks to localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // ✅ Add new task
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  // ✅ Toggle completed status
  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  // ✅ Delete task
  deleteTask(index: number) {
    const taskToDelete = this.tasks[index];

    setTimeout(() => {
      const currentIndex = this.tasks.indexOf(taskToDelete);

      if (currentIndex === -1) {
        return;
      }

      this.tasks.splice(currentIndex, 1);

      if (this.editIndex !== null) {
        if (this.editIndex === currentIndex) {
          this.cancelEdit();
        } else if (this.editIndex > currentIndex) {
          this.editIndex -= 1;
        }
      }

      this.saveTasks();
    }, 150);
  }

  // ✅ Start editing
  startEdit(i: number, name: string) {
    this.editIndex = i;
    this.editedTask = name;
  }

  // ✅ Save edited task
  saveEdit() {
    if (this.editIndex !== null && this.editedTask.trim()) {
      this.tasks[this.editIndex].name = this.editedTask;
      this.editIndex = null;
      this.editedTask = '';
      this.saveTasks();
    }
  }

  // ✅ Cancel editing
  cancelEdit() {
    this.editIndex = null;
    this.editedTask = '';
  }
}
