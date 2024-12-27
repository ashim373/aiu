document.getElementById('blog-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Retrieve title and content from form
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
  
    // Split content by new lines and wrap each paragraph in <p> tags
    const paragraphs = content.split('\n').filter(paragraph => paragraph.trim() !== ''); // Ignore empty lines
    const formattedContent = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
  
    // Create a new blog post element
    const postElement = document.createElement('section');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${title}</h2>
      ${formattedContent}
    `;
  
    // Append the new post to the blog container
    document.getElementById('blog-container').prepend(postElement);
  
    // Clear the form fields
    document.getElementById('blog-form').reset();
  });
  