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
                        <img src="./images/deep.jpg" alt="Blog Post 1" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Unlocking the Mysteries of Deep Models: From Neurons to Ninja-Level Networks</h3>
                            <p class="text-gray-600 description text-ellipsis overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;">Think of Deep Models as a turbo-charged learning system powered by artificial neural networks. Imagine a series of layers, like a multi-decker sandwich, where each layer helps digest the data a bit more to extract meaning. The deeper the sandwich (layers), the better the model can identify complex patterns like a data Sherlock Holmes. The result? Magic — whether it’s turning speech into text or recognizing a cat’s face in a sea of memes.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="https://medium.com/@arjunshrivas1997/unlocking-the-mysteries-of-deep-models-from-neurons-to-ninja-level-networks-f2f0976363e5" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!-- Blog Card 2 --> 
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="./images/datasets.png" alt="Blog Post 2" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Understanding Customer Patterns Across Brazil</h3>
                            <p class="text-gray-600 description text-ellipsis overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;">
                                In the rapidly evolving world of e-commerce, understanding customer behavior and operational efficiency is crucial for retailers. Target, a renowned global brand, aims to provide exceptional customer experiences. This case study explores Target’s operations in Brazil, utilizing data from over 100,000 orders placed between 2016 and 2018 to uncover valuable insights that can inform business strategies and improve customer satisfaction
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="https://medium.com/@arjunshrivas1997/the-delivery-dynamics-understanding-customer-patterns-across-brazil-e205d9437082" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!--Blog Card 3 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="./images/fintech.jpg" alt="Blog Post 3" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Fintech Revolution: Impact on Traditional Banking</h3>
                            <p class="text-gray-600 description text-ellipsis overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;">
                                Any Technology Advancement in the Finanical Industry is Refered to as “Fintech”

                                Banks, as we all know are essential to the Smooth operation of the financial Sector. they collect amount put it and then use it to land it to those who are now need money.Bank Ensure the stability and flow of money in the economy by converting asset and liabilities such as deposits and loans and mortgages and by offering transactional service.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="https://medium.com/@arjunshrivas1997/fintech-revolution-impact-on-traditional-banking-5a39c2a7abca" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!--Blog Card 4 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="./images/Digital Banking Platform.jpg" alt="Blog Post 4" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">Closed Banking vs Open Banking: Understanding the Evolution of Financial Services</h3>
                            <p class="text-gray-600 description text-ellipsis overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;">
                                The financial industry is undergoing a major transformation with the rise of fintech and the introduction of new banking models like open banking. While the traditional closed banking system has long been the cornerstone of financial services, open banking has emerged as a disruptor, allowing for greater innovation and competition. In this blog, we’ll explore the key differences between closed banking and open banking, and how open banking fits into the broader fintech revolution.
                            </p>
                            <div class="flex justify-end mt-4">
                                <a href="https://medium.com/@arjunshrivas1997/closed-banking-vs-open-banking-understanding-the-evolution-of-financial-services-bf4a58c5f7a1" class="border border-blue-600 text-blue-600 py-1 px-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center text-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <!-- Blog Card 5 -->
                    <div class="border border-gray-300 rounded-lg shadow-md card">
                        <img src="./images/fintech-bank.jpg" alt="Blog Post 5" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-4 content">
                            <h3 class="font-bold text-xl text-gray-800 mb-2">How Open Banking Differs from Fintech</h3>
                            <p class="text-gray-600 description text-ellipsis overflow-hidden" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;">
                                It’s important to understand that open banking and fintech are not the same, but they are closely related. Fintech refers to the broader industry of technological innovation in financial services, while open banking is a specific framework that allows banks and fintechs to collaborate by sharing data.
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


