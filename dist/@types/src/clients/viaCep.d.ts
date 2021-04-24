import { InternalError } from '@/utils/errors/internalError';
import { viaCepObj } from '@test/fixtures/cep';
export declare class ClientErrorRequest extends InternalError {
    constructor(message: string);
}
export declare class ClientErrorResponse extends InternalError {
    constructor(message: string);
}
export declare class ViaCep {
    fetchCep(cep: number): Promise<typeof viaCepObj | undefined>;
}
