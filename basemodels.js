const uuid = require('uuid');

// this module provides volatile storage, using a `BlogPost`
// model. We haven't learned about databases yet, so for now
// we're using in-memory storage. This means each time the app stops, our storage
// gets erased.

// don't worry to much about how BlogPost is implemented.
// Our concern in this example is with how the API layer
// is implemented, and getting it to use an existing model.


function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const BaseRoute = {
  get: function(){ return {id:'hello'} },
  post: function(){ return {id:'goodbye'} }
}

function createBaseRoute()
{
  const storage = Object.create(BaseRoute);
  storage.tmp = [];
  return storage;
}

module.exports = {BaseRoute: createBaseRoute()};
