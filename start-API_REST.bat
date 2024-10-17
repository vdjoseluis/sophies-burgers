@echo off
cd C:\xampp
echo Iniciando Apache...
start apache_start.bat
echo Iniciando MySQL...
start mysql_start.bat

:: Espera 5 segundos para q arranque XAMPP correctamente
timeout /t 5

:: Arrancar proyecto de NodeJS
echo Iniciando la API de NodeJS
cd C:\Projects\sophies-burgers\api-rest
npm start

pause