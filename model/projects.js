var mongoose = require('mongoose');  
var projectsSchema = new mongoose.Schema({  
  name: String,
  description: String,
  price: { type: Number, min: 0 },
  done: String,
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  archived: { type: Boolean, default: false }
});
mongoose.model('Project', projectsSchema);
