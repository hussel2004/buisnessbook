Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Building Backend with Updated Spring Boot" -ForegroundColor Cyan
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

Write-Host "Cleaning and building project..." -ForegroundColor Yellow
Write-Host ""

# Clean and build
.\mvnw.cmd clean package -DskipTests

Write-Host ""
Write-Host "Build complete!" -ForegroundColor Green
