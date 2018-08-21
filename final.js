// Do not make changes in this code. If necessary create a backup and then proceed.

var model = null;
var images = null;
var image_count = null;

function toDataURL(url, callback) {
	console.log("From XML Function: "+url);
	var xhr = new XMLHttpRequest();
		xhr.onload = function() {
	    	var reader = new FileReader();
	    	reader.onloadend = function() {
	      	callback(reader.result);
	    }
    reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}

function vars()
{
	var pattern = new RegExp('^(https?:\\/\\/)?'+
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
	'((\\d{1,3}\\.){3}\\d{1,3}))'+
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	'(\\?[;&a-z\\d%_.~+=-]*)?'+
	'(\\#[-a-z\\d_]*)?$','i');
	var images = document.getElementsByTagName("img");
	var image_count = images.length;
	console.log("Found "  + image_count + " Image(s)");
}

async function load_model()
{
	model_url = await chrome.extension.getURL('json/model.json')
	// console.log(model_url)
	model = await tf.loadModel(model_url);	
	// console.log(typeof(model));
	if(model != null)
	{
		console.log("Model Loaded.");
	}
	else
	{
		console.log("Could Not Load Model.");
	}
}

function predict()
{
	var pattern = new RegExp('^(https?:\\/\\/)?'+
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
	'((\\d{1,3}\\.){3}\\d{1,3}))'+
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	'(\\?[;&a-z\\d%_.~+=-]*)?'+
	'(\\#[-a-z\\d_]*)?$','i');
	var images = document.getElementsByTagName("img");
	var image_count = images.length;
	console.log("Found "  + image_count + " Image(s)");
	for(let i=0;i<images.length;i++)
	{
		let img_url = images[i].src;
		console.log(":: Image["+(i+1)+"] :: ");
		console.log(typeof(images[i]));
		toDataURL(img_url, function(dataUrl) {
			console.log('RESULT from XML function:', dataUrl);
			var img = new Image();
			// img.crossOrigin = 'Anonymous';
			img.src = dataUrl;
			img.width = images[i].width;
			img.height = images[i].height;
			input = tf.fromPixels(img);
			console.log(input);
			input = tf.cast(input, 'float32');
			width = input.shape[1];
			console.log(width);
			height = input.shape[0];
			console.log(height);
			input = input.reshape([1, height, width, 3]);
			console.log(input.shape);
			let mod = model.predict(input);
			let x = " " + mod;
			// x = x.substring(50, 102);
			console.log("Image " + (i+1) + x);
		});
	}
}

async function start()
{
	// await vars();
	await load_model();
	await predict();
}

start();

// Do not make changes in this code. If necessary create a backup and then proceed.