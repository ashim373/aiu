document.addEventListener('DOMContentLoaded', () => {
    // Quick statistics
    const totalPostsElement = document.getElementById('total-posts');
    const popularPostElement = document.getElementById('popular-post');
    const totalViewsElement = document.getElementById('total-views');
  
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const totalViews = blogs.reduce((acc, blog) => acc + (blog.views || 0), 0);
    const popularPost = blogs.sort((a, b) => (b.views || 0) - (a.views || 0))[0];
  
    totalPostsElement.textContent = blogs.length;
    totalViewsElement.textContent = totalViews;
    popularPostElement.textContent = popularPost ? popularPost.title : 'N/A';
  
    // Search functionality
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
  
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm));
      alert(`Found ${filteredBlogs.length} result(s)`);
    });
  
    // Draft management
    const draftList = document.getElementById('draft-list');
    const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
  
    function renderDrafts() {
      draftList.innerHTML = drafts.length
        ? drafts
            .map((draft, index) => `<li>${draft.title} <button onclick="editDraft(${index})">Edit</button> <button onclick="deleteDraft(${index})">Delete</button></li>`)
            .join('')
        : '<li>No drafts yet...</li>';
    }
  
    renderDrafts();
  
    // Edit draft
    window.editDraft = index => {
      const draft = drafts[index];
      localStorage.setItem('editingDraft', JSON.stringify(draft));
      window.location.href = 'create.html'; // Redirect to editor
    };
  
    // Delete draft
    window.deleteDraft = index => {
      drafts.splice(index, 1);
      localStorage.setItem('drafts', JSON.stringify(drafts));
      renderDrafts();
    };
  
    // To-Do List
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    function renderTodos() {
      todoList.innerHTML = todos
        .map((todo, index) => `<li>${todo.text} <button onclick="markDone(${index})">Done</button></li>`)
        .join('');
    }
  
    renderTodos();
  
    addTodoButton.addEventListener('click', () => {
      const todoText = todoInput.value.trim();
      if (!todoText) return alert('Please enter a task!');
      todos.push({ text: todoText });
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
      todoInput.value = '';
    });
  
    window.markDone = index => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };
  
    // Theme toggling
    const toggleThemeButton = document.getElementById('toggle-theme');
    toggleThemeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
  
    // Upload profile picture
    const profilePic = document.getElementById('profile-pic');
    const uploadAvatar = document.getElementById('upload-avatar');
  
    uploadAvatar.addEventListener('change', event => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => (profilePic.src = e.target.result);
        reader.readAsDataURL(file);
      }
    });
  
    // Activity log
    const activityList = document.getElementById('activity-list');
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
  
    function logActivity(activity) {
      activities.push({ activity, timestamp: new Date().toISOString() });
      localStorage.setItem('activities', JSON.stringify(activities));
      renderActivities();
    }
  
    function renderActivities() {
      activityList.innerHTML = activities
        .map(a => `<li>${a.activity} - ${new Date(a.timestamp).toLocaleString()}</li>`)
        .join('');
    }
  
    renderActivities();
  });
  