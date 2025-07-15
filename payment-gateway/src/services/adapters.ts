import axios from 'axios';
import Opossum from 'opossum';
import { PaymentData, ProcessorResponse } from './interfaces';
import * as dotenv from 'dotenv';
dotenv.config();

const urlA = process.env.PROCESSOR_A_URL!;
const urlB = process.env.PROCESSOR_B_URL!;

const options: Opossum.Options = {
    timeout: 5000, // 5 segundos para evitar timeout falso
    errorThresholdPercentage: 50,
    resetTimeout: 15000
};

const callProcessorA = async (paymentData: PaymentData): Promise<ProcessorResponse> => {
    try {
        const { data } = await axios.post<ProcessorResponse>(urlA, paymentData, { timeout: 4000 });
        return data;
    } catch (err: any) {
        // Garante que qualquer erro seja propagado corretamente para o breaker
        throw err;
    }
};

const callProcessorB = async (paymentData: PaymentData): Promise<ProcessorResponse> => {
    try {
        const { data } = await axios.post<ProcessorResponse>(urlB, paymentData, { timeout: 4000 });
        return data;
    } catch (err: any) {
        throw err;
    }
};

const breakerA: Opossum<[PaymentData], ProcessorResponse> = new Opossum(callProcessorA, options);
const breakerB: Opossum<[PaymentData], ProcessorResponse> = new Opossum(callProcessorB);

breakerA.on('open', () => console.log('CIRCUITO ABERTO! Rota para Processador A está indisponível.'));
breakerA.on('halfOpen', () => console.log('CIRCUITO MEIO-ABERTO. Testando a rota para o Processador A...'));
breakerA.on('close', () => console.log('CIRCUITO FECHADO! Rota para Processador A está disponível novamente.'));

export { breakerA, breakerB }; 