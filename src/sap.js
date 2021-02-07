const SAPPY = 'https://pdm.me/sap';

/**
 * get
 *
 * Makes a GET request to tree-sap.
 *
 * When an error occurs, the callback is called with the value `null`.
 * Otherwise, it is called with the response body (a string).
 *
 * @param {function} callback - a function to call when the response arrives
 */
export function get(callback) {

  request('GET', undefined, callback);

}

/**
 * post
 *
 * Makes a POST request to tree-sap.
 *
 * When an error occurs, the callback is called with the value `null`.
 * Otherwise, it is called with an empty string.
 *
 * @param {string} body - what to send in the HTTP request body
 * @param {function} callback - a function to call when the response arrives
 */
export function post(body, callback) {

  request('POST', body, callback);

}

/**
 * request
 *
 * Makes an HTTP request to tree-sap.
 *
 * When an error occurs, the callback is called with the value `null`.
 * Otherwise, it is called with the response body (a string).
 *
 * @param {string} method - the HTTP method to use
 * @param {string|undefined} body - the HTTP request body
 * @param {function} callback - a function to call when the response arrives
 */
function request(method, body, callback) {

  // create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Abort the HTTP request (stop waiting for it & ignore any response that
  // comes back) after 30 seconds.
  xhr.timeout = 30 * 1000;

  xhr.addEventListener('timeout', () => {
    // The request timed out. Maybe it would have succeeded if we let it go
    // longer, but for now just consider this an errors so the UI doesn't give
    // the user false hope.
    callback(null);
  });

  xhr.addEventListener('error', () => {
    // Maybe the user isn't connected to the Internet, for example. Or perhaps
    // the server isn't running.
    callback(null);
  });

  xhr.addEventListener('load', () => {
    // The request completed successfully. Now we can look at what tree-sap
    // sent over.

    if (xhr.status === 200) {
      // Success! 😀
      callback(xhr.responseText);
    } else if (xhr.status === 404) {
      // In the tree-sap GET request, if its database is empty it returns a 404
      // error. For our purposes, it's easier to think of this as being an empty
      // string.
      callback('');
    } else if (xhr.status >= 400) {
      // The server sent back a response that indicated some kind of error
      // occurred. What happened??? Poor tree-sap...
      callback(null);
    } else {
      // This should never happen!
      //
      // Because we expect this to never happen, we don't know what the
      // response body might be. Treat this case as an error.
      callback(null);
    }
  });

  // open the request with the verb and the url
  xhr.open(method, SAPPY);

  // send the request
  xhr.send(body);

}
