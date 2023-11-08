/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Asset {

    @Property()
    public ID: string;

    @Property()
    public Name: string;

    @Property()
    public Surname: string;

    @Property()
    public Group?: string;

    @Property()
    public Grade1?: number;

    @Property()
    public Grade2?: number;

    @Property()
    public Grade3?: number;

    @Property()
    public Grade4?: number;
}

