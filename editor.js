// DOM Elements
const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const saveButton = document.getElementById('save-btn');
const backButton = document.getElementById('back-btn');
const charCount = document.getElementById('char-count');

// Track character count for title
titleInput.addEventListener('input', () => {
  const titleLength = titleInput.value.length;
  charCount.textContent = `${titleLength}/100 characters`;
});

// Load post for editing if applicable
const editPostIndex = sessionStorage.getItem('editPostIndex');
if (editPostIndex !== null) {
  const posts = JSON.parse(localStorage.getItem('blogs')) || [];
  const postToEdit = posts[editPostIndex];

  if (postToEdit) {
    titleInput.value = postToEdit.title;
    contentInput.value = postToEdit.content.join('\n');
    charCount.textContent = `${postToEdit.title.length}/100 characters`;
    document.getElementById('editor-title').textContent = 'Edit Post';
  }
}

// Save or update post
saveButton.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim().split('\n').filter(p => p);

  if (!title || !content.length) {
    alert('Title and content are required!');
    return;
  }

  const posts = JSON.parse(localStorage.getItem('blogs')) || [];

  if (editPostIndex !== null) {
    posts[editPostIndex] = { title, content };
    sessionStorage.removeItem('editPostIndex');
  } else {
    posts.push({ title, content, createdAt: new Date().toISOString() });
  }

  localStorage.setItem('blogs', JSON.stringify(posts));
  alert('Post saved!');
  window.location.href = 'dashboard.html';
});

// Back button
backButton.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});
