@echo off
cd /d "C:\Users\pefer\Documents\GitHub\Jul-IA\Code_Jul-IA"
start "" "http://localhost:8080/Jul-IA.html"
python -m http.server 8080
pause