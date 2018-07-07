import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.biznet{
   export class IpRight extends Asset {
      rightID: string;
      company: string;
      property: string;
      article: string;
      territory: string;
      owner: Trader;
   }
   export class Trader extends Participant {
      tradeID: string;
      kyc: string;
   }
   export class Trade extends Transaction {
      ipRight: IpRight;
      newOwner: Trader;
   }
// }
