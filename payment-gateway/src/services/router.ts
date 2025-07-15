// payment-gateway/src/services/router.ts
import { breakerA, breakerB } from './adapters';
import { PaymentData, ProcessorResponse } from './interfaces';

export async function processPayment(paymentData: PaymentData): Promise<ProcessorResponse> {
    try {
        console.log('Tentando rota principal (Processador A)...');
        // O método .fire() tenta executar a função através do Circuit Breaker
        const result = await breakerA.fire(paymentData);
        console.log('Sucesso na rota principal!');
        return result;
    } catch (error: any) { // Tipando o erro
        console.warn(`Rota principal falhou! Motivo: ${error.message}`);
        console.log('Acionando rota de fallback (Processador B)...');
        
        try {
            const result = await breakerB.fire(paymentData);
            console.log('Sucesso na rota de fallback!');
            return result;
        } catch (fallbackError: any) {
            console.error(`FATAL: A rota de fallback (Processador B) também falhou! Motivo: ${fallbackError.message}`);
            // Lançar um erro para que a camada de API saiba que tudo falhou
            throw new Error('Ambos os processadores de pagamento estão indisponíveis.');
        }
    }
} 