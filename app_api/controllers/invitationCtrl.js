var mongoose = require('mongoose');
var Invitation = mongoose.model('Invitation');

exports.findByForInvitation = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log("Get/invitationsFor: " + id);
    Invitation.
    find({
            forRef: id,
            isActive: true
        })
        .exec(function(err, invitations) {
            if (err) res.send(500, err.message);
            res.status(200).json(invitations);
        });
};

exports.addInvitation = function(req, res) {
    console.log('POST/Invitation');
    console.log(req.body);
    var invitation = new Invitation(req.body);

    invitation.save(function(err, inv) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(inv);
    });
};


exports.deleteInvitation = function(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
  console.log("Delete/invitation" + id);
  Invitation.findByIdAndUpdate(id,
    {
      $set: {isActive:false}
    },
    function(err, inv) {
      if (err) return res.status(500).send(err.message);
      res.status(200).json(inv);
  });
};
