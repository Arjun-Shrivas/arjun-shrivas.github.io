/* ── Medium Blog Fetcher ─────────────────────────────────────── */
async function fetchMediumBlogs() {
  const RSS_API = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arjunshrivas1997';

  try {
    const res  = await fetch(RSS_API);
    const data = await res.json();

    if (data.status !== 'ok' || !data.items || !data.items.length) {
      throw new Error('empty feed');
    }

    const container = document.getElementById('blog-container');
    container.innerHTML = '';

    // Show only 5 — "Read More Blogs" button links to Medium profile for the rest
    data.items.slice(0, 5).forEach(item => {
      const imgMatch  = (item.content || '').match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = item.thumbnail || (imgMatch ? imgMatch[1] : '');
      const desc      = (item.description || '')
                          .replace(/<[^>]*>/g, '')
                          .replace(/\s+/g, ' ')
                          .trim()
                          .slice(0, 200);
      const date      = item.pubDate
                          ? new Date(item.pubDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
                          : '';

      const card = document.createElement('div');
      card.className = 'glass-card flex flex-col h-full overflow-hidden';
      card.style.opacity = '1';   // always visible — no fade dependency

      card.innerHTML =
        (thumbnail
          ? `<img src="${thumbnail}" alt="" style="width:100%;height:180px;object-fit:cover;border-radius:16px 16px 0 0" onerror="this.style.display='none'">`
          : `<div style="height:180px;background:linear-gradient(135deg,#EEF2FF,#F0FDFF);border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:center;font-size:2.5rem">&#128196;</div>`) +
        `<div style="padding:1.25rem;display:flex;flex-direction:column;flex:1;gap:6px">
          <span style="font-size:0.7rem;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.06em">${date}</span>
          <h3 style="font-weight:700;font-size:0.9rem;color:#1e293b;line-height:1.45;margin:0">${item.title}</h3>
          <p style="color:#64748b;font-size:0.82rem;flex:1;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3">${desc}</p>
          <div style="text-align:right;margin-top:8px">
            <a href="${item.link}" target="_blank" rel="noopener"
               style="display:inline-block;border:2px solid var(--primary);color:var(--primary);border-radius:8px;padding:4px 14px;font-size:0.8rem;font-weight:700;text-decoration:none;transition:all .25s"
               onmouseover="this.style.background='var(--primary)';this.style.color='#fff'"
               onmouseout="this.style.background='';this.style.color='var(--primary)'">
              Read More
            </a>
          </div>
        </div>`;

      container.appendChild(card);
    });

  } catch (err) {
    console.warn('Medium RSS failed, using static fallback:', err.message);
    displayStaticBlogs();
  }
}

/* ── Static fallback blogs ───────────────────────────────────── */
function displayStaticBlogs() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const blogs = [
    {
      img:   './images/deep.jpg',
      title: 'Unlocking the Mysteries of Deep Models: From Neurons to Ninja-Level Networks',
      desc:  'Deep Models are a turbo-charged learning system powered by artificial neural networks — each layer extracts deeper meaning, identifying complex patterns like a data Sherlock Holmes.',
      link:  'https://medium.com/@arjunshrivas1997/unlocking-the-mysteries-of-deep-models-from-neurons-to-ninja-level-networks-f2f0976363e5'
    },
    {
      img:   './images/datasets.png',
      title: 'Understanding Customer Patterns Across Brazil',
      desc:  'Case study on Target\'s operations in Brazil using 100,000+ orders from 2016–2018 to surface customer behavioral insights and inform strategy.',
      link:  'https://medium.com/@arjunshrivas1997/the-delivery-dynamics-understanding-customer-patterns-across-brazil-e205d9437082'
    },
    {
      img:   './images/fintech.jpg',
      title: 'Fintech Revolution: Impact on Traditional Banking',
      desc:  'How technology advancements in the financial industry are reshaping traditional banking, from deposits and loans to transactional services.',
      link:  'https://medium.com/@arjunshrivas1997/fintech-revolution-impact-on-traditional-banking-5a39c2a7abca'
    },
    {
      img:   './images/Digital Banking Platform.jpg',
      title: 'Closed Banking vs Open Banking',
      desc:  'Key differences between closed and open banking, and how open banking fits into the broader fintech revolution.',
      link:  'https://medium.com/@arjunshrivas1997/closed-banking-vs-open-banking-understanding-the-evolution-of-financial-services-bf4a58c5f7a1'
    },
    {
      img:   './images/fintech-bank.jpg',
      title: 'How Open Banking Differs from Fintech',
      desc:  'Open banking and fintech are related but distinct — fintech is all financial tech innovation; open banking is the specific framework enabling banks and fintechs to share data.',
      link:  'https://medium.com/@arjunshrivas1997/how-open-banking-differs-from-fintech-37375d0a1c35'
    }
  ];

  container.innerHTML = blogs.map(b => `
    <div class="glass-card flex flex-col h-full overflow-hidden">
      <img src="${b.img}" alt="${b.title}" style="width:100%;height:180px;object-fit:cover;border-radius:16px 16px 0 0" onerror="this.style.display='none'">
      <div style="padding:1.25rem;display:flex;flex-direction:column;flex:1;gap:6px">
        <h3 style="font-weight:700;font-size:0.9rem;color:#1e293b;line-height:1.45;margin:0">${b.title}</h3>
        <p style="color:#64748b;font-size:0.82rem;flex:1;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3">${b.desc}</p>
        <div style="text-align:right;margin-top:8px">
          <a href="${b.link}" target="_blank" rel="noopener"
             style="display:inline-block;border:2px solid var(--primary);color:var(--primary);border-radius:8px;padding:4px 14px;font-size:0.8rem;font-weight:700;text-decoration:none;transition:all .25s"
             onmouseover="this.style.background='var(--primary)';this.style.color='#fff'"
             onmouseout="this.style.background='';this.style.color='var(--primary)'">
            Read More
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── Navbar hide/show on scroll ──────────────────────────────── */
(function () {
  let lastY = 0;
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.style.top = y > lastY ? '-80px' : '0';
    lastY = y;
  });
})();

/* ── Boot ────────────────────────────────────────────────────── */
// scripts load with defer — DOM is ready, call directly
fetchMediumBlogs();
