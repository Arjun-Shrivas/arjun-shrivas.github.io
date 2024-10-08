// // Example: Basic form validation
// document.querySelector('form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form from submitting
  
//     let name = document.querySelector('#name').value;
//     let email = document.querySelector('#email').value;
//     let message = document.querySelector('#message').value;
  
//     if (name === "" || email === "" || message === "") {
//       alert("Please fill in all fields.");
//     } else {
//       alert("Form submitted successfully!");
//       // Here you can send the form data using fetch() or any API
//     }
//   });



  async function fetchMediumBlogs() {
  try {
      //https://v1.nocodeapi.com/arjunshrivas/medium/xgHAYdyAbUMrIMJb
      const response = await fetch('https://v1.nocodeapi.com/arjunshrivas/');
      // Check if the response is okay (status 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
      const blogs = await response.json();

      const blogContainer = document.getElementById('blog-container');
      blogContainer.innerHTML = ''; // Clear previous content

      // Loop through each blog post
      blogs.forEach((item) => {
          const blogCard = document.createElement('div');
          blogCard.className = 'border border-gray-300 rounded-lg shadow-md flex flex-col h-full';
          
          // Extract image from content using regex
          const imgRegex = /<img.*?src="(.*?)"/;
          const imgMatch = item.content.match(imgRegex);
          const blogImageSrc = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/300'; // Fallback image

          const blogImage = document.createElement('img');
          blogImage.src = blogImageSrc;
          blogImage.alt = item.title;
          blogImage.className = 'w-full h-48 object-cover rounded-t-lg'; // Fixed height

          const blogContent = document.createElement('div');
          blogContent.className = 'p-4 flex-grow flex flex-col';

          const blogTitle = document.createElement('h3');
          blogTitle.className = 'font-bold text-xl text-gray-800 mb-2';
          blogTitle.innerText = stripHtml(item.title);

          const blogDescription = document.createElement('p');
          blogDescription.className = 'text-gray-600 description flex-grow overflow-hidden';
          blogDescription.style = 'display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;'; // Limit to 3 lines
          blogDescription.innerText = stripHtml(item.content_encoded); // Use content_encoded for detailed description

          // Create a container for the "Read More" button
          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'flex justify-end mt-4';

          // Link to full blog post
          const blogLink = document.createElement('a');
          blogLink.href = item.link;
          blogLink.target = '_blank'; // Open in new tab
          blogLink.className = 'border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm';
          blogLink.innerText = 'Read More';

          // Append elements to blog card
          buttonContainer.appendChild(blogLink); // Append button to its container
          blogContent.appendChild(blogTitle);
          blogContent.appendChild(blogDescription);
          blogContent.appendChild(buttonContainer); // Append button container to content
          blogCard.appendChild(blogImage);
          blogCard.appendChild(blogContent);
          blogContainer.appendChild(blogCard);
      });
  } catch (error) {
    console.error('Error fetching Medium blogs:', error);
    displayStaticLayout(); // Call function to display static content
  }
}

function displayStaticLayout() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ''; // Clear previous content

    // Create a static layout
    const staticContent = `
       
                     <!--Blog Card 1 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="https://via.placeholder.com/300" alt="Blog Post 1" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Unlocking the Mysteries of Deep Models</h3>
                            <p class="text-gray-600 description">
                                Welcome, fellow data enthusiasts! Today, we are diving deep into the fascinating world of Deep Models, the brainpower behind cutting-edge technologies like image recognition, speech processing, and natural language magic.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="#" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!-- Blog Card 2 --> 
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="https://via.placeholder.com/300" alt="Blog Post 2" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Understanding Customer Patterns Across Brazil</h3>
                            <p class="text-gray-600 description">
                                This repository contains a comprehensive case study analyzing customer patterns across Brazil using BigQuery and SQL. The insights drawn from the analysis aim to inform strategic decisions.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="#" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!--Blog Card 3 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="https://via.placeholder.com/300" alt="Blog Post 3" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Financial Performance Overview: Yearly Breakdown</h3>
                            <p class="text-gray-600 description">
                                This project focuses on tracking and visualizing year-over-year financial metrics to help businesses understand their performance trends and operational efficiency.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="#" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!--Blog Card 4 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="https://via.placeholder.com/300" alt="Blog Post 4" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">NLP Text Classification Techniques</h3>
                            <p class="text-gray-600 description">
                                This project focuses on text classification using NLP techniques to classify news articles into categories like Politics, Technology, Sports, Business, and Entertainment.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="#" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!-- Blog Card 5 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="https://via.placeholder.com/300" alt="Blog Post 5" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Credit Risk Modeling Explained</h3>
                            <p class="text-gray-600 description">
                                Credit scoring models evaluate an individual profile by analyzing factors like payment history, accounts, and financial information to create a credit score.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="#" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
             
    `;

    blogContainer.innerHTML = staticContent; // Insert static content
}


// Call the function to fetch blogs once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchMediumBlogs);

function stripHtml(html) {
  const tempDiv = document.createElement('div'); // Create a temporary element
  tempDiv.innerHTML = html; // Set its HTML content to the provided string
  return tempDiv.textContent || tempDiv.innerText || ''; // Return the plain text
}


let lastScrollTop = 0;
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        header.style.top = "-80px"; // Hide on scroll down
      } else {
        header.style.top = "0";     // Show on scroll up
      }
      lastScrollTop = scrollTop;
    });

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('JavaScript loaded successfully!'); // This should appear in the console

//     // Your blog fetching and processing code here...
// });


