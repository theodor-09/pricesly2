// Track when user entered the page
        const startTime = new Date();
        
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
            
            // Rotating Text
            const rotatingTexts = ["LESS WASTE", "MORE QUALITY", "LESS MONEY", "PRECISE"];
            let currentTextIndex = 0;
            const rotatingTextElement = document.getElementById("rotating-text");
            
            function rotateText() {
                currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
                rotatingTextElement.style.opacity = 0;
                
                setTimeout(() => {
                    rotatingTextElement.textContent = rotatingTexts[currentTextIndex];
                    rotatingTextElement.style.opacity = 1;
                }, 500);
            }
            
            setInterval(rotateText, 3000);
            
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