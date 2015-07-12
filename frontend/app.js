/// Setup our default preset
Choreo.define('default', Choreo.Preset.fadeIn);

/// Define animation for our introduction view
Choreo.define('article.intro', {
	constructor: function(cache) {
		cache.header = document.querySelector('article.intro header');
		cache.content = document.querySelector('article.intro main.content');
		cache.content.style.opacity = 0;
		
		return new AnimationGroup([
			Choreo.Animate.edge(cache.header, 'from top', { duration: 500, easing: 'ease-out' }),
			Choreo.Animate.fade(cache.content, 'in', { duration: 250, fill: 'forwards' })
		]);
	},
	exit: function(cache) {
		cache.content.style.opacity = null;
	}
});


Choreo.define({ from: 'article.intro', to: 'article.why' }, function() {
	
	// Animation definition goes here
	
});



/// Kick off application with our first view
Choreo.graph('article.intro');














Choreo.define({
	from: 'article.intro',
	to: 'article.why'
}, {
	constructor: function(cache) {
		var $roles = $('main.roles');
		var $role = $('main.role');
		
		var $shared;
		var $header = $role.find('h1.role');
		
		var $anchor = $roles.find('a.role[data-id="' + $role.data('id') + '"]');
		var pos = $anchor.position();
		$shared = $anchor.clone().css({
			position: 'absolute',
			top: pos.top + 'px',
			left: pos.left + 'px',
			whiteSpace: 'nowrap'
		}).appendTo($role);
		
		$anchor.css('visibility', 'hidden');
		options.$anchor = $anchor;
		options.$shared = $shared;
		
		var $outgoing = $roles.children();
		var $incoming = $role.children().not($shared);
		
		var from = $shared.position();
		var to = $header.position();
		var delta = { left: to.left - from.left, top: to.top - from.top };
		var dist = Math.sqrt(Math.pow(delta.left, 2) + Math.pow(delta.top, 2));
		var duration = (700*0.7 + (dist/0.5)*0.3);
		
		return new AnimationGroup([
			new Animation($shared.get()[0], [
				{ transform: 'translate(0px, 0px)', fontSize: '16px', lineHeight: '1.25' },
				{ transform: 'translate(' + delta.left + 'px, ' + delta.top + 'px)', fontSize: '42px', lineHeight: '1.1', offset: 0.75 },
				{ transform: 'translate(' + delta.left + 'px, ' + delta.top + 'px)', fontSize: '42px', lineHeight: '1.1' }
			], { duration: duration, delay: 100, easing: 'cubic-bezier(.59,.04,.42,.99)' }),
			new AnimationGroup($outgoing.get().map(function(outgoing) {
				var initial = getComputedStyle(outgoing).opacity;
				return new Animation(outgoing, [ { opacity: initial }, { opacity: 0 } ], { duration: 100, fill: 'both' });
			}), { fill: 'both' }),
			new AnimationGroup($incoming.get().map(function(incoming) {
				var initial = getComputedStyle(incoming).opacity;
				return new Animation(incoming, [ { opacity: 0 }, { opacity: 0, offset: 0.75 }, { opacity: initial } ], { duration: 100 + duration }); 
			}))
		], { fill: 'none' });
	},
	
	exit: function(cache) {

	}
})





