export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: undefined,
      status: 404,
    }),
  ),
};
