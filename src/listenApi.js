import Axios from 'axios';

// listen API
// const key = "5df881c89d644904bc39af8b922c9441"; //old key
const key = "d370e5f11d0a4b14956d88517e75fd8a"; // Nathan's key
const endpoint = "https://listen-api.listennotes.com/api/v2/";

const errorMessages = {
	['400']: '400 - There is something wrong on your end, please try again',
	['401']: '401 - Wrong API key or problems with account',
	['404']: '404 - No results found, please try again',
	['429']: '429 - API quota exceeded - please try again later',
	['500']: '500 - Unexpected server errors - please try again later',
}


/**
 * Calls the API, requires a requestType and various object parameters.
 * @param {string} requestType the string to append to the endpoint
 * @param {object} params any additional parameters to send
 * @returns {Promise} The Axios promise
 */
export default function listenApi(requestType, params) {
	return Axios({
		url: endpoint + requestType,
		params: {
			...params,
		},
		headers: {
			['X-ListenAPI-Key']: key,
		}
	})
}

/**
 * Return the appropriate error message for given API code
 * @param {object} error
 * @returns {string} The message to display for the provided error code
 */
export function errorResponse(error) {
	console.log(typeof error);
	const { status } = error.response;
	let message = 'Unknown error, please refresh and try again';
	for (let error in errorMessages) {
		if (status == error) message = errorMessages[error];
	}
	return message;
}