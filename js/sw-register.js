if('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then(reg => {
			console.log('Service Worker Registered: ' + reg.scope);
		})
		.catch(err => {
			console.log('Registration failed: ' + err);
		});
}