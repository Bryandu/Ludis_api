import { InternalError } from '@/utils/errors/internalError'
import { viaCepObj } from '@test/fixtures/cep'
import axios from 'axios'
import config, { IConfig } from 'config'

const ViaCepResourceConfig: IConfig = config.get(
  'App.resources.ViaCep'
)

export class ClientErrorRequest extends InternalError {
  constructor (message: string) {
    super(`Unexpected error when tryng to communication to ViaCep: ${message}`)
  }
}

export class ClientErrorResponse extends InternalError {
  constructor (message: string) {
    super(`An error was returned from response ViaCep: ${message}`)
  }
}

export class ViaCep {
  public async fetchCep (cep: number): Promise<typeof viaCepObj | undefined> {
    try {
      const response = await axios.get<typeof viaCepObj>(`${ViaCepResourceConfig.get('apiUrl')}/${cep}/json/`)
      return response.data
    } catch (error) {
      if (error.response && error.response.status) {
        throw new ClientErrorResponse(`Error ${JSON.stringify(error.response.data)}, code: ${error.reesponse.status}`)
      }
      throw new ClientErrorRequest(error.message)
    }
  }
}
