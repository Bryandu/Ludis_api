import { ClientErrorResponse, ClientErrorRequest, ViaCep } from './../viaCep'
import axios from 'axios'

import { viaCepObj } from '@test/fixtures/cep'

jest.mock('axios')
const viacep = new ViaCep()

describe('ViaCep client', () => {
  test('calls axios and return expected', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.get.mockResolvedValue({ data: viaCepObj })

    const data = await viacep.fetchCep(37045015)
    expect(data).toEqual(viaCepObj)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/37045015/json/'
    )
  })
  test('calls axios and rejected request', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.get.mockRejectedValue(new ClientErrorRequest('500'))

    await expect(mockedAxios.get).rejects.toThrowError(
      'Unexpected error when trying to communication to ViaCep: 500'
    )
  })
  test('calls axios and rejected response', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.get.mockRejectedValue(new ClientErrorResponse('404'))

    await expect(mockedAxios.get).rejects.toThrowError(
      'An error was returned from response ViaCep: 404'
    )
  })
})
