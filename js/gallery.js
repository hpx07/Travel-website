/**
 * Gallery functionality for Wanderlust travel website
 */
document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilters();
    initImageModal();
});

/**
 * Initialize gallery filtering
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter the gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                    }, 50);
                } else {
                    item.style.opacity = 0;
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Initialize image modal functionality
 */
function initImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const viewImageButtons = document.querySelectorAll('.view-image-btn');
    
    if (!modal || !modalImage || !closeModal || viewImageButtons.length === 0) return;
    
    // Open modal when clicking on view image button
    viewImageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imgUrl = this.getAttribute('data-img');
            const caption = this.closest('.overlay-content').querySelector('h3').textContent;
            const location = this.closest('.overlay-content').querySelector('p').textContent;
            
            modalImage.src = imgUrl;
            modalCaption.textContent = `${caption} - ${location}`;
            modal.style.display = 'block';
            
            // Disable scrolling on the body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking on close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        
        // Re-enable scrolling on the body
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside of the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            
            // Re-enable scrolling on the body
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            
            // Re-enable scrolling on the body
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Add lazy loading for gallery images
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.gallery-image img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // If the image has already loaded, skip it
                    if (src.includes('https://source.unsplash.com/')) {
                        observer.unobserve(img);
                        return;
                    }
                    
                    // Apply a small delay to stagger loading
                    setTimeout(() => {
                        img.src = src;
                    }, Math.random() * 300);
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});
