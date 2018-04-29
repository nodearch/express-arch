const { productPlugin } = require('nodearch').deps;
const { expect } = require('chai');

describe('product in productPlugin', () => {

  const { ProductService } = productPlugin.services;
  const { Product } = productPlugin.models;

  before(async () => {
    await Product.remove({});
  });

  after(async () => {
    await Product.remove({});
  });

  describe('find one in db', () => {

    before(async () => {
      await Product.create({ name: 'NodeArch', price: 1 });
    });

    it('should find one in the db', async () => {
      const result = await Product.findOne({ name: 'NodeArch' });
      expect(result).to.contains({ price: 1 });
    });

  });

  it('should create Product using the model', async () => {
    const result = await Product.create({ name: 'NodeArch@2', price: 2 });
    expect(result).to.contains({ name: 'NodeArch@2' });
  });

  it('should create Product using the service', async () => {
    const result = await ProductService.create({ name: 'NodeArch@3', price: 3 });
    expect(result).to.contains({ name: 'NodeArch@3' });
  });

});
