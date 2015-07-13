/// Setup our default preset
Choreo.define('default', Choreo.Preset.fade);


/// Define animation for our introduction view
Choreo.define('article.home', {
	/// Creating our animation using the Web Animation API
	constructor: function(cache) {
		cache.header = document.querySelector('article.home header');
		cache.content = document.querySelector('article.home main.content');
		cache.nav = document.querySelector('article.home nav');
		
		this.to.style.opacity = 0;
		cache.nav.style.opacity = 0;
		
		return new AnimationGroup([
			Choreo.Animate.fade(this.to, 'in', { duration: 250, fill: 'both' }),
			Choreo.Animate.edge(cache.header, 'from top', { delay: 250, duration: 500, easing: 'cubic-bezier(.09,.4,.56,1.03)', fill: 'both' }),
			new Animation(cache.content, [
				{ transform: 'scaleY(0.0001)' },
				{ transform: 'scaleY(1)' }
			], { delay: 400, duration: 200, easing: 'ease-out', fill: 'both' }),
			Choreo.Animate.fade(cache.nav, 'in', { delay: 600, duration: 250, fill: 'both' })
		]);
	},
	
	/// Exit is mainly for doing cleanup when having finished an animation
	exit: function(cache) {
		this.to.style.opacity = null;
		cache.nav.style.opacity = null;
	}
});


/// They are really truly just CSS selectors, so we can use commas for multiple selections
Choreo.define({ from: 'article.home', to: 'article.why, article.documentation, article.downoad' }, Choreo.Preset.fade);




// Choreo.define({ from: 'article.home', to: 'article.why' }, Choreo.Preset.fade);



/// Kick off application with our first view
var currentView = 'article.home';
Choreo.graph(currentView);


/// Catching page-to-page interaction
document.addEventListener('click', function(event) {
	if(!event.target.matches('[data-view]')) return;
	
	var next = event.target.dataset.view;
	Choreo.graph(currentView, next);
	currentView = next;
});









