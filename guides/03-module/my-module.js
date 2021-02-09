const { BaseModule } = require('lisk-sdk');
const { myAccountSchema } = require('./schemas.js');
//const { myAsset } = require('./my-asset.js');
/*console.log('myAccountSchema');
console.log(myAccountSchema);*/
class MyModule extends BaseModule {
  id = 1024;
  name = 'my-module';
  accountSchema = myAccountSchema;
/*  accountSchema = {
    type: 'object',
    properties: {
      helloMessage: {
        fieldNumber: 1,
        dataType: 'string',
      },
    },
    default: {
      helloMessage: '',
    },
  };*/
  transactionAssets = [];//[ new myAsset() ];
  actions = {
    myAction: async () => {
      // Returns some data
    },
    anotherAction: async (params) => {
      // Returns some other data
    }
  };
  events = ['myEvent','anotherEvent'];
  reducers = {
    myReducer: async (params, stateStore) => {
      // Returns some data
    },
    anotherReducer: async (params, stateStore) => {
      // Returns some other data
    }
  };

  async beforeTransactionApply({transaction, stateStore, reducerHandler}) {
    // Code in here is applied before each transaction is applied.
  };

  async afterTransactionApply({transaction, stateStore, reducerHandler}) {
    // Code in here is applied after each transaction is applied.
    if (transaction.moduleID === this.id && transaction.assetID === MyAssetID) {

      const myAsset = codec.decode(
        myAssetSchema,
        transaction.asset
      );

      this._channel.publish('my-module:myEvent', {
        sender: transaction._senderAddress.toString('hex')
      });
    }
  };
  async afterGenesisBlockApply({genesisBlock, stateStore, reducerHandler}) {
    // Sets the hello counter to zero after the genesis block is applied
    await stateStore.chain.set(
      CHAIN_STATE_HELLO_COUNTER,
      codec.encode(helloCounterSchema, { helloCounter: 0 })
    );
  };
  async beforeBlockApply({block, stateStore, reducerHandler}) {
    // Code in here is applied before each block is applied.
  }
  async afterBlockApply({block, stateStore, reducerHandler, consensus}) {
    // Code in here is applied after each block is applied.
  }
}

module.exports = { MyModule };
