document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display posts
    fetchPosts();

    // Handle form submission
    const postForm = document.getElementById('postForm');
    postForm.addEventListener('submit', handleFormSubmit);
});

async function fetchPosts() {
    const postsSection = document.getElementById('posts');
    
    try {
        const response = await fetch('http://localhost:1234/api/blog/getAll');
        const posts = await response.json();

        postsSection.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `;
            postsSection.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        // Create new post
        const response = await fetch('http://localhost:1234/api/blog/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            fetchPosts();
        } else {
            console.error('Error creating post:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating post:', error.message);
    }
}
