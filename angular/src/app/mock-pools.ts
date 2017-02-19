import { Pool } from './pool';
import { Member } from './member';
import { MEMBERS } from './mock-members';

export class MockPools{
    pools: Pool[];

    init(){
        this.pools = [];
        this.pools[0] = new Pool();
        this.pools[1] = new Pool();

        this.pools[0].id = 123;
        this.pools[0].name = "ChickenRun";
        this.pools[0].legalContract = "www.google.com";
        this.pools[0].financialReports = "www.facebook.com";
        this.pools[0].members = MEMBERS.slice(0,3);
        this.pools[0].tokens = new Map<number, number>();
        this.pools[0].slices = new Map<number, number>();
        this.pools[0].tokens[this.pools[0].members[0].id] = 32;
        this.pools[0].slices[this.pools[0].members[0].id] = 8;
        this.pools[0].tokens[this.pools[0].members[2].id] = 13;
        this.pools[0].slices[this.pools[0].members[2].id] = 0;

        this.pools[1].id = 512;
        this.pools[1].name = "Classified project";
        this.pools[1].legalContract = "www.google.com";
        this.pools[1].financialReports = "www.facebook.com";
        this.pools[1].members = MEMBERS.slice(2,6);
        this.pools[1].tokens = new Map<number, number>();
        this.pools[1].slices = new Map<number, number>();
        this.pools[1].tokens[this.pools[1].members[0].id] = 123;
        this.pools[1].slices[this.pools[1].members[0].id] = 500;
        this.pools[1].tokens[this.pools[1].members[1].id] = 32;
        this.pools[1].slices[this.pools[1].members[1].id] = 3;
    }

    getPools(): Pool[] {
        return this.pools;
    }
}