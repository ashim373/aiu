// Event listener for "Create New Post" button
document.getElementById('create-post-btn').addEventListener('click', () => {
    window.location.href = 'editor.html'; // Redirect to editor for creating new posts
  });
  
  // Event listener for "View Blogs" button
  document.getElementById('view-blogs-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to the main blogs page
  });
  
  // Event listener for "Edit Posts" button
  document.getElementById('edit-posts-btn').addEventListener('click', () => {
    displayPostList(); // Show the list of blogs for editing
  });
  
  // Function to display the list of blog posts for editing
  function displayPostList() {
    const postListSection = document.getElementById('post-list');
    const postsContainer = document.getElementById('posts-container');
  
    // Retrieve posts from localStorage
    const posts = JSON.parse(localStorage.getItem('blogs')) || [];
  
    if (posts.length === 0) {
      postsContainer.innerHTML = '<p>No posts available. Create one first!</p>';
    } else {
      postsContainer.innerHTML = ''; // Clear the list before adding posts
      posts.forEach((post, index) => {
        const li = document.createElement('li');
        li.className = 'post-item';
  
        // Create title span
        const titleSpan = document.createElement('span');
        titleSpan.textContent = post.title;
  
        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', () => editPost(index));
  
        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => deletePost(index));
  
        // Append elements to list item
        li.appendChild(titleSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
  
        // Append list item to the container
        postsContainer.appendChild(li);
      });
    }
  
    postListSection.style.display = 'block'; // Show the blog list section
  }
  
  // Function to edit a blog post
  function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('blogs')) || [];
    const postToEdit = posts[index];
  
    if (postToEdit) {
      // Save post index to session storage for editing
      sessionStorage.setItem('editPostIndex', index);
      window.location.href = 'editor.html'; // Redirect to editor
    }
  }
  
  // Function to delete a blog post
  function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('blogs')) || [];
    posts.splice(index, 1); // Remove the selected post
  
    // Save updated posts back to localStorage
    localStorage.setItem('blogs', JSON.stringify(posts));
  
    // Refresh the post list
    displayPostList();
  }
  
