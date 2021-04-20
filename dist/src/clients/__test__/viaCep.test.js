"use strict";

var _viaCep = require("./../viaCep");

var _axios = _interopRequireDefault(require("axios"));

var _cep = require("@test/fixtures/cep");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('axios');
const viacep = new _viaCep.ViaCep();
describe('ViaCep client', () => {
  test('calls axios and return expected', async () => {
    const mockedAxios = _axios.default;
    mockedAxios.get.mockResolvedValue({
      data: _cep.viaCepObj
    });
    const data = await viacep.fetchCep(37045015);
    expect(data).toEqual(_cep.viaCepObj);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/37045015/json/');
  });
  test('calls axios and rejected request', async () => {
    const mockedAxios = _axios.default;
    mockedAxios.get.mockRejectedValue(new _viaCep.ClientErrorRequest('500'));
    await expect(mockedAxios.get).rejects.toThrowError('Unexpected error when tryng to communication to ViaCep: 500');
  });
  test('calls axios and rejected response', async () => {
    const mockedAxios = _axios.default;
    mockedAxios.get.mockRejectedValue(new _viaCep.ClientErrorResponse('404'));
    await expect(mockedAxios.get).rejects.toThrowError('An error was returned from response ViaCep: 404');
  });
});