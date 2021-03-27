FORCE:

prod:
	-git commit -a 
	git push origin main

dev_env: FORCE
	echo "Installing developer requirements."