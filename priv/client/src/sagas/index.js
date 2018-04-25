/*
   Pour comprendre les yiedls :

   // generator function
   function* process() {
   console.log('Start process 1');
   console.log('Pause process2 until call next()');

   yield;

   console.log('Resumed process2');
   console.log('Pause process3 until call next()');

   yield;

   console.log('Resumed process3');
   console.log('End of the process function');

   }

   let _process = process();

   _process.next()

   > Start process 1
   > Pause process2 until call next()
   > Object { value: undefined, done: false }

   _process.next()
   > Resumed process2
   > Pause process3 until call next()
   > Object { value: undefined, done: false }

   _process.next()

   > Resumed process3
   > End of the process function
   > Object { value: undefined, done: true }

   _process.next()
   > Object { value: undefined, done: true }

   _process.next()
   > Object { value: undefined, done: true }
 */

import { watchPostMessage } from './chat';

export default function* rootSaga () {
    yield [
        watchPostMessage()
    ];
}
