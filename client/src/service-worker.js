import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

import { openDB } from "idb";


/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 */
precacheAndRoute(self.__WB_MANIFEST);
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__precacheManifest, {});

registerRoute(
	({ url }) => url.pathname.endsWith(".png"),
	new CacheFirst({
		cacheName: "images",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
		],
	})
);


if (navigator.onLine) {
	console.log('Device is online!');
  } else {
	console.log('Device is offline!');
  }

self.addEventListener('fetch', (ev) => {
	// console.log("fetch");
	// console.log(ev);
	// console.log("url: " + ev.request.url);

	if(ev.request.url.includes("/api/")) {
		ev.respondWith(
			caches.match(ev.request).then((cacheRes) => {
				return (
					cacheRes ||
					Promise.resolve().then(() => {
						const clonedRequest = ev.request.clone();
						return fetch(ev.request).then(async response => {
							// console.log("RESPONSE: " + response);
							if(ev.request.url.includes("/get/")) {
								let clonedResponse = response.clone();
								const body = await clonedResponse.json();
								if(ev.request.url.includes("/allItemsLength/")) {
									addToDB('ExerciseTrackerAllItemsLength', body, "allItemsLength");
								} else if(ev.request.url.includes("/unique/")) {
									addToDB('ExerciseTrackerUnique', body, "unique");
								} else {
									addToDB('ExerciseTracker', body, "exercise");
								}
							} else if (ev.request.url.includes("/set/")) {
								let clonedResponse = response.clone();
								const body = await clonedResponse.json();
								if(ev.request.method == "POST" ||
								ev.request.method == "PUT") {
									addToDB('ExerciseTracker', body, "exercise");
								} else if(ev.request.method == "DELETE") {
									deleteOfDB('ExerciseTracker', body, "exercise");
								}
							}
							return response;
						}).catch(async err => {
							if(ev.request.url.includes("/get/")) {
								if(ev.request.url.includes("/allItemsLength/")) {
									return await getFromDB('ExerciseTrackerAllItemsLength', 'allItemsLength');
								} else if(ev.request.url.includes("/unique/")) {
									return await getFromDB('ExerciseTrackerUnique', 'unique');
								} else {
									return await getFromDB('ExerciseTracker', 'exercise');
								}
							} else if(ev.request.method == "POST" ||
									ev.request.method == "PUT") {
										// console.log("Offline-POST");
										// console.log(clonedRequest);
								return await addToDB('ExerciseTracker', await clonedRequest.json(), "exercise");
							} else if(ev.request.method == "DELETE") {
									// console.log("Offline-DELETE");
									// console.log(clonedRequest);
								return deleteOfDB('ExerciseTracker', await clonedRequest.json(), "exercise");
							}
						})
					})
				)
			})
		);
	}
});

async function addToDB(DBName, body, storeName) {
	// console.log("addToDB");
	const DBOpenRequest = await openDB(DBName, 1);
	// console.log(body);

	let key = body.list ? "list" : body.count ? "count" : "date";
	if(key == "date") {
		if(Array.isArray(body)){
			body.forEach(function(el) {
				DBOpenRequest.transaction(storeName, "readwrite").objectStore(storeName).put(el);
			});
		} else {
			DBOpenRequest.transaction(storeName, "readwrite").objectStore(storeName).put(body);
			return new Response(JSON.stringify(JSON.stringify(body)), {
					"status": 200,
					"statusText": "MyCustomResponse!"});
		}
	} else {
		DBOpenRequest.transaction(storeName, "readwrite").objectStore(storeName).put(body, key);
	}
}

function deleteOfDB(DBName, body, storeName) {
	const DBOpenRequest = self.indexedDB.open(DBName);
	DBOpenRequest.onsuccess = (e) => {
			DBOpenRequest.result.transaction([storeName], "readwrite")
			.objectStore(storeName).delete(body.date);
	}
	return new Response("", {
		"status": 200,
		"statusText": "MyCustomResponse!"
		});
}

