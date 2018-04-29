const { userPlugin } = require('nodearch').deps;
const { expect } = require('chai');

describe('user in userPlugin', () => {

  const { UserService } = userPlugin.services;
  const { User } = userPlugin.models;

  before(async () => {
    await User.remove({});
  });

  after(async () => {
    await User.remove({});
  });

  describe('find one in db', () => {

    before(async () => {
      await User.create({ name: 'NodeArch', age: 1 });
    });

    it('should find one in the db', async () => {
      const result = await User.findOne({ name: 'NodeArch' });
      expect(result).to.contains({ age: 1 });
    });

  });

  it('should create user using the model', async () => {
    const result = await User.create({ name: 'NodeArch@2', age: 2 });
    expect(result).to.contains({ name: 'NodeArch@2' });
  });

  it('should create user using the service', async () => {
    const result = await UserService.create({ name: 'NodeArch@3', age: 3 });
    expect(result).to.contains({ name: 'NodeArch@3' });
  });

});
