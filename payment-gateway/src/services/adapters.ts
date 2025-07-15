import axios from 'axios';
import Opossum from 'opossum';
import { PaymentData, ProcessorResponse } from './interfaces';
import * as dotenv from 'dotenv';
dotenv.config();

const urlA = process.env.PROCESSOR_A_URL!;
const urlB = process.env.PROCESSOR_B_URL!;

const options: Opossum.Options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 15000
};

const callProcessorA = async (paymentData: PaymentData): Promise<ProcessorResponse> => {
    const { data } = await axios.post<ProcessorResponse>(urlA, paymentData);
    return data;
};

const callProcessorB = async (paymentData: PaymentData): Promise<ProcessorResponse> => {
    const { data } = await axios.post<ProcessorResponse>(urlB, paymentData);
    return data;
};

const breakerA: Opossum<[PaymentData], ProcessorResponse> = new Opossum(callProcessorA, options);
const breakerB: Opossum<[PaymentData], ProcessorResponse> = new Opossum(callProcessorB);

breakerA.on('open', () => console.log('CIRCUITO ABERTO! Rota para Processador A está indisponível.'));
breakerA.on('halfOpen', () => console.log('CIRCUITO MEIO-ABERTO. Testando a rota para o Processador A...'));
breakerA.on('close', () => console.log('CIRCUITO FECHADO! Rota para Processador A está disponível novamente.'));

export { breakerA, breakerB }; 