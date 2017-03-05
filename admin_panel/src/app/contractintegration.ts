import { Injectable } from '@angular/core';

import { Member } from './member';
import { Pool } from './pool';

declare var web3: any;

@Injectable()

export class contractintegration{
	accounts: any[];
	account: any;
	contractAbi: any;
	contractCompiled: any;
	contractGas: any;
	connected: any;
	initialized: any;
	lastBlockNumber: any;
	self: any;

	events: any;

	Obitcoin: any;

	constructor(){
		this.accounts = [];
		this.account = "";

		this.contractAbi = [{"constant":true,"inputs":[{"name":"pool","type":"uint16"}],"name":"getMembersBalance","outputs":[{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pool","type":"uint16"}],"name":"getPoolData","outputs":[{"name":"","type":"bytes16[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pools","type":"uint16[]"},{"name":"members","type":"uint16[]"},{"name":"amount","type":"uint128[]"}],"name":"sendTokensBulk","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"uint16"}],"name":"getMemberDetails","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPublishingBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"uint16"},{"name":"name","type":"bytes32"},{"name":"adr","type":"address"},{"name":"isAdmin","type":"bool"}],"name":"updateMember","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPools","outputs":[{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pool","type":"uint16"}],"name":"getPoolParticipants","outputs":[{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPoolCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pool","type":"uint16"},{"name":"member","type":"uint16"},{"name":"amount","type":"uint128"}],"name":"sendTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getMembers","outputs":[{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes16"},{"name":"legalContract","type":"bytes16"},{"name":"financialReports","type":"bytes16"}],"name":"createDebtPool","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pool","type":"uint16"},{"name":"member","type":"uint16"}],"name":"getMemberBalance","outputs":[{"name":"","type":"uint128[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pool","type":"uint16"},{"name":"name","type":"bytes16"},{"name":"legalContract","type":"bytes16"},{"name":"financialReports","type":"bytes16"}],"name":"updateDebtPool","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"adr","type":"address"},{"name":"isAdmin","type":"bool"}],"name":"addMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pool","type":"uint16"},{"name":"amount","type":"uint128"}],"name":"buyTokens","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"int256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"TokenTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"uint128"},{"indexed":false,"name":"time","type":"uint256"}],"name":"MoneyTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"uint128"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SliceTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"uint128"},{"indexed":false,"name":"time","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"added","type":"bool"},{"indexed":false,"name":"time","type":"uint256"}],"name":"PoolChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"fromAddress","type":"address"},{"indexed":false,"name":"time","type":"uint256"}],"name":"UnauthorizedAccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":false,"name":"added","type":"bool"},{"indexed":false,"name":"time","type":"uint256"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":false,"name":"added","type":"bool"},{"indexed":false,"name":"time","type":"uint256"}],"name":"PersonChanged","type":"event"}];

		this.contractCompiled = '606060405234156200000d57fe5b5b60008054600160a060020a03191633600160a060020a031690811790915543600755600680546201000061ffff1990911660011763ffff00001916179055604080516080810182527f4f776e657200000000000000000000000000000000000000000000000000000081526020810192909252810160035b81526001602091820181905260065461ffff16600090815281835260409081902084518155928401519183018054600160a060020a031916600160a060020a039093169290921780835590840151919060a060020a60ff021916740100000000000000000000000000000000000000008360038111156200010357fe5b0217905550606091909101516001918201805491151575010000000000000000000000000000000000000000000260a860020a60ff02199092169190911790556002805490918101620001578382620001d0565b91600052602060002090601091828204019190066002025b60068054835461ffff6101009490940a848102199091169184160217909255815433600160a060020a03166000908152600560205260409020805491831661ffff199283161790558254908116908216600101909116179055505b62000231565b8154818355818115116200020757600f016010900481600f016010900483600052602060002091820191016200020791906200020d565b5b505050565b6200022e91905b808211156200022a576000815560010162000214565b5090565b90565b612c4280620002416000396000f300606060405236156100d55763ffffffff60e060020a60003504166304a385e581146100d757806305790c081461023957806323453e2d1461028d57806332a2c5d01461035257806338c5e15a1461037e578063438a5f13146103d057806357091c81146103f2578063673a2a1f1461041f5780636d8171301461048a5780638eec5d70146104fc5780639a59b7491461051e5780639eab525314610549578063a5f97554146105b4578063a97bd3fe146105df578063cee11e9614610639578063e1669f171461066b578063f3fa89df14610691575bfe5b34156100df57fe5b6100ee61ffff600435166106b6565b6040518080602001806020018060200180602001858103855289818151815260200191508051906020019060200280838360008314610148575b80518252602083111561014857601f199092019160209182019101610128565b50505091909101868103855289518152895160209182019250818b0191028083838215610190575b80518252602083111561019057601f199092019160209182019101610170565b50505091909101868103845288518152885160209182019250818a01910280838382156101d8575b8051825260208311156101d857601f1990920191602091820191016101b8565b5050509190910186810383528751815287516020918201925081890191028083838215610220575b80518252602083111561022057601f199092019160209182019101610200565b5050509050019850505050505050505060405180910390f35b341561024157fe5b61025061ffff60043516610a2e565b604051808260608083835b80518252602083111561027b57601f19909201916020918201910161025b565b50505090500191505060405180910390f35b341561029557fe5b610350600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843750506040805187358901803560208181028481018201909552818452989a998901989297509082019550935083925085019084908082843750506040805187358901803560208181028481018201909552818452989a998901989297509082019550935083925085019084908082843750949650610ab795505050505050565b005b341561035a57fe5b610362610b93565b60408051600160a060020a039092168252519081900360200190f35b341561038657fe5b61039561ffff60043516610b98565b60408051848152600160a060020a03841660208201529081018260038111156103ba57fe5b60ff168152602001935050505060405180910390f35b34156103d857fe5b6103e0610c03565b60408051918252519081900360200190f35b34156103fa57fe5b61035061ffff60043516602435600160a060020a03604435166064351515610c0a565b005b341561042757fe5b61042f610f64565b6040805160208082528351818301528351919283929083019185810191028083838215610477575b80518252602083111561047757601f199092019160209182019101610457565b5050509050019250505060405180910390f35b341561049257fe5b61042f61ffff60043516610feb565b6040805160208082528351818301528351919283929083019185810191028083838215610477575b80518252602083111561047757601f199092019160209182019101610457565b5050509050019250505060405180910390f35b341561050457fe5b6103e06110a9565b60408051918252519081900360200190f35b341561052657fe5b61035061ffff600435811690602435166001608060020a03604435166110b0565b005b341561055157fe5b61042f6115c0565b6040805160208082528351818301528351919283929083019185810191028083838215610477575b80518252602083111561047757601f199092019160209182019101610457565b5050509050019250505060405180910390f35b34156105bc57fe5b6103506001608060020a031960043581169060243581169060443516611647565b005b34156105e757fe5b61025061ffff60043581169060243516611872565b604051808260608083835b80518252602083111561027b57601f19909201916020918201910161025b565b50505090500191505060405180910390f35b341561064157fe5b61035061ffff600435166001608060020a03196024358116906044358116906064351661194f565b005b341561067357fe5b610350600435600160a060020a03602435166044351515611b02565b005b341561069957fe5b61035061ffff600435166001608060020a0360243516611deb565b005b6106be612ae5565b6106c6612ae5565b6106ce612ae5565b6106d6612ae5565b6106de612ae5565b6106e6612ae5565b6106ee612ae5565b61ffff8816600090815260036020526040812060040154819060ff16151561071557610000565b61ffff8a166000908152600360205260409081902060020154905180591061073a5750595b908082528060200260200182016040525b5061ffff8b1660009081526003602052604090819020600201549051919650908059106107755750595b908082528060200260200182016040525b5061ffff8b1660009081526003602052604090819020600201549051919550908059106107b05750595b908082528060200260200182016040525b509250600090505b61ffff808b1660009081526003602052604090206002015490821610156109875761ffff808b16600090815260036020526040902060020180549091831690811061081057fe5b90600052602060002090601091828204019190066002025b905461ffff8c811660009081526003602081815260408084206101009790970a90950490931680835294019091529081209193505b600291828204019190066010025b9054906101000a90046001608060020a0316858261ffff1681518110151561088f57fe5b6001608060020a03909216602092830290910182015261ffff808c1660009081526003808452604080832093871683529201909252902060015b600291828204019190066010025b9054906101000a90046001608060020a0316848261ffff168151811015156108fb57fe5b6001608060020a03909216602092830290910182015261ffff808c1660009081526003808452604080832093871683529201909252902060025b600291828204019190066010025b9054906101000a90046001608060020a0316838261ffff1681518110151561096757fe5b6001608060020a039092166020928302909101909101525b6001016107c9565b61ffff8a166000908152600360209081526040918290206002018054835181840281018401909452808452889388938893928391830182828015610a1257602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116109d95790505b5050505050905098509850985098505b50505050509193509193565b610a36612b09565b61ffff821660009081526003602052604090206004015460ff161515610a5b57610000565b506040805160608101825261ffff831660008181526003602081815285832080546001608060020a0319608060020a8083028216895291829004820281168489015295909452919052600101540216918101919091525b919050565b6000825160001480610ac857508151155b80610ad257508351155b80610adf57508251825114155b80610aec57508351835114155b15610af657610000565b5060005b82518161ffff16108015610b12575081518161ffff16105b8015610b22575083518161ffff16105b15610b8c57610b83848261ffff16815181101515610b3c57fe5b90602001906020020151848361ffff16815181101515610b5857fe5b90602001906020020151848461ffff16815181101515610b7457fe5b906020019060200201516110b0565b5b600101610afa565b5b50505050565b305b90565b61ffff81166000908152600160208190526040822001548190819060a860020a900460ff161515610bc857610000565b50505061ffff811660009081526001602081905260409091208054910154600160a060020a0381169060a060020a900460ff165b9193909250565b6007545b90565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115610c4f57fe5b1480610c9d575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115610c9b57fe5b145b15610f1b5761ffff84166000908152600160208190526040909120015460a860020a900460ff161515610ccf57610000565b60035b61ffff85166000908152600160208190526040909120015460a060020a900460ff166003811115610cff57fe5b1415610d0a57610000565b61ffff841660008181526001602081815260408084208084018054600160a060020a03908116875260058552838720805461ffff19908116909155908a168088529387208054909116881790559590945291905290859055815473ffffffffffffffffffffffffffffffffffffffff191617905560025b61ffff85166000908152600160208190526040909120015460a060020a900460ff166003811115610dae57fe5b148015610db9575080155b80610df9575060015b61ffff85166000908152600160208190526040909120015460a060020a900460ff166003811115610def57fe5b148015610df95750805b5b15610e6157600160a060020a03331660009081526005602090815260409182902054825184151581524292810192909252825161ffff808916949216927f955f9cd413b1613b572ff1877b25ae515763d2a51d926bd21ba78d8ec4f16c3c92908290030190a35b80610e6d576001610e70565b60025b61ffff8516600090815260016020819052604090912001805474ff0000000000000000000000000000000000000000191660a060020a836003811115610eb257fe5b0217905550600160a060020a03331660009081526005602090815260408083205481519384524292840192909252805161ffff808916949316927f7107c2ae9754688147920c7dbf25c81ed808624042d38439123c6da5fe34beb492908290030190a35b610b8c565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff90911692600080516020612bd783398151915292908290030190a35b50505050565b610f6c612ae5565b6004805480602002602001604051908101604052809291908181526020018280548015610fe057602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff1681526020019060020190602082600101049283019260010382029150808411610fa75790505b505050505090505b90565b610ff3612ae5565b61ffff821660009081526003602052604090206004015460ff16151561101857610000565b61ffff82166000908152600360209081526040918290206002018054835181840281018401909452808452909183018282801561109c57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116110635790505b505050505090505b919050565b6004545b90565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff1660038111156110f557fe5b1480611143575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561114157fe5b145b15611578576001608060020a0381161580611175575061ffff831660009081526003602052604090206004015460ff16155b8061119f575061ffff82166000908152600160208190526040909120015460a860020a900460ff16155b156111a957610000565b61ffff80841660009081526003602081815260408084209487168452939091019052908120905b600291828204019190066010025b905461ffff858116600090815260036020818152604080842094891684529390910190529081206101009390930a9091046001608060020a03169183915b600291828204019190066010025b9054906101000a90046001608060020a0316016001608060020a0316101561125157610000565b61ffff808416600090815260036020818152604080842094871684529390910190522060015b600291828204019190066010025b905461ffff85811660009081526003602081815260408084209489168452939091019052206101009290920a90046001608060020a031690829060015b600291828204019190066010025b9054906101000a90046001608060020a0316016001608060020a031610156112f757610000565b61ffff80841660009081526003602081815260408084209487168452939091019052908120905b600291828204019190066010025b90546001608060020a036101009290920a900416158015611392575061ffff808416600090815260036020818152604080842094871684529390910190522060015b600291828204019190066010025b90546001608060020a036101009290920a900416155b156113f05761ffff831660009081526003602052604090206002018054600181016113bd8382612b32565b91600052602060002090601091828204019190066002025b815461ffff8087166101009390930a92830292021916179055505b61ffff8084166000908152600360208181526040808420948716845293909101905290812082915b600291828204019190066010025b81546001608060020a036101009290920a808204831690940182168402919093021990921691909117905561ffff8084166000908152600360208181526040808420948716845293909101905220819060015b600291828204019190066010025b81546001608060020a036101009290920a8082048316909401821684029382021916929092179055600160a060020a03331660009081526005602090815260409182902054825193851684524291840191909152815161ffff80881694878216949390911692600080516020612bb783398151915292918290030190a433600160a060020a03166000908152600560209081526040918290205482516001608060020a03851681524292810192909252825161ffff878116948782169491909316927f190acdb2d73a06a0bfaba310bd3d6a1828c500aeab3cbc74168a53e44565c9e092918290030190a45b6115bb565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff90911692600080516020612bd783398151915292908290030190a35b505050565b6115c8612ae5565b6002805480602002602001604051908101604052809291908181526020018280548015610fe057602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff1681526020019060020190602082600101049283019260010382029150808411610fa75790505b505050505090505b90565b600060025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561168e57fe5b14806116dc575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff1660038111156116da57fe5b145b15610f1b575060065461ffff620100009091041660009081526003602052604090208054608060020a80850481028187046001608060020a0319938416176001608060020a03161783556001808401805492860492909316919091179091556004808301805460ff19168317905580549091810161175a8382612b32565b91600052602060002090601091828204019190066002025b6006805483546101009390930a61ffff620100009283900481168202918102199094161790935554600160a060020a0333166000908152600560209081526040918290205482516001815242928101929092528251959093048416955091909216927f1f6540b99f70a62641d39a080ec69b8a1442f4a4019da09b6bb25ae3d7d7621c929181900390910190a360068054600161ffff62010000808404821692909201160263ffff0000199091161790555b610b8c565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff90911692600080516020612bd783398151915292908290030190a35b50505050565b61187a612b09565b61ffff831660009081526003602052604090206004015460ff1615806118bf575061ffff82166000908152600160208190526040909120015460a860020a900460ff16155b156118c957610000565b61ffff838116600090815260036020818152604080842094871684529382019052828220835160608101948590529390928390855b82829054906101000a90046001608060020a03166001608060020a031681526020019060100190602082600f010492830192600103820291508084116118fe5790505b505050505090505b92915050565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561199457fe5b14806119e2575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff1660038111156119e057fe5b145b15610f1b5761ffff841660009081526003602052604090206004015460ff161515611a0c57610000565b61ffff80851660008181526003602090815260408083208054608060020a808a048102818c046001608060020a0319938416176001608060020a03161783556001909201805492890492909116919091179055600160a060020a03331683526005825280832054815193845242928401929092528051939491909116927f1f6540b99f70a62641d39a080ec69b8a1442f4a4019da09b6bb25ae3d7d7621c9281900390910190a35b610b8c565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff90911692600080516020612bd783398151915292908290030190a35b50505050565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611b4757fe5b1480611b95575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611b9357fe5b145b1561157857600160a060020a0382161515611baf57610000565b60408051608081018252848152600160a060020a038416602082015290810182611bda576001611bdd565b60025b6003811115611be857fe5b81526001602091820181905260065461ffff1660009081528183526040908190208451815592840151918301805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039093169290921780835590840151919074ff0000000000000000000000000000000000000000191660a060020a836003811115611c6e57fe5b0217905550606091909101516001918201805491151560a860020a0275ff00000000000000000000000000000000000000000019909216919091179055600654600160a060020a0384166000908152600560205260409020805461ffff191661ffff9092169190911790556002805490918101611ceb8382612b32565b91600052602060002090601091828204019190066002025b60068054835461ffff6101009490940a848102199091169184160217909255905433600160a060020a031660009081526005602090815260409182902054825160018152429281019290925282519385169550909316927f7107c2ae9754688147920c7dbf25c81ed808624042d38439123c6da5fe34beb4929081900390910190a36006805461ffff8082166001011661ffff199091161790555b6115bb565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff90911692600080516020612bd783398151915292908290030190a35b505050565b6000808080808080808060025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611e3a57fe5b1480611e88575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611e8657fe5b145b15612a95576001608060020a038a161580611eba575061ffff8b1660009081526003602052604090206004015460ff16155b80611ed9575061ffff8b16600090815260036020526040902060020154155b15611ee357610000565b600098508897508796508695505b61ffff8b166000908152600360205260409020600201548610156120325761ffff8b16600090815260036020819052604082206002810180549190920192919089908110611f3b57fe5b90600052602060002090601091828204019190066002025b905461ffff6101009290920a900416815260208101919091526040016000908120905b600291828204019190066010025b905461ffff8d16600090815260036020819052604082206002810180546101009690960a9094046001608060020a03169d909d019c019290919089908110611fc857fe5b90600052602060002090601091828204019190066002025b905461ffff6101009290920a9004168152602081019190915260400160002060015b600291828204019190066010025b9054906101000a90046001608060020a0316880197505b600190950194611ef1565b6001608060020a038816151561204757610000565b600095506000896001608060020a0316111561248057600095505b61ffff8b166000908152600360205260409020600201548610156124805761ffff8b1660009081526003602052604090206002018054879081106120a257fe5b90600052602060002090601091828204019190066002025b905461ffff8d811660009081526003602081815260408084206101009790970a90950490931680835294019091529081209196505b600291828204019190066010025b905461ffff8d81166000908152600360208181526040808420948c168452939091019052206101009290920a90046001608060020a0316945060025b600291828204019190066010025b9054906101000a90046001608060020a03169250886001608060020a03168a85026001608060020a031681151561217a57fe5b0491506000826001608060020a0316111561247457836001608060020a03168285036001608060020a031611156122b8578a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bb7833981519152876001608060020a031660000342604051808381526020018281526020019250505060405180910390a48a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bf7833981519152874260405180836001608060020a03166001608060020a031681526020018281526020019250505060405180910390a49583019560009392909201916123c2565b8a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bb7833981519152856001608060020a031660000342604051808381526020018281526020019250505060405180910390a48a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bf7833981519152854260405180836001608060020a03166001608060020a031681526020018281526020019250505060405180910390a4958101959281900392918101915b61ffff808c166000908152600360208181526040808420948a16845293909101905290812085915b600291828204019190066010025b81546001608060020a039384166101009290920a91820293909102191691909117905561ffff808c166000908152600360208181526040808420948a16845293909101905220839060025b600291828204019190066010025b6101000a8154816001608060020a0302191690836001608060020a031602179055505b5b600190950194612062565b5b896001608060020a0316876001608060020a031610156126bd57600095505b61ffff8b166000908152600360205260409020600201548610156126bd5761ffff8b1660009081526003602052604090206002018054879081106124e057fe5b90600052602060002090601091828204019190066002025b905461ffff8d811660009081526003602081815260408084206101009790970a90950490931680835294019091522090955060025b600291828204019190066010025b905461ffff8d81166000908152600360208181526040808420948c168452939091019052206101009290920a90046001608060020a0316935060015b600291828204019190066010025b9054906101000a90046001608060020a03169050876001608060020a0316878b0382026001608060020a03168115156125ba57fe5b0491506000826001608060020a031611156126b15761ffff808c166000908152600360208181526040808420948a168452939091019052209682019692820192839060025b600291828204019190066010025b6101000a8154816001608060020a0302191690836001608060020a031602179055508a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bf7833981519152854260405180836001608060020a03166001608060020a031681526020018281526020019250505060405180910390a45b5b6001909501946124a0565b5b896001608060020a0316876001608060020a031610156129e25761ffff8b166000908152600360205260409020600201805460001981019081106126fe57fe5b90600052602060002090601091828204019190066002025b905461ffff8d811660009081526003602081815260408084206101009790970a9095049093168083529401909152908120919650888c0393505b600291828204019190066010025b9054906101000a90046001608060020a03169350816001608060020a0316846001608060020a031611156128115781840393508a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bb7833981519152856001608060020a031660000342604051808381526020018281526020019250505060405180910390a46128a3565b6000846001608060020a031611156128a3578a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bb7833981519152876001608060020a031660000342604051808381526020018281526020019250505060405180910390a4600093505b5b61ffff808c166000908152600360208181526040808420948a16845293909101905220829060025b600291828204019190066010025b81546001608060020a036101009290920a808204831690940182168402919093021990921691909117905561ffff808c166000908152600360208181526040808420948a16845293909101905290812085915b600291828204019190066010025b6101000a8154816001608060020a0302191690836001608060020a031602179055508a61ffff168561ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff16600080516020612bf7833981519152854260405180836001608060020a03166001608060020a031681526020018281526020019250505060405180910390a48996505b896001608060020a0316876001608060020a03161115612a0157610000565b8a61ffff166005600033600160a060020a0316600160a060020a0316815260200190815260200160002060009054906101000a900461ffff1661ffff167f56b23e5cb3910a046f9a66c3017ae49b4def7ebae1fb08b4adf446b4fd4c47f1894260405180836001608060020a03166001608060020a031681526020018281526020019250505060405180910390a35b612ad8565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff90911692600080516020612bd783398151915292908290030190a35b5050505050505050505050565b60408051602081019091526000815290565b60408051602081019091526000815290565b6060604051908101604052806003905b600081526000199091019060200181612b195790505090565b8154818355818115116115bb57600f016010900481600f016010900483600052602060002091820191016115bb9190612b95565b5b505050565b6060604051908101604052806003905b600081526000199091019060200181612b195790505090565b610b9591905b80821115612baf5760008155600101612b9b565b5090565b905600f3eb50aadbf0d7c57ec5f56ac9bc98188c5eaf05702012ebfe3698cf182ccb4b08a520c83f3f94e52d4d4b14319f76c4924f0b58aa571d1d8956acc5849651eacca8dbd4ba5afe4571e9544660d61ec920fc8c397d1ccb89154e803057bde225a165627a7a723058203730f7dd96bcf382e57d083ea8c6bfd5e061da4439db3f8dae7cd5bf73e2b24a0029';

		this.contractGas = '4700000';

		this.connected = false;
		this.initialized = false;
		this.lastBlockNumber = 0;

		this.self = this;
	}

	isWeb3Available(){
		if(typeof web3 == "undefined") return false;
		return true;
	}

	init(callback){
		var self = this;

		web3.eth.getAccounts(function(err, accs) {
			if (err != null) {
				callback("There was an error fetching your accounts.");
				return;
			}

			if (accs.length == 0) {
				callback("Couldn't get any accounts! Make sure Metamask is configured correctly.");
				return;
			}
		
			self.accounts = accs;
			self.account = self.accounts[0];

			console.log("Extracted accounts: ",self.accounts);
			
			callback();
		});
	}

	deployNewContract(callback) {
		var self = this;

		var obitcoinContract = web3.eth.contract(this.contractAbi);
		this.Obitcoin = obitcoinContract.new(
		{
			from: web3.eth.accounts[0], 
			data: this.contractCompiled, 
			gas: this.contractGas
		}, function (e, contract){
			if(e) callback(e, undefined);
			else if (typeof contract.address !== 'undefined') {
				console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
				console.log(contract);

				self.connected = true;

				callback(e, contract.address);
			}
		});
	}

	connectToContract(address, callback) {

		var obitcoinContract = web3.eth.contract(this.contractAbi);
		
		this.Obitcoin = obitcoinContract.at(address);
		
		var self = this;

		try {
			this.Obitcoin.getContractAddress.call({from: this.account}, function(error, result){
				if(!error){
					if(result==address){
						console.log("Connection successful");
						self.connected = true;
						callback();
					} else {
						callback("Invalid address!");
					}
				}
				else{
					console.error(error);
					callback("There was an error. Reload the page and try again");
				}
			});
		} catch (err){
			callback(err.message);
		}
	}

	disconnect(){
		this.Obitcoin = undefined;
		this.connected = false;
		if(this.events != undefined){
			this.events.stopWatching();
			this.events = undefined;
		}
	}

	isConnected(){
		return this.connected;
	}

	getAccount(){
		return this.account;
	}

	getPools(callback){
		if(!this.isConnected()) return;

		this.Obitcoin.getPools.call({from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getPoolData(pool, callback){
		if(!this.isConnected()) return;

		var self = this;
		this.Obitcoin.getPoolData.call(pool, {from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(item => data.push(self.hex2a(item)));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getPoolParticipants(pool, callback) {
		if(!this.isConnected()) return;

		this.Obitcoin.getPoolParticipants.call(pool, {from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getMembers(callback){
		if(!this.isConnected()) return;

		this.Obitcoin.getMembers.call({from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getMemberBalance(pool, member, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.getMemberBalance.call(pool, member, {from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data, member);
			}
			else
				console.error(error);
		});
	}

	getMembersBalance(pool: Number, callback: Function){
		if(!this.isConnected()) return;

		this.Obitcoin.getMembersBalance.call(pool, {from: this.account}, function(error, result){
			if(!error){
				var members = [];
				var tokens = [];
				var slices = [];
				var money = [];
				if(result[0].length != result[1].length || result[1].length != result[2].length || result[2].length != result[3].length) console.error("Received corrupt data on getMembersBalance("+pool+")");

				for(var i = 0; i<result[0].length; i++){
					tokens[i] = Number(result[0][i].valueOf());
					slices[i] = Number(result[1][i].valueOf());
					members[i] = Number(result[3][i].valueOf());
					money[i] = Number(result[2][i].valueOf());
				}

				callback(members, tokens, slices, money);
			} else console.log(error);
		});
	}

	getMemberDetails(member: Number, callback: Function){
		if(!this.isConnected()) return;

		var self = this;

		this.Obitcoin.getMemberDetails.call(member, {from: this.account}, function(error, result){
			if(!error){
				var data = new Array(3);
				data[0] = self.hex2a(result[0]);
				data[1] = result[1];
				data[2] = result[2].valueOf();

				callback(data);
			}
			else
				console.error(error);
		});
	}

	getWholeMembers(callback: Function){
		var members :Member[] = [];
		var self = this;
		this.getMembers(function(data){
			if(data.length==0) callback(members);
			for(var i = 0; i<data.length; i++){
				self.getWholeMember(data[i], function(member: Member){
					members.push(member);

					if(members.length == data.length){
						console.log("Loaded members: ",members);
						callback(members);
					}
				});

			}
		});
	}

	getWholeMember(id: Number, callback: Function){
		var member = new Member();
		member.id = Number(id);

		this.getMemberDetails(id, function(result){
			member.name = result[0];
			member.address = result[1];
			member.permissionLevel = result[2];

			callback(member);
		});
	}

	getWholePools(callback: Function){
		var pools: Pool[] = [];
		var self = this;
		this.getPools(function(data: Number[]){
			if(data.length==0) callback(pools);

			for(var i = 0; i<data.length; i++){
				self.getWholePool(data[i], function(pool: Pool){
					pools.push(pool);

					if(pools.length == data.length){
						console.log("Loaded pools: ", pools);
						callback(pools);
					}
				});

			}
		});
	}

	getWholePool(id: Number, callback: Function){
		var self = this;

		var pool = new Pool();
		pool.id = Number(id);
		var stage1=false, stage2=false;

		pool.tokens = new Map<number, number>();
		pool.slices = new Map<number, number>();
		pool.money = new Map<number, number>();

		this.getPoolData(id, function(result: string[]){
			pool.name = result[0];
			pool.legalContract = result[1];
			pool.financialReports = result[2];

			stage1=true;

			if(stage1 && stage2) callback(pool);
		});

		this.getMembersBalance(id, function(members: number[], tokens: number[], slices: number[], money: number[]){
			pool.members = members;

			for(var i = 0; i<members.length; i++){
				pool.tokens[members[i]] = tokens[i];
				pool.slices[members[i]] = slices[i];
				pool.money[members[i]] = money[i];
			}

			stage2 = true;

			if(stage1 && stage2) callback(pool);
		});
	}

	addMember(name, address, isAdmin, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.addMember(name, address, isAdmin, {from: this.account}, function(error, result){
			if(!error){
				callback(result);
			}
			else
				console.error(error);
		});
	}

	createDebtPool(name, legalContract, financialReports, callback) {
		if(!this.isConnected()) return;

		this.Obitcoin.createDebtPool(name, legalContract, financialReports, {from: this.account}, function(error, result){
			if(!error)
				callback(result);
			else
				console.error(error);
		});
	}

	updateMember(member, name, address, isAdmin, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.updateMember(member, name, address, isAdmin, {from: this.account}, function(error, result){
			if(!error){
				console.log(result);
				callback(result);
			}
			else
				console.error(error);
		});
	}

	updatePool(pool, name, legalContract, financialReports, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.updateDebtPool(pool, name, legalContract, financialReports, {from: this.account}, function(error, result){
			if(!error){
				console.log(result);
				callback(result);
			}
			else
				console.error(error);
		});
	}

	sendTokens(pools, member, amount, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.sendTokens(pools, member, amount, {from: this.account}, function(error, result){
			if(!error)
				callback(result)
			else
				console.error(error);
		});
	}

	sendTokensBulk(pool, members, amount, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.sendTokensBulk(pool, members, amount, {from: this.account}, function(error, result){
			if(!error)
				callback(result)
			else
				console.error(error);
		});
	}

	buyTokens(pool, amount, callback){
		if(!this.isConnected()) return;

		this.Obitcoin.buyTokens(pool, amount, {from: this.account}, function(error, result){
			if(!error)
				callback(result)
			else
				console.error(error);
		});
	}

	getLastBlockNumber(){
		return this.lastBlockNumber;
	}

	startListeningForEvents(callback){
		if(!this.isConnected()) return;

		var self = this;

		this.lastBlockNumber = web3.eth.getBlockNumber(function(err, result){
			if(err) return;
			self.lastBlockNumber = result;

			self.Obitcoin.getPublishingBlockNumber.call({from: self.account}, function(error, result){

				self.events = self.Obitcoin.allEvents({fromBlock: result.valueOf()});
				self.events.watch(function(err, event) {
					if (err) {
						console.log(err)
						return;
					}
					callback(event);
				});

			});
		});
	}

	hex2a(hexx) { //convert a byte array to string
		var hex = hexx.toString(); //force conversion
		var str = '';
		var int;
		for (var i = 2; i < hex.length; i += 2){
			int = parseInt(hex.substr(i, 2), 16);
			if(int==0) continue;
			str += String.fromCharCode(int);
		}
		return str;
	}

	bin2string(array){
		var result = "";
		for(var i = 0; i < array.length; ++i){
			result+= (String.fromCharCode(array[i]));
		}
		return result;
	}

}