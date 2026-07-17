// Fetch and display recent Substack posts
async function loadSubstackFeed() {
    const container = document.getElementById('substack-feed');
    const feedUrl = 'https://anwitadpillai.substack.com/feed';

    try {
        // Use a CORS proxy to fetch the RSS feed
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();

        if (data.status === 'ok') {
            // Get the 5 most recent posts
            const posts = data.items.slice(0, 5);

            let html = '<ul class="ledger-list substack-list">';
            posts.forEach(post => {
                // Format the date
                const date = new Date(post.pubDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });

                html += `
                    <li>
                        <span class="ledger-title"><a href="${post.link}" target="_blank" style="color: var(--text-primary); text-decoration: none; transition: color 0.2s ease;">${post.title}</a></span>
                        <span class="ledger-award">${formattedDate}</span>
                    </li>
                `;
            });
            html += '</ul>';
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Unable to load recent essays.</p>';
        }
    } catch (error) {
        console.error('Error loading Substack feed:', error);
        container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Unable to load recent essays.</p>';
    }
}

// Load the feed when the page loads
document.addEventListener('DOMContentLoaded', loadSubstackFeed);
