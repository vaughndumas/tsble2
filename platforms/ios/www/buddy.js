window.Buddy =  function (root) {
	var buddy = {};

    /*
        A JavaScript implementation of the SHA family of hashes, as
         defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
        as defined in FIPS PUB 198a

        Copyright Brian Turek 2008-2013
        Distributed under the BSD License
        See http://caligatio.github.com/jsSHA/ for more information

        Several functions taken from Paul Johnston
    */

	(function (B) {
	    function r(a, c, b) {
	        var f = 0, e = [0], g = "", h = null, g = b || "UTF8"; if ("UTF8" !== g && "UTF16" !== g) throw "encoding must be UTF8 or UTF16"; if ("HEX" === c) { if (0 !== a.length % 2) throw "srcString of HEX type must be in byte increments"; h = u(a); f = h.binLen; e = h.value } else if ("ASCII" === c || "TEXT" === c) h = v(a, g), f = h.binLen, e = h.value; else if ("B64" === c) h = w(a), f = h.binLen, e = h.value; else throw "inputFormat must be HEX, TEXT, ASCII, or B64"; this.getHash = function (a, c, b, g) {
	            var h = null, d = e.slice(), l = f, m; 3 === arguments.length ? "number" !==
            typeof b && (g = b, b = 1) : 2 === arguments.length && (b = 1); if (b !== parseInt(b, 10) || 1 > b) throw "numRounds must a integer >= 1"; switch (c) { case "HEX": h = x; break; case "B64": h = y; break; default: throw "format must be HEX or B64"; } if ("SHA-224" === a) for (m = 0; m < b; m++) d = q(d, l, a), l = 224; else if ("SHA-256" === a) for (m = 0; m < b; m++) d = q(d, l, a), l = 256; else throw "Chosen SHA variant is not supported"; return h(d, z(g))
	        }; this.getHMAC = function (a, b, c, h, k) {
	            var d, l, m, n, A = [], s = []; d = null; switch (h) {
	                case "HEX": h = x; break; case "B64": h = y; break; default: throw "outputFormat must be HEX or B64";
	            } if ("SHA-224" === c) l = 64, n = 224; else if ("SHA-256" === c) l = 64, n = 256; else throw "Chosen SHA variant is not supported"; if ("HEX" === b) d = u(a), m = d.binLen, d = d.value; else if ("ASCII" === b || "TEXT" === b) d = v(a, g), m = d.binLen, d = d.value; else if ("B64" === b) d = w(a), m = d.binLen, d = d.value; else throw "inputFormat must be HEX, TEXT, ASCII, or B64"; a = 8 * l; b = l / 4 - 1; l < m / 8 ? (d = q(d, m, c), d[b] &= 4294967040) : l > m / 8 && (d[b] &= 4294967040); for (l = 0; l <= b; l += 1) A[l] = d[l] ^ 909522486, s[l] = d[l] ^ 1549556828; c = q(s.concat(q(A.concat(e), a + f, c)), a + n, c); return h(c,
                z(k))
	        }
	    } function v(a, c) { var b = [], f, e = [], g = 0, h; if ("UTF8" === c) for (h = 0; h < a.length; h += 1) for (f = a.charCodeAt(h), e = [], 2048 < f ? (e[0] = 224 | (f & 61440) >>> 12, e[1] = 128 | (f & 4032) >>> 6, e[2] = 128 | f & 63) : 128 < f ? (e[0] = 192 | (f & 1984) >>> 6, e[1] = 128 | f & 63) : e[0] = f, f = 0; f < e.length; f += 1) b[g >>> 2] |= e[f] << 24 - g % 4 * 8, g += 1; else if ("UTF16" === c) for (h = 0; h < a.length; h += 1) b[g >>> 2] |= a.charCodeAt(h) << 16 - g % 4 * 8, g += 2; return { value: b, binLen: 8 * g } } function u(a) {
	        var c = [], b = a.length, f, e; if (0 !== b % 2) throw "String of HEX type must be in byte increments"; for (f = 0; f <
            b; f += 2) { e = parseInt(a.substr(f, 2), 16); if (isNaN(e)) throw "String of HEX type contains invalid characters"; c[f >>> 3] |= e << 24 - f % 8 * 4 } return { value: c, binLen: 4 * b }
	    } function w(a) {
	        var c = [], b = 0, f, e, g, h, k; if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw "Invalid character in base-64 string"; f = a.indexOf("="); a = a.replace(/\=/g, ""); if (-1 !== f && f < a.length) throw "Invalid '=' found in base-64 string"; for (e = 0; e < a.length; e += 4) {
	            k = a.substr(e, 4); for (g = h = 0; g < k.length; g += 1) f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(k[g]),
                h |= f << 18 - 6 * g; for (g = 0; g < k.length - 1; g += 1) c[b >> 2] |= (h >>> 16 - 8 * g & 255) << 24 - b % 4 * 8, b += 1
	        } return { value: c, binLen: 8 * b }
	    } function x(a, c) { var b = "", f = 4 * a.length, e, g; for (e = 0; e < f; e += 1) g = a[e >>> 2] >>> 8 * (3 - e % 4), b += "0123456789abcdef".charAt(g >>> 4 & 15) + "0123456789abcdef".charAt(g & 15); return c.outputUpper ? b.toUpperCase() : b } function y(a, c) {
	        var b = "", f = 4 * a.length, e, g, h; for (e = 0; e < f; e += 3) for (h = (a[e >>> 2] >>> 8 * (3 - e % 4) & 255) << 16 | (a[e + 1 >>> 2] >>> 8 * (3 - (e + 1) % 4) & 255) << 8 | a[e + 2 >>> 2] >>> 8 * (3 - (e + 2) % 4) & 255, g = 0; 4 > g; g += 1) b = 8 * e + 6 * g <= 32 * a.length ? b +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h >>> 6 * (3 - g) & 63) : b + c.b64Pad; return b
	    } function z(a) { var c = { outputUpper: !1, b64Pad: "=" }; try { a.hasOwnProperty("outputUpper") && (c.outputUpper = a.outputUpper), a.hasOwnProperty("b64Pad") && (c.b64Pad = a.b64Pad) } catch (b) { } if ("boolean" !== typeof c.outputUpper) throw "Invalid outputUpper formatting option"; if ("string" !== typeof c.b64Pad) throw "Invalid b64Pad formatting option"; return c } function k(a, c) { return a >>> c | a << 32 - c } function I(a, c, b) {
	        return a &
            c ^ ~a & b
	    } function J(a, c, b) { return a & c ^ a & b ^ c & b } function K(a) { return k(a, 2) ^ k(a, 13) ^ k(a, 22) } function L(a) { return k(a, 6) ^ k(a, 11) ^ k(a, 25) } function M(a) { return k(a, 7) ^ k(a, 18) ^ a >>> 3 } function N(a) { return k(a, 17) ^ k(a, 19) ^ a >>> 10 } function O(a, c) { var b = (a & 65535) + (c & 65535); return ((a >>> 16) + (c >>> 16) + (b >>> 16) & 65535) << 16 | b & 65535 } function P(a, c, b, f) { var e = (a & 65535) + (c & 65535) + (b & 65535) + (f & 65535); return ((a >>> 16) + (c >>> 16) + (b >>> 16) + (f >>> 16) + (e >>> 16) & 65535) << 16 | e & 65535 } function Q(a, c, b, f, e) {
	        var g = (a & 65535) + (c & 65535) + (b &
            65535) + (f & 65535) + (e & 65535); return ((a >>> 16) + (c >>> 16) + (b >>> 16) + (f >>> 16) + (e >>> 16) + (g >>> 16) & 65535) << 16 | g & 65535
	    } function q(a, c, b) {
	        var f, e, g, h, k, q, r, C, u, d, l, m, n, A, s, p, v, w, x, y, z, D, E, F, G, t = [], H, B = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891,
            3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]; d = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]; f = [1779033703, 3144134277, 1013904242,
            2773480762, 1359893119, 2600822924, 528734635, 1541459225]; if ("SHA-224" === b || "SHA-256" === b) l = 64, A = 16, s = 1, G = Number, p = O, v = P, w = Q, x = M, y = N, z = K, D = L, F = J, E = I, d = "SHA-224" === b ? d : f; else throw "Unexpected error in SHA-2 implementation"; a[c >>> 5] |= 128 << 24 - c % 32; a[(c + 65 >>> 9 << 4) + 15] = c; H = a.length; for (m = 0; m < H; m += A) {
                c = d[0]; f = d[1]; e = d[2]; g = d[3]; h = d[4]; k = d[5]; q = d[6]; r = d[7]; for (n = 0; n < l; n += 1) t[n] = 16 > n ? new G(a[n * s + m], a[n * s + m + 1]) : v(y(t[n - 2]), t[n - 7], x(t[n - 15]), t[n - 16]), C = w(r, D(h), E(h, k, q), B[n], t[n]), u = p(z(c), F(c, f, e)), r = q, q = k, k =
                h, h = p(g, C), g = e, e = f, f = c, c = p(C, u); d[0] = p(c, d[0]); d[1] = p(f, d[1]); d[2] = p(e, d[2]); d[3] = p(g, d[3]); d[4] = p(h, d[4]); d[5] = p(k, d[5]); d[6] = p(q, d[6]); d[7] = p(r, d[7])
            } if ("SHA-224" === b) a = [d[0], d[1], d[2], d[3], d[4], d[5], d[6]]; else if ("SHA-256" === b) a = d; else throw "Unexpected error in SHA-2 implementation"; return a
	    } "function" === typeof define && typeof define.amd ? define(function () { return r }) : "undefined" !== typeof exports ? "undefined" !== typeof module && module.exports ? module.exports = exports = r : exports = r : B.jsSHA = r
	})(this);


	function signString(stringToSign, secret) {
	    var shaObj = new jsSHA(stringToSign, "TEXT");
	    var hmac = shaObj.getHMAC(secret, "TEXT", "SHA-256", "HEX");
	    return hmac;
	}

	function makeHash(method,urlPath,appId,secret) {

	    if (!urlPath) {
	        return "";
	    }

	    if (urlPath[0] != '/') {
	        urlPath = "/" + urlPath;
	    }

	    var stringToSign = method.toUpperCase() + "\n" + appId + "\n" + urlPath;
	    return signString(stringToSign, secret);
	}

	function makeServerDevicesSignature(apiKey,secret) {
	    var stringToSign = apiKey + "\n";
	    return signString(stringToSign, secret);
	}

	function supports_html5_storage(){
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	function _calculateClientKey(appId, options){
		return appId + options.instanceName;
	}

	
	function BuddyClient(appId, appKey, settings){
		if(!appId)
		{
			throw "appId must be given on a BuddyClient";
		}
		this._appId = appId;
		if(!appKey)
		{
			throw "appKey must be given on a BuddyClient";
		}
		this._appKey = appKey;

		if (settings) {
		    if (settings['sharedSecret']) {
		        this._sharedSecret = settings['sharedSecret'];
		        delete settings['sharedSecret'];
		    }
		    else {
		        this._sharedSecret = null;
		    }
		}

		// set the settings so we pick up the instanceName
		//
		this._settings = settings;

		this._settings = getSettings(this, true);


		if (settings) {
			for (var k in settings) {
				this._settings[k] = settings[k];
			}
		}

		this.root = this._settings.root || "https://api.buddyplatform.com"
		this._settings.root = this.root;
		this._requestCount = 0;

		this._output = settings.output || console;

		function startRequest() {
			this._requestCount++;
		}
	}
	
	function getSettings(client, force) {
		if ((!client._settings || force) && supports_html5_storage() && client._appId) {

			var json = window.localStorage.getItem(_calculateClientKey(client._appId, client._settings));
			client._settings = JSON.parse(json);
		}
		return client._settings || {};
	}
	
    function updateSettings(client, updates, replace) {
        if (supports_html5_storage() && client._appId) {
            var settings = updates;

            if (!replace) {
                settings = getSettings(client);
                for (var key in updates) {
                    settings[key] = updates[key];
                }
            }

			if (!client._settings.nosave) {
			    window.localStorage.setItem(_calculateClientKey(client._appId, client._settings), JSON.stringify(settings));
			}
			client._settings = settings;
			return client._settings;
		}
	}

	function clearSettings(client, type) {
		if (supports_html5_storage() && client._appId) {

			if (!type) {
				window.localStorage.removeItem(_calculateClientKey(client._appId, client._settings));
				client._settings = $.extend({}, client._options);
			}
			else {

				var s = getSettings(client);
				for (var key in s) {

					var remove = type.device && key.indexOf("device") === 0 ||
								 type.user && key.indexOf("user") === 0;
					if (remove) {
						delete s[key];
					}
				}
				return updateSettings(client, s, true);
			}
		}
	}
    
	function getUniqueId(client) {
		var s = getSettings(client);

		if (!s.unique_id) {
			
			s = updateSettings(client, {
				unique_id: client._appId + ":" +new Date().getTime() // good enough for this
			})
		}
		
		return s.unique_id;
	}
	
	function getAccessToken(client) {
		var s = getSettings(client);
		
		var token = s.user_token || s.device_token;

		if (token && (!token.expires || token.expires > new Date().getTime())) {
			return token.value;
		}
		return null;
	}
    	
	function setAccessToken(client, type, value) {
		if (value) {
			
			value = {
				value: value.accessToken,
				expires: value.accessTokenExpires.getTime()
			}
		}

		var update = {};

		update[type + "_token"] = value;

		updateSettings(client, update);
	}
    	
	function loadCreds(client) {
		var s = getSettings(client);

		if (s && s.app_id) {
			client._appId = s.app_id;
			client._appKey = s.app_key;
			getAccessToken(client);
		}
	}
	
	BuddyClient.prototype.registerDevice = function(appId, appKey, callback){
		if (getAccessToken(this)) {
			callback && callback();
			return;
		}

		var self = this;
		
		var cb = function (err, r) {
		    if (r.success) {
		        if (self._settings && self._sharedSecret) {
		            var clientSig = makeServerDevicesSignature(self._appKey, self._sharedSecret);
		            if (r.result["serverSignature"] != clientSig) {
		                var error = new Error("Unable to verify Server Signature");
		                error.errorNumber = AuthErrors.AuthCannotValidateSharedSecret;
		                self._output && self._output.log && self._output.log("Device Registration Failed (Could not validate Server signature). Check your shared secret config.");
		                callback && callback(err, r);
		                return;
		            }
		        }
		        self._appId = appId || self._appId;
		        self._appKey = appKey || self._appKey;
		        var newSettings = { app_id: self._appId, app_key: self._appKey};
				if(r.result.serviceRoot)
				{
					newSettings["serviceRoot"] = r.result.serviceRoot;
				}
		        updateSettings(newSettings);
		        setAccessToken(self, "device", r.result);
		        self._output && self._output.log && self._output.log("Device Registration Complete.");
		        callback && callback(err, r);
		    }
		    else {
		        processResult(this, r, callback);
		    }

		};

		cb._printResult = !callback;

		return this.post("/devices", {
			appID: appId || this._appId,
			appKey: appKey || this._appKey,
			platform: this._settings.platform || "Javascript",
			model: navigator.userAgent,
			uniqueId: getUniqueId(this)
		},cb, true)
	}
	
	BuddyClient.prototype.getUser = function(callback) {

		var s = getSettings(this);

		if (!s.user_id) {
			return callback && callback();
		}

		if (callback) {

			this.get("/users/me", function(err, r){

				callback && callback(err, r.result);
			});
		}

		return s.user_id;
	}

	BuddyClient.prototype.loginUser = function(username, password, callback) {
		var self = this;
		
		var cb = function(err, r){
			if (r.success) {
				var user = r.result;
				updateSettings(self, {
					user_id: user.id
				});

				setAccessToken(self, 'user', user);
			
			}
			callback && callback(err, r && r.result);
		};

		cb._printResult = !callback;

		return this.post("/users/login", {
			username: username,
			password: password
		}, cb);
		
	}

	BuddyClient.prototype.logoutUser = function(callback) {
		var s = getSettings(this);
		var userId = s.user_id;

		if (!userId) {
			return callback && callback();
		}

		var self = this;

		var cb = function(){

		    clearSettings(self, {
		        user: true
		    });

		    callback && callback();
		};

		cb._printResult = callback;

		return this.post('/users/me/logout', cb);
	}

	BuddyClient.prototype.createUser = function(options, callback) {
		if (!options.username || !options.password) {
			throw new Error("Username and password are required.");
		}

		var self = this;
		var cb = function(err, r){

			if (r.success) {
				var user = r.result;
				updateSettings(self, {
						user_id: user.id
					});
				setAccessToken(self, 'user', user);
			}
			callback && callback(err, r && r.result);
		}
		cb._printResult = !callback;
		return this.post("/users", options, cb);
	}

	BuddyClient.prototype.recordMetricEvent = function(eventName, values, timeoutInSeconds, callback) {
		if (typeof timeoutInMinutes == 'function') {
			callback = timeoutInMinutes;
			timeoutInMinutes = null;
		}
		var self = this;
		
		var cb = function(err, result){
			if (err) {
				callback && callback(err);
			}
			else if (timeoutInSeconds && result.result) {
				
				var r2 = {
					 finish: function(values2, callback2){
					 	if (typeof values2 == 'function') {
					 		callback2 = values2;
					 		values2 = null;
					 	}
						self.delete(
							'/metrics/events/' + result.result.id, 
							{
									values: values
							}, 
							function(err){
								callback2 && callback2(err);
							});
					}
				};
				callback && callback(null, r2);
			}
			else {
				callback && callback(err, result);
			}
		};
		cb._printResult = !callback;

		return this.post("/metrics/events/" + eventName, {
			values: values,
			timeoutInSeconds: timeoutInSeconds
		}, cb);
	}
	
	function processResult(client, result, callback) {
		client._requestCount--;
		
		result.success = !result.error;

		if (result.error) {
			var err = new Error(result.message || result.error);
			err.error = result.error;
			err.errorNumber = result.errorNumber;
			err.status = result.status;

			callback && callback(err, result);
			if (!callback || callback._printResult) {
				client._output && client._output.warn && client._output.warn(JSON.stringify(result,  null, 2));
				$.event.trigger({
					type: "BuddyError",
					buddy: result
				});
			}
		}
		else {
			convertDates(result.result);
			callback && callback(null, result);
			if (!callback || callback._printResult) {
				client._output && client._output.log && client._output.log(JSON.stringify(result,  null, 2));
			}
		}
	}
	
	function makeRequest(client, method, url, parameters, callback, noAutoToken) {
		if (!method || !url) {
			throw new Error("Method and URL required.")
		}
		method = method.toUpperCase();

		if (typeof parameters == 'function') {
			callback = parameters;
			parameters = null;
		}

		// see if we've already got an access token
		var at = getAccessToken(client);
		
		if (at && !client._appKey) {
			return callback(new Error("Init must be called first."))
		}
		else if (!at && !noAutoToken) {
			// if we don't have an access token, automatically get the device
			// registered, then retry this call.
		    //
		    var cb = function (err, r1) {
		        if (!err && r1.success) {
		            at = getAccessToken(client);

		            if (at) {
		                makeRequest(client, method, url, parameters, callback);
		                return;
		            }
		        }
		        else {
		            callback(err, r1);
		        }
		    };
		    cb._printResult = false;
			client.registerDevice(null, null, cb)
			return;
		}

		// we love JSON.
		var headers = {
				"Accept" : "application/json"
		};

		// if it's a get, encode the parameters
		// on the URL
	    //
		var baseUrl = url;

		if (method == "GET" && parameters != null) {
			url += "?"
			for (var k in parameters) {
				var v = parameters[k];
				if (v) {
					url += k + "=" + encodeURIComponent(v.toString()) + "&"
				}
			}
			parameters = null;
		}
		else if (parameters != null) {
			headers["Content-Type"] = "application/json";
		}

		var settings = getSettings(client);
		if (at) {
		    if (client._sharedSecret) {
		        var sig = makeHash(method, baseUrl, client._appId, client._sharedSecret);

		        headers["Authorization"] = "Buddy " + at + " " + sig;
		    }
		    else {
		        headers["Authorization"] = "Buddy " + at;
		    }
		}

		// look for file parameters
		//
		if (parameters) {

			var fileParams = null;
			var nonFileParams = null;

			for (var name in parameters) {
				var val = parameters[name];

				if (val instanceof File) {
					fileParams = {} || fileParams;
					fileParams[name] = val;
				}
				else {
					nonFileParams = nonFileParams || {}
					nonFileParams[name] = val;
				}
			}

			if (fileParams) {

				if (method == "GET") {
					throw new Error("Get does not support file parameters.");
				}

				if (!FormData) {
					throw new Error("Sorry, this browser doesn't support FormData.");
				}

				// for any file parameters, build up a FormData object.

				// should we make this "multipart/form"?
				delete headers["Content-Type"];

				var formData = new FormData();

				// push in any file parameters
                for (var p in fileParams) {
                        formData.append(p, fileParams[p]);
                }

                // the rest of the params go in as a single JSON entity named "body"
                //
                if (nonFileParams) {
	                formData.append("body", new Blob([JSON.stringify(nonFileParams)], {type:'application/json'}));
	            }
                parameters = formData;

			}
			else {
				// if we just have normal params, we stringify and push them into the body.
				parameters = nonFileParams ? JSON.stringify(nonFileParams) : null;
			}
		}
		
		// OK, let's make the call for realz
		//
		var s = getSettings(client);
		var r = s.root || root;
		
		var self = client;
	    $.ajax({
	        method: method,
            type: method,
			url: r + url,
			headers: headers,
			contentType: false,
			processData: false,
			data: parameters,
            success:function(data) {
				processResult(self, data, callback);
			},
			error: function(data, status, response) {

				// check our error states, then continue to process result
				if (data.status === 0) {
					data = {
						status: 0,
						error: "NoInternetConnection",
						errorNumber: -1
					};
					console.warn("ERROR: Can't connect to Buddy Platform (" + r + ")");
					self._settings && self._settings.connectionStateChanged && defer(self._settings.connectionStateChanged);
				}
				else {
					data = JSON.parse(data.responseText);
					switch (data.errorNumber) {
						case AuthErrors.AuthAccessTokenInvalid:
						case AuthErrors.AuthAppCredentialsInvalid:
							// if we get either of those, drop all our app state.
							// 
							clearSettings(client);
							break;
						case AuthErrors.AuthUserAccessTokenRequired:
							clearSettings(client, {user:true});
							self._settings && self._settings.loginRequired && defer(self._settings.loginRequired);
							break;
					}
				}
				processResult(self, data, callback);
			}
		});
		return 'Waiting for ' + url + "..."
	}

	BuddyClient.prototype.get = function(url, parameters, callback, noAuto) {
		return makeRequest(this, "GET", url, parameters, callback, noAuto);
	}

	BuddyClient.prototype.post = function(url, parameters, callback, noAuto) {
		return makeRequest(this, "POST", url, parameters, callback, noAuto);
	}

	BuddyClient.prototype.put = function(url, parameters, callback, noAuto) {
		return makeRequest(this, "PUT", url, parameters, callback, noAuto);
	}

	BuddyClient.prototype.patch = function(url, parameters, callback, noAuto) {
		return makeRequest(this, "PATCH", url, parameters, callback, noAuto);
	}

	BuddyClient.prototype.delete = function(url, parameters, callback, noAuto) {
		return makeRequest(this, "DELETE", url, parameters, callback, noAuto);
	}

	BuddyClient.prototype.getUniqueId = function() {
		var s = getSettings(this);

		if (!s.unique_id) {
			
			s = updateSettings(this, {
				unique_id: this._appId + ":" +new Date().getTime() // good enough for this
			})
		}
		
		return s.unique_id;
	}

	BuddyClient.prototype.socialLogin = function(identityProviderName, identityID, identityAccessToken, callback){
		var cb = function(err, r){
			if (r.success) {
				var user = r.result;
				updateSettings(this, {
					user_id: user.id
				});

				setAccessToken(this, 'user', user);
			}
			callback && callback(err, r && r.result);
		};

		cb._printResult = !callback;

		return this.post("/users/login/social", {
			identityID: identityID,
			identityProviderName: identityProviderName,
			identityAccessToken: identityAccessToken
		}, cb);
	}

	
	
	
	_clients = {};
	_client = null;
	
	buddy.init = function(appId, appKey, options) {
		if (!appId) throw new Error("appId and appKey required");
	
		if (!options) {
		    options = {};
		}	
		var clientKey = _calculateClientKey(appId, options);
		
		if(!_clients[clientKey]){
			_clients[clientKey] = new BuddyClient(appId, appKey, options);
		}
		
		_client = _clients[clientKey];

		_client._options = options;
		
		return _client;
	}

	clear = function() {
		clearSettings(_client);
	}

	// HELPER METHODS -
	// We wrap a few common operations.
	buddy.registerDevice = function(appId, appKey, callback) {
		return _client.registerDevice(appId, appKey, callback);
	}

	buddy.getUser = function(callback) {
		return _client.getUser(callback);
	}

	Object.defineProperty(buddy, "accessToken", {
	    get: function() {
	        return getAccessToken(_client);
	    }
	});

	buddy.loginUser = function(username, password, callback) {
		return _client.loginUser(username, password, callback);
	}

	buddy.socialLogin = function(identityProviderName, identityID, identityAccessToken, callback) {
		return _client.socialLogin(identityProviderName, identityID, identityAccessToken, callback);
	}

	buddy.logoutUser = function(callback) {
		return _client.logoutUser(callback);
	}

	buddy.createUser = function(options, callback) {
		return _client.createUser(options, callback);
	}

	// Record an 
	buddy.recordMetricEvent = function(eventName, values, timeoutInSeconds, callback) {
		return _client.recordMetricEvent(eventName, values, timeoutInSeconds, callback);
	}

	// just let things unwind a bit, mmk?
	var defer = function(callback) {
		if (!callback) return;

		setTimeout(function() {
			var args = Array.prototype.slice.call(arguments, 2);
			callback.apply(null, args);
		}, 0);
	}

	var AuthErrors = {
		AuthFailed :                        0x100,
		AuthAccessTokenInvalid :            0x104,
		AuthUserAccessTokenRequired :       0x107,
		AuthAppCredentialsInvalid:          0x105,
	    AuthCannotValidateSharedSecret:     0x110         
	}

	//
	// Convert dates format like /Date(124124)/ to a JS Date, recursively
	//
	var convertDates = function(obj, seen) {
		seen = seen || {};

		if (!obj || seen[obj]) {
			return;
		}

		// prevent loops
		seen[obj] = true;

		for (var key in obj) {
			var val = obj[key];
			if (typeof val ==  'string') {
				var match = val.match(/\/Date\((\d+)\)\//);
				if (match) {
					obj[key] = new Date(Number(match[1]));
				}
			}
			else if (typeof value == 'object') {
				convertDates(obj);
			}
		}
		return obj;
	}

	//
	// The main caller request, handles call setup and formatting,
	// authentication, and basic error conditions such as triggering the login
	// callback or no internet callback.
	//
	buddy.get = function(url, parameters, callback, noAuto) {
		return _client.get(url, parameters, callback, noAuto);
	}

	buddy.post = function(url, parameters, callback, noAuto) {
		return _client.post(url, parameters, callback, noAuto);
	}

	buddy.put = function(url, parameters, callback, noAuto) {
		return _client.put(url, parameters, callback, noAuto);
	}

	buddy.patch = function(url, parameters, callback, noAuto) {
		return _client.patch(url, parameters, callback, noAuto);
	}

	buddy.delete = function(url, parameters, callback, noAuto) {
		return _client.delete(url, parameters, callback, noAuto);
	}
	
	return buddy;
}();
