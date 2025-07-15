// payment-gateway/src/services/adapters.ts
import axios from 'axios';
import Opossum from 'opossum';
import { PaymentData, ProcessorResponse } from './interfaces';
import * as dotenv from 'dotenv';
dotenv.config();

const urlA = process.env.PROCESSOR_A_URL!;
const urlB = process.env.PROCESSOR_B_URL!;

// Opções para o nosso "guarda de trânsito inteligente"
const options: Opossum.Options = {
    timeout: 3000, // Se a chamada demorar mais de 3s, falha
    errorThresholdPercentage: 50, // Abre o circuito se 50% das chamadas falharem
    resetTimeout: 15000 // Tenta fechar o circuito a cada 15s
};

// --- ADAPTER PARA O PROCESSADOR A (BARATO) ---
const callProcessorA = async (paymentData: PaymentData): Promise<ProcessorResponse> => {
    // A URL do nosso processador falso
    const { data } = await axios.post<ProcessorResponse>(urlA, paymentData);
    return data;
};

// --- ADAPTER PARA O PROCESSADOR B (CARO) ---
const callProcessorB = async (paymentData: PaymentData): Promise<ProcessorResponse> => {
    const { data } = await axios.post<ProcessorResponse>(urlB, paymentData);
    return data;
};

// Envolvemos nossas funções com o Circuit Breaker (Opossum)
const breakerA: Opossum<[PaymentData], ProcessorResponse> = new Opossum(callProcessorA, options);
const breakerB: Opossum<[PaymentData], ProcessorResponse> = new Opossum(callProcessorB); // Usando opções padrão para o B

// Eventos para sabermos o que o Circuit Breaker está fazendo
breakerA.on('open', () => console.log('CIRCUITO ABERTO! Rota para Processador A está indisponível.'));
breakerA.on('halfOpen', () => console.log('CIRCUITO MEIO-ABERTO. Testando a rota para o Processador A...'));
breakerA.on('close', () => console.log('CIRCUITO FECHADO! Rota para Processador A está disponível novamente.'));

export { breakerA, breakerB }; 