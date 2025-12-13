Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Business Directory Backend Launcher" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Set JAVA_HOME (Try Java 21 first, fallback to Java 25)
if (Test-Path "C:\Program Files\Java\jdk-21") {
    $env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
} else {
    $env:JAVA_HOME = "C:\Program Files\Java\jdk-25"
}
Write-Host "JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green

# Verify Java
& "$env:JAVA_HOME\bin\java.exe" -version
Write-Host ""

Write-Host "Starting Spring Boot application..." -ForegroundColor Yellow
Write-Host ""

# Run Maven
.\mvnw.cmd spring-boot:run
