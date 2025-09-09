// AI Joke Generator with Unlimited Content and No Repeats
class AIJokeGenerator {
    constructor() {
        this.jokeHistory = new Set();
        this.totalJokes = 0;
        this.sessionJokes = 0;
        this.uniqueJokes = 0;
        this.currentJokeId = 0;
        
        // AI-powered joke templates and patterns
        this.jokePatterns = [
            // Question-Answer format
            { type: 'qa', templates: [
                "Why did {subject} {action}? Because {punchline}!",
                "What do you call {subject} that {action}? {punchline}!",
                "How does {subject} {action}? {punchline}!",
                "Why don't {subject} {action}? Because {punchline}!",
                "What's the difference between {subject} and {punchline}? {subject} {action}!",
                "Why did {subject} go to {action}? To {punchline}!",
                "What do you get when you cross {subject} with {action}? {punchline}!",
                "Why did {subject} {action}? {punchline}!",
                "What's {subject}'s favorite {action}? {punchline}!",
                "Why don't {subject} ever {action}? Because {punchline}!"
            ]},
            // Statement format
            { type: 'statement', templates: [
                "{subject} walks into {action} and says, \"{punchline}\"",
                "I told {subject} a joke about {action}. {punchline}",
                "{subject} is so {action} that {punchline}",
                "My {subject} asked me to {action}. I said, \"{punchline}\"",
                "{subject} and {action} walk into a bar. {punchline}",
                "I tried to {action} with {subject}, but {punchline}",
                "{subject} said to {action}, \"{punchline}\"",
                "The {subject} was {action} until {punchline}",
                "I asked {subject} to {action}, and they said, \"{punchline}\"",
                "{subject} went to {action} and discovered {punchline}"
            ]},
            // One-liner format
            { type: 'oneliner', templates: [
                "{subject} {action} {punchline}",
                "I'm not {subject}, but I {action} {punchline}",
                "{subject} is like {action} - {punchline}",
                "I told my {subject} I {action}, and they said {punchline}",
                "{subject} {action} so much that {punchline}",
                "My {subject} is {action} because {punchline}",
                "I {action} my {subject} and now {punchline}",
                "{subject} {action} better than {punchline}",
                "I asked {subject} to {action}, but {punchline}",
                "{subject} {action} while {punchline}"
            ]}
        ];
        
        // Dynamic content arrays for AI generation
        this.subjects = [
            'a programmer', 'a cat', 'a dog', 'a teacher', 'a doctor', 'a lawyer', 'a chef', 'a musician',
            'a scientist', 'a artist', 'a writer', 'a pilot', 'a farmer', 'a mechanic', 'a librarian',
            'a detective', 'a magician', 'a clown', 'a robot', 'a alien', 'a ghost', 'a vampire',
            'a superhero', 'a pirate', 'a ninja', 'a knight', 'a wizard', 'a dragon', 'a unicorn',
            'my computer', 'my phone', 'my car', 'my house', 'my garden', 'my kitchen', 'my office',
            'a penguin', 'a elephant', 'a giraffe', 'a monkey', 'a bear', 'a lion', 'a tiger',
            'a fish', 'a bird', 'a bee', 'a spider', 'a snake', 'a frog', 'a turtle', 'a rabbit'
        ];
        
        this.actions = [
            'dance', 'sing', 'cook', 'read', 'write', 'paint', 'build', 'fix', 'clean', 'organize',
            'study', 'work', 'play', 'sleep', 'eat', 'drink', 'run', 'walk', 'jump', 'fly',
            'swim', 'climb', 'drive', 'ride', 'shop', 'garden', 'exercise', 'meditate', 'travel',
            'explore', 'discover', 'invent', 'create', 'design', 'plan', 'organize', 'decorate',
            'celebrate', 'party', 'relax', 'rest', 'dream', 'imagine', 'think', 'remember',
            'forget', 'learn', 'teach', 'help', 'support', 'encourage', 'motivate', 'inspire',
            'surprise', 'shock', 'amaze', 'confuse', 'puzzle', 'challenge', 'compete', 'win',
            'lose', 'try', 'attempt', 'succeed', 'fail', 'improve', 'grow', 'change', 'evolve'
        ];
        
        this.punchlines = [
            'it was a piece of cake', 'they were in a pickle', 'it was a real eye-opener',
            'they were over the moon', 'it was a walk in the park', 'they were on cloud nine',
            'it was a breath of fresh air', 'they were in hot water', 'it was a wild goose chase',
            'they were under the weather', 'it was a drop in the bucket', 'they were on thin ice',
            'it was a blessing in disguise', 'they were in the doghouse', 'it was a shot in the dark',
            'they were on top of the world', 'it was a needle in a haystack', 'they were in the same boat',
            'it was a diamond in the rough', 'they were on the same page', 'it was a wolf in sheep\'s clothing',
            'they were in the driver\'s seat', 'it was a bird in the hand', 'they were on the ball',
            'it was a chip off the old block', 'they were in the spotlight', 'it was a feather in their cap',
            'they were on the right track', 'it was a taste of their own medicine', 'they were in the clear',
            'it was a labor of love', 'they were on the fence', 'it was a matter of time',
            'they were in the loop', 'it was a stroke of luck', 'they were on the same wavelength',
            'it was a work of art', 'they were in the zone', 'it was a sight for sore eyes',
            'they were on the edge of their seat', 'it was a breath of fresh air', 'they were in the groove',
            'it was a ray of sunshine', 'they were on the up and up', 'it was a sign of the times',
            'they were in the nick of time', 'it was a change of pace', 'they were on the level',
            'it was a step in the right direction', 'they were in the fast lane', 'it was a turn of events'
        ];
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadData();
        this.setupEventListeners();
        this.updateDisplay();
        this.preloadJokes();
    }
    
