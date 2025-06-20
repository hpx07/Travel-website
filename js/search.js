/**
 * Search functionality for Wanderlust travel website
 */
document.addEventListener('DOMContentLoaded', function() {
    initDestinationSearch();
});

function initDestinationSearch() {
    const searchInput = document.getElementById('destination-search');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchBtn || !searchResults) return;
    
    // Destination data for search (in a real application, this would come from a server/API)
    const destinations = [
        {
            name: 'Bali, Indonesia',
            description: 'Tropical paradise with beaches, culture, and luxury',
            image: 'https://source.unsplash.com/100x100/?bali',
            url: 'destination-detail.html?destination=bali'
        },
        {
            name: 'Santorini, Greece',
            description: 'Stunning sunsets and whitewashed architecture',
            image: 'https://source.unsplash.com/100x100/?santorini',
            url: 'destination-detail.html?destination=santorini'
        },
        {
            name: 'Kyoto, Japan',
            description: 'Ancient temples, traditional gardens, and vibrant festivals',
            image: 'https://source.unsplash.com/100x100/?kyoto',
            url: 'destination-detail.html?destination=kyoto'
        },
        {
            name: 'Maldives',
            description: 'Pristine beaches, crystal clear waters, and overwater bungalows',
            image: 'https://source.unsplash.com/100x100/?maldives',
            url: 'destination-detail.html?destination=maldives'
        },
        {
            name: 'Paris, France',
            description: 'The city of lights with iconic landmarks and romantic ambiance',
            image: 'https://source.unsplash.com/100x100/?paris',
            url: 'destination-detail.html?destination=paris'
        },
        {
            name: 'Tokyo, Japan',
            description: 'A vibrant metropolis blending ultramodern and traditional',
            image: 'https://source.unsplash.com/100x100/?tokyo',
            url: 'destination-detail.html?destination=tokyo'
        },
        {
            name: 'New York City, USA',
            description: 'The city that never sleeps, full of iconic landmarks',
            image: 'https://source.unsplash.com/100x100/?new-york',
            url: 'destination-detail.html?destination=new-york'
        },
        {
            name: 'Rome, Italy',
            description: 'Historic city with ancient ruins, art, and delicious cuisine',
            image: 'https://source.unsplash.com/100x100/?rome',
            url: 'destination-detail.html?destination=rome'
        },
        {
            name: 'Machu Picchu, Peru',
            description: 'Ancient Incan citadel set against a backdrop of mountains',
            image: 'https://source.unsplash.com/100x100/?machu-picchu',
            url: 'destination-detail.html?destination=machu-picchu'
        },
        {
            name: 'Dubai, UAE',
            description: 'Futuristic skyline, luxury shopping, and desert adventures',
            image: 'https://source.unsplash.com/100x100/?dubai',
            url: 'destination-detail.html?destination=dubai'
        }
    ];
    
    // Search on button click
    searchBtn.addEventListener('click', performSearch);
    
    // Search on enter key
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#search-results') && !event.target.closest('#destination-search') && !event.target.closest('#search-btn')) {
            searchResults.style.display = 'none';
        }
    });
    
    // Live search as user types (with debounce)
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300);
    });
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // Filter destinations based on search query
        const filteredDestinations = destinations.filter(destination => {
            return destination.name.toLowerCase().includes(query) || 
                   destination.description.toLowerCase().includes(query);
        });
        
        // Display results
        if (filteredDestinations.length > 0) {
            filteredDestinations.forEach(destination => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${destination.image}" alt="${destination.name}">
                    <div class="result-info">
                        <h4>${destination.name}</h4>
                        <p>${destination.description}</p>
                    </div>
                `;
                
                // Navigate to destination page when clicking on a result
                resultItem.addEventListener('click', function() {
                    window.location.href = destination.url;
                });
                
                searchResults.appendChild(resultItem);
            });
            
            searchResults.style.display = 'block';
        } else {
            // No results found
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.innerHTML = `
                <div class="result-info">
                    <h4>No destinations found</h4>
                    <p>Try a different search term</p>
                </div>
            `;
            searchResults.appendChild(noResults);
            searchResults.style.display = 'block';
        }
    }
}
