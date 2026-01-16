# Module 411 | Mod 4 | SBA 4: Task Management App

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [How the App Works](#how-the-app-works)
  - [Additional Features](#additional-features)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

The Task Management App is a simple, browser-based application that allows users to create, organize, and track tasks by category, deadline, and status. All task data is stored locally in the browser using localStorage, so tasks persist even after refreshing the page.

This project demonstrates core front-end development skills using HTML, CSS, and JavaScript, with an emphasis on DOM manipulation, event handling, arrays/objects, and state management.

### The challenge

Create a dynamic task management app that lets users:

- Add new tasks with details such as the task name, category, deadline, and status.
- Update the status of tasks to reflect their progress (e.g., “In Progress,” “Completed,” “Overdue”).
- Automatically update task status based on the current date (tasks past their deadline will be marked as “Overdue”).
- Filter tasks by status or category.
- Persist task data using local storage so tasks are saved even after refreshing the page.

### Screenshot

### Links

- Assignment URL: https://ps-lms.vercel.app/curriculum/se/411/sba
- Live Site URL: https://github.com/agross705/SBA-4

## How the App Works

Adding a Task | Basic validation ensures all required fields are filled before a task is added.

- Enter a task name, category, and deadline.
- Select an initial status (Not Started, In Progress, Completed).
- Click Add Task.

The task is:

- Stored as an object in a JavaScript array
- Saved to localStorage
- Displayed immediately in the task table

Viewing Tasks | Tasks are displayed in a table for clear readability.

- Each row shows: task name, category, deadline, current status (with visual styling),
  and a dropdown to update the task status

Updating Task Status (Event Delegation) | Improves scalability, performance, and keeps JavaScript
logic separate from HTML.

- Task statuses are updated using a dropdown menu in each row.
- A single change event listener is attached to the table body
- Each dropdown includes a data-id attribute to identify the task

Filtering Tasks | Filters work together, allowing combined filtering.

- Status (All, Not Started, In Progress, Completed, Overdue)
- Category (dynamically populated based on existing tasks)

Automatic Overdue Detection | The app automatically checks task deadlines against the current date.

- Any task past its deadline (and not completed) is marked as Overdue.
- Overdue tasks are visually highlighted and included in filter options.

Clearing the Task List | Resets the application to start a new task list.

- A Clear Task List button removes all tasks at once.
- Users are prompted with a confirmation dialog before deletion.
- Clears the tasks array
- Removes task data from localStorage
- Resets the task table and filters

### Additional Features

- Local storage persistence using localStorage
- Event delegation for scalable event handling
- Dynamic category filter generation
- Automatic overdue task detection
- Visual status styling using CSS classes
- User feedback messages for key actions
- Destructive action confirmation for clearing tasks

### What I learned

- How to manage application state using arrays and objects
- The importance of separating logic from HTML using event delegation
- How localStorage can be used to persist data across page reloads
- How to dynamically update the DOM based on user interaction
- How small UX improvements (confirmation dialogs, feedback messages) improve usability

### Continued development

- Edit existing task details
- Delete individual tasks
- Undo functionality after clearing/deleting tasks
- Accessibility enhancements (ARIA labels, keyboard navigation)
- Modular JavaScript structure

### Useful resources

- MDN | https://developer.mozilla.org/en-US/
- JavaScript.info (Objects) | https://javascript.info/object
- Google | https://www.google.com/

## Author

agross705

## Acknowledgments
