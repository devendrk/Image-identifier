const functions = require("firebase-functions");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");
admin.initializeApp();
const client = new vision.ImageAnnotatorClient();
const db = admin.database();

exports.GetImageJson = functions.storage.object().onFinalize(async (object) => {
  var Url =
    "https://firebasestorage.googleapis.com/v0/b/image-identifier-9704c.appspot.com/o/" +
    object.name +
    "?alt=media&token=" +
    object.metadata.firebaseStorageDownloadTokens;
  const [result] = await client.objectLocalization(Url);
  const objects = result.localizedObjectAnnotations;
  await db
    .ref("JsonResponse")
    .set(objects)
    .catch((error) => {
      console.log(error);
    });
});
