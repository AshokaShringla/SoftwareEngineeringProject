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
- To test for all endpoints, run `make tests`.

# Angular
cd into calendar-app
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
