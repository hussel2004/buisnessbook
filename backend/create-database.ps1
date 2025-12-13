Write-Host "Creating businessdirectory database..." -ForegroundColor Cyan

# Set password environment variable for psql
$env:PGPASSWORD = "hussel"

# Create database
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE businessdirectory;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database created successfully!" -ForegroundColor Green
} else {
    Write-Host "Database might already exist or creation failed." -ForegroundColor Yellow
}

# Clear password from environment
Remove-Item Env:\PGPASSWORD
