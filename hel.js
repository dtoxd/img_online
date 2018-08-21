function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
  '((\\d{1,3}\\.){3}\\d{1,3}))'+
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
  '(\\?[;&a-z\\d%_.~+=-]*)?'+
  '(\\#[-a-z\\d_]*)?$','i');
  return pattern.test(str); 
}

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

async function predict() {
	var images = document.getElementsByTagName("img");
	
	image_count = images.length;
	console.log("Found "  + image_count + " Image(s)");

	model_url = chrome.extension.getURL('json/model.json')
	console.log(model_url)
	const model = await tf.loadModel(model_url);
	if(model != null)
	{
		console.log("Model Loaded.");
	}
	else
	{
		console.log("Could Not Load Model.");
	}

	for(i=0;i<image_count;i++)
	{
		img_url = images[i].src;
		console.log(":: Image["+(i+1)+"] :: ");
		console.log(typeof(images[i]));
		// console.log(img_url);

		// if(isURL(img_url) == true)
		// {
		// 	input = tf.fromPixels(images[i]);
		// 	console.log(input)
		// 	input = tf.cast(input, 'float32');
		// 	width = input.shape[1];
		//     height = input.shape[0];
		//     console.log(":: Image["+(i+1)+"] :: ");
		//     console.log(width);
		//     console.log(height);
		//     if(width > 10 && height > 10)
		//     {
		// 		input = input.reshape([1, height, width, 3]);
		// 	    console.log(input.shape[2]);
		// 		const mod = model.predict(input);
		// 		var x = " " + mod;
		// 		// x = x.substring(50, 102);
		// 		console.log("Image " + (i+1) + x);
		//     }
		// }
		// else
	 //    {
	    	toDataURL(img_url, function(dataUrl) {
				// console.log('RESULT:', dataUrl);
				var img = new Image();
    			img.crossOrigin = 'Anonymous';
    			img.src = dataUrl;
				input = tf.fromPixels(img);
				console.log(input);
				input = tf.cast(input, 'float32');
				width = input.shape[1];
				console.log(width);
				height = input.shape[0];
				console.log(height);
				input = input.reshape([1, height, width, 3]);
				console.log(input.shape[2]);
				const mod = model.predict(input);
				var x = " " + mod;
				// x = x.substring(50, 102);
				console.log("Image " + (i+1) + x);
			});
	    // }
	}
}

predict();