/** 
 * @param {org.example.biznet.Trade} trade
 * @transaction
*/



function tradeIpright(trade) {
    trade.ipRight.owner = trade.newOwner

    return getAssetRegistry('org.acme.mynetwork.IpRight')
        .then(function (assetRegistry) {
            return assetRegistry.update(trade.ipRight);
        });
}