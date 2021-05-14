# Calendar Task Team

Project goal to develop website and app with calendar, tasks, notes with share function for collaboration

Project will have:

- Calendar function similar to google calendar.

- Tasks that can be created and seen on the calendar.

- Notes that can be created and seen on the calendar.

- Collaborative features like sharing calendars, tasks, notes with other people.

Team members: Ashoka Shringla, Raina Kim

## Setup

Make sure to have `make` installed.

- To create the new env for a new developer, run `make dev_env`.
- To commit and push the code to the repo, type `make prod`.
- To test for all endpoints for backend, run `python manage.py test`.
- Run `python manage.py runserver` to start server.
- 
### Angular
cd into calendar app

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build //under testing

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests

Tests are included for each of the following endpoints:
 - Login user
 - Register user
 - Get users notes
 - Get notes shared with user
 - Delete note
 - Add note
 - Share note

Tests are also included for the following:
 - Calendar is created
 - Header is created
 - Footer is created
 - User object is created
 - Note object is created
 - ContextService is created
 - AppComponent is created
 - AppComponent has title

## Lint

lint using ng lint (many problems with source code (dev note: sorry))

## Requirements
- Nav bar
- User can sign up
- User can sign in
- User can sign out.
- User can add
- User can delete
- User can edit tasks on an hourly basis
- User can edit tasks on a daily basis
- User can edit tasks on a monthly basis
- User can share each task with others
- Notes in details can be seen under each task
- Users can get push notifications
- Users can see the calendar with all events associated with them on it 

### Design Description

- Nav bar
Created using bootstrap. Has functionality to go to calendar page (login and register if not logged in) (home page and log out if logged in)

- User can sign up
Form to sign up sends http post to backend using endpoints. Backend sends data to database and returns the user object to the frontend. Frontend signs in automatically.

- User can sign in
Form to sign in sends http post to backend using endpoints. Backend encrypts password and checks if user is correct with the database. Returns appropriate response to frontend.
Frontend signs in.

- User can sign out.
Frontend removes localstorage data and user is signed out. Directed to login page.

- User can add notes
User can write a note and it will be send to the backend using http post and the backend saves it to the database. 

- User can see list of their notes
User can navigate to a page to see their notes. List of notes will be displayed by sending a get request to the backend. Backend pulls table with notes from the user from the database and sends them in a list to the frontend. Frontend displays the notes in a table.

- User can delete notes
User can click delete button in the table next to each note to delete. Frontend sends delete http request to the backend. Backend deletes the note from the database. Frontend refreshes request to see all notes and the user will see the note is gone.

- User can see calendar
Frontend has a page to see calendar. User can go fowards and backwards by month and click button to get back to the current day.

Planned requirements, not complete:
- User can see list of notes shared with them
- User can edit tasks on an hourly basis
- User can edit tasks on a daily basis
- User can edit tasks on a monthly basis
- User can share each task with others
- Notes in details can be seen under each task
- Users can get push notifications
- Users can see the calendar with all events associated with them on it 
