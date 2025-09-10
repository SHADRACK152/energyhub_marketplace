@echo off
echo 🚀 EnergyHub Marketplace Auto-Commit Script
echo ==========================================

REM Change to the project directory
cd /d "%~dp0"

REM Check if there are any changes
git status --porcelain > temp_status.txt
if %errorlevel% equ 0 (
    for %%A in (temp_status.txt) do if %%~zA equ 0 (
        echo ✅ No changes to commit
        del temp_status.txt
        goto :end
    )
)
del temp_status.txt

REM Get current date and time for commit message
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

echo 📦 Adding all changes...
git add .

echo 💾 Committing changes...
git commit -m "🔄 Auto-commit: Updates on %timestamp% - Recent development changes, UI/UX improvements, bug fixes and enhancements"

if %errorlevel% equ 0 (
    echo ✅ Commit successful!
    
    echo 🚀 Pushing to remote repository...
    git push origin main
    
    if %errorlevel% equ 0 (
        echo ✅ Push successful! Changes are now live on GitHub.
    ) else (
        echo ❌ Push failed. Please check your internet connection and try again.
    )
) else (
    echo ❌ Commit failed. Please check for any issues.
)

:end
echo.
echo 🎉 Auto-commit script completed!
pause
