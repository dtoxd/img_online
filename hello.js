// var data = document.getElementsByTagName("html")[0].innerText;
var images = document.getElementsByTagName("img")
// var tfScript = document.createElement('script');  

// document.getElementsByTagName("html")[0].style.visibility = "hidden";

// console.log(images);
// console.log(data);

image_count = images.length;
console.log("Found "  + image_count + " Image(s)");

async function predict() {
	// model_url = chrome.extension.getURL('json/model.json')
	// console.log(model_url)
	// const model = await tf.loadModel(model_url);
	// if(model != null)
	// {
	// 	console.log("Model Loaded.");
	// }
	// else
	// {
	// 	console.log("Could Not Load Model.");
	// }

	// // Code For Image Explicit/Non-Explicit Prediction
	// for (var i = 0; i < image_count; i++) 
	// {
	// 	input = tf.fromPixels(images[i]);
	// 	input = tf.cast(input, 'float32');
	// 	width = input.shape[1];
	//     height = input.shape[0];
	//     if(width > 50 && height > 50)
	//     {
	//     	console.log(width);
	// 	    console.log(height);
	// 		input = input.reshape([1, height, width, 3]);
	// 	    // input = tf.cast(input, 'float32');
	// 	    // console.log(input.shape[2]);
	// 		const mod = model.predict(input);
	// 		var x = " " + mod;
	// 		// x = x.substring(50, 102);
	// 		console.log(x);
	// 		console.log("Image " + (i+1) + x);
	//     }

	// 	// console.log("Processing finished. Displaying the page now...");
	// 	// const body_data = document.getElementsByTagName("html")[0];
	// 	// body_data.style.backgroundColor = "red";
	// 	// body_data.style.visibility = "visible";
	// }

	var images = document.getElementsByTagName("img");

	// Take action when the image has loaded
	// images.addEventListener("load", function () {
	    var imgCanvas = document.createElement("canvas"),
	        imgContext = imgCanvas.getContext("2d");

	    // Make sure canvas is as big as the picture
	    imgCanvas.width = images[100].width;
	    imgCanvas.height = images[100].height;

	    // Draw image into canvas element
	    imgContext.drawImage(images, 0, 0, images.width, images.height);

	    // Get canvas contents as a data URL
	    var imgAsDataURL = imgCanvas.toDataURL("image/png");

	    // Save image into localStorage
	    try {
	        localStorage.setItem("elephant", imgAsDataURL);
	    }
	    catch (e) {
	        console.log("Storage failed: " + e);
	    }
	// }, false); 


}

predict();

// console.log("Data Printed Here");
// setTimeout(()=>{
// 	console.log("Processing finished. Displaying the page now...");
// 	const body_data = document.getElementsByTagName("html")[0];
// 	// body_data.style.backgroundColor = "red";
// 	body_data.style.visibility = "visible";
// },5000)