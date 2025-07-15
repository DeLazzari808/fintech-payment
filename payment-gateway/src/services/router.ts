import { breakerA, breakerB } from './adapters';
import { PaymentData, ProcessorResponse } from './interfaces';

export async function processPayment(paymentData: PaymentData): Promise<ProcessorResponse> {
    try {
        console.log('Tentando rota principal (Processador A)...');
        const result = await breakerA.fire(paymentData);
        console.log('Sucesso na rota principal!');
        return result;
    } catch (error: any) {
        console.warn(`Rota principal falhou! Motivo: ${error.message}`);
        console.log('Acionando rota de fallback (Processador B)...');
        try {
            const result = await breakerB.fire(paymentData);
            console.log('Sucesso na rota de fallback!');
            return result;
        } catch (fallbackError: any) {
            console.error(`FATAL: A rota de fallback (Processador B) também falhou! Motivo: ${fallbackError.message}`);
            throw new Error('Ambos os processadores de pagamento estão indisponíveis.');
        }
    }
} 