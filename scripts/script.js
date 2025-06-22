// Track when user entered the page
        const startTime = new Date();

        // Show footer on scroll down, hide on scroll up

        const footer = document.getElementById('pageFooter');
/*
        let lastScroll = 0;
            const landingPage = document.getElementById('landing');
            landingPage.addEventListener("scroll", () => {     
                if (landingPage.scrollTop >= lastScroll) {
                    footer.classList.add('show');
                    console.log("Footer shown due to scroll down");
                } 
                else {
                    footer.classList.remove('show');
                    console.log("Footer hidden due to scroll up");
                }
                    lastScroll = landingPage.scrollTop;
            });
        */

        // Show nav on scroll up, hide on scroll down

        let lastScroll = 0;
            const nav = document.querySelector('nav');
            const landingPage = document.getElementById('landing');
            landingPage.addEventListener("scroll", () => {     
                if (landingPage.scrollTop >= lastScroll) {
                    nav.classList.add('hide');
                    console.log("Footer hidden due to scroll down");
                } 
                else {
                    nav.classList.remove('hide');
                    console.log("nav shown due to scroll up");
                }
                const atBottom = Math.ceil(landingPage.scrollTop + landingPage.clientHeight) >= landingPage.scrollHeight;
                if (atBottom) {
                    footer.classList.add('show');
                } else {
                    footer.classList.remove('show');
                }
                lastScroll = landingPage.scrollTop;
            });
        
        
        
        // Enhanced Page Transition System
        function showPage(targetId) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-target') === targetId);
            });
            
            // Transition pages
            document.querySelectorAll('.page').forEach(page => {
                if (page.id === targetId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
            
            // Update URL
            history.pushState({page: targetId}, '', `#${targetId}`);
            
            // Scroll to top
            window.scrollTo(0, 0);

            // Handle footer visibility
            if (targetId !== 'landing') {
                nav.classList.remove('hide');
                footer.classList.remove('show');
                console.log("Footer hidden due landing page not being active");
            }
            
        }

        // Navigation Event Listeners
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showPage(this.getAttribute('data-target'));
            });
        });

        // Handle Back/Forward Navigation
        window.addEventListener('popstate', function(e) {
            const page = e.state?.page || 'landing';
            showPage(page);
        });

        // Initialize page from URL hash
        document.addEventListener('DOMContentLoaded', () => {
            const initialPage = window.location.hash.substring(1) || 'landing';
            showPage(initialPage);
            
            // Counters - Calculate based on time since page load
            const foodNumber = document.getElementById("food-number");
            const moneyNumber = document.getElementById("money-number");
            
            function updateCounters() {
                const now = new Date();
                const secondsElapsed = (now - startTime) / 1000;
                
                foodNumber.textContent = Math.round(29.5 * secondsElapsed).toLocaleString() + " metric tons";
                moneyNumber.textContent = "$" + Math.round(31700 * secondsElapsed).toLocaleString() + " USD";
            }
            
            // Update counters every second
            setInterval(updateCounters, 1000);
            updateCounters(); // Initial update
        });

        // Testimonial Wheel
        const testimonials = [
            {
                quote: "Foodin' really helps me save money",
                author: "Filip",
                title: "Student"
            }, 
            {
                quote: "Finally a solution that actually works",
                author: "Theodor",
                title: "Environmentalist"
            },
            {
                quote: "Foodin' has saved me a lot of time",
                author: "Antonela",
                title: "Busy mom"
            },
            {
                quote: "As an engineer, Foodin' has optimized my coffee consumption",
                author: "Mihnea",
                title: "Engineering student"
            }
        ];

        let testimonialIndex = 0;
        const testimonialQuote = document.getElementById("testimonial-quote");
        const testimonialAuthor = document.getElementById("testimonial-author");
        const testimonialTitle = document.getElementById("testimonial-title");
        const testimonialWheel = document.getElementById("testimonial-wheel");

        function showTestimonial(idx) {
            testimonialQuote.textContent = testimonials[idx].quote;
            testimonialAuthor.textContent = testimonials[idx].author;
            testimonialTitle.textContent = testimonials[idx].title;
            testimonialWheel.classList.remove('fadein');
            void testimonialWheel.offsetWidth; // trigger reflow for animation
            testimonialWheel.classList.add('fadein');
        }

        // Optional: fade animation
        const style = document.createElement('style');
        style.innerHTML = `
            .testimonial-wheel.fadein {
                animation: testimonialFade 0.5s;
            }
            @keyframes testimonialFade {
                from { opacity: 0; transform: translateY(20px);}
                to { opacity: 1; transform: translateY(0);}
            }
        `;
        document.head.appendChild(style);

        document.getElementById("testimonial-prev").onclick = function() {
            testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(testimonialIndex);
        };
        document.getElementById("testimonial-next").onclick = function() {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        };
        // Auto-rotate every 6 seconds
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        }, 6000);

        // Initial show
        showTestimonial(testimonialIndex);

    /*  const videosIds = ["pricesly pics/Videos/Background1.mp4", "pricesly pics/Videos/Background2.mp4", "pricesly pics/Videos/Background3.mp4"];

        const videoBackground = document.getElementById("backgroundVideo");

        videoBackground.addEventListener('ended', () => {
            let next;
            do {
                next = videosIds[Math.floor(Math.random() * videosIds.length)];
            } while (next === videoBackground.querySelector('source').src.split('/').pop()); // Ensure we don't repeat the same video
            videoBackground.querySelector('source').src = next;
            videoBackground.load();
            videoBackground.play();
        });
        */
      
        function fixScrollUpdateSafariIOs() {
            const isIosSafari = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
            // Check if it's an iOS device and Safari
            const isMobileSafari = isIosSafari && window.innerWidth < 768;
            if (isMobileSafari) {
                (function () {
                    // Create a hidden log div
                    const logDiv = document.createElement('div');
                    logDiv.style.height = '0px'; // Set the height to 0 pixels
                    logDiv.style.overflow = 'hidden'; // Hide the content
                    document.body.appendChild(logDiv);

                    // Function to update the log with the scroll position
                    function updateLog() {
                        logDiv.innerHTML = window.scrollY.toFixed(0);
                    }

                    // Add listeners for scroll and touch events
                    window.addEventListener('scroll', updateLog, { passive: true, capture: true });
                    window.addEventListener('touchstart', updateLog, { passive: true, capture: true });
                    window.addEventListener('touchmove', updateLog, { passive: true, capture: true });
                    window.addEventListener('touchend', updateLog, { passive: true, capture: true });
                })();
            }
        }

        let currentSignups = 200;
        let interval = 60000;
        const maxSignups = 500;
        const progressBar = document.getElementById('progressBar');
        
        // Update every 30 seconds
        setInterval(updateSignups, interval);
        
        function updateSignups() {
            interval = Math.random() * 40000 + 20000;
            // Random increment (or replace with real API call)
            const increment = 1;
            
            // Don't exceed max
            if (currentSignups + increment <= maxSignups) {
                currentSignups += increment;
                
                // Update display
                document.querySelector('.current').textContent = currentSignups;
                document.querySelector('.progress-bar').textContent = currentSignups;
                document.querySelector('.howManyLeft').textContent = 500 - currentSignups;
                progressBar.textContent = currentSignups;
                
                // Calculate percentage
                const percentage = (currentSignups / maxSignups) * 100;
                progressBar.style.width = percentage + '%';
                
                // Change color when nearing full
                if (percentage > 80) {
                    progressBar.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
                }
                if (percentage > 95) {
                    progressBar.style.background = 'linear-gradient(90deg, #F44336, #FF5722)';
                }
            }
        }
        
        // Initialize
        updateSignups();

