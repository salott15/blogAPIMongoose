const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Blog,BlogPosts} = require('./models');

// convenience function for generating lorem text for blog
// posts we initially add below
function lorem() {
  return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, '
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
    'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
    'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
    'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

// seed some posts so initial GET requests will return something
BlogPosts.create(
  '10 things -- you won\'t believe #4', lorem(), 'Billy Bob');
BlogPosts.create(
  'Lions and tigers and bears oh my', lorem(), 'Lefty Lil');

// add endpoint for GET. It should call `BlogPosts.get()`
// and return JSON objects of stored blog posts.
// send back JSON representation of all blog posts
// on GET requests to root
router.get('/', (req, res) => {
  Blog
    .find()
    .exec()
    .then(posts => {
		res.json({
			posts: posts.map((post) => post.apiRepr())
		});
  });

  router.get('/:id', (req,res)=> {
    Blog
    .findById(req.params.id)
    .exec()
    .then(post => {
      console.log(post)
      res.json(post.apiRepr());
    });
  });
});


// add endpoint for POST requests, which should cause a new
// blog post to be added (using `BlogPosts.create()`). It should
// return a JSON object representing the new post (including
// the id, which `BlogPosts` will create. This endpoint should
// send a 400 error if the post doesn't contain
// `title`, `content`, and `author`
router.post('/', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  })
  .then(function(post){
    res.status(201).json(post);
  })
  .catch(err => {
			console.error(err);
			res.status(500).json({ message : 'Internal server error, cannot create' })
		});
});


// add endpoint for PUT requests to update blogposts. it should
// call `BlogPosts.update()` and return the updated post.
// it should also ensure that the id in the object representing
// the post matches the id of the path variable, and that the
// following required fields are in request body: `id`, `title`,
// `content`, `author`, `publishDate`
router.put('/:id', jsonParser, (req, res)=> {
 console.log(req.body);
  Blog
.findOneAndUpdate({_id:req.params.id}, 
  {title: req.body.title,
    content: req.body.content,
    author: req.body.author},
    function(err, post){
      res.json(post)
    });
})

// add endpoint for DELETE requests. These requests should
// have an id as a URL path variable and call
// `BlogPosts.delete()`
router.delete('/:id', (req, res) => {
  Blog
  .deleteOne({_id:req.params.id},
    function(err, post){
      res.json(post)
    });
})
/*  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});
*/
module.exports = router;
