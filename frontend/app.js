/// Setup our default preset
Choreo.define('default', Choreo.Preset.fade);

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