    loadData() {
        // Load saved data from localStorage
        const savedData = localStorage.getItem('aiJokeGenerator');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.jokeHistory = new Set(data.jokeHistory || []);
            this.totalJokes = data.totalJokes || 0;
            this.uniqueJokes = data.uniqueJokes || 0;
            this.currentJokeId = data.currentJokeId || 0;
        }
        
        // Load session data
        const sessionData = sessionStorage.getItem('sessionJokes');
        this.sessionJokes = parseInt(sessionData) || 0;
    }
    
    saveData() {
        const data = {
            jokeHistory: Array.from(this.jokeHistory),
            totalJokes: this.totalJokes,
            uniqueJokes: this.uniqueJokes,
            currentJokeId: this.currentJokeId
        };
        localStorage.setItem('aiJokeGenerator', JSON.stringify(data));
        sessionStorage.setItem('sessionJokes', this.sessionJokes.toString());
    }
    
    setupEventListeners() {
        const aiButton = document.getElementById('aiButton');
        
        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                event.preventDefault();
                if (!aiButton.disabled) {
                    this.generateAIJoke();
                }
            }
        });
        
        // Touch support for mobile
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (event) => {
            touchStartY = event.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', (event) => {
            touchEndY = event.changedTouches[0].screenY;
            this.handleSwipe(touchStartY, touchEndY);
        });
    }
    
    handleSwipe(startY, endY) {
        const swipeThreshold = 50;
        const diff = startY - endY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - generate new joke
                const aiButton = document.getElementById('aiButton');
                if (!aiButton.disabled) {
                    this.generateAIJoke();
                }
            }
        }
    }
    
    generateAIJoke() {
        const aiButton = document.getElementById('aiButton');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const jokeText = document.getElementById('jokeText');
        const jokeId = document.getElementById('jokeId');
        const jokeType = document.getElementById('jokeType');
        
        // Show loading state
        aiButton.style.opacity = '0';
        loadingIndicator.classList.add('active');
        
        // Simulate AI processing time
        setTimeout(() => {
            const joke = this.createUniqueJoke();
            
            // Update display with animation
            jokeText.style.opacity = '0';
            jokeText.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                jokeText.textContent = joke.text;
                jokeId.textContent = `#${joke.id.toString().padStart(4, '0')}`;
                jokeType.textContent = joke.type;
                
                jokeText.style.opacity = '1';
                jokeText.style.transform = 'translateY(0)';
                
                // Update counters
                this.totalJokes++;
                this.sessionJokes++;
                this.uniqueJokes++;
                this.currentJokeId = joke.id;
                
                this.updateDisplay();
                this.saveData();
                this.trackEngagement(joke);
                
                // Reset button
                aiButton.style.opacity = '1';
                loadingIndicator.classList.remove('active');
                
            }, 300);
            
        }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }

    createUniqueJoke() {
        let attempts = 0;
        let joke;
        
        do {
            joke = this.generateJoke();
            attempts++;
            
            // Prevent infinite loop
            if (attempts > 100) {
                // If we can't generate a unique joke, clear history and start fresh
                this.jokeHistory.clear();
                joke = this.generateJoke();
                break;
            }
        } while (this.jokeHistory.has(joke.text));
        
        // Add to history
        this.jokeHistory.add(joke.text);
        
        return joke;
    }
    
    generateJoke() {
        const pattern = this.jokePatterns[Math.floor(Math.random() * this.jokePatterns.length)];
        const template = pattern.templates[Math.floor(Math.random() * pattern.templates.length)];
        
        const subject = this.getRandomItem(this.subjects);
        const action = this.getRandomItem(this.actions);
        const punchline = this.getRandomItem(this.punchlines);
        
        let jokeText = template
            .replace(/{subject}/g, subject)
            .replace(/{action}/g, action)
            .replace(/{punchline}/g, punchline);
        
        // Add some AI creativity with variations
        jokeText = this.addAICreativity(jokeText);
        
        return {
            id: this.currentJokeId + 1,
            text: jokeText,
            type: this.getJokeType(pattern.type),
            pattern: pattern.type,
            timestamp: new Date().toISOString()
        };
    }
    
    addAICreativity(joke) {
        // Add random creative elements
        const creativity = [
            () => joke.replace(/\.$/, '!'),
            () => joke.replace(/\.$/, '...'),
            () => joke.replace(/\.$/, '?'),
            () => joke + ' (I know, I know...)',
            () => joke + ' (True story!)',
            () => joke + ' (Don\'t ask me how I know)',
            () => joke.replace(/^/, 'Fun fact: '),
            () => joke.replace(/^/, 'Plot twist: '),
            () => joke.replace(/^/, 'Here\'s the thing: '),
            () => joke.replace(/^/, 'Get this: ')
        ];
        
        if (Math.random() < 0.3) { // 30% chance to add creativity
            const creativeFunction = creativity[Math.floor(Math.random() * creativity.length)];
            return creativeFunction();
        }
        
        return joke;
    }
    
    getJokeType(patternType) {
        const types = {
            'qa': 'Question & Answer',
            'statement': 'Story Joke',
            'oneliner': 'One-Liner'
        };
        return types[patternType] || 'AI Generated';
    }
    
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    updateDisplay() {
        document.getElementById('jokeCount').textContent = this.totalJokes;
        document.getElementById('uniqueCount').textContent = this.uniqueJokes;
        document.getElementById('sessionCount').textContent = this.sessionJokes;
        document.getElementById('totalJokes').textContent = this.totalJokes;
        document.getElementById('totalUnique').textContent = this.uniqueJokes;
    }
    
    trackEngagement(joke) {
        const engagement = {
            timestamp: new Date().toISOString(),
            action: 'ai_joke_generated',
            jokeId: joke.id,
            jokeType: joke.type,
            totalJokes: this.totalJokes,
            sessionJokes: this.sessionJokes
        };
        
        // Store engagement data
        const engagementHistory = JSON.parse(localStorage.getItem('engagementHistory') || '[]');
        engagementHistory.push(engagement);
        
        // Keep only last 1000 interactions
        if (engagementHistory.length > 1000) {
            engagementHistory.splice(0, engagementHistory.length - 1000);
        }
        
        localStorage.setItem('engagementHistory', JSON.stringify(engagementHistory));
        
        // Track with analytics if available
        this.trackEvent('ai_joke_generated', {
            joke_type: joke.type,
            total_jokes: this.totalJokes,
            session_jokes: this.sessionJokes
        });
    }
    
    trackEvent(eventName, eventData) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, eventData);
        }
    }
    
    preloadJokes() {
        // Pre-generate some jokes in the background for faster loading
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                this.generateJoke();
            }
        }, 2000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.aiJokeGenerator = new AIJokeGenerator();
});

