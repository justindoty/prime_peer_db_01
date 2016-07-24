var router = require('express').Router();

var Assignment = require('../models/assignment');

router.get('/:id?', function(request, response){

  var id = request.params.id;

  if(!id){
    Assignment.find({}, function(err, assignments){
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        response.send(assignments);
      }
    })
  
  } else {
    Assignment.findById(id, function(err, assignments){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      response.send(assignments);
    }
  })
}


});

router.post('/addAssignment', function(request, response){
  console.log('Creating data');
  var data = request.body;

  var newAssignment = new Assignment({
    assignment_name: data.assignment_name,
    student_name: data.student_name,
    score: data.score,
    date_completed: data.date_completed
  })

  newAssignment.save(function(err){
    if(err){
      console.log('Save err:', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });


});

router.delete('/removeById/:id', function(request, response){
  var id = request.params.id;
  console.log (id);

  Assignment.findById(id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else{
      assignment.remove(function(err){
        if(err){
          log(err);
        }
      })

      console.log('User Deleted');
      response.sendStatus(200);
    }
  })
})




module.exports = router;
