import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Altere o modo para 'random', 'success' ou 'fail' para facilitar prints
const mode: 'random' | 'success' | 'fail' = 'random';

app.post('/pagar', (req: Request, res: Response): void => {
    console.log('Processador A (barato) recebeu um pagamento!');
    let shouldFail: boolean;
    if (mode === 'random') {
        shouldFail = Math.random() < 0.5;
    } else if (mode === 'success') {
        shouldFail = false;
    } else {
        shouldFail = true;
    }
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