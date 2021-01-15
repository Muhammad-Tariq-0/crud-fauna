const faunadb = require('faunadb'),
q = faunadb.query;

exports.handler = async (event, context) => {
try {
  var client =new faunadb.Client({secret: 'fnAD_CbPMDACBOwL-lAaFj27RTtxkiQz-DPutYsd'});
  var incomingData = JSON.parse(event.body);
var result =await client.query(
    q.Update(q.Ref(q.Collection("semester-7"),incomingData.id),
    { data: { title: incomingData.message} },
    )
)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "sucessfully deleted" }),
  }
} catch (err) {
  return { statusCode: 500, body: err.toString() }
}
}
