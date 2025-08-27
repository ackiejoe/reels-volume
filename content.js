// Facebook & Instagram Reels Volume Control Extension
(function() {
    'use strict';
    
    let volumeControlAdded = false;
    let currentVideo = null;
    
    // Create volume control UI
    function createVolumeControl() {
        const volumeContainer = document.createElement('div');
        volumeContainer.className = 'fb-ig-reels-volume-control';
        
        const volumeIcon = document.createElement('div');
        volumeIcon.className = 'volume-icon';
        volumeIcon.innerHTML = '🔊';
        
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '100';
        volumeSlider.value = '20';
        volumeSlider.className = 'volume-slider';
        
        const volumeValue = document.createElement('span');
        volumeValue.className = 'volume-value';
        volumeValue.textContent = '20%';
        
        volumeContainer.appendChild(volumeIcon);
        volumeContainer.appendChild(volumeSlider);
        volumeContainer.appendChild(volumeValue);
        
        // Volume control functionality
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            const videos = document.querySelectorAll('video');
            
            videos.forEach(video => {
                if (video.offsetWidth > 0 && video.offsetHeight > 0) {
                    video.volume = volume;
                }
            });
            
            volumeValue.textContent = this.value + '%';
            
            // Update icon based on volume
            if (volume === 0) {
                volumeIcon.innerHTML = '🔇';
            } else if (volume < 0.5) {
                volumeIcon.innerHTML = '🔉';
            } else {
                volumeIcon.innerHTML = '🔊';
            }
        });
        
        return volumeContainer;
    }
    
    // Find the best place to inject the volume control
    function injectVolumeControl() {
        const isInstagram = window.location.hostname.includes('instagram.com');
        
        // Different selectors for Facebook vs Instagram
        const reelsSelectors = isInstagram ? [
            'article[role="presentation"]', // Instagram Reels container
            'div[role="presentation"]',
            'section[role="main"]',
            'div[style*="transform"]', // Instagram's transform containers
            'div[style*="position: relative"]',
            '.x1n2onr6', // Common Instagram class
            '.x78zum5'  // Another common Instagram class
        ] : [
            '[role="main"]',
            '[data-pagelet="Reels"]',
            'div[style*="position: relative"]',
            '.x1n2onr6', // Common Facebook class
            '.x78zum5'  // Another common Facebook class
        ];
        
        let reelsContainer = null;
        
        for (let selector of reelsSelectors) {
            const elements = document.querySelectorAll(selector);
            for (let element of elements) {
                // Check if this container has video elements
                if (element.querySelector('video')) {
                    reelsContainer = element;
                    break;
                }
            }
            if (reelsContainer) break;
        }
        
        if (reelsContainer && !document.querySelector('.fb-ig-reels-volume-control')) {
            const volumeControl = createVolumeControl();
            
            // Position in top-right of browser window (fixed positioning)
            volumeControl.style.position = 'fixed';
            volumeControl.style.right = '20px';
            
            // Different top position for Facebook vs Instagram
            const isInstagram = window.location.hostname.includes('instagram.com');
            volumeControl.style.top = isInstagram ? '20px' : '115px';
            
            // Append to body so it's not affected by container positioning
            document.body.appendChild(volumeControl);
            
            return true;
        }
        
        return false;
    }
    
    // Monitor for video changes and ensure volume control exists
    function monitorVideos() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            if (video !== currentVideo) {
                currentVideo = video;
                
                const slider = document.querySelector('.volume-slider');
                const volumeIcon = document.querySelector('.volume-icon');
                const volumeValue = document.querySelector('.volume-value');
                
                if (slider && volumeIcon && volumeValue) {
                    // Apply slider volume to video
                    video.volume = slider.value / 100;
                    
                    // Update icon based on volume level
                    const volume = slider.value / 100;
                    if (volume === 0) {
                        volumeIcon.innerHTML = '🔇';
                    } else if (volume < 0.5) {
                        volumeIcon.innerHTML = '🔉';
                    } else {
                        volumeIcon.innerHTML = '🔊';
                    }
                    volumeValue.textContent = slider.value + '%';
                }
                
                // Handle video events - set volume as early as possible
                video.addEventListener('loadstart', () => {
                    if (slider && volumeIcon && volumeValue) {
                        video.volume = slider.value / 100;
                        const volume = slider.value / 100;
                        volumeIcon.innerHTML = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';
                        volumeValue.textContent = slider.value + '%';
                    }
                });
                
                video.addEventListener('canplay', () => {
                    if (slider) {
                        video.volume = slider.value / 100;
                    }
                });
                
                // Volume change handler to sync with slider
                video.addEventListener('volumechange', (e) => {
                    if (slider && volumeIcon && volumeValue) {
                        const sliderVolume = slider.value / 100;
                        // Only update if the difference is significant (avoid infinite loops)
                        if (Math.abs(video.volume - sliderVolume) > 0.05) {
                            setTimeout(() => {
                                video.muted = false;
                                video.volume = sliderVolume;
                            }, 10);
                        }
                    }
                });
                
                // Set volume on play event
                video.addEventListener('play', () => {
                    if (slider) {
                        video.volume = slider.value / 100;
                    }
                });
            }
        });
    }
    
    // Main initialization
    function init() {
        // Only run on Facebook or Instagram
        if (!window.location.hostname.includes('facebook.com') && 
            !window.location.hostname.includes('instagram.com')) {
            return;
        }
        
        // For Facebook, only show on Reels pages
        if (window.location.hostname.includes('facebook.com')) {
            if (!window.location.pathname.includes('/reel/') && 
                !window.location.pathname.includes('/reels/')) {
                return;
            }
        }
        
        // Try to inject volume control
        if (injectVolumeControl()) {
            volumeControlAdded = true;
        }
        
        // Monitor for new videos
        monitorVideos();
    }
    
    // Listen for URL changes (for single-page app navigation)
    let currentUrl = window.location.href;
    
    function checkUrlChange() {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
            
            // Remove existing volume control if navigating away from Reels on Facebook
            if (window.location.hostname.includes('facebook.com')) {
                const existingControl = document.querySelector('.fb-ig-reels-volume-control');
                if (existingControl && 
                    !window.location.pathname.includes('/reel/') && 
                    !window.location.pathname.includes('/reels/')) {
                    existingControl.remove();
                    volumeControlAdded = false;
                    return;
                }
            }
            
            // Reinitialize if needed
            setTimeout(() => {
                if (!document.querySelector('.fb-ig-reels-volume-control')) {
                    volumeControlAdded = false;
                }
                init();
            }, 100);
        }
    }
    
    // Check for URL changes periodically (for single-page app navigation)
    setInterval(checkUrlChange, 500);
    
    // Also listen for popstate events
    window.addEventListener('popstate', () => {
        setTimeout(checkUrlChange, 100);
    });
    
    // Run initialization
    init();
    
    // Use MutationObserver to handle dynamic content loading
    const observer = new MutationObserver(function(mutations) {
        let shouldReinit = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === 1) { // Element node
                        if (node.querySelector('video') || node.tagName === 'VIDEO') {
                            shouldReinit = true;
                            
                            // Immediately set volume on new video elements
                            const newVideos = node.tagName === 'VIDEO' ? [node] : node.querySelectorAll('video');
                            const slider = document.querySelector('.volume-slider');
                            const volumeIcon = document.querySelector('.volume-icon');
                            const volumeValue = document.querySelector('.volume-value');
                            
                            if (slider && volumeIcon && volumeValue) {
                                newVideos.forEach(video => {
                                    video.volume = slider.value / 100;
                                    const volume = slider.value / 100;
                                    volumeIcon.innerHTML = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';
                                    volumeValue.textContent = slider.value + '%';
                                });
                            }
                            break;
                        }
                    }
                }
            }
        });
        
        if (shouldReinit) {
            // Quick re-initialization
            setTimeout(() => {
                if (!document.querySelector('.fb-ig-reels-volume-control')) {
                    volumeControlAdded = false;
                }
                init();
            }, 10); // Reduced timeout for faster response
        }
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
    });
    
})();