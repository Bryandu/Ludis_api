"use strict";

var _auth = require("../../services/auth");

var _auth2 = require("../auth/auth.middleware");

describe('Auth jwt middleware', () => {
  it('should create jwt and send middleware', () => {
    const fakeToken = _auth.AuthService.createToken({
      data: 'ludis'
    });

    const reqFake = {
      headers: {
        'x-access-token': fakeToken
      }
    };
    const resFake = {};
    const nextFake = jest.fn();
    (0, _auth2.authMiddleware)(reqFake, resFake, nextFake);
    expect(nextFake).toHaveBeenCalled();
  });
  it('should response error 401', () => {
    const reqFake = {
      headers: {
        'x-access-token': 'invalid token'
      }
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock
      }))
    };
    const nextFake = jest.fn();
    (0, _auth2.authMiddleware)(reqFake, resFake, nextFake);
    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      message: 'jwt malformed'
    });
  });
  it('should response error 401 when Unauthorized', () => {
    const reqFake = {
      headers: {}
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock
      }))
    };
    const nextFake = jest.fn();
    (0, _auth2.authMiddleware)(reqFake, resFake, nextFake);
    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      message: 'jwt must be provided'
    });
  });
});