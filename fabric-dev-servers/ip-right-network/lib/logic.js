/** 
 * @param {org.example.biznet.Trade} trade
 * @transaction
*/



function tradeIpright(trade) {
    trade.ipRight.owner = trade.newOwner

    return getAssetRegistry('org.example.biznet.IpRight')
        .then(function (assetRegistry) {
            return assetRegistry.update(trade.ipRight);
        });
}
