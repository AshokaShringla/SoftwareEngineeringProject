FORCE:

prod:
	-git commit -a 
	git push origin main

dev_env: FORCE
	pip install -r requirements.txt
	npm install
	npm install -g @angular/cli
	npm install --save @fullcalendar/angular @fullcalendar/daygrid
	npm install bootstrap
	npm install ngx-toastr --save
	npm install @angular/animations --save  
	npm install --save-dev @angular-devkit/build-angular
	
tests:
	cd theme_calendar
	python manage.py test
	cd ../calendar-app
	ng test

server:
	python manage.py runserver
	ng serve
	
