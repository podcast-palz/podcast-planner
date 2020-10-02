import Axios from 'axios';


// listen API
const key = "5df881c89d644904bc39af8b922c9441";
const endpoint = "https://listen-api.listennotes.com/api/v2/";



export async function getPodcasts(requestType, params) {
	console.log('params', params);
	return await Axios({
		url: endpoint + requestType,
		params: {
			...params,
		},
		headers: {
			['X-ListenAPI-Key']: key,
		}
	})
}

