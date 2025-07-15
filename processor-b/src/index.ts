import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.post('/pagar', (req: Request, res: Response): void => {
    console.log('Processador B (caro) recebeu um pagamento!');
    console.log('--> Pagamento processado com SUCESSO pelo Processador B.');
    res.status(200).json({
        message: 'Pagamento processado com sucesso pelo Processador B (Caro)',
        transactionId: `proc-b-${Date.now()}`
    });
});

app.listen(PORT, () => {
    console.log(`Processador B (caro e estável) rodando na porta ${PORT}`);
}); 