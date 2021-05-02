module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      email: String,
      description: String,
      agent: String,
      serial: Number,
      status: {
        type: [{
          type: String,
          enum: ['owner', 'sold', 'owner-bad', 'sold-bad', 'buyer']
        }],
        default: ['buyer']
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
