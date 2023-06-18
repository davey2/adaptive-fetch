let previousData = null;
let frequency = 1000;
let minFrequency = 500;

export default function sendHttpRequest(params, callback) {
	fetch(params.url, params.options)
		.then(response => response.text())
		.then(data => {
			if (data !== previousData) {
				callback(data)
				previousData = data;

				// Decrease the frequency by 1000 milliseconds, but ensure it doesn't go below the minimum frequency
				frequency = Math.max(frequency - 1000, minFrequency);
			} else {
				frequency += 100;
			}

			// Schedule the next HTTP request using setTimeout after the specified frequency
			setTimeout(() => sendHttpRequest(params, callback), frequency)
		})
}