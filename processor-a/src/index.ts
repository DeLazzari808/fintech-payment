import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/pagar', (req: Request, res: Response): void => {
    console.log('Processador A (barato) recebeu um pagamento!');
    const shouldFail = Math.random() < 0.5;
    if (shouldFail) {
        console.log('--> FALHA SIMULADA! Ocorreu um erro no Processador A.');
        res.status(500).json({ message: 'Erro interno no processador A' });
        return;
    }
    console.log('--> Pagamento processado com SUCESSO pelo Processador A.');
    res.status(200).json({
        message: 'Pagamento processado com sucesso pelo Processador A (Barato)',
        transactionId: `proc-a-${Date.now()}`
    });
});

app.listen(PORT, () => {
    console.log(`Processador A (barato e instável) rodando na porta ${PORT}`);
}); 