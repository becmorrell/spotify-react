const functions = require("firebase-functions");
const cors = require('cors')({ origin: "https://poster-prioritiser.web.app" });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.googleVision = functions.region('europe-west2').https.onRequest(async(request, response) => {

    cors(request, response, async() => {
    // Imports the Google Cloud client libraries
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        const testImage = request.body.imageURL

        // Performs text detection on the gcs file
        const [result] = await client.textDetection(testImage);
        const detections = result.textAnnotations;
        const posterText = detections[0]?.description;

        response.send(JSON.stringify({
                text: posterText
            })
        );
    });
});


