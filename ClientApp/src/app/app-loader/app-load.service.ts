import { Injectable } from '@angular/core';


@Injectable()
export class AppLoadService {

  constructor() { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      // put initializations here that need to be done before the app starts.
      // For example, querying a server to get environment settings.
      console.debug('initializing.');
      resolve();
    });
  }
}