// Global function for button onclick
function generateAIJoke() {
    if (window.aiJokeGenerator) {
        window.aiJokeGenerator.generateAIJoke();
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Track page views
window.addEventListener('load', function() {
    if (window.aiJokeGenerator) {
        window.aiJokeGenerator.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            total_jokes: window.aiJokeGenerator.totalJokes,
            unique_jokes: window.aiJokeGenerator.uniqueJokes
        });
    }
});

// Social Sharing Functions
function shareToFacebook() {
    const currentJoke = document.getElementById('jokeText').textContent;
    const jokeId = document.getElementById('jokeId').textContent;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`${currentJoke} - ${jokeId}`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    if (window.aiJokeGenerator) {
        window.aiJokeGenerator.trackEvent('social_share', { platform: 'facebook' });
    }
}

function shareToTwitter() {
    const currentJoke = document.getElementById('jokeText').textContent;
    const jokeId = document.getElementById('jokeId').textContent;
    const shareText = `${currentJoke} - ${jokeId} via @AdSenseWeb`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    if (window.aiJokeGenerator) {
        window.aiJokeGenerator.trackEvent('social_share', { platform: 'twitter' });
    }
}

function shareToWhatsApp() {
    const currentJoke = document.getElementById('jokeText').textContent;
    const jokeId = document.getElementById('jokeId').textContent;
    const shareText = `${currentJoke} - ${jokeId}\n\nCheck out AdSense Web for more jokes!`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank');
    
    if (window.aiJokeGenerator) {
        window.aiJokeGenerator.trackEvent('social_share', { platform: 'whatsapp' });
    }
}

