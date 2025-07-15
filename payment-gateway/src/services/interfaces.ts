export interface PaymentData {
    valor: number;
    cliente: string;
    cartao: {
        numero: string;
        cvv: string;
        validade: string;
    };
}

export interface ProcessorResponse {
    message: string;
    transactionId: string;
} 