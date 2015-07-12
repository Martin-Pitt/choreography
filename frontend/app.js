/// Setup our default preset
Choreo.define('default', Choreo.Preset.fade);

/// Define animation for our introduction view
Choreo.define('article.intro', {
	/// Creating our animation using the Web Animation API
	constructor: function(cache) {
		cache.header = document.querySelector('article.intro header');
		cache.content = document.querySelector('article.intro main.content');
		
		this.to.style.opacity = 0;
		cache.content.style.opacity = 0;
		
		return new AnimationGroup([
			Choreo.Animate.fade(this.to, 'in', { duration: 250, fill: 'both' }),
			Choreo.Animate.edge(cache.header, 'from top', { delay: 250, duration: 500, easing: 'cubic-bezier(.09,.4,.56,1.03)', fill: 'both' }),
			Choreo.Animate.fade(cache.content, 'in', { delay: 500, duration: 250, fill: 'both' })
		]);
	},

	/// Exit is mainly for doing cleanup when having finished an animation
	exit: function(cache) {
		this.to.style.opacity = null;
		cache.content.style.opacity = null;
	}
});


Choreo.define({ from: 'article.intro', to: 'article.why' }, function() {
	
	// Animation definition goes here
	
});



/// Kick off application with our first view
Choreo.graph('article.intro');