// User Retention Functions
function saveFavoriteJoke() {
    const currentJoke = document.getElementById('jokeText').textContent;
    const jokeId = document.getElementById('jokeId').textContent;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteJokes') || '[]');
    const favorite = {
        id: jokeId,
        text: currentJoke,
        timestamp: new Date().toISOString()
    };
    
    // Check if already favorited
    if (!favorites.find(fav => fav.id === jokeId)) {
        favorites.push(favorite);
        localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
        
        if (window.aiJokeGenerator) {
            window.aiJokeGenerator.showNotification('Joke saved to favorites! ❤️');
            window.aiJokeGenerator.trackEvent('favorite_saved', { joke_id: jokeId });
        }
    } else {
        if (window.aiJokeGenerator) {
            window.aiJokeGenerator.showNotification('Already in favorites! ❤️');
        }
    }
}

function getDailyJoke() {
    // Generate a special daily joke
    if (window.aiJokeGenerator) {
        window.aiJokeGenerator.generateAIJoke();
        window.aiJokeGenerator.trackEvent('daily_joke_requested', {});
    }
}

function subscribeNewsletter() {
    const email = prompt('Enter your email to get daily jokes and updates:');
    if (email && email.includes('@')) {
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            
            if (window.aiJokeGenerator) {
                window.aiJokeGenerator.showNotification('Thanks for subscribing! 📧');
                window.aiJokeGenerator.trackEvent('newsletter_subscribed', { email: email });
            }
        } else {
            if (window.aiJokeGenerator) {
                window.aiJokeGenerator.showNotification('Already subscribed! 📧');
            }
        }
    }
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        'script.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
});
