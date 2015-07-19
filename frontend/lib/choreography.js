var Choreo = {
	/// Here is where you start defining view transition animations
	/*
		Currently two signatures are supported,
		You can pass in an object with the { constructor: function(cache) { … }, exit: function(cache) { … } } interface
		Or you can pass in a function() { … }
		
		If you pass in a function, or a object with a constructor method, they MUST return an animation created with the Web Animation API.
		That is either a KeyframeEffect, GroupEffect or SequenceEffect. Something that can be run with document.timeline.play(…);
		
		The exit method is called upon animation completion, to allow you to clean up.
		The 'cache' argument is given to you so that you can store temporary data and pass it along to exit method, e.g. cached query selectors.
		
		An extra signature is provided to defining a 'default' view transition for ALL.
		Otherwise by default the library will only flip instantly between views.
		Common default animation to set up is cross fading.
	*/
	define: function(what, transition) {
		if(what === 'default')
		{
			this.transits.default = transition;
			return this;
		}
		
		var transit = {
			from: null,
			to: null,
			transition: transition
		};
		
		if(typeof what === 'string') transit.to = what;
		else
		{
			transit.from = what.from;
			transit.to = what.to;
		}
		
		this.transits.list.push(transit);
		
		return this;
	},
	
	/// The single most important method;  Allows you to trigger a view transition between two DOM elements
	/// 'from' is optional, so you can either call:  `Choreo.graph(from, to);`  or  `Choreo.graph(to);`
	/// 'from' and 'to' can be a CSS selector, a DOM element or null
	graph: function(from, to) {
		if(arguments.length === 1)
		{
			to = from;
			from = null;
		}
		
		if(typeof to === 'string') to = document.querySelector(to);
		if(typeof from === 'string') from = document.querySelector(from);
		
		
		/// Find view transition
		var transition = this.transits.find(from, to);
		
		/// Otherwise check for a reversible transition
		var isReverse = false;
		if(!transition)
		{
			transition = this.transits.find(to, from);
			isReverse = true;
		}
		
		/// We haven't found a view transition yet, use a default if available
		if(!transition && this.transits.default)
		{
			transition = this.transits.default;
		}
		
		/// Worst case, just do the minimal
		if(!transition)
		{
			Choreo.Entry(from, to);
			Choreo.Exit(from, to);
			return null;
		}
		
		
		Choreo.Entry(from, to);
		
		var context = {
			from: null,
			to: null,
			isReverse: isReverse
		};
		
		if(isReverse)
		{
			context.from = to;
			context.to = from;
		}
		else
		{
			context.from = from;
			context.to = to;
		}
		
		var cache = {};
		var animation = (typeof transition === 'function'? transition.call(context, cache): transition.constructor.call(context, cache));
		// TODO: Test if animation is truthy/valid
		var player = document.timeline.play(animation);
		
		if(isReverse)
		{
			player.pause();
			player.reverse();
		}
		
		// TODO: 'onfinish' attribute has been removed from W3C spec, switch to 'finished' Promise (wait for polyfill/browsers to catch up first)
		player.onfinish = function() {
			if(transition.exit) transition.exit.call(context, cache);
			Choreo.Exit.call(player, from, to);
			player.cancel();
		};
		
		return player;
	},
	
	/// Internal abstraction layer for storing view transitions/settings
	transits: {
		default: null,
		list: [],
		
		find: function(from, to) {
			if(arguments.length === 1)
			{
				to = from;
				from = null;
			}
			
			if(to instanceof HTMLElement)
			{
				var iter = this.list.length;
				while(iter-->0) {
					var transit = this.list[iter];
					if(to.matches(transit.to) && (from? from.matches(transit.from) : true)) return transit.transition;
				}
			}
			else if(typeof to === 'string')
			{
				var iter = this.list.length;
				while(iter-->0) {
					var transit = this.list[iter];
					if(to === transit.to && from === transit.from) return transit.transition;
				}
			}
			
			return null;
		}
	},
	
	/// Internal function for Entering view transitions
	/// Sets up DOM (puts them closely together; to avoid need of z-index'ing which may affect stacking context)
	/// and makes sure view containers stay in their final layouts, so you can safely do crazy stuff during your animation
	/// NOTE: This means inline styles affected will be overwritten and affected view containers will be moved in your DOM
	Entry: function entryDOM(from, to) {
		/// Show new view
		if(from && to)
		{
			var ancestor = from.parentNode;
			
			// We place the to DOM element (or common siblings) after the from DOM element, for higher natural order
			// Same ancestor?
			if(from.parentNode === to.parentNode)
			{
				from.parentNode.insertBefore(to, from.nextSibling);
			}
			
			// Get sibling ancestors then
			else
			{
				var siblings = Choreo.Utility.commonSiblings(from, to);
				siblings[0].parentNode.insertBefore(siblings[1], siblings[0].nextSibling);
			}
			
			// Need to fix ancestor as per above...
			
			/// Get bounding boxes and prep layouts
			var fbox = from.getBoundingClientRect();
			var abox = ancestor.getBoundingClientRect();
			
			/// Allow layout and then calculate it
			to.style.display = '';
			var tbox = to.getBoundingClientRect();
			
			/// Share layout coordinates
			to.style.position = from.style.position = 'absolute';
			to.style.top = from.style.top = (fbox.top - abox.top) + 'px';
			to.style.left = from.style.left = (fbox.left - abox.left) + 'px';
			from.style.width = fbox.width + 'px';
			from.style.height = fbox.height + 'px';
			to.style.width = tbox.width + 'px';
			to.style.height = tbox.height + 'px';
			
			ancestor.style.position = 'relative';
			ancestor.style.width = abox.width + 'px';
			ancestor.style.height = abox.height + 'px';
		}
		
		
		else if(to)
		{
			/// Allow layout
			to.style.display = '';
		}
	},
	
	/// Internal function for Exitting view transitions
	/// Removes inline styles
	Exit: function exitDOM(from, to, isReverse) {
		/// Just to make it absolutely clear here on what is front-facing or behind the other view
		var back = from, front = to;
		
		// TODO: Make reversable for cancelations, e.g. swap front with back?
		
		// Make front permanent, hide back
		if(front) front.style.visibility = '';
		if(back) back.style.display = 'none';
		
		if(front && back)
		{
			front.style.position = '';
			front.style.top = '';
			front.style.left = '';
			front.style.width = '';
			front.style.height = '';
			
			back.style.position = '';
			back.style.top = '';
			back.style.left = '';
			back.style.width = '';
			back.style.height = '';
			
			var ancestor = front.parentNode;
			ancestor.style.position = '';
			ancestor.style.width = '';
			ancestor.style.height = '';
		}
	},
	
	
	/// Choreo.Animate.* contains all the useful functions for composing a View Transition
	Animate: {
		/// Lightweight fade in / fade out; Maybe this is unnecessary? It's too simple and hides the beauty of the Web Anim API
		fade: function(element, direction, timing) {
			var keyframes = null;
			if(direction === 'in') keyframes = [ { offset: 0, opacity: 0 }, { offset: 1, opacity: 1 } ]; else
			if(direction === 'out') keyframes = [ { offset: 0, opacity: 1 }, { offset: 1, opacity: 0 } ];
			return new KeyframeEffect(element, keyframes, timing);
		},
		
		/// Allows you to move elements to or from offscreen locations (determined by the parent that is clipping its' appearance)
		edge: function(element, direction, timing) {
			/// Get current locations of view & element
			var viewRect = Choreo.Utility.closestClip(element).getBoundingClientRect();
			var elementRect = element.getBoundingClientRect();
			
			/// We only have one syntax support at the moment, example usage: "to top", "to left bottom" or "from right"
			var match = direction.match(/(to|from) (?:(top|bottom|left|right)? ?(top|bottom|left|right)?)/);
			if(match)
			{
				direction = match[1];
				var deltaPos = { x: 0, y: 0 };
				
				if(match[2] === 'top' || match[3] === 'top') deltaPos.y = viewRect.top - elementRect.bottom;
				else if(match[2] === 'bottom' || match[3] === 'bottom') deltaPos.y = viewRect.bottom - elementRect.top;
				
				if(match[2] === 'left' || match[3] === 'left') deltaPos.x = viewRect.left - elementRect.right;
				else if(match[2] === 'right' || match[3] === 'right') deltaPos.x = viewRect.right - elementRect.left;
				
				var keyframes = direction === 'to'? [
					{ offset: 0, transform: 'translate(0px, 0px)' },
					{ offset: 1, transform: 'translate(' + deltaPos.x + 'px, ' + deltaPos.y + 'px)' }
				]: [
					{ offset: 0, transform: 'translate(' + deltaPos.x + 'px, ' + deltaPos.y + 'px)' },
					{ offset: 1, transform: 'translate(0px, 0px)' }
				];
				
				return new KeyframeEffect(element, keyframes, timing);
			}
			
			/// Otherwise, just throw an error
			else throw new Error('Syntax Error in Animation.edge!', direction);
		},
		
		/// Work in Progress; I want to be able to reveal an element from growing or shrinking from a circle (or other shape)
		reveal: function(element, direction) {
			// ... ?
		},
		
		/// Play multiple animations at once but each element has their animation delayed based on distance to an origin position
		/// Great for the 'hierarchical timing' technique
		step: function(elements, keyframes, options) {
			/// Get all them rects
			var rects = Array.prototype.map.call(elements, function(element) { return element.getBoundingClientRect() });
			
			/// Figure out the big bounding box covering the rects
			var bounds = { left: rects[0].left, top: rects[0].top, right: rects[0].right, bottom: rects[0].bottom, width: 0, height: 0 };
			rects.forEach(function(rect) {
				if(rect.left < bounds.left) bounds.left = rect.left;
				if(rect.right > bounds.right) bounds.right = rect.right;
				if(rect.top < bounds.top) bounds.top = rect.top;
				if(rect.bottom > bounds.bottom) bounds.bottom = rect.bottom;
			});
			bounds.width = bounds.right - bounds.left;
			bounds.height = bounds.bottom - bounds.top;
			
			/// Parse the origin from the user and apply it with the bounding box
			var origin = Choreo.Utility.parseCoordinate(options.origin || 'left top', bounds);
			
			/// Loop through the elements and build the animations into a group
			var group = [];
			for(var iter = 0, total = elements.length; iter < total; ++iter)
			{
				var element = elements[iter];
				var rect = rects[iter];
				var distance = Math.sqrt(
					Math.pow(origin.x - (rect.left+rect.width*.5), 2) +
					Math.pow(origin.y - (rect.top+rect.height*.5), 2)
				);
				
				if(typeof keyframes === 'function')
				{
					keyframes = keyframes.call({
						element: element,
						rect: rect,
						distance: distance
					}, options);
				}
				
				if(keyframes && keyframes.length)
				{
					group.push(new KeyframeEffect(element, keyframes, {
						delay: (options.delay || 0) + (distance / 4 * (options.stepMult || 1)),
						duration: options.duration,
						fill: options.fill,
						easing: options.easing
					}));
				}
			}
			
			/// Return our users' glorious animation, all composited together :)
			return new GroupEffect(group);
		},
		
		/// Allows you to run a callback on multiple elements and contrast it in relation to a single element
		/// Common usecases tends to be having a bunch of elements move in sequence away or towards that single element
		/// Calculates layout, relative vectors, distances and normalised direction vectors, then passes it as a 'this' for onEach
		evade: function(target, elements, onEach) {
			/// Get and calculate all that fancy geometry
			var rects = Array.prototype.map.call(elements, function(element) { return element.getBoundingClientRect() });
			var from = target.getBoundingClientRect();
			var deltas = rects.map(function(rect) {
				return {
					x: (rect.left + rect.width*.5) - (from.left + from.width*.5),
					y: (rect.top + rect.height*.5) - (from.top + from.height*.5)
				}
			});
			var distances = deltas.map(function(delta) { return Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2)) });
			var directions = deltas.map(function(delta, index) {
				var magnitude = distances[index];
				if(magnitude == 0) return { x: 0, y: 0 };
				return { x: delta.x / magnitude, y: delta.y / magnitude }
			});
			
			/// Loop through it all and hit the onEach callback for an animation to composite
			var effects = [];
			for(var iter = 0, total = elements.length; iter < total; ++iter)
			{
				var effect = onEach.call({
					rect: rects[iter],
					delta: deltas[iter],
					direction: directions[iter],
					distance: distances[iter]
				}, elements[iter]);
				
				if(effect) effects.push(effect);
			}
			
			/// Finally return our animation
			return new GroupEffect(effects);
		}
		
		/*
			Any other useful animation-creating functions?
			I would like to compile all the common techniques and tricks here
		*/
	},
	
	
	/// Choreo.Preset.* contains default view transitions you can use
	Preset: {
		/// Fades one animation from one to the other
		fade: function(settings) {
			return function fadePreset () {
				if(this.to && this.from)
					return new GroupEffect([
						Choreo.Animate.fade(this.from, 'out', { duration: settings.duration }),
						Choreo.Animate.fade(this.to, 'in', { duration: settings.duration })
					]);
				
				else if(this.to)
					return Choreo.Animate.fade(this.to, 'in', { duration: settings.duration });
				
				else if(this.from)
					return Choreo.Animate.fade(this.from, 'out', { duration: settings.duration });
			}
		},
		
		/// Work in Progress; I want to be able to reveal a view from growing or shrinking from a circle (or other shape)
		reveal: function() {
			return function() {}
		}
	},
	
	
	/// Various *internal* utility functions
	/// If your sly, feel free to use them :), but NO API CONTRACT PROMISES here!
	Utility: {
		parseCoordinate: function(str, reference) {
			var match = str.match(/(left|center|right) (top|center|bottom)/);
			if(match)
			{
				var relative = { x: 0, y: 0 };
				
				if(match[1] === 'left') relative.x = 0; else
				if(match[1] === 'center') relative.x = 0.5; else
				if(match[1] === 'right') relative.x = 1;
				
				if(match[2] === 'top') relative.y = 0; else
				if(match[2] === 'center') relative.y = 0.5; else
				if(match[2] === 'bottom') relative.y = 1;
				
				return {
					x: reference.left + reference.width * relative.x,
					y: reference.top + reference.height * relative.y
				};
			}
			
			match = str.match(/(left|right|top|bottom|center)/);
			if(match)
			{
				var relative = { x: 0, y: 0 };
				
				if(match[1] === 'left') relative.x = 0; else
				if(match[1] === 'right') relative.x = 1; else
				if(match[1] === 'top') relative.y = 0; else
				if(match[1] === 'bottom') relative.y = 1; else
				if(match[1] === 'center') { relative.x = 0.5; relative.y = 0.5; }
				
				return {
					x: reference.left + reference.width * relative.x,
					y: reference.top + reference.height * relative.y
				};
			}
			
			match = str.match(/([\.\d]+)% ([\.\d]+)%/);
			if(match)
			{
				var relative = {
					x: parseFloat(match[1])/100.0,
					y: parseFloat(match[2])/100.0
				};
				
				return {
					x: reference.left + reference.width * relative.x,
					y: reference.top + reference.height * relative.y
				};
			}
		},
		
		/// Loop through, grabbing all the ancestors in one big array
		parents: function parents(node) {
			var nodes = [node];
			for (; node; node = node.parentNode) nodes.unshift(node);
			return nodes;
		},
		
		/// Figure out the common ancestor of two nodes
		commonSiblings: function commonSiblings(a, b) {
			var x = this.parents(a);
			var y = this.parents(b);
			if (x[0] != y[0]) throw "No common ancestor!";
			for (var i = 1; i < x.length; i++) if(x[i] != y[i]) return [x[i - 1], y[i - 1]];
		},
		
		/// Find closest element (that is not itself) that clips the view, e.g. has overflow hidden, otherwise return document root <html>
		closestClip: function closestClippingAncestor(node) {
			while(node && (node = node.parentNode) && node instanceof Element && node !== document.body) {
				if(getComputedStyle(node).overflow !== 'visible')
					return node;
			}
			
			return document.documentElement;
		}
	}
};