async function getFromDB(DBName, storeName) {
	console.log("getFromDB");

	const db = await openDB(DBName, 1);
	const tx = db.transaction(storeName);
	const store = tx.objectStore(storeName);
	const data = await store.getAll();
	if (data.length > 0) {
		// console.log("Data: " + JSON.stringify(data));
		return new Response(JSON.stringify(JSON.stringify(data)), {
				"status": 200,
				"statusText": "MyCustomResponse!"
				});
	}
}



// 	const DBOpenRequest = await self.indexedDB.open(DBName);
// 	const transaction = DBOpenRequest.result.transaction([storeName], "readonly");
// 	const objectStore = transaction.objectStore(storeName);
// 	const request = await objectStore.getAll();
// 	request.onsuccess = (e) => {
// 	  console.log("DB!: " + JSON.stringify(request.result));
// 	  const response = new Response(JSON.stringify(request.result), {
// 		"status": 200,
// 		"statusText": "MyCustomResponse!"
// 	  });
// 	return new Promise((resolve, reject) => {
// 	  DBOpenRequest.onsuccess = (e) => {
// 		  resolve(response);
// 		};
// 		request.onerror = (e) => {
// 		  reject(e);
// 		};
// 	  };
// 	  DBOpenRequest.onerror = (e) => {
// 		reject(e);
// 	  };
// 	});
//   }

// function getFromDB(DBName, storeName) {
// 	console.log("getFromDB");
// 	const DBOpenRequest = self.indexedDB.open(DBName);
// 	return DBOpenRequest.onsuccess = (e) => {
// 		return DBOpenRequest.result.transaction([storeName], "readonly")
// 		.objectStore(storeName).getAll().onsuccess = (e) => {
// 			console.log(e.target.result);
// 			return new Response(JSON.stringify(e.target.result), 
// 			{ "status" : 200 , 
// 			"statusText" : "MyCustomResponse!" });
// 		}
// 	}
// }


// registerRoute(new RegExp("/api/"), ({url, event, params}) => {
// 	console.log("URL: " + url);
//     return fetch(event.request)
//         .then(response => {
//             let clonedResponse = response.clone();
//             clonedResponse.json().then( body => {
// 				console.log("Request: " + body)
//                 self.idb.openDB('ExerciseTracker', 1).then(db => {
//                     db.transaction('exercise', "readwrite")
//                       .objectStore('exercise').put(body);
//                 });
//             });
//             return response;
//         }).catch(err => {
// 			const DBOpenRequest = self.indexedDB.open('ExerciseTracker');
// 			DBOpenRequest.onsuccess = (e) => {
// 				let IDBRequest = DBOpenRequest.result.transaction(['exercise'], "readonly")
// 				.objectStore('exercise').getAll();
// 				IDBRequest.onsuccess = (e) => {
// 					let db = IDBRequest.result;
// 					console.log("db: " + db);
// 				}
				
// 				// .then(values => 
// 				//   new Response(JSON.stringify(values), 
// 				//    { "status" : 200 , 
// 				//    "statusText" : "MyCustomResponse!" }));
// 				//    console.log("Catch: " + resp);
// 				//    return resp;
// 			};
// 			// console.log("Catch: " + DBOpenRequest);
//             // return self.idb.openDB('ExerciseTracker', 1).then(db => {
//             //     return db.transaction('exercise')
//             //              .objectStore('exercise').getAll()
//             //              .then(values => 
//             //                new Response(JSON.stringify(values), 
//             //                 { "status" : 200 , 
//             //                 "statusText" : "MyCustomResponse!" }));
//             // });
//         });
// });


// registerRoute(
// 	({ url }) => url.pathname.startsWith("/api/exerciseList/get"),
// 	new CacheFirst({
// 		cacheName: "exercise",
// 		plugins: [
// 			new CacheableResponsePlugin({
// 				statuses: [0, 200],
// 			}),
// 		],
// 	})
// );

// registerRoute(
// 	({ url }) => url.pathname.startsWith("/api/exerciseList/set"),
// 	new NetworkOnly({
// 		plugins: [
// 			new BackgroundSyncPlugin("exerciseQueue", {
// 				maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
// 			}),
// 		],
// 	})
// );
