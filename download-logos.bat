@echo off
echo Downloading company logos for EnergyHub...
echo.

cd /d "c:\Users\Trova\Documents\energyhub_marketplace\energyhub_marketplace\public\assets\images\logos"

echo Downloading Forbes logo...
powershell -Command "Invoke-WebRequest -Uri 'https://logos-world.net/wp-content/uploads/2020/04/Forbes-Logo.png' -OutFile 'forbes-logo.png'"

echo Downloading TechCrunch logo...
powershell -Command "Invoke-WebRequest -Uri 'https://logos-world.net/wp-content/uploads/2020/04/TechCrunch-Logo.png' -OutFile 'techcrunch-logo.png'"

echo Downloading Bloomberg logo...
powershell -Command "Invoke-WebRequest -Uri 'https://logos-world.net/wp-content/uploads/2020/04/Bloomberg-Logo.png' -OutFile 'bloomberg-logo.png'"

echo Downloading Fast Company logo...
powershell -Command "Invoke-WebRequest -Uri 'https://logos-world.net/wp-content/uploads/2020/04/Fast-Company-Logo.png' -OutFile 'fast-company-logo.png'"

echo.
echo ✅ All logos downloaded successfully!
echo Check the files in: public/assets/images/logos/
pause
