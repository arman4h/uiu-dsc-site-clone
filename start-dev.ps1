# PowerShell script to start both backend and frontend servers

Write-Host "Starting UIU DSC Site Development Environment..." -ForegroundColor Cyan

# Start Backend Server
Write-Host "Starting Backend Server on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command cd '$(Get-Location)\Backend'; npm start"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start Frontend Development Server
Write-Host "Starting Frontend Server on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command cd '$(Get-Location)\Frontend'; npm run dev"

Write-Host "Both servers starting..." -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000/api/events" -ForegroundColor Cyan
