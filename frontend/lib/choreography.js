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

		var transition = this.transits.find(from, to);
		var isReverse = false;
		if(!transition)
		{
			transition = this.transits.find(to, from);
			isReverse = true;
		}
		
		if(!transition) return null;
		
		Choreo.Entry(from, to);
		
		var cache = {};
		var animation = (typeof transition === 'function'? transition(cache): transition.constructor(cache));
		var player = document.timeline.play(animation);
		
		if(isReverse) player.reverse();
		
		player.onfinish = function() {
			if(transition.exit) transition.exit(cache);
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
			
			/// We haven't found a transition yet, use a default if available
			if(this.default) return this.default;
			
			/// Sir, we have nothing
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
				var siblings = Choreo._commonSiblings(from, to);
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
	
	_parents: function parents(node) {
		var nodes = [node];
		for (; node; node = node.parentNode) nodes.unshift(node);
		return nodes;
	},

	_commonSiblings: function commonSiblings(a, b) {
		var x = this._parents(a);
		var y = this._parents(b);
		if (x[0] != y[0]) throw "No common ancestor!";
		for (var i = 1; i < x.length; i++) if(x[i] != y[i]) return [x[i - 1], y[i - 1]];
	},
	
	
	
	Animate: {
		fade: function(element, direction, timing) {
			var keyframes = null;
			if(direction === 'in') keyframes = [ { offset: 0, opacity: 0 }, { offset: 1, opacity: 1 } ]; else
			if(direction === 'out') keyframes = [ { offset: 0, opacity: 1 }, { offset: 1, opacity: 0 } ];
			return new Animation(element, keyframes, timing);
		},
		
		edge: function(element, direction, timing) {
			// TODO: nearest clipping container (overflow: hidden or screen)
			
			/// Get current locations of view & element
			var viewRect = element.closest('article.view, body').getBoundingClientRect();
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
				
				return new Animation(element, keyframes, timing);
			}
			else throw new Error('Syntax Error in Animation.edge!', direction);
		},
		
		reveal: function(element, direction) {

		}
	},
	
	Preset: {
		fade: function() {},
		reveal: function() {}
	}
};


