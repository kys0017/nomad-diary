import { Realm } from '@realm/react';

export default class Feeling extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  emotion!: string;
  message!: string;

  static schema = {
    name: 'Feeling',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      emotion: 'string',
      message: 'string',
    },
  };
}
