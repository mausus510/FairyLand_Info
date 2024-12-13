document.addEventListener('DOMContentLoaded', function() {
    // Function to load the sidebar
    function loadSidebar() {
        const sidebarContainer = document.getElementById('sidebar-container');
        sidebarContainer.innerHTML = '<p>Loading Sidebar...</p>';  // Show loading message
        
        fetch('sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('Sidebar content loaded:', data); // Log the loaded content
                sidebarContainer.innerHTML = data;  // Inject sidebar content
                initializeSidebar();  // Call initializeSidebar function after loading sidebar content
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
                sidebarContainer.innerHTML = '<p>Error loading sidebar.</p>';
            });
    }

    // Function to initialize toggle functionality for submenus and loading content
    function initializeSidebar() {
        const menuToggles = document.querySelectorAll('.menu-toggle');
        
        menuToggles.forEach(toggle => {
            toggle.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent the default link behavior
                
                const submenu = this.nextElementSibling; // Find the submenu (the next <ul>)
                if (submenu) {
                    submenu.classList.toggle('visible'); // Toggle the 'visible' class to show or hide the submenu
                    
                    const symbol = this.querySelector('.toggle-symbol');
                    // Change the symbol between "+" and "-" to indicate the submenu is open or closed
                    symbol.textContent = symbol.textContent === '+' ? '-' : '+';
                }
            });
        });

        const menuItems = document.querySelectorAll('.submenu a, .menu-item > a:not(.menu-toggle)');
        menuItems.forEach(function(menuItem) {
            menuItem.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent the default link behavior
                
                const url = this.getAttribute('href');
                
                if (url) {
                    if (url === "index.html") {
                        loadHomeContent();  // If "Home" is clicked, load the homepage content
                    } else {
                        loadContent(url);  // Call loadContent to update the main content area
                    }
                }
            });
        });
    }

    // Function to load content for the main area
    function loadContent(url) {
        const contentArea = document.getElementById('content');
        contentArea.innerHTML = '<p>Loading...</p>';  // Show loading message
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentArea.innerHTML = data; // Inject the fetched content into the content area
            })
            .catch(error => {
                contentArea.innerHTML = '<p>Error loading content.</p>';
            });
    }

    // Function to reset content and load home content
    function loadHomeContent() {
        const contentArea = document.getElementById('content');
        contentArea.innerHTML = '<h1>Welcome to FairyLand Info TW-EN</h1><p>Content will be loaded here when you click on any menu item in the sidebar.</p>';
    }

    // Load the sidebar content when the page is loaded
    loadSidebar();

    // If "Home" is clicked from sidebar, call the loadHomeContent function
    if (window.location.pathname === "/index.html") {
        loadHomeContent(); // Initial loading of home content when page loads
    }

    // Event listener for skill links
    const skillLinks = document.querySelectorAll('.skill-link');
    skillLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent the default navigation behavior
            const url = this.getAttribute('href');  // Get the URL from the clicked link
            loadContent(url);  // Call function to load content dynamically
        });
    });
});
