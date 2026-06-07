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

    const blogCardClass = ‘glass-card flex flex-col h-full overflow-hidden’;
    const readMoreClass = ‘btn-outline-rect text-sm py-1 px-3 font-semibold transition’;

    const staticContent = `
        <div class=”${blogCardClass}”>
            <img src=”./images/deep.jpg” alt=”Blog Post 1” class=”w-full h-48 object-cover rounded-t-2xl”>
            <div class=”p-5 flex flex-col flex-grow”>
                <h3 class=”font-bold text-base text-gray-800 mb-2”>Unlocking the Mysteries of Deep Models: From Neurons to Ninja-Level Networks</h3>
                <p class=”text-gray-500 text-sm line-clamp-3 flex-grow”>Think of Deep Models as a turbo-charged learning system powered by artificial neural networks — each layer helps digest the data to extract deeper meaning, identifying complex patterns like a data Sherlock Holmes.</p>
                <div class=”flex justify-end mt-4”>
                    <a href=”https://medium.com/@arjunshrivas1997/unlocking-the-mysteries-of-deep-models-from-neurons-to-ninja-level-networks-f2f0976363e5” target=”_blank” class=”${readMoreClass}”>Read More</a>
                </div>
            </div>
        </div>

        <div class=”${blogCardClass}”>
            <img src=”./images/datasets.png” alt=”Blog Post 2” class=”w-full h-48 object-cover rounded-t-2xl”>
            <div class=”p-5 flex flex-col flex-grow”>
                <h3 class=”font-bold text-base text-gray-800 mb-2”>Understanding Customer Patterns Across Brazil</h3>
                <p class=”text-gray-500 text-sm line-clamp-3 flex-grow”>Case study on Target’s operations in Brazil using 100,000+ orders from 2016–2018 to uncover insights on customer behavior and operational efficiency.</p>
                <div class=”flex justify-end mt-4”>
                    <a href=”https://medium.com/@arjunshrivas1997/the-delivery-dynamics-understanding-customer-patterns-across-brazil-e205d9437082” target=”_blank” class=”${readMoreClass}”>Read More</a>
                </div>
            </div>
        </div>

        <div class=”${blogCardClass}”>
            <img src=”./images/fintech.jpg” alt=”Blog Post 3” class=”w-full h-48 object-cover rounded-t-2xl”>
            <div class=”p-5 flex flex-col flex-grow”>
                <h3 class=”font-bold text-base text-gray-800 mb-2”>Fintech Revolution: Impact on Traditional Banking</h3>
                <p class=”text-gray-500 text-sm line-clamp-3 flex-grow”>Exploring how technology advancements in the financial industry are reshaping traditional banking, from deposits and loans to transactional services.</p>
                <div class=”flex justify-end mt-4”>
                    <a href=”https://medium.com/@arjunshrivas1997/fintech-revolution-impact-on-traditional-banking-5a39c2a7abca” target=”_blank” class=”${readMoreClass}”>Read More</a>
                </div>
            </div>
        </div>

        <div class=”${blogCardClass}”>
            <img src=”./images/Digital Banking Platform.jpg” alt=”Blog Post 4” class=”w-full h-48 object-cover rounded-t-2xl”>
            <div class=”p-5 flex flex-col flex-grow”>
                <h3 class=”font-bold text-base text-gray-800 mb-2”>Closed Banking vs Open Banking</h3>
                <p class=”text-gray-500 text-sm line-clamp-3 flex-grow”>Key differences between closed and open banking, and how open banking fits into the broader fintech revolution, enabling greater innovation and competition.</p>
                <div class=”flex justify-end mt-4”>
                    <a href=”https://medium.com/@arjunshrivas1997/closed-banking-vs-open-banking-understanding-the-evolution-of-financial-services-bf4a58c5f7a1” target=”_blank” class=”${readMoreClass}”>Read More</a>
                </div>
            </div>
        </div>

        <div class=”${blogCardClass}”>
            <img src=”./images/fintech-bank.jpg” alt=”Blog Post 5” class=”w-full h-48 object-cover rounded-t-2xl”>
            <div class=”p-5 flex flex-col flex-grow”>
                <h3 class=”font-bold text-base text-gray-800 mb-2”>How Open Banking Differs from Fintech</h3>
                <p class=”text-gray-500 text-sm line-clamp-3 flex-grow”>Open banking and fintech are related but distinct — fintech covers all financial tech innovation, while open banking is a specific framework for banks and fintechs to collaborate via shared data.</p>
                <div class=”flex justify-end mt-4”>
                    <a href=”https://medium.com/@arjunshrivas1997/how-open-banking-differs-from-fintech-37375d0a1c35” target=”_blank” class=”${readMoreClass}”>Read More</a>
                </div>
            </div>
        </div>`;
             
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


