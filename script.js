// AI Joke Generator with Unlimited Content and No Repeats
class AIJokeGenerator {
    constructor() {
        this.jokeHistory = new Set();
        this.totalJokes = 0;
        this.sessionJokes = 0;
        this.uniqueJokes = 0;
        this.currentJokeId = 0;
        
        // AI-powered joke templates and patterns - LONG JOKES (up to 10 lines)
        this.jokePatterns = [
            // Long Story format
            { type: 'story', templates: [
                "So {subject} walks into {action} and the bartender says, \"We don't serve {subject} here.\"\n{subject} says, \"That's okay, I don't drink anyway.\"\nThe bartender says, \"Then why are you here?\"\n{subject} replies, \"I heard you have the best {punchline} in town.\"\nThe bartender laughs and says, \"You're right!\"\n{subject} says, \"Great! Can I have one?\"\nThe bartender says, \"Sure, but it's going to cost you.\"\n{subject} says, \"How much?\"\nThe bartender says, \"{punchline}!\"\n{subject} says, \"That's expensive, but worth it!\"",
                
                "A {subject} goes to {action} and sees a sign that says \"{punchline}\".\n{subject} thinks, \"That's strange, but I'll try it.\"\n{subject} orders the {punchline} and the waiter brings it.\n{subject} takes a bite and says, \"This is amazing!\"\nThe waiter says, \"I'm glad you like it!\"\n{subject} says, \"What's the secret ingredient?\"\nThe waiter says, \"{punchline}!\"\n{subject} says, \"Really? That's incredible!\"\nThe waiter says, \"Yes, and it's our specialty!\"\n{subject} says, \"I'll definitely come back for more!\"",
                
                "Once upon a time, {subject} decided to {action}.\n{subject} thought it would be easy, but it wasn't.\n{subject} tried and tried, but nothing worked.\nFinally, {subject} asked for help from {punchline}.\n{punchline} said, \"I can help you, but first you need to {action}.\"\n{subject} said, \"But that's what I'm trying to do!\"\n{punchline} said, \"Ah, I see the problem!\"\n{subject} said, \"What's the problem?\"\n{punchline} said, \"You're doing it wrong! Here's how to do it right.\"\n{subject} followed the advice and finally succeeded!",
                
                "A {subject} and a {action} walk into a bar.\nThe bartender says, \"What can I get you?\"\n{subject} says, \"I'll have a {punchline}.\"\n{action} says, \"I'll have the same.\"\nThe bartender says, \"Coming right up!\"\n{subject} says, \"This is the best {punchline} I've ever had!\"\n{action} says, \"I agree! It's amazing!\"\nThe bartender says, \"I'm glad you like it!\"\n{subject} says, \"What's your secret?\"\nThe bartender says, \"{punchline}!\"",
                
                "My {subject} called me and said, \"I need help with {action}.\"\nI said, \"What's the problem?\"\n{subject} said, \"I can't figure out how to {action}.\"\nI said, \"That's easy! Here's what you do.\"\nI explained the process step by step.\n{subject} said, \"That makes sense!\"\nI said, \"Try it and let me know how it goes.\"\n{subject} called back later and said, \"It worked perfectly!\"\nI said, \"Great! I'm glad I could help.\"\n{subject} said, \"Thank you! You're the best {punchline}!\""
            ]},
            // Long Question-Answer format
            { type: 'qa', templates: [
                "Why did {subject} {action}?\nBecause {subject} heard that {punchline} was the best way to {action}.\nBut when {subject} tried it, nothing happened.\nSo {subject} asked {punchline} for advice.\n{punchline} said, \"You're doing it wrong!\"\n{subject} said, \"How should I do it?\"\n{punchline} said, \"Like this!\"\n{subject} tried again and it worked perfectly!\n{subject} said, \"Thank you! That was amazing!\"\n{punchline} said, \"You're welcome! Now you know the secret!\"",
                
                "What do you call {subject} that {action}?\nYou call them {punchline}!\nBut why do you call them that?\nBecause {subject} is so good at {action} that everyone is amazed.\nHow good are they?\nSo good that {punchline} is the only word that describes them.\nReally?\nYes! {subject} is the best at {action} in the whole world.\nWow! That's incredible!\nI know! That's why we call them {punchline}!\nThat makes perfect sense!",
                
                "How does {subject} {action}?\n{subject} {action} by using {punchline}.\nBut how does {punchline} work?\n{punchline} works by combining {action} with special techniques.\nWhat kind of techniques?\nThe kind that make {subject} amazing at {action}.\nReally?\nYes! {subject} has been practicing for years.\nHow long?\nLong enough to become the best at {action}.\nThat's impressive!\nI know! That's why {subject} is so good at {punchline}!"
            ]},
            // Long Conversation format
            { type: 'conversation', templates: [
                "{subject}: \"I need help with {action}.\"\n{punchline}: \"What's the problem?\"\n{subject}: \"I can't figure out how to {action}.\"\n{punchline}: \"That's easy! Here's what you do.\"\n{subject}: \"Really? Show me!\"\n{punchline}: \"First, you need to {action}.\"\n{subject}: \"Okay, I'm doing that.\"\n{punchline}: \"Good! Now {action}.\"\n{subject}: \"This is working!\"\n{punchline}: \"Perfect! You've got it now!\"",
                
                "A {subject} meets a {action} at {punchline}.\n{subject}: \"Hello! I'm here to {action}.\"\n{action}: \"Welcome! I can help you with that.\"\n{subject}: \"Great! What do I need to do?\"\n{action}: \"First, you need to {punchline}.\"\n{subject}: \"That sounds interesting!\"\n{action}: \"It is! And then you {action}.\"\n{subject}: \"This is amazing!\"\n{action}: \"I'm glad you like it!\"\n{subject}: \"Thank you for your help!\"\n{action}: \"You're very welcome!\""
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
            'magic', 'pizza', 'coffee', 'chocolate', 'ice cream', 'cookies', 'cake', 'donuts',
            'sandwich', 'burger', 'fries', 'popcorn', 'candy', 'gum', 'soda', 'juice',
            'tea', 'milk', 'water', 'smoothie', 'shake', 'beer', 'wine', 'cocktail',
            'music', 'dance', 'singing', 'painting', 'drawing', 'writing', 'reading', 'cooking',
            'gardening', 'fishing', 'hiking', 'swimming', 'running', 'cycling', 'dancing', 'yoga',
            'meditation', 'sleeping', 'dreaming', 'laughing', 'smiling', 'hugging', 'kissing', 'loving',
            'friendship', 'family', 'happiness', 'joy', 'peace', 'harmony', 'balance', 'wisdom',
            'knowledge', 'learning', 'teaching', 'helping', 'sharing', 'caring', 'giving', 'receiving',
            'adventure', 'exploration', 'discovery', 'invention', 'creation', 'imagination', 'creativity', 'inspiration',
            'motivation', 'determination', 'perseverance', 'patience', 'kindness', 'generosity', 'honesty', 'integrity',
            'courage', 'bravery', 'strength', 'power', 'energy', 'vitality', 'health', 'wellness',
            'success', 'achievement', 'victory', 'triumph', 'celebration', 'party', 'festival', 'holiday',
            'vacation', 'travel', 'journey', 'trip', 'expedition', 'mission', 'quest', 'adventure'
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
        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                event.preventDefault();
                this.generateAIJoke();
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
                this.generateAIJoke();
            }
        }
    }
    
    generateAIJoke() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const jokeText = document.getElementById('jokeText');
        const jokeId = document.getElementById('jokeId');
        const jokeType = document.getElementById('jokeType');
        
        // Show loading state
        if (loadingIndicator) loadingIndicator.classList.add('active');
        
        // Simulate AI processing time
        setTimeout(() => {
            const joke = this.createUniqueJoke();
            
            // Update display with animation
            if (jokeText) {
                jokeText.style.opacity = '0';
                jokeText.style.transform = 'translateY(20px)';
            }
            
            setTimeout(() => {
                if (jokeText) jokeText.textContent = joke.text;
                if (jokeId) jokeId.textContent = `#${joke.id.toString().padStart(4, '0')}`;
                if (jokeType) jokeType.textContent = joke.type;
                
                if (jokeText) {
                    jokeText.style.opacity = '1';
                    jokeText.style.transform = 'translateY(0)';
                }
                
                // Update counters
                this.totalJokes++;
                this.sessionJokes++;
                this.uniqueJokes++;
                this.currentJokeId = joke.id;
                
                this.updateDisplay();
                this.saveData();
                this.trackEngagement(joke);
                
                // Hide loading indicator
                if (loadingIndicator) loadingIndicator.classList.remove('active');
                
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
        
        // Fix quote formatting - replace "text" with text:
        jokeText = jokeText.replace(/"([^"]+)"/g, '$1:');
        
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
            'story': 'Long Story',
            'qa': 'Question & Answer',
            'conversation': 'Conversation'
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
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            font-size: 0.9rem;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
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
    } else {
        // Try to initialize again
        window.aiJokeGenerator = new AIJokeGenerator();
        if (window.aiJokeGenerator) {
            window.aiJokeGenerator.generateAIJoke();
        }
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
