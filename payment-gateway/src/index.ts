// payment-gateway/src/index.ts
import express, { Request, Response } from 'express';
import { processPayment } from './services/router';
import { PaymentData } from './services/interfaces';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json()); // Permite que o servidor entenda JSON

// Nossa rota de API para processar pagamentos
app.post('/pagar', async (req: Request, res: Response): Promise<void> => {
    console.log('\n--- Nova Requisição de Pagamento Recebida ---');
    try {
        // Garantindo que o corpo da requisição tem o formato esperado
        const paymentData: PaymentData = req.body;
        const paymentResult = await processPayment(paymentData);
        res.status(200).json(paymentResult);
    } catch (error: any) {
        res.status(503).json({ message: error.message }); // 503 Service Unavailable
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Payment Gateway (TypeScript) rodando na porta ${PORT}`);
}); 