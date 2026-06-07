/* Resume PDF generator — ATS-friendly single-column layout using jsPDF */

async function generateResumePDF() {
  // Fetch live data from API so PDF always reflects latest admin changes
  let liveProfile = null;
  try {
    const apiUrl = window.PORTFOLIO_API_URL || 'http://localhost:5000/api/portfolio';
    const res  = await fetch(apiUrl);
    const data = await res.json();
    liveProfile = data.profile;
  } catch (e) {
    console.warn('PDF: could not fetch live profile, using static values');
  }

  const expYears  = liveProfile?.experience_years || '5+';
  const address   = liveProfile?.address   || 'Sector 11, Gurugram, Haryana, India';
  const phone     = liveProfile?.phone     || '+91-9074841166';
  const email     = liveProfile?.email     || 'arjunshrivas1997@gmail.com';
  const linkedin  = liveProfile?.linkedin_url || 'linkedin.com/in/arjun-shrivas-ba45a9146';

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();   // 595.28
  const pageH = doc.internal.pageSize.getHeight();  // 841.89
  const margin = 48;
  const contentW = pageW - margin * 2;
  let y = margin;

  // ── Helpers ────────────────────────────────────────────────────────────────

  function checkPage(needed) {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function setFont(size, style = 'normal', r = 0, g = 0, b = 0) {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(r, g, b);
  }

  function textBlock(text, x, opts = {}) {
    const { size = 10, style = 'normal', r = 60, g = 60, b = 60, indent = 0 } = opts;
    setFont(size, style, r, g, b);
    const lines = doc.splitTextToSize(text, contentW - indent);
    doc.text(lines, x + indent, y);
    y += lines.length * (size * 1.35);
    return lines.length;
  }

  function hRule(weight = 0.6, r = 0, g = 0, b = 0) {
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(weight);
    doc.line(margin, y, pageW - margin, y);
    y += 8;
  }

  function sectionHead(title) {
    checkPage(40);
    y += 6;
    setFont(10.5, 'bold', 0, 0, 0);
    doc.text(title.toUpperCase(), margin, y);
    y += 5;
    hRule(0.7);
  }

  function bullet(text) {
    checkPage(18);
    setFont(10, 'normal', 65, 65, 65);
    const lines = doc.splitTextToSize(text, contentW - 16);
    // Draw bullet dot manually for better ATS text extraction
    doc.text('•', margin + 2, y);
    doc.text(lines, margin + 14, y);
    y += lines.length * 13.5;
  }

  function jobHeader(title, company, dates, location) {
    checkPage(50);
    // Role title (left) + date (right) on same line
    setFont(11, 'bold', 0, 0, 0);
    doc.text(title, margin, y);
    setFont(10, 'normal', 90, 90, 90);
    doc.text(dates, pageW - margin, y, { align: 'right' });
    y += 14;
    setFont(10, 'bold', 30, 30, 30);
    doc.text(company, margin, y);
    setFont(10, 'normal', 100, 100, 100);
    doc.text(location, pageW - margin, y, { align: 'right' });
    y += 14;
  }

  function skillRow(label, value) {
    checkPage(18);
    setFont(10, 'bold', 0, 0, 0);
    const lw = doc.getTextWidth(label + ': ');
    doc.text(label + ': ', margin, y);
    setFont(10, 'normal', 65, 65, 65);
    const lines = doc.splitTextToSize(value, contentW - lw);
    doc.text(lines, margin + lw, y);
    y += lines.length * 13.5;
  }

  // ── HEADER ─────────────────────────────────────────────────────────────────

  setFont(22, 'bold', 0, 0, 0);
  doc.text('ARJUN SHRIVAS', pageW / 2, y, { align: 'center' });
  y += 18;

  setFont(11, 'normal', 50, 50, 50);
  doc.text(`Data Analyst  |  Data Science  |  ${expYears} Experience`, pageW / 2, y, { align: 'center' });
  y += 14;

  setFont(9.5, 'normal', 80, 80, 80);
  const contactLine = `${address}   •   ${phone}   •   ${email}   •   ${linkedin.replace('https://','').replace('http://','')}` ;
  const cLines = doc.splitTextToSize(contactLine, contentW);
  doc.text(cLines, pageW / 2, y, { align: 'center' });
  y += cLines.length * 13 + 4;

  hRule(0.8);

  // ── PROFESSIONAL SUMMARY ────────────────────────────────────────────────────

  sectionHead('Professional Summary');
  textBlock(
    `Results-driven Data Analyst with ${expYears} years of experience delivering actionable insights in fintech and e-commerce environments. ` +
    'Proficient in Python, SQL, and BI tools (Power BI, Tableau, Looker) with a strong track record of building predictive models, ' +
    'automating data pipelines, and presenting complex findings to stakeholders. Hands-on experience with cloud platforms (Azure, GCP), ' +
    'NLP, and end-to-end model deployment.',
    margin, { size: 10, r: 55, g: 55, b: 55 }
  );

  // ── WORK EXPERIENCE ─────────────────────────────────────────────────────────

  sectionHead('Work Experience');

  jobHeader(
    'Data Analyst',
    'Delixus Software India Pvt. Ltd',
    'Dec 2021 – Feb 2024',
    'Bangalore, Karnataka'
  );
  bullet('Conducted Python-based web scraping to compile competitive pricing data, enabling data-driven decisions across the team.');
  bullet('Performed end-to-end data extraction, cleaning, and transformation using Python and SQL to support reporting and predictive modeling.');
  bullet('Implemented A/B testing frameworks that resulted in a 20% improvement in customer engagement metrics.');
  bullet('Built interactive dashboards in Power BI and Tableau to visualize key performance metrics and trends for stakeholders.');
  bullet('Participated in Agile daily stand-ups, contributing to collaborative environment and on-time project delivery.');
  y += 8;

  jobHeader(
    'Python Backend Developer',
    'Apptech Interactive Services Pvt Ltd',
    'Jul 2020 – Feb 2021',
    'Gwalior, Madhya Pradesh'
  );
  bullet('Automated schema comparison processes, reducing operational time by 95% for real-time reporting workflows.');
  bullet('Designed SQL scripts to ensure seamless integration of new database schemas with minimal downtime.');
  bullet('Enhanced project tracking and visibility through structured documentation and MS Office tooling.');
  bullet('Collaborated with cross-functional teams to deliver robust Python backend solutions for e-commerce applications.');
  y += 8;

  // ── SKILLS ──────────────────────────────────────────────────────────────────

  sectionHead('Skills');

  skillRow('Programming',         'Python, SQL, Java, HTML');
  skillRow('Data Analysis',       'Pandas, NumPy, SciPy, Statistical Analysis, A/B Testing, Web Scraping');
  skillRow('Machine Learning',    'Scikit-learn, TensorFlow, PyTorch, NLP, NLTK, OpenCV, Model Deployment');
  skillRow('BI & Visualization',  'Microsoft Power BI, Tableau, Looker, Matplotlib, Seaborn');
  skillRow('Databases',           'MySQL, PostgreSQL, MongoDB, BigQuery');
  skillRow('Cloud & DevOps',      'Microsoft Azure, Google Cloud Platform (GCP), Docker, Git');
  skillRow('Frameworks',          'Flask, Django, React');
  skillRow('Other Tools',         'JIRA, Postman, Figma, MS Excel, MS Office');

  // ── EDUCATION ────────────────────────────────────────────────────────────────

  sectionHead('Education');

  checkPage(50);
  setFont(11, 'bold', 0, 0, 0);
  doc.text('Post-Graduate Diploma in Big Data Analytics (e-DBDA)', margin, y);
  setFont(10, 'normal', 90, 90, 90);
  doc.text('May 2021 – Oct 2021', pageW - margin, y, { align: 'right' });
  y += 14;
  setFont(10, 'normal', 55, 55, 55);
  doc.text('Center for Development of Advanced Computing (C-DAC)  |  Bangalore, Karnataka', margin, y);
  y += 18;

  checkPage(50);
  setFont(11, 'bold', 0, 0, 0);
  doc.text('Master of Computer Applications (MCA)', margin, y);
  setFont(10, 'normal', 90, 90, 90);
  doc.text('2017 – 2020', pageW - margin, y, { align: 'right' });
  y += 14;
  setFont(10, 'normal', 55, 55, 55);
  doc.text('Maharana Pratap College of Technology  |  Gwalior, Madhya Pradesh  |  CGPA: 7.86', margin, y);
  y += 13;
  setFont(9.5, 'normal', 90, 90, 90);
  doc.text('Relevant Coursework: Data Structures & Algorithms (Python), DBMS (MySQL), Operating Systems, Data Science Fundamentals', margin, y);
  y += 18;

  // ── PROJECTS ─────────────────────────────────────────────────────────────────

  sectionHead('Key Projects');

  const projects = [
    ['Loan Approval Predictive Model', 'Built a machine learning model for LoanTap to automate personal loan underwriting, improving approval accuracy.'],
    ['Credit Risk Modeling',           'Developed credit scoring models using payment history and financial data to assess borrower risk profiles.'],
    ['NLP Text Classification',        'Implemented text classification pipeline using NLP techniques to categorize news articles across multiple topics.'],
    ['Customer Pattern Analysis — Brazil', 'Analyzed 100,000+ e-commerce orders using BigQuery and SQL to surface customer behavioral insights.'],
    ['Financial Performance Dashboard', 'Designed YoY financial metrics dashboard to track business performance trends and operational KPIs.'],
  ];

  projects.forEach(([name, desc]) => {
    checkPage(24);
    setFont(10, 'bold', 0, 0, 0);
    const nw = doc.getTextWidth(name + ': ');
    doc.text(name + ': ', margin + 14, y);
    setFont(10, 'normal', 65, 65, 65);
    doc.text('•', margin + 2, y);
    const dLines = doc.splitTextToSize(desc, contentW - nw - 14);
    doc.text(dLines, margin + 14 + nw, y);
    y += dLines.length * 13.5;
  });

  // ── SAVE ──────────────────────────────────────────────────────────────────────

  doc.save('Arjun_Shrivas_Resume.pdf');
}
