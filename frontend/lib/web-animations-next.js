// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

!function(a, b) {
	b["true"] = a;
	var c = {}
	  
	, d = {}
	  
	, e = {}
	  
	, f = null ;
	!function(a) {
		function b(b, c) {
			var d = {
				delay: 0,
				endDelay: 0,
				fill: c ? "both" : "none",
				iterationStart: 0,
				iterations: 1,
				duration: c ? "auto" : 0,
				playbackRate: 1,
				direction: "normal",
				easing: "linear"
			};
			return "number" != typeof b || isNaN(b) ? void 0 !== b && Object.getOwnPropertyNames(b).forEach(function(c) {
				if ("auto" != b[c]) {
					if (("number" == typeof d[c] || "duration" == c) && ("number" != typeof b[c] || isNaN(b[c])))
						return;
					if ("fill" == c && -1 == p.indexOf(b[c]))
						return;
					if ("direction" == c && -1 == q.indexOf(b[c]))
						return;
					if ("playbackRate" == c && a.isDeprecated("AnimationTiming.playbackRate", "2014-11-28", "Use AnimationPlayer.playbackRate instead."))
						return;
					d[c] = b[c]
				}
			}
			) : d.duration = b,
			d
		}
		function c(a, c) {
			var d = b(a, c);
			return d.easing = f(d.easing),
			d
		}
		function d(a, b, c, d) {
			return 0 > a || a > 1 || 0 > c || c > 1 ? y : function(e) {
				function f(a, b, c) {
					return 3 * a * (1 - c) * (1 - c) * c + 3 * b * (1 - c) * c * c + c * c * c
				}
				for (var g = 0, h = 1; ; ) {
					var i = (g + h) / 2
					  
					, j = f(a, c, i);
					if (Math.abs(e - j) < .001)
						return f(b, d, i);
					e > j ? g = i : h = i
				}
			}
		}
		function e(a, b) {
			return function(c) {
				if (c >= 1)
					return 1;
				var d = 1 / a;
				return c += b * d,
				c - c % d
			}
		}
		function f(a) {
			var b = w.exec(a);
			if (b)
				return d.apply(this, b.slice(1).map(Number));
			var c = x.exec(a);
			if (c)
				return e(Number(c[1]), {
					start: r,
					middle: s,
					end: t
				}[c[2]]);
			var f = u[a];
			return f ? f : y
		}
		function g(a) {
			return Math.abs(h(a) / a.playbackRate)
		}
		function h(a) {
			return a.duration * a.iterations
		}
		function i(a, b, c) {
			return null  == b ? z : b < c.delay ? A : b >= c.delay + a ? B : C
		}
		function j(a, b, c, d, e) {
			switch (d) {
			case A:
				return "backwards" == b || "both" == b ? 0 : null ;
			case C:
				return c - e;
			case B:
				return "forwards" == b || "both" == b ? a : null ;
			case z:
				return null 
			}
		}
		function k(a, b, c, d) {
			return (d.playbackRate < 0 ? b - a : b) * d.playbackRate + c
		}
		function l(a, b, c, d, e) {
			return 1 / 0 === c || c === -1 / 0 || c - d == b && e.iterations && (e.iterations + e.iterationStart) % 1 == 0 ? a : c % a
		}
		function m(a, b, c, d) {
			return 0 === c ? 0 : b == a ? d.iterationStart + d.iterations - 1 : Math.floor(c / a)
		}
		function n(a, b, c, d) {
			var e = a % 2 >= 1
			  
			, f = "normal" == d.direction || d.direction == (e ? "alternate-reverse" : "alternate")
			  
			, g = f ? c : b - c
			  
			, h = g / b;
			return b * d.easing(h)
		}
		function o(a, b, c) {
			var d = i(a, b, c)
			  
			, e = j(a, c.fill, b, d, c.delay);
			if (null  === e)
				return null ;
			if (0 === a)
				return d === A ? 0 : 1;
			var f = c.iterationStart * c.duration
			  
			, g = k(a, e, f, c)
			  
			, o = l(c.duration, h(c), g, f, c)
			  
			, p = m(c.duration, o, g, c);
			return n(p, c.duration, o, c) / c.duration
		}
		var p = "backwards|forwards|both".split("|")
		  
		, q = "reverse|alternate|alternate-reverse".split("|")
		  
		, r = 1
		  
		, s = .5
		  
		, t = 0
		  
		, u = {
			ease: d(.25, .1, .25, 1),
			"ease-in": d(.42, 0, 1, 1),
			"ease-out": d(0, 0, .58, 1),
			"ease-in-out": d(.42, 0, .58, 1),
			"step-start": e(1, r),
			"step-middle": e(1, s),
			"step-end": e(1, t)
		}
		  
		, v = "\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*"
		  
		, w = new RegExp("cubic-bezier\\(" + v + "," + v + "," + v + "," + v + "\\)")
		  
		, x = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/
		  
		, y = function(a) {
			return a
		}
		  
		, z = 0
		  
		, A = 1
		  
		, B = 2
		  
		, C = 3;
		a.makeTiming = b,
		a.normalizeTimingInput = c,
		a.calculateActiveDuration = g,
		a.calculateTimeFraction = o,
		a.calculatePhase = i,
		a.toTimingFunction = f
	}
	(c, f),
	function(a) {
		function b(a, b) {
			return a in h ? h[a][b] || b : b
		}
		function c(a, c, d) {
			var g = e[a];
			if (g) {
				f.style[a] = c;
				for (var h in g) {
					var i = g[h]
					  
					, j = f.style[i];
					d[i] = b(i, j)
				}
			} else
				d[a] = b(a, c)
		}
		function d(b) {
			function d() {
				var a = e.length;
				null  == e[a - 1].offset && (e[a - 1].offset = 1),
				a > 1 && null  == e[0].offset && (e[0].offset = 0);
				for (var b = 0, c = e[0].offset, d = 1; a > d; d++) {
					var f = e[d].offset;
					if (null  != f) {
						for (var g = 1; d - b > g; g++)
							e[b + g].offset = c + (f - c) * g / (d - b);
						b = d,
						c = f
					}
				}
			}
			if (!Array.isArray(b) && null  !== b)
				throw new TypeError("Keyframe effect must be null or an array of keyframes");
			if (null  == b)
				return [];
			for (var e = b.map(function(b) {
				var d = {};
				for (var e in b) {
					var f = b[e];
					if ("offset" == e) {
						if (null  != f && (f = Number(f),
						!isFinite(f)))
							throw new TypeError("keyframe offsets must be numbers.")
					} else {
						if ("composite" == e)
							throw {
								type: DOMException.NOT_SUPPORTED_ERR,
								name: "NotSupportedError",
								message: "add compositing is not supported"
							};
						f = "easing" == e ? a.toTimingFunction(f) : "" + f
					}
					c(e, f, d)
				}
				return void 0 == d.offset && (d.offset = null ),
				void 0 == d.easing && (d.easing = a.toTimingFunction("linear")),
				d
			}
			), f = !0, g = -1 / 0, h = 0; h < e.length; h++) {
				var i = e[h].offset;
				if (null  != i) {
					if (g > i)
						throw {
							code: DOMException.INVALID_MODIFICATION_ERR,
							name: "InvalidModificationError",
							message: "Keyframes are not loosely sorted by offset. Sort or specify offsets."
						};
					g = i
				} else
					f = !1
			}
			return e = e.filter(function(a) {
				return a.offset >= 0 && a.offset <= 1
			}
			),
			f || d(),
			e
		}
		var e = {
			background: ["backgroundImage", "backgroundPosition", "backgroundSize", "backgroundRepeat", "backgroundAttachment", "backgroundOrigin", "backgroundClip", "backgroundColor"],
			border: ["borderTopColor", "borderTopStyle", "borderTopWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
			borderBottom: ["borderBottomWidth", "borderBottomStyle", "borderBottomColor"],
			borderColor: ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"],
			borderLeft: ["borderLeftWidth", "borderLeftStyle", "borderLeftColor"],
			borderRadius: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
			borderRight: ["borderRightWidth", "borderRightStyle", "borderRightColor"],
			borderTop: ["borderTopWidth", "borderTopStyle", "borderTopColor"],
			borderWidth: ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"],
			flex: ["flexGrow", "flexShrink", "flexBasis"],
			font: ["fontFamily", "fontSize", "fontStyle", "fontVariant", "fontWeight", "lineHeight"],
			margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
			outline: ["outlineColor", "outlineStyle", "outlineWidth"],
			padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
		}
		  
		, f = document.createElementNS("http://www.w3.org/1999/xhtml", "div")
		  
		, g = {
			thin: "1px",
			medium: "3px",
			thick: "5px"
		}
		  
		, h = {
			borderBottomWidth: g,
			borderLeftWidth: g,
			borderRightWidth: g,
			borderTopWidth: g,
			fontSize: {
				"xx-small": "60%",
				"x-small": "75%",
				small: "89%",
				medium: "100%",
				large: "120%",
				"x-large": "150%",
				"xx-large": "200%"
			},
			fontWeight: {
				normal: "400",
				bold: "700"
			},
			outlineWidth: g,
			textShadow: {
				none: "0px 0px 0px transparent"
			},
			boxShadow: {
				none: "0px 0px 0px 0px transparent"
			}
		};
		a.normalizeKeyframes = d
	}
	(c, f),
	function(a) {
		var b = {};
		a.isDeprecated = function(a, c, d, e) {
			var f = e ? "are" : "is"
			  
			, g = new Date
			  
			, h = new Date(c);
			return h.setMonth(h.getMonth() + 3),
			h > g ? (a in b || console.warn("Web Animations: " + a + " " + f + " deprecated and will stop working on " + h.toDateString() + ". " + d),
			b[a] = !0,
			!1) : !0
		}
		,
		a.deprecated = function(b, c, d, e) {
			if (a.isDeprecated(b, c, d, e))
				throw new Error(b + " " + auxVerb + " no longer supported. " + d)
		}
	}
	(c),
	function() {
		if (document.documentElement.animate) {
			var a = document.documentElement.animate([], 0)
			  
			, b = !0;
			if (a && (b = !1,
			"play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(c) {
				void 0 === a[c] && (b = !0)
			}
			)),
			!b)
				return
		}
		!function(a, b) {
			b.AnimationNode = function(b) {
				var c = a.calculateActiveDuration(b)
				  
				, d = function(d) {
					return a.calculateTimeFraction(c, d, b)
				}
				;
				return d._totalDuration = b.delay + c + b.endDelay,
				d._isCurrent = function(d) {
					var e = a.calculatePhase(c, d, b);
					return e === PhaseActive || e === PhaseBefore
				}
				,
				d
			}
		}
		(c, d),
		function(a, b) {
			function c(a) {
				for (var b = {}, c = 0; c < a.length; c++)
					for (var d in a[c])
						if ("offset" != d && "easing" != d && "composite" != d) {
							var e = {
								offset: a[c].offset,
								easing: a[c].easing,
								value: a[c][d]
							};
							b[d] = b[d] || [],
							b[d].push(e)
						}
				for (var f in b) {
					var g = b[f];
					if (0 != g[0].offset || 1 != g[g.length - 1].offset)
						throw {
							type: DOMException.NOT_SUPPORTED_ERR,
							name: "NotSupportedError",
							message: "Partial keyframes are not supported"
						}
				}
				return b
			}
			function d(a) {
				var c = [];
				for (var d in a)
					for (var e = a[d], f = 0; f < e.length - 1; f++) {
						var g = e[f].offset
						  
						, h = e[f + 1].offset
						  
						, i = e[f].value
						  
						, j = e[f + 1].value;
						g == h && (1 == h ? i = j : j = i),
						c.push({
							startTime: g,
							endTime: h,
							easing: e[f].easing,
							property: d,
							interpolation: b.propertyInterpolation(d, i, j)
						})
					}
				return c.sort(function(a, b) {
					return a.startTime - b.startTime
				}
				),
				c
			}
			b.convertEffectInput = function(e) {
				var f = a.normalizeKeyframes(e)
				  
				, g = c(f)
				  
				, h = d(g);
				return function(a, c) {
					if (null  != c)
						h.filter(function(a) {
							return 0 >= c && 0 == a.startTime || c >= 1 && 1 == a.endTime || c >= a.startTime && c <= a.endTime
						}
						).forEach(function(d) {
							var e = c - d.startTime
							  
							, f = d.endTime - d.startTime
							  
							, g = 0 == f ? 0 : d.easing(e / f);
							b.apply(a, d.property, d.interpolation(g))
						}
						);
					else
						for (var d in g)
							"offset" != d && "easing" != d && "composite" != d && b.clear(a, d)
				}
			}
		}
		(c, d, f),
		function(a) {
			function b(a, b, c) {
				e[c] = e[c] || [],
				e[c].push([a, b])
			}
			function c(a, c, d) {
				for (var e = 0; e < d.length; e++) {
					var f = d[e];
					b(a, c, f),
					/-/.test(f) && b(a, c, f.replace(/-(.)/g, function(a, b) {
						return b.toUpperCase()
					}
					))
				}
			}
			function d(b, c, d) {
				for (var f = c == d ? [] : e[b], g = 0; f && g < f.length; g++) {
					var h = f[g][0](c)
					  
					, i = f[g][0](d);
					if (void 0 !== h && void 0 !== i) {
						var j = f[g][1](h, i);
						if (j) {
							var k = a.Interpolation.apply(null , j);
							return function(a) {
								return 0 == a ? c : 1 == a ? d : k(a)
							}
						}
					}
				}
				return a.Interpolation(!1, !0, function(a) {
					return a ? d : c
				}
				)
			}
			var e = {};
			a.addPropertiesHandler = c,
			a.propertyInterpolation = d
		}
		(d, f),
		function(a, b) {
			b.Animation = function(c, d, e) {
				var f, g = b.AnimationNode(a.normalizeTimingInput(e)), h = b.convertEffectInput(d), i = function() {
					h(c, f)
				}
				;
				return i._update = function(a) {
					return f = g(a),
					null  !== f
				}
				,
				i._clear = function() {
					h(c, null )
				}
				,
				i._hasSameTarget = function(a) {
					return c === a
				}
				,
				i._isCurrent = g._isCurrent,
				i._totalDuration = g._totalDuration,
				i
			}
			,
			b.NullAnimation = function(a) {
				var b = function() {
					a && (a(),
					a = null )
				}
				;
				return b._update = function() {
					return null 
				}
				,
				b._totalDuration = 0,
				b._isCurrent = function() {
					return !1
				}
				,
				b._hasSameTarget = function() {
					return !1
				}
				,
				b
			}
		}
		(c, d, f),
		function(a) {
			function b(a, b, c) {
				c.enumerable = !0,
				c.configurable = !0,
				Object.defineProperty(a, b, c)
			}
			function c(a) {
				this._surrogateStyle = document.createElementNS("http://www.w3.org/1999/xhtml", "div").style,
				this._style = a.style,
				this._length = 0,
				this._isAnimatedProperty = {};
				for (var b = 0; b < this._style.length; b++) {
					var c = this._style[b];
					this._surrogateStyle[c] = this._style[c]
				}
				this._updateIndices()
			}
			function d(a) {
				if (!a._webAnimationsPatchedStyle) {
					var d = new c(a);
					try {
						b(a, "style", {
							get: function() {
								return d
							}
						})
					} catch (e) {
						a.style._set = function(b, c) {
							a.style[b] = c
						}
						,
						a.style._clear = function(b) {
							a.style[b] = ""
						}
					}
					a._webAnimationsPatchedStyle = a.style
				}
			}
			var e = {
				cssText: 1,
				length: 1,
				parentRule: 1
			}
			  
			, f = {
				getPropertyCSSValue: 1,
				getPropertyPriority: 1,
				getPropertyValue: 1,
				item: 1,
				removeProperty: 1,
				setProperty: 1
			}
			  
			, g = {
				removeProperty: 1,
				setProperty: 1
			};
			c.prototype = {
				get cssText() {
					return this._surrogateStyle.cssText
				},
				set cssText(a) {
					for (var b = {}, c = 0; c < this._surrogateStyle.length; c++)
						b[this._surrogateStyle[c]] = !0;
					this._surrogateStyle.cssText = a,
					this._updateIndices();
					for (var c = 0; c < this._surrogateStyle.length; c++)
						b[this._surrogateStyle[c]] = !0;
					for (var d in b)
						this._isAnimatedProperty[d] || this._style.setProperty(d, this._surrogateStyle.getPropertyValue(d))
				},
				get length() {
					return this._surrogateStyle.length
				},
				get parentRule() {
					return this._style.parentRule
				},
				_updateIndices: function() {
					for (; this._length < this._surrogateStyle.length; )
						Object.defineProperty(this, this._length, {
							configurable: !0,
							enumerable: !1,
							get: function(a) {
								return function() {
									return this._surrogateStyle[a]
								}
							}
							(this._length)
						}),
						this._length++;
					for (; this._length > this._surrogateStyle.length; )
						this._length--,
						Object.defineProperty(this, this._length, {
							configurable: !0,
							enumerable: !1,
							value: void 0
						})
				},
				_set: function(a, b) {
					this._style[a] = b,
					this._isAnimatedProperty[a] = !0
				},
				_clear: function(a) {
					this._style[a] = this._surrogateStyle[a],
					delete this._isAnimatedProperty[a]
				}
			};
			for (var h in f)
				c.prototype[h] = function(a, b) {
					return function() {
						var c = this._surrogateStyle[a].apply(this._surrogateStyle, arguments);
						return b && (this._isAnimatedProperty[arguments[0]] || this._style[a].apply(this._style, arguments),
						this._updateIndices()),
						c
					}
				}
				(h, h in g);
			for (var i in document.documentElement.style)
				i in e || i in f || !function(a) {
					b(c.prototype, a, {
						get: function() {
							return this._surrogateStyle[a]
						},
						set: function(b) {
							this._surrogateStyle[a] = b,
							this._updateIndices(),
							this._isAnimatedProperty[a] || (this._style[a] = b)
						}
					})
				}
				(i);
			a.apply = function(b, c, e) {
				d(b),
				b.style._set(a.propertyName(c), e)
			}
			,
			a.clear = function(b, c) {
				b._webAnimationsPatchedStyle && b.style._clear(a.propertyName(c))
			}
		}
		(d, f),
		function(a) {
			window.Element.prototype.animate = function(b, c) {
				return a.timeline._play(a.Animation(this, b, c))
			}
		}
		(d),
		function(a) {
			function b(a, c, d) {
				if ("number" == typeof a && "number" == typeof c)
					return a * (1 - d) + c * d;
				if ("boolean" == typeof a && "boolean" == typeof c)
					return .5 > d ? a : c;
				if (a.length == c.length) {
					for (var e = [], f = 0; f < a.length; f++)
						e.push(b(a[f], c[f], d));
					return e
				}
				throw "Mismatched interpolation arguments " + a + ":" + c
			}
			a.Interpolation = function(a, c, d) {
				return function(e) {
					return d(b(a, c, e))
				}
			}
		}
		(d, f),
		function(a) {
			function b(a, b, c) {
				return Math.max(Math.min(a, c), b)
			}
			function c(c, d, e) {
				var f = a.dot(c, d);
				f = b(f, -1, 1);
				var g = [];
				if (1 === f)
					g = c;
				else
					for (var h = Math.acos(f), i = 1 * Math.sin(e * h) / Math.sqrt(1 - f * f), j = 0; 4 > j; j++)
						g.push(c[j] * (Math.cos(e * h) - f * i) + d[j] * i);
				return g
			}
			var d = function() {
				function a(a, b) {
					for (var c = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], d = 0; 4 > d; d++)
						for (var e = 0; 4 > e; e++)
							for (var f = 0; 4 > f; f++)
								c[d][e] += b[d][f] * a[f][e];
					return c
				}
				function b(a) {
					return 0 == a[0][2] && 0 == a[0][3] && 0 == a[1][2] && 0 == a[1][3] && 0 == a[2][0] && 0 == a[2][1] && 1 == a[2][2] && 0 == a[2][3] && 0 == a[3][2] && 1 == a[3][3]
				}
				function c(c, d, e, f, g) {
					for (var h = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], i = 0; 4 > i; i++)
						h[i][3] = g[i];
					for (var i = 0; 3 > i; i++)
						for (var j = 0; 3 > j; j++)
							h[3][i] += c[j] * h[j][i];
					var k = f[0]
					  
					, l = f[1]
					  
					, m = f[2]
					  
					, n = f[3]
					  
					, o = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
					o[0][0] = 1 - 2 * (l * l + m * m),
					o[0][1] = 2 * (k * l - m * n),
					o[0][2] = 2 * (k * m + l * n),
					o[1][0] = 2 * (k * l + m * n),
					o[1][1] = 1 - 2 * (k * k + m * m),
					o[1][2] = 2 * (l * m - k * n),
					o[2][0] = 2 * (k * m - l * n),
					o[2][1] = 2 * (l * m + k * n),
					o[2][2] = 1 - 2 * (k * k + l * l),
					h = a(h, o);
					var p = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
					e[2] && (p[2][1] = e[2],
					h = a(h, p)),
					e[1] && (p[2][1] = 0,
					p[2][0] = e[0],
					h = a(h, p)),
					e[0] && (p[2][0] = 0,
					p[1][0] = e[0],
					h = a(h, p));
					for (var i = 0; 3 > i; i++)
						for (var j = 0; 3 > j; j++)
							h[i][j] *= d[i];
					return b(h) ? [h[0][0], h[0][1], h[1][0], h[1][1], h[3][0], h[3][1]] : h[0].concat(h[1], h[2], h[3])
				}
				return c
			}
			();
			a.composeMatrix = d,
			a.quat = c
		}
		(d, f),
		function(a) {
			var b = 0
			  
			, c = function(a, b, c) {
				this.target = a,
				this.currentTime = b,
				this.timelineTime = c,
				this.type = "finish",
				this.bubbles = !1,
				this.cancelable = !1,
				this.currentTarget = a,
				this.defaultPrevented = !1,
				this.eventPhase = Event.AT_TARGET,
				this.timeStamp = Date.now()
			}
			;
			a.Player = function(a) {
				this._sequenceNumber = b++,
				this._currentTime = 0,
				this._startTime = null ,
				this.paused = !1,
				this._playbackRate = 1,
				this._inTimeline = !0,
				this._finishedFlag = !1,
				this.onfinish = null ,
				this._finishHandlers = [],
				this._source = a,
				this._inEffect = this._source._update(0),
				this._idle = !0,
				this._currentTimePending = !1
			}
			,
			a.Player.prototype = {
				_ensureAlive: function() {
					this._inEffect = this._source._update(this.currentTime),
					this._inTimeline || !this._inEffect && this._finishedFlag || (this._inTimeline = !0,
					a.timeline._players.push(this))
				},
				_tickCurrentTime: function(a, b) {
					a != this._currentTime && (this._currentTime = a,
					this.finished && !b && (this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0),
					this._ensureAlive())
				},
				get currentTime() {
					return this._idle || this._currentTimePending ? null  : this._currentTime
				},
				set currentTime(b) {
					b = +b,
					isNaN(b) || (a.restart(),
					this.paused || null  == this._startTime || (this._startTime = this._timeline.currentTime - b / this._playbackRate),
					this._currentTimePending = !1,
					this._currentTime != b && (this._tickCurrentTime(b, !0),
					a.invalidateEffects()))
				},
				get startTime() {
					return this._startTime
				},
				set startTime(b) {
					b = +b,
					isNaN(b) || this.paused || this._idle || (this._startTime = b,
					this._tickCurrentTime((this._timeline.currentTime - this._startTime) * this.playbackRate),
					a.invalidateEffects())
				},
				get playbackRate() {
					return this._playbackRate
				},
				get finished() {
					return !this._idle && (this._playbackRate > 0 && this._currentTime >= this._totalDuration || this._playbackRate < 0 && this._currentTime <= 0)
				},
				get _totalDuration() {
					return this._source._totalDuration
				},
				get playState() {
					return this._idle ? "idle" : null  == this._startTime && !this.paused && 0 != this.playbackRate || this._currentTimePending ? "pending" : this.paused ? "paused" : this.finished ? "finished" : "running"
				},
				play: function() {
					this.paused = !1,
					(this.finished || this._idle) && (this._currentTime = this._playbackRate > 0 ? 0 : this._totalDuration,
					this._startTime = null ,
					a.invalidateEffects()),
					this._finishedFlag = !1,
					a.restart(),
					this._idle = !1,
					this._ensureAlive()
				},
				pause: function() {
					this.finished || this.paused || this._idle || (this._currentTimePending = !0),
					this._startTime = null ,
					this.paused = !0
				},
				finish: function() {
					this._idle || (this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0,
					this._startTime = this._totalDuration - this.currentTime,
					this._currentTimePending = !1)
				},
				cancel: function() {
					this._inEffect = !1,
					this._idle = !0,
					this.currentTime = 0,
					this._startTime = null 
				},
				reverse: function() {
					this._playbackRate *= -1,
					this._startTime = null ,
					this.play()
				},
				addEventListener: function(a, b) {
					"function" == typeof b && "finish" == a && this._finishHandlers.push(b)
				},
				removeEventListener: function(a, b) {
					if ("finish" == a) {
						var c = this._finishHandlers.indexOf(b);
						c >= 0 && this._finishHandlers.splice(c, 1)
					}
				},
				_fireEvents: function(a) {
					var b = this.finished;
					if ((b || this._idle) && !this._finishedFlag) {
						var d = new c(this,this._currentTime,a)
						  
						, e = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);
						setTimeout(function() {
							e.forEach(function(a) {
								a.call(d.target, d)
							}
							)
						}
						, 0)
					}
					this._finishedFlag = b
				},
				_tick: function(a) {
					return this._idle || this.paused || (null  == this._startTime ? this.startTime = a - this._currentTime / this.playbackRate : this.finished || this._tickCurrentTime((a - this._startTime) * this.playbackRate)),
					this._currentTimePending = !1,
					this._fireEvents(a),
					!this._idle && (this._inEffect || !this._finishedFlag)
				}
			}
		}
		(d, f),
		function(a, b) {
			function c(a) {
				var b = i;
				i = [],
				g(a),
				b.forEach(function(b) {
					b[1](a)
				}
				),
				m && g(a),
				f()
			}
			function d(a, b) {
				return a._sequenceNumber - b._sequenceNumber
			}
			function e() {
				this._players = [],
				this.currentTime = window.performance && performance.now ? performance.now() : 0
			}
			function f() {
				n.forEach(function(a) {
					a()
				}
				)
			}
			function g(a) {
				l = !1;
				var c = b.timeline;
				c.currentTime = a,
				c._players.sort(d),
				k = !1;
				var e = c._players;
				c._players = [];
				var f = []
				  
				, g = [];
				e = e.filter(function(b) {
					return b._inTimeline = b._tick(a),
					b._inEffect ? g.push(b._source) : f.push(b._source),
					b.finished || b.paused || b._idle || (k = !0),
					b._inTimeline
				}
				),
				n.length = 0,
				n.push.apply(n, f),
				n.push.apply(n, g),
				c._players.push.apply(c._players, e),
				m = !1,
				k && requestAnimationFrame(function() {}
				)
			}
			var h = window.requestAnimationFrame
			  
			, i = []
			  
			, j = 0;
			window.requestAnimationFrame = function(a) {
				var b = j++;
				return 0 == i.length && h(c),
				i.push([b, a]),
				b
			}
			,
			window.cancelAnimationFrame = function(a) {
				i.forEach(function(b) {
					b[0] == a && (b[1] = function() {}
					)
				}
				)
			}
			,
			e.prototype = {
				_play: function(c) {
					c._timing = a.normalizeTimingInput(c.timing);
					var d = new b.Player(c);
					return d._idle = !1,
					d._timeline = this,
					this._players.push(d),
					b.restart(),
					b.invalidateEffects(),
					d
				}
			};
			var k = !1
			  
			, l = !1;
			b.restart = function() {
				return k || (k = !0,
				requestAnimationFrame(function() {}
				),
				l = !0),
				l
			}
			;
			var m = !1;
			b.invalidateEffects = function() {
				m = !0
			}
			;
			var n = []
			  
			, o = window.getComputedStyle;
			Object.defineProperty(window, "getComputedStyle", {
				configurable: !0,
				enumerable: !0,
				value: function() {
					return m && g(p.currentTime),
					f(),
					o.apply(this, arguments)
				}
			});
			var p = new e;
			b.timeline = p
		}
		(c, d, f),
		function(a) {
			function b(a, b) {
				for (var c = 0, d = 0; d < a.length; d++)
					c += a[d] * b[d];
				return c
			}
			function c(a, b) {
				return [a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3], a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3], a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3], a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3], a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7], a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7], a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7], a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7], a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11], a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11], a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11], a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11], a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15], a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15], a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15], a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]]
			}
			function d(a) {
				switch (a.t) {
				case "rotatex":
					var b = a.d[0].rad || 0
					  
					, c = a.d[0].deg || 0
					  
					, d = c * Math.PI / 180 + b;
					return [1, 0, 0, 0, 0, Math.cos(d), Math.sin(d), 0, 0, -Math.sin(d), Math.cos(d), 0, 0, 0, 0, 1];
				case "rotatey":
					var b = a.d[0].rad || 0
					  
					, c = a.d[0].deg || 0
					  
					, d = c * Math.PI / 180 + b;
					return [Math.cos(d), 0, -Math.sin(d), 0, 0, 1, 0, 0, Math.sin(d), 0, Math.cos(d), 0, 0, 0, 0, 1];
				case "rotate":
				case "rotatez":
					var b = a.d[0].rad || 0
					  
					, c = a.d[0].deg || 0
					  
					, d = c * Math.PI / 180 + b;
					return [Math.cos(d), Math.sin(d), 0, 0, -Math.sin(d), Math.cos(d), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "rotate3d":
					var e = a.d[0]
					  
					, f = a.d[1]
					  
					, g = a.d[2]
					  
					, b = a.d[3].rad || 0
					  
					, c = a.d[3].deg || 0
					  
					, d = c * Math.PI / 180 + b
					  
					, h = e * e + f * f + g * g;
					if (0 === h)
						e = 1,
						f = 0,
						g = 0;
					else if (1 !== h) {
						var i = Math.sqrt(h);
						e /= i,
						f /= i,
						g /= i
					}
					var j = Math.sin(d / 2)
					  
					, k = j * Math.cos(d / 2)
					  
					, l = j * j;
					return [1 - 2 * (f * f + g * g) * l, 2 * (e * f * l + g * k), 2 * (e * g * l - f * k), 0, 2 * (e * f * l - g * k), 1 - 2 * (e * e + g * g) * l, 2 * (f * g * l + e * k), 0, 2 * (e * g * l + f * k), 2 * (f * g * l - e * k), 1 - 2 * (e * e + f * f) * l, 0, 0, 0, 0, 1];
				case "scale":
					return [a.d[0], 0, 0, 0, 0, a.d[1], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "scalex":
					return [a.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "scaley":
					return [1, 0, 0, 0, 0, a.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "scalez":
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, a.d[0], 0, 0, 0, 0, 1];
				case "scale3d":
					return [a.d[0], 0, 0, 0, 0, a.d[1], 0, 0, 0, 0, a.d[2], 0, 0, 0, 0, 1];
				case "skew":
					var m = a.d[0].deg || 0
					  
					, n = a.d[0].rad || 0
					  
					, o = a.d[1].deg || 0
					  
					, p = a.d[1].rad || 0
					  
					, q = m * Math.PI / 180 + n
					  
					, r = o * Math.PI / 180 + p;
					return [1, Math.tan(r), 0, 0, Math.tan(q), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "skewx":
					var b = a.d[0].rad || 0
					  
					, c = a.d[0].deg || 0
					  
					, d = c * Math.PI / 180 + b;
					return [1, 0, 0, 0, Math.tan(d), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "skewy":
					var b = a.d[0].rad || 0
					  
					, c = a.d[0].deg || 0
					  
					, d = c * Math.PI / 180 + b;
					return [1, Math.tan(d), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				case "translate":
					var e = a.d[0].px || 0
					  
					, f = a.d[1].px || 0;
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e, f, 0, 1];
				case "translatex":
					var e = a.d[0].px || 0;
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e, 0, 0, 1];
				case "translatey":
					var f = a.d[0].px || 0;
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, f, 0, 1];
				case "translatez":
					var g = a.d[0].px || 0;
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, g, 1];
				case "translate3d":
					var e = a.d[0].px || 0
					  
					, f = a.d[1].px || 0
					  
					, g = a.d[2].px || 0;
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e, f, g, 1];
				case "perspective":
					var s = a.d[0].px ? -1 / a.d[0].px : 0;
					return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, s, 0, 0, 0, 1];
				case "matrix":
					return [a.d[0], a.d[1], 0, 0, a.d[2], a.d[3], 0, 0, 0, 0, 1, 0, a.d[4], a.d[5], 0, 1];
				case "matrix3d":
					return a.d
				}
			}
			function e(a) {
				return 0 === a.length ? [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] : a.map(d).reduce(c)
			}
			function f(a) {
				return [g(e(a))]
			}
			var g = function() {
				function a(a) {
					return a[0][0] * a[1][1] * a[2][2] + a[1][0] * a[2][1] * a[0][2] + a[2][0] * a[0][1] * a[1][2] - a[0][2] * a[1][1] * a[2][0] - a[1][2] * a[2][1] * a[0][0] - a[2][2] * a[0][1] * a[1][0]
				}
				function c(b) {
					for (var c = 1 / a(b), d = b[0][0], e = b[0][1], f = b[0][2], g = b[1][0], h = b[1][1], i = b[1][2], j = b[2][0], k = b[2][1], l = b[2][2], m = [[(h * l - i * k) * c, (f * k - e * l) * c, (e * i - f * h) * c, 0], [(i * j - g * l) * c, (d * l - f * j) * c, (f * g - d * i) * c, 0], [(g * k - h * j) * c, (j * e - d * k) * c, (d * h - e * g) * c, 0]], n = [], o = 0; 3 > o; o++) {
						for (var p = 0, q = 0; 3 > q; q++)
							p += b[3][q] * m[q][o];
						n.push(p)
					}
					return n.push(1),
					m.push(n),
					m
				}
				function d(a) {
					return [[a[0][0], a[1][0], a[2][0], a[3][0]], [a[0][1], a[1][1], a[2][1], a[3][1]], [a[0][2], a[1][2], a[2][2], a[3][2]], [a[0][3], a[1][3], a[2][3], a[3][3]]]
				}
				function e(a, b) {
					for (var c = [], d = 0; 4 > d; d++) {
						for (var e = 0, f = 0; 4 > f; f++)
							e += a[f] * b[f][d];
						c.push(e)
					}
					return c
				}
				function f(a) {
					var b = g(a);
					return [a[0] / b, a[1] / b, a[2] / b]
				}
				function g(a) {
					return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
				}
				function h(a, b, c, d) {
					return [c * a[0] + d * b[0], c * a[1] + d * b[1], c * a[2] + d * b[2]]
				}
				function i(a, b) {
					return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
				}
				function j(j) {
					var k = [j.slice(0, 4), j.slice(4, 8), j.slice(8, 12), j.slice(12, 16)];
					if (1 !== k[3][3])
						return null ;
					for (var l = [], m = 0; 4 > m; m++)
						l.push(k[m].slice());
					for (var m = 0; 3 > m; m++)
						l[m][3] = 0;
					if (0 === a(l))
						return !1;
					var n, o = [];
					if (k[0][3] || k[1][3] || k[2][3]) {
						o.push(k[0][3]),
						o.push(k[1][3]),
						o.push(k[2][3]),
						o.push(k[3][3]);
						var p = c(l)
						  
						, q = d(p);
						n = e(o, q)
					} else
						n = [0, 0, 0, 1];
					var r = k[3].slice(0, 3)
					  
					, s = [];
					s.push(k[0].slice(0, 3));
					var t = [];
					t.push(g(s[0])),
					s[0] = f(s[0]);
					var u = [];
					s.push(k[1].slice(0, 3)),
					u.push(b(s[0], s[1])),
					s[1] = h(s[1], s[0], 1, -u[0]),
					t.push(g(s[1])),
					s[1] = f(s[1]),
					u[0] /= t[1],
					s.push(k[2].slice(0, 3)),
					u.push(b(s[0], s[2])),
					s[2] = h(s[2], s[0], 1, -u[1]),
					u.push(b(s[1], s[2])),
					s[2] = h(s[2], s[1], 1, -u[2]),
					t.push(g(s[2])),
					s[2] = f(s[2]),
					u[1] /= t[2],
					u[2] /= t[2];
					var v = i(s[1], s[2]);
					if (b(s[0], v) < 0)
						for (var m = 0; 3 > m; m++)
							t[m] *= -1,
							s[m][0] *= -1,
							s[m][1] *= -1,
							s[m][2] *= -1;
					var w, x, y = s[0][0] + s[1][1] + s[2][2] + 1;
					return y > 1e-4 ? (w = .5 / Math.sqrt(y),
					x = [(s[2][1] - s[1][2]) * w, (s[0][2] - s[2][0]) * w, (s[1][0] - s[0][1]) * w, .25 / w]) : s[0][0] > s[1][1] && s[0][0] > s[2][2] ? (w = 2 * Math.sqrt(1 + s[0][0] - s[1][1] - s[2][2]),
					x = [.25 * w, (s[0][1] + s[1][0]) / w, (s[0][2] + s[2][0]) / w, (s[2][1] - s[1][2]) / w]) : s[1][1] > s[2][2] ? (w = 2 * Math.sqrt(1 + s[1][1] - s[0][0] - s[2][2]),
					x = [(s[0][1] + s[1][0]) / w, .25 * w, (s[1][2] + s[2][1]) / w, (s[0][2] - s[2][0]) / w]) : (w = 2 * Math.sqrt(1 + s[2][2] - s[0][0] - s[1][1]),
					x = [(s[0][2] + s[2][0]) / w, (s[1][2] + s[2][1]) / w, .25 * w, (s[1][0] - s[0][1]) / w]),
					[r, t, u, x, n]
				}
				return j
			}
			();
			a.dot = b,
			a.makeMatrixDecomposition = f
		}
		(d, f),
		function(a) {
			function b(a, b) {
				var c = a.exec(b);
				return c ? (c = a.ignoreCase ? c[0].toLowerCase() : c[0],
				[c, b.substr(c.length)]) : void 0
			}
			function c(a, b) {
				b = b.replace(/^\s*/, "");
				var c = a(b);
				return c ? [c[0], c[1].replace(/^\s*/, "")] : void 0
			}
			function d(a, d, e) {
				a = c.bind(null , a);
				for (var f = []; ; ) {
					var g = a(e);
					if (!g)
						return [f, e];
					if (f.push(g[0]),
					e = g[1],
					g = b(d, e),
					!g || "" == g[1])
						return [f, e];
					e = g[1]
				}
			}
			function e(a, b) {
				for (var c = 0, d = 0; d < b.length && (!/\s|,/.test(b[d]) || 0 != c); d++)
					if ("(" == b[d])
						c++;
					else if (")" == b[d] && (c--,
					0 == c && d++,
					0 >= c))
						break;
				var e = a(b.substr(0, d));
				return void 0 == e ? void 0 : [e, b.substr(d)]
			}
			function f(a, b) {
				for (var c = a, d = b; c && d; )
					c > d ? c %= d : d %= c;
				return c = a * b / (c + d)
			}
			function g(a) {
				return function(b) {
					var c = a(b);
					return c && (c[0] = void 0),
					c
				}
			}
			function h(a, b) {
				return function(c) {
					var d = a(c);
					return d ? d : [b, c]
				}
			}
			function i(b, c) {
				for (var d = [], e = 0; e < b.length; e++) {
					var f = a.consumeTrimmed(b[e], c);
					if (!f || "" == f[0])
						return;
					void 0 !== f[0] && d.push(f[0]),
					c = f[1]
				}
				return "" == c ? d : void 0
			}
			function j(a, b, c, d, e) {
				for (var g = [], h = [], i = [], j = f(d.length, e.length), k = 0; j > k; k++) {
					var l = b(d[k % d.length], e[k % e.length]);
					if (!l)
						return;
					g.push(l[0]),
					h.push(l[1]),
					i.push(l[2])
				}
				return [g, h, function(b) {
					var d = b.map(function(a, b) {
						return i[b](a)
					}
					).join(c);
					return a ? a(d) : d
				}
				]
			}
			function k(a, b, c) {
				for (var d = [], e = [], f = [], g = 0, h = 0; h < c.length; h++)
					if ("function" == typeof c[h]) {
						var i = c[h](a[g], b[g++]);
						d.push(i[0]),
						e.push(i[1]),
						f.push(i[2])
					} else
						!function(a) {
							d.push(!1),
							e.push(!1),
							f.push(function() {
								return c[a]
							}
							)
						}
						(h);
				return [d, e, function(a) {
					for (var b = "", c = 0; c < a.length; c++)
						b += f[c](a[c]);
					return b
				}
				]
			}
			a.consumeToken = b,
			a.consumeTrimmed = c,
			a.consumeRepeated = d,
			a.consumeParenthesised = e,
			a.ignore = g,
			a.optional = h,
			a.consumeList = i,
			a.mergeNestedRepeated = j.bind(null , null ),
			a.mergeWrappedNestedRepeated = j,
			a.mergeList = k
		}
		(d),
		function(a) {
			function b(b) {
				function c(b) {
					var c = a.consumeToken(/^inset/i, b);
					if (c)
						return d.inset = !0,
						c;
					var c = a.consumeLengthOrPercent(b);
					if (c)
						return d.lengths.push(c[0]),
						c;
					var c = a.consumeColor(b);
					return c ? (d.color = c[0],
					c) : void 0
				}
				var d = {
					inset: !1,
					lengths: [],
					color: null 
				}
				  
				, e = a.consumeRepeated(c, /^/, b);
				return e && e[0].length ? [d, e[1]] : void 0
			}
			function c(c) {
				var d = a.consumeRepeated(b, /^,/, c);
				return d && "" == d[1] ? d[0] : void 0
			}
			function d(b, c) {
				for (; b.lengths.length < Math.max(b.lengths.length, c.lengths.length); )
					b.lengths.push({
						px: 0
					});
				for (; c.lengths.length < Math.max(b.lengths.length, c.lengths.length); )
					c.lengths.push({
						px: 0
					});
				if (b.inset == c.inset && !!b.color == !!c.color) {
					for (var d, e = [], f = [[], 0], g = [[], 0], h = 0; h < b.lengths.length; h++) {
						var i = a.mergeDimensions(b.lengths[h], c.lengths[h], 2 == h);
						f[0].push(i[0]),
						g[0].push(i[1]),
						e.push(i[2])
					}
					if (b.color && c.color) {
						var j = a.mergeColors(b.color, c.color);
						f[1] = j[0],
						g[1] = j[1],
						d = j[2]
					}
					return [f, g, function(a) {
						for (var c = b.inset ? "inset " : " ", f = 0; f < e.length; f++)
							c += e[f](a[0][f]) + " ";
						return d && (c += d(a[1])),
						c
					}
					]
				}
			}
			function e(b, c, d, e) {
				function f(a) {
					return {
						inset: a,
						color: [0, 0, 0, 0],
						lengths: [{
							px: 0
						}, {
							px: 0
						}, {
							px: 0
						}, {
							px: 0
						}]
					}
				}
				for (var g = [], h = [], i = 0; i < d.length || i < e.length; i++) {
					var j = d[i] || f(e[i].inset)
					  
					, k = e[i] || f(d[i].inset);
					g.push(j),
					h.push(k)
				}
				return a.mergeNestedRepeated(b, c, g, h)
			}
			var f = e.bind(null , d, ", ");
			a.addPropertiesHandler(c, f, ["box-shadow", "text-shadow"])
		}
		(d),
		function(a) {
			function b(a) {
				return a.toFixed(3).replace(".000", "")
			}
			function c(a, b, c) {
				return Math.min(b, Math.max(a, c))
			}
			function d(a) {
				return /^\s*[-+]?(\d*\.)?\d+\s*$/.test(a) ? Number(a) : void 0
			}
			function e(a, c) {
				return [a, c, b]
			}
			function f(a, b) {
				return 0 != a ? h(0, 1 / 0)(a, b) : void 0
			}
			function g(a, b) {
				return [a, b, function(a) {
					return Math.round(c(1, 1 / 0, a))
				}
				]
			}
			function h(a, d) {
				return function(e, f) {
					return [e, f, function(e) {
						return b(c(a, d, e))
					}
					]
				}
			}
			function i(a, b) {
				return [a, b, Math.round]
			}
			a.clamp = c,
			a.addPropertiesHandler(d, h(0, 1 / 0), ["border-image-width", "line-height"]),
			a.addPropertiesHandler(d, h(0, 1), ["opacity", "shape-image-threshold"]),
			a.addPropertiesHandler(d, h(.01, 1 / 0), ["zoom"]),
			a.addPropertiesHandler(d, f, ["flex-grow", "flex-shrink"]),
			a.addPropertiesHandler(d, e, ["zoom"]),
			a.addPropertiesHandler(d, g, ["orphans", "widows"]),
			a.addPropertiesHandler(d, i, ["z-index"]),
			a.parseNumber = d,
			a.mergeNumbers = e,
			a.numberToString = b
		}
		(d, f),
		function(a) {
			function b(a, b) {
				return "visible" == a || "visible" == b ? [0, 1, function(c) {
					return 0 >= c ? a : c >= 1 ? b : "visible"
				}
				] : void 0
			}
			a.addPropertiesHandler(String, b, ["visibility"])
		}
		(d),
		function(a) {
			function b(a) {
				a = a.trim(),
				e.fillStyle = "#000",
				e.fillStyle = a;
				var b = e.fillStyle;
				if (e.fillStyle = "#fff",
				e.fillStyle = a,
				b == e.fillStyle) {
					e.fillRect(0, 0, 1, 1);
					var c = e.getImageData(0, 0, 1, 1).data;
					e.clearRect(0, 0, 1, 1);
					var d = c[3] / 255;
					return [c[0] * d, c[1] * d, c[2] * d, d]
				}
			}
			function c(b, c) {
				return [b, c, function(b) {
					function c(a) {
						return Math.max(0, Math.min(255, a))
					}
					if (b[3])
						for (var d = 0; 3 > d; d++)
							b[d] = Math.round(c(b[d] / b[3]));
					return b[3] = a.numberToString(a.clamp(0, 1, b[3])),
					"rgba(" + b.join(",") + ")"
				}
				]
			}
			var d = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			d.width = d.height = 1;
			var e = d.getContext("2d");
			a.addPropertiesHandler(b, c, ["background-color", "border-bottom-color", "border-left-color", "border-right-color", "border-top-color", "color", "outline-color", "text-decoration-color"]),
			a.consumeColor = a.consumeParenthesised.bind(null , b),
			a.mergeColors = c
		}
		(d, f),
		function(a, b) {
			function c(a, b) {
				if (b = b.trim().toLowerCase(),
				"0" == b && "px".search(a) >= 0)
					return {
						px: 0
					};
				if (/^[^(]*$|^calc/.test(b)) {
					b = b.replace(/calc\(/g, "(");
					var c = {};
					b = b.replace(a, function(a) {
						return c[a] = null ,
						"U" + a
					}
					);
					for (var d = "U(" + a.source + ")", e = b.replace(/[-+]?(\d*\.)?\d+/g, "N").replace(new RegExp("N" + d,"g"), "D").replace(/\s[+-]\s/g, "O").replace(/\s/g, ""), f = [/N\*(D)/g, /(N|D)[*/]N/g, /(N|D)O\1/g, /\((N|D)\)/g], g = 0; g < f.length; )
						f[g].test(e) ? (e = e.replace(f[g], "$1"),
						g = 0) : g++;
					if ("D" == e) {
						for (var h in c) {
							var i = eval(b.replace(new RegExp("U" + h,"g"), "").replace(new RegExp(d,"g"), "*0"));
							if (!isFinite(i))
								return;
							c[h] = i
						}
						return c
					}
				}
			}
			function d(a, b) {
				return e(a, b, !0)
			}
			function e(b, c, d) {
				var e, f = [];
				for (e in b)
					f.push(e);
				for (e in c)
					f.indexOf(e) < 0 && f.push(e);
				return b = f.map(function(a) {
					return b[a] || 0
				}
				),
				c = f.map(function(a) {
					return c[a] || 0
				}
				),
				[b, c, function(b) {
					var c = b.map(function(c, e) {
						return 1 == b.length && d && (c = Math.max(c, 0)),
						a.numberToString(c) + f[e]
					}
					).join(" + ");
					return b.length > 1 ? "calc(" + c + ")" : c
				}
				]
			}
			var f = "px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc"
			  
			, g = c.bind(null , new RegExp(f,"g"))
			  
			, h = c.bind(null , new RegExp(f + "|%","g"))
			  
			, i = c.bind(null , /deg|rad|grad|turn/g);
			a.parseLength = g,
			a.parseLengthOrPercent = h,
			a.consumeLengthOrPercent = a.consumeParenthesised.bind(null , h),
			a.parseAngle = i,
			a.mergeDimensions = e;
			var j = a.consumeParenthesised.bind(null , g)
			  
			, k = a.consumeRepeated.bind(void 0, j, /^/)
			  
			, l = a.consumeRepeated.bind(void 0, k, /^,/);
			a.consumeSizePairList = l;
			var m = function(a) {
				var b = l(a);
				return b && "" == b[1] ? b[0] : void 0
			}
			  
			, n = a.mergeNestedRepeated.bind(void 0, d, " ")
			  
			, o = a.mergeNestedRepeated.bind(void 0, n, ",");
			a.mergeNonNegativeSizePair = n,
			a.addPropertiesHandler(m, o, ["background-size"]),
			a.addPropertiesHandler(h, d, ["border-bottom-width", "border-image-width", "border-left-width", "border-right-width", "border-top-width", "flex-basis", "font-size", "height", "line-height", "max-height", "max-width", "outline-width", "width"]),
			a.addPropertiesHandler(h, e, ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "bottom", "left", "letter-spacing", "margin-bottom", "margin-left", "margin-right", "margin-top", "min-height", "min-width", "outline-offset", "padding-bottom", "padding-left", "padding-right", "padding-top", "perspective", "right", "shape-margin", "text-indent", "top", "vertical-align", "word-spacing"])
		}
		(d, f),
		function(a) {
			function b(b) {
				return a.consumeLengthOrPercent(b) || a.consumeToken(/^auto/, b)
			}
			function c(c) {
				var d = a.consumeList([a.ignore(a.consumeToken.bind(null , /^rect/)), a.ignore(a.consumeToken.bind(null , /^\(/)), a.consumeRepeated.bind(null , b, /^,/), a.ignore(a.consumeToken.bind(null , /^\)/))], c);
				return d && 4 == d[0].length ? d[0] : void 0
			}
			function d(b, c) {
				return "auto" == b || "auto" == c ? [!0, !1, function(d) {
					var e = d ? b : c;
					if ("auto" == e)
						return "auto";
					var f = a.mergeDimensions(e, e);
					return f[2](f[0])
				}
				] : a.mergeDimensions(b, c)
			}
			function e(a) {
				return "rect(" + a + ")"
			}
			var f = a.mergeWrappedNestedRepeated.bind(null , e, d, ", ");
			a.parseBox = c,
			a.mergeBoxes = f,
			a.addPropertiesHandler(c, f, ["clip"])
		}
		(d, f),
		function(a) {
			function b(a) {
				return function(b) {
					var c = 0;
					return a.map(function(a) {
						return a === j ? b[c++] : a
					}
					)
				}
			}
			function c(a) {
				return a
			}
			function d(b) {
				if (b = b.toLowerCase().trim(),
				"none" == b)
					return [];
				for (var c, d = /\s*(\w+)\(([^)]*)\)/g, e = [], f = 0; c = d.exec(b); ) {
					if (c.index != f)
						return;
					f = c.index + c[0].length;
					var g = c[1]
					  
					, h = m[g];
					if (!h)
						return;
					var i = c[2].split(",")
					  
					, j = h[0];
					if (j.length < i.length)
						return;
					for (var n = [], o = 0; o < j.length; o++) {
						var p, q = i[o], r = j[o];
						if (p = q ? {
							A: function(b) {
								return "0" == b.trim() ? l : a.parseAngle(b)
							},
							N: a.parseNumber,
							T: a.parseLengthOrPercent,
							L: a.parseLength
						}[r.toUpperCase()](q) : {
							a: l,
							n: n[0],
							t: k
						}[r],
						void 0 === p)
							return;
						n.push(p)
					}
					if (e.push({
						t: g,
						d: n
					}),
					d.lastIndex == b.length)
						return e
				}
			}
			function e(a) {
				return a.toFixed(6).replace(".000000", "")
			}
			function f(b, c) {
				if (b.decompositionPair !== c) {
					b.decompositionPair = c;
					var d = a.makeMatrixDecomposition(b)
				}
				if (c.decompositionPair !== b) {
					c.decompositionPair = b;
					var f = a.makeMatrixDecomposition(c)
				}
				return null  == d[0] || null  == f[0] ? [[!1], [!0], function(a) {
					return a ? c[0].d : b[0].d
				}
				] : (d[0].push(0),
				f[0].push(1),
				[d, f, function(b) {
					var c = a.quat(d[0][3], f[0][3], b[5])
					  
					, g = a.composeMatrix(b[0], b[1], b[2], c, b[4])
					  
					, h = g.map(e).join(",");
					return h
				}
				])
			}
			function g(a) {
				return a.replace(/[xy]/, "")
			}
			function h(a) {
				return a.replace(/(x|y|z|3d)?$/, "3d")
			}
			function i(b, c) {
				var d = a.makeMatrixDecomposition && !0
				  
				, e = !1;
				if (!b.length || !c.length) {
					b.length || (e = !0,
					b = c,
					c = []);
					for (var i = 0; i < b.length; i++) {
						var j = b[i].t
						  
						, k = b[i].d
						  
						, l = "scale" == j.substr(0, 5) ? 1 : 0;
						c.push({
							t: j,
							d: k.map(function(a) {
								if ("number" == typeof a)
									return l;
								var b = {};
								for (var c in a)
									b[c] = l;
								return b
							}
							)
						})
					}
				}
				var n = function(a, b) {
					return "perspective" == a && "perspective" == b || ("matrix" == a || "matrix3d" == a) && ("matrix" == b || "matrix3d" == b)
				}
				  
				, o = []
				  
				, p = []
				  
				, q = [];
				if (b.length != c.length) {
					if (!d)
						return;
					var r = f(b, c);
					o = [r[0]],
					p = [r[1]],
					q = [["matrix", [r[2]]]]
				} else
					for (var i = 0; i < b.length; i++) {
						var j, s = b[i].t, t = c[i].t, u = b[i].d, v = c[i].d, w = m[s], x = m[t];
						if (n(s, t)) {
							if (!d)
								return;
							var r = f([b[i]], [c[i]]);
							o.push(r[0]),
							p.push(r[1]),
							q.push(["matrix", [r[2]]])
						} else {
							if (s == t)
								j = s;
							else if (w[2] && x[2] && g(s) == g(t))
								j = g(s),
								u = w[2](u),
								v = x[2](v);
							else {
								if (!w[1] || !x[1] || h(s) != h(t)) {
									if (!d)
										return;
									var r = f(b, c);
									o = [r[0]],
									p = [r[1]],
									q = [["matrix", [r[2]]]];
									break
								}
								j = h(s),
								u = w[1](u),
								v = x[1](v)
							}
							for (var y = [], z = [], A = [], B = 0; B < u.length; B++) {
								var C = "number" == typeof u[B] ? a.mergeNumbers : a.mergeDimensions
								  
								, r = C(u[B], v[B]);
								y[B] = r[0],
								z[B] = r[1],
								A.push(r[2])
							}
							o.push(y),
							p.push(z),
							q.push([j, A])
						}
					}
				if (e) {
					var D = o;
					o = p,
					p = D
				}
				return [o, p, function(a) {
					return a.map(function(a, b) {
						var c = a.map(function(a, c) {
							return q[b][1][c](a)
						}
						).join(",");
						return "matrix" == q[b][0] && 16 == c.split(",").length && (q[b][0] = "matrix3d"),
						q[b][0] + "(" + c + ")"
					}
					).join(" ")
				}
				]
			}
			var j = null 
			  
			, k = {
				px: 0
			}
			  
			, l = {
				deg: 0
			}
			  
			, m = {
				matrix: ["NNNNNN", [j, j, 0, 0, j, j, 0, 0, 0, 0, 1, 0, j, j, 0, 1], c],
				matrix3d: ["NNNNNNNNNNNNNNNN", c],
				rotate: ["A"],
				rotatex: ["A"],
				rotatey: ["A"],
				rotatez: ["A"],
				rotate3d: ["NNNA"],
				perspective: ["L"],
				scale: ["Nn", b([j, j, 1]), c],
				scalex: ["N", b([j, 1, 1]), b([j, 1])],
				scaley: ["N", b([1, j, 1]), b([1, j])],
				scalez: ["N", b([1, 1, j])],
				scale3d: ["NNN", c],
				skew: ["Aa", null , c],
				skewx: ["A", null , b([j, l])],
				skewy: ["A", null , b([l, j])],
				translate: ["Tt", b([j, j, k]), c],
				translatex: ["T", b([j, k, k]), b([j, k])],
				translatey: ["T", b([k, j, k]), b([k, j])],
				translatez: ["L", b([k, k, j])],
				translate3d: ["TTL", c]
			};
			a.addPropertiesHandler(d, i, ["transform"])
		}
		(d, f),
		function(a) {
			function b(a) {
				var b = Number(a);
				return isNaN(b) || 100 > b || b > 900 || b % 100 !== 0 ? void 0 : b
			}
			function c(b) {
				return b = 100 * Math.round(b / 100),
				b = a.clamp(100, 900, b),
				400 === b ? "normal" : 700 === b ? "bold" : String(b)
			}
			function d(a, b) {
				return [a, b, c]
			}
			a.addPropertiesHandler(b, d, ["font-weight"])
		}
		(d),
		function(a) {
			function b(a) {
				var b = {};
				for (var c in a)
					b[c] = -a[c];
				return b
			}
			function c(b) {
				return a.consumeToken(/^(left|center|right|top|bottom)\b/i, b) || a.consumeLengthOrPercent(b)
			}
			function d(b, d) {
				var e = a.consumeRepeated(c, /^/, d);
				if (e && "" == e[1]) {
					var f = e[0];
					if (f[0] = f[0] || "center",
					f[1] = f[1] || "center",
					3 == b && (f[2] = f[2] || {
						px: 0
					}),
					f.length == b) {
						if (/top|bottom/.test(f[0]) || /left|right/.test(f[1])) {
							var h = f[0];
							f[0] = f[1],
							f[1] = h
						}
						if (/left|right|center|Object/.test(f[0]) && /top|bottom|center|Object/.test(f[1]))
							return f.map(function(a) {
								return "object" == typeof a ? a : g[a]
							}
							)
					}
				}
			}
			function e(d) {
				var e = a.consumeRepeated(c, /^/, d);
				if (e) {
					for (var f = e[0], h = [{
						"%": 50
					}, {
						"%": 50
					}], i = 0, j = !1, k = 0; k < f.length; k++) {
						var l = f[k];
						"string" == typeof l ? (j = /bottom|right/.test(l),
						i = {
							left: 0,
							right: 0,
							center: i,
							top: 1,
							bottom: 1
						}[l],
						h[i] = g[l],
						"center" == l && i++) : (j && (l = b(l),
						l["%"] = (l["%"] || 0) + 100),
						h[i] = l,
						i++,
						j = !1)
					}
					return [h, e[1]]
				}
			}
			function f(b) {
				var c = a.consumeRepeated(e, /^,/, b);
				return c && "" == c[1] ? c[0] : void 0
			}
			var g = {
				left: {
					"%": 0
				},
				center: {
					"%": 50
				},
				right: {
					"%": 100
				},
				top: {
					"%": 0
				},
				bottom: {
					"%": 100
				}
			}
			  
			, h = a.mergeNestedRepeated.bind(null , a.mergeDimensions, " ");
			a.addPropertiesHandler(d.bind(null , 3), h, ["transform-origin"]),
			a.addPropertiesHandler(d.bind(null , 2), h, ["perspective-origin"]),
			a.consumePosition = e,
			a.mergeOffsetList = h;
			var i = a.mergeNestedRepeated.bind(null , h, ", ");
			a.addPropertiesHandler(f, i, ["background-position", "object-position"])
		}
		(d),
		function(a) {
			function b(b) {
				var c = a.consumeToken(/^circle/, b);
				if (c && c[0])
					return ["circle"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0, /^\(/)), d, a.ignore(a.consumeToken.bind(void 0, /^at/)), a.consumePosition, a.ignore(a.consumeToken.bind(void 0, /^\)/))], c[1]));
				var f = a.consumeToken(/^ellipse/, b);
				if (f && f[0])
					return ["ellipse"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0, /^\(/)), e, a.ignore(a.consumeToken.bind(void 0, /^at/)), a.consumePosition, a.ignore(a.consumeToken.bind(void 0, /^\)/))], f[1]));
				var g = a.consumeToken(/^polygon/, b);
				return g && g[0] ? ["polygon"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0, /^\(/)), a.optional(a.consumeToken.bind(void 0, /^nonzero\s*,|^evenodd\s*,/), "nonzero,"), a.consumeSizePairList, a.ignore(a.consumeToken.bind(void 0, /^\)/))], g[1])) : void 0
			}
			function c(b, c) {
				return b[0] === c[0] ? "circle" == b[0] ? a.mergeList(b.slice(1), c.slice(1), ["circle(", a.mergeDimensions, " at ", a.mergeOffsetList, ")"]) : "ellipse" == b[0] ? a.mergeList(b.slice(1), c.slice(1), ["ellipse(", a.mergeNonNegativeSizePair, " at ", a.mergeOffsetList, ")"]) : "polygon" == b[0] && b[1] == c[1] ? a.mergeList(b.slice(2), c.slice(2), ["polygon(", b[1], g, ")"]) : void 0 : void 0
			}
			var d = a.consumeParenthesised.bind(null , a.parseLengthOrPercent)
			  
			, e = a.consumeRepeated.bind(void 0, d, /^/)
			  
			, f = a.mergeNestedRepeated.bind(void 0, a.mergeDimensions, " ")
			  
			, g = a.mergeNestedRepeated.bind(void 0, f, ",");
			a.addPropertiesHandler(b, c, ["shape-outside"])
		}
		(d),
		function(a) {
			function b(a, b) {
				b.concat([a]).forEach(function(b) {
					b in document.documentElement.style && (c[a] = b)
				}
				)
			}
			var c = {};
			b("transform", ["webkitTransform", "msTransform"]),
			b("transformOrigin", ["webkitTransformOrigin"]),
			b("perspective", ["webkitPerspective"]),
			b("perspectiveOrigin", ["webkitPerspectiveOrigin"]),
			a.propertyName = function(a) {
				return c[a] || a
			}
		}
		(d, f)
	}
	(),
	!function(a, b) {
		function c(a) {
			var b = window.document.timeline;
			b.currentTime = a,
			b._discardPlayers(),
			0 == b._players.length ? d = !1 : requestAnimationFrame(c)
		}
		b.AnimationTimeline = function() {
			this._players = [],
			this.currentTime = void 0
		}
		,
		b.AnimationTimeline.prototype = {
			getAnimationPlayers: function() {
				return this._discardPlayers(),
				this._players.slice()
			},
			_discardPlayers: function() {
				this._players = this._players.filter(function(a) {
					return "finished" != a.playState && "idle" != a.playState
				}
				)
			},
			play: function(a) {
				var c = new b.Player(a);
				return this._players.push(c),
				b.restartWebAnimationsNextTick(),
				c.play(),
				c
			}
		};
		var d = !1;
		b.restartWebAnimationsNextTick = function() {
			d || (d = !0,
			requestAnimationFrame(c))
		}
		;
		var e = new b.AnimationTimeline;
		b.timeline = e;
		try {
			Object.defineProperty(window.document, "timeline", {
				configurable: !0,
				get: function() {
					return e
				}
			})
		} catch (f) {}
		try {
			window.document.timeline = e
		} catch (f) {}
	}
	(c, e, f),
	function(a, b) {
		b.Player = function(a) {
			this.source = a,
			a && (a.player = this),
			this._isGroup = !1,
			this._player = null ,
			this._childPlayers = [],
			this._callback = null ,
			this._rebuildUnderlyingPlayer(),
			this._player.cancel()
		}
		,
		b.Player.prototype = {
			_rebuildUnderlyingPlayer: function() {
				this._player && (this._player.cancel(),
				this._player = null ),
				(!this.source || this.source instanceof window.Animation) && (this._player = b.newUnderlyingPlayerForAnimation(this.source),
				b.bindPlayerForAnimation(this)),
				(this.source instanceof window.AnimationSequence || this.source instanceof window.AnimationGroup) && (this._player = b.newUnderlyingPlayerForGroup(this.source),
				b.bindPlayerForGroup(this))
			},
			get paused() {
				return this._player.paused
			},
			get playState() {
				return this._player.playState
			},
			get onfinish() {
				return this._onfinish
			},
			set onfinish(a) {
				"function" == typeof a ? (this._onfinish = a,
				this._player.onfinish = function(b) {
					b.target = this,
					a.call(this, b)
				}
				.bind(this)) : (this._player.onfinish = a,
				this.onfinish = this._player.onfinish)
			},
			get currentTime() {
				return this._player.currentTime
			},
			set currentTime(a) {
				this._player.currentTime = a,
				this._register(),
				this._forEachChild(function(b, c) {
					b.currentTime = a - c
				}
				)
			},
			get startTime() {
				return this._player.startTime
			},
			set startTime(a) {
				this._player.startTime = a,
				this._register(),
				this._forEachChild(function(b, c) {
					b.startTime = a + c
				}
				)
			},
			get playbackRate() {
				return this._player.playbackRate
			},
			get finished() {
				return this._player.finished
			},
			play: function() {
				this._player.play(),
				this._register(),
				b.awaitStartTime(this),
				this._forEachChild(function(a) {
					var b = a.currentTime;
					a.play(),
					a.currentTime = b
				}
				)
			},
			pause: function() {
				this._player.pause(),
				this._register(),
				this._forEachChild(function(a) {
					a.pause()
				}
				)
			},
			finish: function() {
				this._player.finish(),
				this._register()
			},
			cancel: function() {
				this._player.cancel(),
				this._register(),
				this._removePlayers()
			},
			reverse: function() {
				this._player.reverse(),
				b.awaitStartTime(this),
				this._register(),
				this._forEachChild(function(a, b) {
					a.reverse(),
					a.startTime = this.startTime + b * this.playbackRate,
					a.currentTime = this.currentTime + b * this.playbackRate
				}
				)
			},
			addEventListener: function(a, b) {
				var c = b;
				"function" == typeof b && (c = function(a) {
					a.target = this,
					b.call(this, a)
				}
				.bind(this),
				b._wrapper = c),
				this._player.addEventListener(a, c)
			},
			removeEventListener: function(a, b) {
				this._player.removeEventListener(a, b && b._wrapper || b)
			},
			_removePlayers: function() {
				for (; this._childPlayers.length; )
					this._childPlayers.pop().cancel()
			},
			_forEachChild: function(a) {
				var b = 0;
				this._childPlayers.forEach(function(c) {
					a.call(this, c, b),
					this.source instanceof window.AnimationSequence && (b += c.source.activeDuration)
				}
				.bind(this))
			}
		}
	}
	(c, e, f),
	function(a, b) {
		function c(a) {
			return a._timing.delay + a.activeDuration + a._timing.endDelay
		}
		function d(b) {
			this._frames = a.normalizeKeyframes(b)
		}
		function e() {
			for (var a = !1; h.length; )
				h.shift()._updateChildren(),
				a = !0;
			return a
		}
		d.prototype = {
			getFrames: function() {
				return this._frames
			}
		},
		b.Animation = function(b, c, e) {
			return this.target = b,
			this._timingInput = e,
			this._timing = a.normalizeTimingInput(e),
			this.timing = a.makeTiming(e),
			this.effect = "function" == typeof c ? c : new d(c),
			this._effect = c,
			this.activeDuration = a.calculateActiveDuration(this._timing),
			this
		}
		;
		var f = Element.prototype.animate;
		Element.prototype.animate = function(a, c) {
			return b.timeline.play(new b.Animation(this,a,c))
		}
		;
		var g = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
		b.newUnderlyingPlayerForAnimation = function(a) {
			var b = a.target || g
			  
			, c = a._effect;
			return "function" == typeof c && (c = []),
			f.apply(b, [c, a._timingInput])
		}
		,
		b.bindPlayerForAnimation = function(a) {
			a.source && "function" == typeof a.source.effect && b.bindPlayerForCustomEffect(a)
		}
		;
		var h = [];
		b.awaitStartTime = function(a) {
			null  === a.startTime && a._isGroup && (0 == h.length && requestAnimationFrame(e),
			h.push(a))
		}
		;
		var i = window.getComputedStyle;
		Object.defineProperty(window, "getComputedStyle", {
			configurable: !0,
			enumerable: !0,
			value: function() {
				var a = i.apply(this, arguments);
				return e() && (a = i.apply(this, arguments)),
				a
			}
		}),
		b.Player.prototype._updateChildren = function() {
			if (!this.paused && this.source && this._isGroup)
				for (var a = this.source._timing.delay, b = 0; b < this.source.children.length; b++) {
					var d, e = this.source.children[b];
					b >= this._childPlayers.length ? (d = window.document.timeline.play(e),
					this._childPlayers.push(d)) : d = this._childPlayers[b],
					e.player = this.source.player,
					d.startTime != this.startTime + a && (null  === this.startTime ? (d.currentTime = this.source.player.currentTime - a,
					d._startTime = null ) : d.startTime = this.startTime + a,
					d._updateChildren()),
					-1 == this.playbackRate && this.currentTime < a && -1 !== d.currentTime && (d.currentTime = -1),
					this.source instanceof window.AnimationSequence && (a += c(e))
				}
		}
		,
		window.Animation = b.Animation,
		window.Element.prototype.getAnimationPlayers = function() {
			return document.timeline.getAnimationPlayers().filter(function(a) {
				return null  !== a.source && a.source.target == this
			}
			.bind(this))
		}
		,
		b.groupChildDuration = c
	}
	(c, e, f),
	function(a, b) {
		function c(a) {
			a._registered || (a._registered = !0,
			f.push(a),
			g || (g = !0,
			requestAnimationFrame(d)))
		}
		function d() {
			var a = f;
			f = [],
			a.sort(function(a, b) {
				return a._sequenceNumber - b._sequenceNumber
			}
			),
			a.filter(function(a) {
				return a(),
				(!a._player || a._player.finished || a._player.paused) && (a._registered = !1),
				a._registered
			}
			),
			f.push.apply(f, a),
			f.length ? (g = !0,
			requestAnimationFrame(d)) : g = !1
		}
		var e = (document.createElementNS("http://www.w3.org/1999/xhtml", "div"),
		0);
		b.bindPlayerForCustomEffect = function(b) {
			var d = b.source.target
			  
			, f = b.source.effect
			  
			, g = b.source.timing
			  
			, h = void 0;
			g = a.normalizeTimingInput(g);
			var i = function() {
				var c = i._player ? i._player.currentTime : null ;
				null  !== c && (c = a.calculateTimeFraction(a.calculateActiveDuration(g), c, g),
				isNaN(c) && (c = null )),
				c !== h && f(c, d, b.source),
				h = c
			}
			;
			i._player = b,
			i._registered = !1,
			i._sequenceNumber = e++,
			b._callback = i,
			c(i)
		}
		;
		var f = []
		  
		, g = !1;
		b.Player.prototype._register = function() {
			this._callback && c(this._callback)
		}
	}
	(c, e, f),
	function(a, b) {
		function c(b, c) {
			this.children = b || [],
			this._timing = a.normalizeTimingInput(c, !0),
			this.timing = a.makeTiming(c, !0),
			"auto" === this._timing.duration && (this._timing.duration = this.activeDuration)
		}
		window.AnimationSequence = function() {
			c.apply(this, arguments)
		}
		,
		window.AnimationGroup = function() {
			c.apply(this, arguments)
		}
		,
		window.AnimationSequence.prototype = {
			get activeDuration() {
				var a = 0;
				return this.children.forEach(function(c) {
					a += b.groupChildDuration(c)
				}
				),
				Math.max(a, 0)
			}
		},
		window.AnimationGroup.prototype = {
			get activeDuration() {
				var a = 0;
				return this.children.forEach(function(c) {
					a = Math.max(a, b.groupChildDuration(c))
				}
				),
				a
			}
		},
		b.newUnderlyingPlayerForGroup = function(a) {
			var c, d = function(a) {
				var b = c._wrapper;
				return b.source ? null  == a ? void b._removePlayers() : void (null  !== b.startTime && b._updateChildren()) : void 0
			}
			;
			return c = b.timeline.play(new b.Animation(null ,d,a._timing))
		}
		,
		b.bindPlayerForGroup = function(a) {
			a._player._wrapper = a,
			a._isGroup = !0,
			b.awaitStartTime(a),
			a._updateChildren()
		}
	}
	(c, e, f)
}
({}, function() {
	return this
}
());
//# sourceMappingURL=web-animations-next.min.js.map
