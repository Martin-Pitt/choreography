var Choreo = {
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
	
	Entry: function entryDOM(from, to) {
// 		var from = older && document.querySelector('.view.' + older), to = newer && document.querySelector('.view.' + newer);
		
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
				var siblings = Choreo.Unility.commonSiblings(from, to);
				siblings[0].parentNode.insertBefore(siblings[1], siblings[0].nextSibling);
			}
			
			// Need to fix ancestor as per above...
			
			/// Get bounding boxes and prep layouts
			var fbox = from.getBoundingClientRect();
			var abox = ancestor.getBoundingClientRect();
			
			to.style.display = '';
			// to.style.visibility = 'hidden';
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
			to.style.display = '';
			// to.style.visibility = 'hidden';
		}
	},
	
	Exit: function exitDOM(from, to, isReverse) {
// 		var from = older && document.querySelector('.view.' + older), to = newer && document.querySelector('.view.' + newer);
		var back = from, front = to;
		
		// TODO: Make reversable for cancelations, e.g. swap front with back
		
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
	
	
	
	Animate: {
		fade: function(element, direction, timing) {
			var keyframes = null;
			if(direction === 'in') keyframes = [ { offset: 0, opacity: 0 }, { offset: 1, opacity: 1 } ]; else
			if(direction === 'out') keyframes = [ { offset: 0, opacity: 1 }, { offset: 1, opacity: 0 } ];
			return new KeyframeEffect(element, keyframes, timing);
		},
		
		edge: function(element, direction, timing) {
			/// Get current locations of view & element
			var viewRect = Choreo.Utility.closestClip(element).getBoundingClientRect();
			var elementRect = element.getBoundingClientRect();
			
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
			else throw new Error('Syntax Error in Animation.edge!', direction);
		},
		
		reveal: function(element, direction) {
			
		},
		
		/// Play multiple animations at once but each element has their animation delayed based on distance to an origin
		/// Great for hierarchical timing
		step: function(elements, keyframes, options) {
			var group = [];
			var rects = Array.prototype.map.call(elements, function(element) { return element.getBoundingClientRect() });
			var bounds = { left: rects[0].left, top: rects[0].top, right: rects[0].right, bottom: rects[0].bottom, width: 0, height: 0 };
			rects.forEach(function(rect) {
				if(rect.left < bounds.left) bounds.left = rect.left;
				if(rect.right > bounds.right) bounds.right = rect.right;
				if(rect.top < bounds.top) bounds.top = rect.top;
				if(rect.bottom > bounds.bottom) bounds.bottom = rect.bottom;
			});
			bounds.width = bounds.right - bounds.left;
			bounds.height = bounds.bottom - bounds.top;
			
			var origin = Choreo.Utility.parseCoordinate(options.origin || 'left top', bounds);
			
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
				
				group.push(new KeyframeEffect(element, keyframes, {
					delay: (options.delay || 0) + (distance / 4 * (options.stepMult || 1)),
					duration: options.duration,
					fill: options.fill,
					easing: options.easing
				}));
			}
			
			return new GroupEffect(group);
		},
		
		evade: function(target, elements, onEach) {
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
			
			return new GroupEffect(effects);
		},
		
		
	},
	
	Preset: {
		fade: function() {
			if(this.to && this.from)
				return new GroupEffect([
					Choreo.Animate.fade(this.from, 'out', { duration: 250 }),
					Choreo.Animate.fade(this.to, 'in', { duration: 250 })
				]);
			
			else if(this.to)
				return Choreo.Animate.fade(this.to, 'in', { duration: 250 });
			
			else if(this.from)
				return Choreo.Animate.fade(this.from, 'out', { duration: 250 });
		},
		
		reveal: function() {
			
		}
	},
	
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
		
		parents: function parents(node) {
			var nodes = [node];
			for (; node; node = node.parentNode) nodes.unshift(node);
			return nodes;
		},
		
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


