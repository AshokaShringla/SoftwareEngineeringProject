FORCE:

prod:
	-git commit -a 
	git push origin main

dev_env: FORCE
	pip install -r requirements.txt
	npm install -g @angular/cli
	

tests:
	python manage.py test