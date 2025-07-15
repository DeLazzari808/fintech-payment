// processor-b/src/index.ts
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/pagar', (req: Request, res: Response): void => {
    console.log('Processador B (caro) recebeu um pagamento!');
    console.log('--> Pagamento processado com SUCESSO pelo Processador B.');

    res.status(200).json({
        message: 'Pagamento processado com sucesso pelo Processador B (Caro)',
        transactionId: `proc-b-${Date.now()}`
    });
});

app.listen(3002, () => {
    console.log('Processador B (caro e estável) rodando na porta 3002');
}); 