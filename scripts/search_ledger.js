const AdminConnection = require('composer-admin').AdminConnection;

let adminConnection = new AdminConnection();
await adminConnection.connect('card1');

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

let bizNetConnection = new BusinessNetworkConnection();
let businessNetworkDefintion = await bizNetConnection.connect('cardNameToUse');

function addNewTrader(userCardName, tid) {
	// connect using the 'newUserCard', create an asset, add it to a registry and get all assets. 
	try {
	  await businessNetworkConnection.connect(userCardName);
      var factory = businessNetworkConnection.getFactory();
	  let trader = factory.newResource('org.acme.mynetwork','Trader', tid);
	  await assestRegistry.add(trader);

	  result = await assetRegistry.getAll();
	  log.info(result);

	  await businessNetworkConnection.disconnect();
	} catch (error) {
		log.info("error :(");
	}
}
