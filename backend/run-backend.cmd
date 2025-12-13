@echo off
echo ====================================
echo Business Directory Backend Launcher
echo ====================================
echo.

REM Try to find JAVA_HOME automatically
if "%JAVA_HOME%" == "" (
    echo JAVA_HOME not set, attempting to find Java installation...

    REM Check common Java installation paths
    if exist "C:\Program Files\Java\jdk-24" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-24"
    ) else if exist "C:\Program Files\Java\jdk-21" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-21"
    ) else if exist "C:\Program Files\Java\jdk-17" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-17"
    ) else if exist "C:\Program Files\Eclipse Adoptium\jdk-21.0.1.12-hotspot" (
        set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.1.12-hotspot"
    ) else (
        echo ERROR: Could not find Java installation.
        echo Please set JAVA_HOME manually before running this script.
        echo Example: set JAVA_HOME=C:\Program Files\Java\jdk-21
        pause
        exit /b 1
    )
)

echo JAVA_HOME is set to: %JAVA_HOME%
echo.

REM Verify Java is working
"%JAVA_HOME%\bin\java.exe" -version
if errorlevel 1 (
    echo ERROR: Java not found at %JAVA_HOME%
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo.

REM Run Maven with Spring Boot
call mvnw.cmd spring-boot:run

pause
