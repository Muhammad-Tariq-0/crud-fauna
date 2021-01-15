const faunadb = require('faunadb'),
q = faunadb.query;

exports.handler = async (event, context) => {
try {
  var client =new faunadb.Client({secret: 'fnAD_CbPMDACBOwL-lAaFj27RTtxkiQz-DPutYsd'});
  var incomingId = JSON.parse(event.body);
var result =await client.query(
    q.Delete(q.Ref(q.Collection("semester-7"),incomingId.id))
)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "sucessfully deleted" }),
  }
} catch (err) {
  return { statusCode: 500, body: err.toString() }
}
}
