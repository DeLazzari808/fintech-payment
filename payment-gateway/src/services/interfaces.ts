// payment-gateway/src/services/interfaces.ts

// O que esperamos receber em uma requisição de pagamento
export interface PaymentData {
    valor: number;
    cliente: string;
    cartao: {
        numero: string;
        cvv: string;
        validade: string;
    };
}

// O que esperamos que um processador nos retorne
export interface ProcessorResponse {
    message: string;
    transactionId: string;
} 