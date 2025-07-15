# Script de teste para o Payment Gateway
Write-Host "🧪 Testando Payment Gateway..." -ForegroundColor Green

$body = @{
    valor = 100
    cliente = "joao"
    cartao = @{
        numero = "1234567890123456"
        cvv = "123"
        validade = "12/25"
    }
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/pagar" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body
    Write-Host "✅ Sucesso!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Yellow
    Write-Host "Resposta: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erro na requisição:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "`n🎯 Para testar novamente, execute: .\test-payment.ps1" -ForegroundColor Magenta 