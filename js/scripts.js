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
  const MEDIUM_USERNAME = 'arjunshrivas1997';
  // rss2json converts Medium's RSS feed into clean JSON — free, no API key needed
  // Free tier — returns latest posts (no count param needed, default is enough)
  const RSS_API = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

  try {
    const response = await fetch(RSS_API);
    if (!response.ok) throw new Error('RSS fetch failed');

    const data = await response.json();
    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      throw new Error('No items in feed');
    }

    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';

    data.items.forEach(item => {
      // Extract first image from content
      const imgMatch = item.content && item.content.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = item.thumbnail || (imgMatch ? imgMatch[1] : null);

      // Clean description — strip HTML, limit to 3 lines
      const plainDesc = stripHtml(item.description || item.content || '').slice(0, 220);

      // Format publish date
      const date = item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

      // Build card
      const card = document.createElement('div');
      card.className = 'glass-card flex flex-col h-full overflow-hidden fade-up visible';

      card.innerHTML = `
        ${thumbnail
          ? `<img src="${thumbnail}" alt="${item.title}" class="w-full rounded-t-2xl object-cover" style="height:180px" onerror="this.style.display='none'">`
          : `<div style="height:180px;background:linear-gradient(135deg,#EEF2FF,#F0FDFF);border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:center;font-size:2rem;">📝</div>`
        }
        <div class="p-5 flex flex-col flex-grow">
          ${date ? `<span style="font-size:0.72rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.05em">${date}</span>` : ''}
          <h3 class="font-bold text-base text-gray-800 mt-1 mb-2" style="line-height:1.4">${item.title}</h3>
          <p class="text-gray-500 text-sm flex-grow" style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden">${plainDesc}…</p>
          <div class="flex justify-end mt-4">
            <a href="${item.link}" target="_blank" class="btn-outline-rect text-sm py-1 px-3 font-semibold transition">Read More</a>
          </div>
        </div>
      `;

      blogContainer.appendChild(card);
    });

    // Trigger fade-in for new cards
    if (typeof fadeObserver !== 'undefined') {
      blogContainer.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
    } else {
      blogContainer.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }

  } catch (error) {
    console.warn('Could not fetch Medium blogs, showing static content:', error.message);
    displayStaticLayout();
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

    blogContainer.innerHTML = staticContent; // Insert static content
}


// scripts.js loads with defer — DOM is already ready, call directly
fetchMediumBlogs();

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


