// Track when user entered the page
        const startTime = new Date();

        // Show footer on scroll down, hide on scroll up

        let lastScroll = 0;
            const footer = document.getElementById('pageFooter');
            const landingPage = document.getElementById('landing');
            landingPage.addEventListener("scroll", () => {     
                if (landingPage.scrollTop > lastScroll) {
                    footer.classList.add('show');
                    console.log("Footer shown due to scroll down");
                } 
                else {
                    footer.classList.remove('show');
                    console.log("Footer hidden due to scroll up");
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
            
            // SLOT MACHINE Rotating Text - Improved Animation
            const rotatingTexts = ["Your time matters.", "That's why we make grocery shopping instant and easy.", "Optimizing your groceries has never been this fast."];
            let currentTextIndex = 0;
            const rotatingTextSlot = document.getElementById("rotating-text-slot");

            function createSlotSpan(text, className) {
                const span = document.createElement("span");
                span.className = `slot-anim${className ? ' ' + className : ''}`;
                span.textContent = text;
                return span;
            }
            
            function slotRotateText() {
                const prevSpan = rotatingTextSlot.querySelector('.slot-anim.active');
                if (prevSpan) {
                    prevSpan.classList.remove('active');
                    prevSpan.classList.add('out');
                    setTimeout(() => {
                        if (prevSpan.parentNode) rotatingTextSlot.removeChild(prevSpan);
                    }, 800);
                }
                
                currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
                const newSpan = createSlotSpan(rotatingTexts[currentTextIndex], 'active');
                rotatingTextSlot.appendChild(newSpan);
                
                // Force reflow to trigger animation
                void newSpan.offsetWidth;
            }
            
            // Start the rotation with a delay to allow initial animation
            setTimeout(() => {
                setInterval(slotRotateText, 4500);
            }, 1000);

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

       /* const videosIds = ["pricesly pics/Videos/Background1.mp4", "pricesly pics/Videos/Background2.mp4", "pricesly pics/Videos/Background3.mp4", "pricesly pics/Videos/Background4.mp4"];

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
      

        