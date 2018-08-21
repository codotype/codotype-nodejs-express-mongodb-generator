const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

// // // //

// Password encryption helper function
function encryptPassword (password) {
    return crypto.createHmac('sha1', process.env.PASSWORD_ENCRYPTION_SECRET)
        .update(password)
        .digest('base64')
}

// // // //

const <%= schema.class_name %> = new Schema({
  <%_ for (index in schema.attributes) { _%>
  <%_ let attr = schema.attributes[index] _%>
  <%_ if (attr.datatype === 'BOOL') { _%>
  <%_ continue _%>
  <%_ } else if (attr.datatype === 'BOOL') { _%>
  <%= attr.identifier %>: {
    type: Boolean
  },
  <%_ } else if (attr.datatype === 'NUMBER') { _%>
  <%= attr.identifier %>: {
    type: Number,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } else if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'BELONGS_TO') { _%>
  <%= attr.identifier %>: {
    type: Schema.Types.ObjectId,
    ref: '<%= attr.datatypeOptions.schema_label %>'
  },
  <%_ } else if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'HAS_MANY') { _%>
  <%= attr.identifier %>: [{
    type: Schema.Types.ObjectId,
    ref: '<%= attr.datatypeOptions.schema_label %>'
  }],
  <%_ } else if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'OWNS_MANY') { _%>
  <%_ continue _%>
  <%_ } else { _%>
  <%= attr.identifier %>: {
    type: String,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } _%>
  <%_ } _%>
  roles: {
    type: [String],
    default: []
  }
  },
  // Collection options
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn'
  },
  versionKey: false
});

// // // //

// Create new User document
// TODO - add email
User.statics.create = function ({ name, email, username, password }) {

    // Instantiates new User model
    const user = new this({
        name,
        email,
        username,
        password: encryptPassword(password)
    })

    // Return User.save() Promise
    return user.save()
}

// findOneByUsername
// Find one User by username
User.statics.findOneByUsername = function (username) {
    // Executes MongoDb query
    return this.findOne({ username }).exec()
}

// verify
// Verifies the password parameter of POST /auth/login requests
User.methods.verify = function (password) {
    // Verifies saved password against a request's password
    return this.password === encryptPassword(password)
}

// assignAdmin
// Assigns admin priviledges to a user
User.methods.assignAdmin = function () {
    // Assigns true to `admin` attribute
    this.admin = true

    // Returns `save` Promise
    return this.save()
}

<%_ for (index in schema.attributes) { _%>
<%_ let attr = schema.attributes[index] _%>
<%_ if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'BELONGS_TO') { _%>
<%= schema.class_name %>.methods.get<%= attr.datatypeOptions.schema_class_name %> = function () {
  return mongoose.model('<%= attr.datatypeOptions.schema_label %>').findById(this.<%= attr.identifier %>);
}
<%_ } else if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'HAS_MANY') { _%>
<%= schema.class_name %>.methods.get<%= attr.datatypeOptions.schema_class_name_plural %> = function () {
  return mongoose.model('<%= attr.datatypeOptions.schema_label %>').find({ <%= schema.identifier %>_id: this._id });
}
<%_ } else if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'HAS_ONE') { _%>
<%= schema.class_name %>.methods.get<%= attr.datatypeOptions.schema_class_name %> = function () {
  return mongoose.model('<%= attr.datatypeOptions.schema_label %>').findById(this.<%= attr.identifier %> });
}
<%_ } _%>
<%_ } _%>

// TODO - absract schema.class_name
module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.label.split(' ').join('') %>)
