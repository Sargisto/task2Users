@echo off

title Project installer and runner
echo Installing npm dependencies
call npm install 
echo Running project in development mode
call npm run start