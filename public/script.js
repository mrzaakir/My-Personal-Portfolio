document.addEventListener('DOMContentLoaded', function() {
    // THEME TOGGLE FUNCTIONALITY
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector(`i`);

    // check for saved theme pereference or preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // apply theme based on saved preference or system preference
    if(savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun'); 
        document.querySelector('meta[name="theme-color"]').setAttribute
        ('content', '#000000'); // dark theme color
       
    }

    // toggle theme when button is click

    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');

        // update the icon and localStorage

        if(html.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            document.querySelector('meta[name="theme-color"]').setAttribute
            ('content', '#000000'); // dark theme color
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            document.querySelector('meta[name="theme-color"]').setAttribute
            ('content', '#0070f3'); // light theme color
        }
    });

    //MOBILE NAVIGATION TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if(menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

       
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        // Close menu when click on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }


    // SMOOTH SCROLLING FOR ANCHOR LINKS
    const anchorLinks = document.querySelectorAll('a[href^="#"]').forEach(anchor =>{

        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                const headerHight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
              
            }
        });
    });

    // form submition handling

    const contactForm = document.getElementById('contactForm');
    if(contactForm){
        contactForm.addEventListener('submit',function(e){
            e.preventDefault();

            // GET FORM VALUES
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;   
            const message = document.getElementById('message').value;

            //HERE YOU WOULD TYPICALLY SEND THE DATA TO YOUR SERVER
            //FROM DEMO PURPOSES, WE'LL JUST LOG IT AND SHOW A SUCCESS MESSAGE

            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message, ' + name + '! We will get back to you soon.');
            contactForm.reset(); // reset the form after submission

            // SHOW SUCCESS MESSAGE
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.classList.add('bg-green-500', 'text-white', 'cursor-not-allowed');

            //RESET FORM 

            contactForm.reset();

                //RESTORE BUTTON TEXT AFTER DELAY
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-500', 'text-white', 'cursor-not-allowed');
                }, 2000);

        });
    };
    
    //ADDING SCROLL EVENTS FOR HEADER SHADOW AND REVEAL ANIMATION
    const header = document.querySelector('header');
    const sectionns = document.querySelectorAll('section');

    function checkScroll(){

        // HEADER SHADOW
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        }else {
            header.classList.remove('shadow-md');
        }

        //REVEAL ANIMATIONS

        sectionns.forEach(section =>{
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;


            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700');
                section.classList.remove('opacity-0', 'translate-y-4');
            };
        });
    };

    window.addEventListener('scroll', checkScroll);

    //RUN ON PAGE LOAD
    checkScroll();

    // INTERSECTION OBSERVER FOR HERO ANIMATIONS
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700');
                entry.target.classList.remove('opacity-0', 'translate-y-4');

                //STOP OBSERVING AFTER ANIMATION
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // TERMINAL ANIMATION
    const terminalContainer = document.getElementById('terminal-container');
    const terminalContent = document.querySelector('.terminal-content');
    const commandSpan = document.querySelector('.command-text');

    if (terminalContainer && terminalContent && commandSpan) {
        const commandText = "git clone https://github.com/mrzaakir/My-Personal-Portfolio.git";

        let index = 0;
        const typeCommand = () => {
            if (index < commandText.length) {
                commandSpan.textContent += commandText.charAt(index);
                index++;
                setTimeout(typeCommand, 50); // typing speed
            } else {
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
                terminalContent.appendChild(cursor);
            };
        };

            // start typing of delay
            setTimeout(typeCommand, 1000);

    }else{
        //FALLBACK FOR ORIGINAL TERMINAL STRUCTURE
        const terminal = document.querySelector('.terminal-body');

        if(terminal){
            const commandText = terminal.querySelector('.command').textContent;
            terminal.querySelector('.command').textContent = ''; // clear original command text

            let i = 0;
            const typeCommand = () => {
                if (i < commandText.length) {
                    terminal.querySelector('.command').textContent += commandText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50); // typing speed
                } else {
                        // Add blinking cursor after typing is done
                    terminal.querySelector('.command').insertAdjacentHTML
                    ('afterend', '<span class="animate-blink">_</span>');
                }
            }

            // start typing after a delay
            setTimeout(typeCommand, 1000);
        }
    }

    
});
 console.log('Mr-ZaCk: Loading Script work done successfully ');
// This script handles the theme toggle, mobile navigation, smooth scrolling, form submission, header shadow, section reveal animations, and terminal animation.
// It also includes an intersection observer for hero animations and a typing effect for the terminal command.         

                                 // END OF DOM CONTENT LOADED//                    

