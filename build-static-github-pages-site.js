const fs = require("fs");
const path = require("path");

const workspace = __dirname;
const sourceAssets = path.join(workspace, "assets");
const output = path.join(workspace, "github-pages-static-site-complete");
const downloadsZip = path.join(process.env.USERPROFILE || "C:\\Users\\figng", "Downloads", "github-pages-static-site-complete.zip");

function ensureInside(parent, child) {
  const parentPath = path.resolve(parent).toLowerCase();
  const childPath = path.resolve(child).toLowerCase();
  if (!childPath.startsWith(parentPath)) {
    throw new Error(`Refusing to write outside workspace: ${child}`);
  }
}

ensureInside(workspace, output);

if (fs.existsSync(output)) {
  fs.rmSync(output, { recursive: true, force: true });
}

fs.mkdirSync(output, { recursive: true });
fs.cpSync(sourceAssets, path.join(output, "assets"), { recursive: true });
fs.mkdirSync(path.join(output, "products"), { recursive: true });
fs.mkdirSync(path.join(output, "collections"), { recursive: true });
fs.mkdirSync(path.join(output, "pages"), { recursive: true });

const products = [
  {
    title: "BPC-157 10mg",
    handle: "bpc-157",
    image: "bpc-157-10mg.png",
    collection: "healing",
    badge: "Healing",
    price: "$49.99",
    summary: "High-purity research peptide supplied for controlled laboratory and analytical workflows.",
    details: "BPC-157 is a synthetic research peptide supplied as lyophilized laboratory material for research-use-only applications. This page is designed for product transparency, storage clarity, and responsible evaluation without human-use claims.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, protect from light", "Use: Laboratory research only"],
    related: ["tb-500", "bacteriostatic-water-10ml", "ghk-cu-50mg"]
  },
  {
    title: "TB-500 10mg",
    handle: "tb-500",
    image: "tb-500-10mg.png",
    collection: "healing",
    badge: "Healing",
    price: "$49.99",
    summary: "Research-grade peptide material for laboratory studies and controlled analytical evaluation.",
    details: "TB-500 is provided for laboratory research, compound identification, and documentation-focused workflows. It is not positioned for human or animal use.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, dry and protected from light", "COA: Available by batch"],
    related: ["bpc-157", "sermorelin", "cjc-1295-10-mg"]
  },
  {
    title: "Retatrutide 10mg",
    handle: "retatrutide-10mg",
    image: "retatrutide-10mg.png",
    collection: "metabolic",
    badge: "Metabolic",
    price: "$89.99",
    summary: "Premium research compound for laboratory, analytical, and research-use-only applications.",
    details: "Retatrutide is supplied for research-use-only settings where purity documentation, responsible handling, and batch transparency are required.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C recommended", "Documentation: COA available"],
    related: ["tirzepatide-10mg", "mots-c-10mg", "tesamoralin-10mg"],
    seoSections: `
      <h2>Retatrutide Research Peptide Canada</h2>
      <p>Retatrutide 10mg is a synthetic research peptide supplied by PeptidesCanada for laboratory, analytical, and research-use-only applications.</p>
      <p>This Retatrutide research compound is commonly referenced in scientific literature involving incretin-related pathway research, peptide receptor studies, compound stability, and analytical peptide characterization.</p>
      <p>PeptidesCanada provides Retatrutide as a laboratory-grade research material for qualified customers looking for reliable research peptide sourcing in Canada.</p>
      <h3>Retatrutide Product Details</h3>
      <ul>
        <li><strong>Product Name:</strong> Retatrutide 10mg</li>
        <li><strong>Category:</strong> Research peptide</li>
        <li><strong>Purity:</strong> >=99% HPLC verified</li>
        <li><strong>Form:</strong> Lyophilized powder</li>
        <li><strong>Grade:</strong> Laboratory research grade</li>
        <li><strong>Storage:</strong> Store at -20C and protect from light</li>
        <li><strong>Intended Use:</strong> Research and laboratory use only</li>
      </ul>
      <h3>Quality, Purity &amp; Documentation</h3>
      <p>PeptidesCanada focuses on research peptide quality, documentation, and responsible product presentation. Retatrutide is offered with attention to product identity, batch consistency, and analytical verification.</p>
      <p>When applicable, product documentation may include HPLC testing information, purity data, and Certificate of Analysis details. Customers looking for documentation can review our <a href="../lab-testing-coa.html">Lab Testing &amp; COA information</a> or contact support with the product name and batch details.</p>
      <h3>Canadian Research Peptide Supplier</h3>
      <p>PeptidesCanada is a Canadian research peptide supplier focused on premium product presentation, clear research-use-only positioning, secure checkout alternatives, and domestic fulfillment.</p>
      <p>Customers ordering Retatrutide from Canada can review our <a href="../shipping.html">shipping policy</a> for fulfillment information.</p>
      <h3>Retatrutide FAQ</h3>
      <p><strong>What is Retatrutide used for in research?</strong><br>Retatrutide is referenced in laboratory research involving peptide receptor pathways, incretin-related research models, analytical characterization, and compound stability.</p>
      <p><strong>Is Retatrutide intended for human use?</strong><br>No. Retatrutide sold by PeptidesCanada is strictly for laboratory and research use only.</p>
    `
  },
  {
    title: "Tirzepatide 10mg",
    handle: "tirzepatide-10mg",
    image: "tirzepatide-10mg.png",
    collection: "metabolic",
    badge: "Metabolic",
    price: "$79.99",
    summary: "Research-use-only peptide material for analytical laboratory environments.",
    details: "Tirzepatide is listed for laboratory research, supplier transparency, and documentation-driven product evaluation. No human-use or therapeutic claims are made.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, protect from light", "Use: Research only"],
    related: ["retatrutide-10mg", "mots-c-10mg", "cjc-1295-10-mg"],
    seoSections: `
      <h2>Tirzepatide Research Peptide Canada</h2>
      <p>Tirzepatide 10mg is a synthetic research peptide supplied by PeptidesCanada for laboratory, analytical, and research-use-only applications.</p>
      <p>This Tirzepatide research compound is commonly referenced in scientific literature involving incretin-related pathway research, peptide receptor studies, analytical characterization, and compound stability.</p>
      <p>PeptidesCanada provides Tirzepatide as a laboratory-grade research material for qualified customers looking for reliable research peptide sourcing in Canada.</p>
      <h3>Tirzepatide Product Details</h3>
      <ul>
        <li><strong>Product Name:</strong> Tirzepatide 10mg</li>
        <li><strong>Category:</strong> Research peptide</li>
        <li><strong>Purity:</strong> >=99% HPLC verified</li>
        <li><strong>Form:</strong> Lyophilized powder</li>
        <li><strong>Grade:</strong> Laboratory research grade</li>
        <li><strong>Storage:</strong> Store at -20C and protect from light</li>
        <li><strong>Intended Use:</strong> Research and laboratory use only</li>
      </ul>
      <h3>Quality, Purity &amp; Documentation</h3>
      <p>PeptidesCanada focuses on research peptide quality, documentation, and responsible product presentation. Tirzepatide is offered with attention to product identity, batch consistency, and analytical verification.</p>
      <p>When applicable, product documentation may include HPLC testing information, purity data, and Certificate of Analysis details. Customers looking for documentation can review our <a href="../lab-testing-coa.html">Lab Testing &amp; COA information</a> or contact support with the product name and batch details.</p>
      <h3>Canadian Research Peptide Supplier</h3>
      <p>PeptidesCanada is a Canadian research peptide supplier focused on premium product presentation, clear research-use-only positioning, secure checkout alternatives, and domestic fulfillment.</p>
      <p>Customers ordering Tirzepatide from Canada can review our <a href="../shipping.html">shipping policy</a> for fulfillment information.</p>
      <h3>Tirzepatide FAQ</h3>
      <p><strong>What is Tirzepatide used for in research?</strong><br>Tirzepatide is referenced in laboratory research involving peptide receptor pathways, incretin-related research models, analytical characterization, and compound stability.</p>
      <p><strong>Is Tirzepatide intended for human use?</strong><br>No. Tirzepatide sold by PeptidesCanada is strictly for laboratory and research use only.</p>
    `
  },
  {
    title: "Tesamoralin 10mg",
    handle: "tesamoralin-10mg",
    image: "tesamorelin-10mg.png",
    collection: "performance",
    badge: "Featured",
    price: "$69.99",
    summary: "Synthetic research peptide supplied for laboratory, analytical, and research-use-only applications.",
    details: "Tesamoralin is supplied for controlled research environments where product identity, purity, and documentation are important. It is presented strictly for laboratory research use.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C recommended", "COA: Available for review"],
    related: ["cjc-1295-10-mg", "ipamoralin-10mg", "sermorelin"],
    seoSections: `
      <h2>Tesamoralin Research Peptide Canada</h2>
      <p>Tesamoralin 10mg is a synthetic research peptide supplied by PeptidesCanada for laboratory, analytical, and research-use-only applications.</p>
      <p>This Tesamoralin research compound is commonly referenced in scientific literature involving peptide receptor pathway research, analytical characterization, structure-related analysis, and compound stability.</p>
      <p>PeptidesCanada provides Tesamoralin as a laboratory-grade research material for qualified customers looking for reliable research peptide sourcing in Canada.</p>
      <h3>Tesamoralin Product Details</h3>
      <ul>
        <li><strong>Product Name:</strong> Tesamoralin 10mg</li>
        <li><strong>Common Search Term:</strong> Tesamorelin research peptide</li>
        <li><strong>Category:</strong> Research peptide</li>
        <li><strong>Purity:</strong> >=99% HPLC verified</li>
        <li><strong>Form:</strong> Lyophilized powder</li>
        <li><strong>Grade:</strong> Laboratory research grade</li>
        <li><strong>Storage:</strong> Store at -20C and protect from light</li>
        <li><strong>Intended Use:</strong> Research and laboratory use only</li>
      </ul>
      <h3>Quality, Purity &amp; Documentation</h3>
      <p>PeptidesCanada focuses on research peptide quality, documentation, and responsible product presentation. Tesamoralin is offered with attention to product identity, batch consistency, and analytical verification.</p>
      <p>When applicable, product documentation may include HPLC testing information, purity data, and Certificate of Analysis details. Customers looking for documentation can review our <a href="../lab-testing-coa.html">Lab Testing &amp; COA information</a> or contact support with the product name and batch details.</p>
      <h3>Canadian Research Peptide Supplier</h3>
      <p>PeptidesCanada is a Canadian research peptide supplier focused on premium product presentation, clear research-use-only positioning, secure checkout alternatives, and domestic fulfillment.</p>
      <p>Customers ordering Tesamoralin from Canada can review our <a href="../shipping.html">shipping policy</a> for fulfillment information.</p>
      <h3>Tesamoralin FAQ</h3>
      <p><strong>What is Tesamoralin used for in research?</strong><br>Tesamoralin is referenced in laboratory research involving peptide receptor pathways, peptide structure, analytical characterization, and compound stability.</p>
      <p><strong>Is Tesamoralin intended for human use?</strong><br>No. Tesamoralin sold by PeptidesCanada is strictly for laboratory and research use only.</p>
    `
  },
  {
    title: "Sermorelin 10mg",
    handle: "sermorelin",
    image: "sermorelin-10mg.png",
    collection: "performance",
    badge: "Performance",
    price: "$59.99",
    summary: "Research peptide material prepared for laboratory handling and documentation-first workflows.",
    details: "Sermorelin is provided as a research-use-only compound for analytical study and controlled laboratory evaluation.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, dry storage", "Use: Laboratory research only"],
    related: ["tesamoralin-10mg", "cjc-1295-10-mg", "ipamoralin-10mg"]
  },
  {
    title: "CJC-1295 10mg",
    handle: "cjc-1295-10-mg",
    image: "cjc-1295-10mg.png",
    collection: "performance",
    badge: "Performance",
    price: "$69.99",
    summary: "Research-use-only peptide for analytical workflows, documentation, and lab evaluation.",
    details: "CJC-1295 is supplied for research laboratories seeking purity transparency, secure fulfillment, and batch-level product documentation.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C recommended", "COA: Available by batch"],
    related: ["tesamoralin-10mg", "ipamoralin-10mg", "sermorelin"]
  },
  {
    title: "Ipamorelin 10mg",
    handle: "ipamoralin-10mg",
    image: "ipamorelin-10mg.png",
    collection: "performance",
    badge: "Performance",
    price: "$59.99",
    summary: "High-purity research peptide supplied for controlled laboratory use only.",
    details: "Ipamorelin is listed for research-use-only workflows. Product information is structured around purity, documentation, storage, and responsible handling.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, protect from light", "Use: Research only"],
    related: ["cjc-1295-10-mg", "tesamoralin-10mg", "sermorelin"]
  },
  {
    title: "MOTS-c 10mg",
    handle: "mots-c-10mg",
    image: "mots-c-10mg.png",
    collection: "metabolic",
    badge: "Metabolic",
    price: "$59.99",
    summary: "Laboratory-grade research peptide for compound evaluation and documentation workflows.",
    details: "MOTS-c is supplied for research contexts requiring responsible handling, storage clarity, and batch transparency.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C recommended", "COA: Available on request"],
    related: ["retatrutide-10mg", "tirzepatide-10mg", "tesamoralin-10mg"]
  },
  {
    title: "GHK-Cu 50mg",
    handle: "ghk-cu-50mg",
    image: "ghk-cu-50mg.png",
    collection: "anti-aging",
    badge: "Research",
    price: "$44.99",
    summary: "Copper-binding research peptide supplied for laboratory and analytical use only.",
    details: "GHK-Cu is a research-use-only material for laboratory studies involving copper peptide characterization and analytical documentation. It is not sold for cosmetic, topical, human, animal, medical, or therapeutic use.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, protect from light", "Use: Laboratory research only"],
    related: ["bpc-157", "tb-500", "bacteriostatic-water-10ml"]
  },
  {
    title: "Bacteriostatic Water 10ml",
    handle: "bacteriostatic-water-10ml",
    image: "bacteriostatic-water-10ml.png",
    collection: "reconstitution",
    badge: "Reconstitution",
    price: "$14.99",
    summary: "Laboratory reconstitution support item for research workflows and handling preparation.",
    details: "Bacteriostatic Water 10ml is listed for research and laboratory preparation contexts only. This item is not offered for injection, human use, animal use, clinical use, or medical use.",
    specs: ["Volume: 10ml", "Use: Laboratory research support", "Storage: Room temperature unless otherwise specified", "Handling: Follow institutional laboratory protocols"],
    related: ["bpc-157", "tb-500", "cjc-1295-10-mg"]
  },
  {
    title: "Selank 10mg",
    handle: "selank-10mg",
    image: "selank-10mg.png",
    collection: "nootropics",
    badge: "Nootropics",
    price: "$54.99",
    summary: "Synthetic research peptide for laboratory studies involving peptide identity and stability.",
    details: "Selank is supplied for analytical and laboratory research purposes only. Product copy avoids human-use, therapeutic, or performance claims while emphasizing documentation and purity.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, protect from light", "Use: Research only"],
    related: ["semax-10mg", "ghk-cu-50mg", "mots-c-10mg"]
  },
  {
    title: "Semax 10mg",
    handle: "semax-10mg",
    image: "semax-10mg.png",
    collection: "nootropics",
    badge: "Nootropics",
    price: "$54.99",
    summary: "Research-use-only peptide material with a documentation-first presentation.",
    details: "Semax is provided for laboratory research contexts where quality control, supplier transparency, and clear storage information matter.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C recommended", "COA: Available by batch"],
    related: ["selank-10mg", "cjc-1295-10-mg", "mots-c-10mg"]
  },
  {
    title: "Melanotan 1 10mg",
    handle: "melanotan-1-10mg",
    image: "melanotan-1-10mg.png",
    collection: "tanning",
    badge: "Research",
    price: "$49.99",
    summary: "Research peptide supplied for laboratory-only analytical evaluation and documentation.",
    details: "Melanotan 1 is supplied strictly for research use. It is not sold for tanning, cosmetic, human, animal, medical, or therapeutic use.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, protect from light", "Use: Laboratory research only"],
    related: ["melanotan-2-10mg", "ghk-cu-50mg", "bacteriostatic-water-10ml"]
  },
  {
    title: "Melanotan 2 10mg",
    handle: "melanotan-2-10mg",
    image: "melanotan-2-10mg.png",
    collection: "tanning",
    badge: "Research",
    price: "$49.99",
    summary: "Laboratory research peptide with clear research-use-only positioning and quality documentation.",
    details: "Melanotan 2 is offered strictly for laboratory research and analytical evaluation. No cosmetic, tanning, human-use, or therapeutic claims are made.",
    specs: ["Purity: >=99% HPLC verified", "Form: Lyophilized powder", "Storage: -20C, dry and protected from light", "COA: Available by batch"],
    related: ["melanotan-1-10mg", "ghk-cu-50mg", "bacteriostatic-water-10ml"]
  },
  {
    title: "Klow Blend 80mg",
    handle: "klow-blend-80mg",
    image: "klow-blend-80mg.png",
    collection: "premium-blend",
    badge: "Premium Blend",
    price: "$99.99",
    summary: "Curated premium research blend for documentation-focused laboratory evaluation.",
    details: "Klow Blend is a research-use-only blend intended for laboratory evaluation, supplier transparency, and controlled analytical workflows.",
    specs: ["Form: Lyophilized powder", "Storage: -20C recommended", "Documentation: Batch information available", "Use: Research only"],
    related: ["glow-blend-70mg", "selank-10mg", "semax-10mg"]
  },
  {
    title: "Glow Blend 70mg",
    handle: "glow-blend-70mg",
    image: "glow-blend-50mg.png",
    collection: "premium-blend",
    badge: "Premium Blend",
    price: "$89.99",
    summary: "Premium research blend positioned for laboratory-only evaluation and documentation.",
    details: "Glow Blend is supplied as a research-use-only blend. The product page focuses on transparency, responsible handling, and quality control rather than human-use claims.",
    specs: ["Form: Lyophilized powder", "Storage: -20C, protect from light", "Documentation: Batch information available", "Use: Research only"],
    related: ["klow-blend-80mg", "ghk-cu-50mg", "bacteriostatic-water-10ml"]
  }
];

const collections = [
  { title: "All Products", handle: "frontpage", image: "view-all-cat.png", description: "Browse the complete PeptidesCanada research catalog in one place.", intro: "A full static catalog of research-use-only products with local product pages and payment instructions." },
  { title: "Performance", handle: "performance", image: "performance-cat.png", description: "Research peptides commonly grouped for performance-oriented laboratory categories.", intro: "Performance category pages are written for research-use-only browsing, quality review, and responsible product comparison." },
  { title: "Metabolic", handle: "metabolic", image: "metabolic-cat.png", description: "Research compounds frequently referenced in metabolic-pathway laboratory contexts.", intro: "Explore metabolic-category research products with clear storage, documentation, and compliance notes." },
  { title: "Tanning", handle: "tanning", image: "tanning-cat.png", description: "Research-use-only compounds listed without cosmetic or human-use claims.", intro: "This collection is written for analytical research context only and avoids tanning, cosmetic, or human-use positioning." },
  { title: "Healing", handle: "healing", image: "healing-cat.png", description: "Research peptides organized for laboratory evaluation and supplier transparency.", intro: "A focused collection for researchers comparing common peptide materials and batch documentation." },
  { title: "Anti-Aging", handle: "anti-aging", image: "anti-aging-cat.png", description: "Research-use-only peptide materials with no cosmetic or therapeutic claims.", intro: "This collection uses careful compliance wording while keeping the browsing experience premium and clear." },
  { title: "Reconstitution", handle: "reconstitution", image: "reconstitution-cat.png", description: "Laboratory support items for research preparation and handling workflows.", intro: "Research support products with clear handling notes and no medical-use positioning." },
  { title: "Nootropics", handle: "nootropics", image: "nootropics-cat.png", description: "Research peptides frequently discussed in neuropeptide pathway studies.", intro: "A research-focused category for documentation, compound identification, and laboratory-only context." },
  { title: "Premium Blend", handle: "premium-blend", image: "premium-blend-cat.png", description: "Curated research blends with a premium documentation-first presentation.", intro: "Premium blends are presented for research-use-only comparison and responsible evaluation." }
];

const pageData = {
  "about": {
    title: "About PeptidesCanada",
    seo: "About PeptidesCanada, a Canadian research peptide supplier focused on purity, documentation, domestic fulfillment, and research-use-only compliance.",
    body: `
      <h1>About PeptidesCanada</h1>
      <p>PeptidesCanada is a Canadian-based supplier focused on providing high-purity research peptides for laboratories, institutions, and independent researchers who demand consistency, reliability, and transparency.</p>
      <p>Our goal is simple: make research-grade peptide materials easier to evaluate and access while keeping quality, documentation, and responsible communication at the center of the experience.</p>
      <h2>Our Commitment to Quality</h2>
      <p>Every product we list is selected with strict quality standards, verified sourcing, and batch-level consistency in mind. Product pages are structured to make storage, purity, documentation, and responsible handling easy to understand.</p>
      <ul>
        <li>Third-party lab testing standards</li>
        <li>99%+ HPLC verified purity where applicable</li>
        <li>Batch-specific Certificate of Analysis support</li>
        <li>Secure handling and professional fulfillment</li>
        <li>Research-use-only product positioning</li>
      </ul>
      <h2>Canadian Fulfillment</h2>
      <p>Orders are prepared with a focus on domestic fulfillment, clear communication, and professional packaging. The static GitHub Pages version of this site uses a manual payment flow instead of a built-in checkout.</p>
      <h2>Important Notice</h2>
      <p><strong>All products are intended strictly for research and laboratory use only.</strong> They are not for human consumption and are not intended to diagnose, treat, cure, or prevent any disease.</p>
    `
  },
  "contact": {
    title: "Contact Us",
    seo: "Contact PeptidesCanada for research product questions, documentation requests, order support, and general inquiries.",
    body: `
      <h1>Contact Us</h1>
      <p>If you have questions regarding products, order instructions, documentation, or general inquiries, contact our support team and include as much detail as possible.</p>
      <div class="contact-panel">
        <div>
          <h2>Customer Support</h2>
          <p>We aim to respond to all inquiries within 24 hours during business days.</p>
          <ul>
            <li>Email support available</li>
            <li>Documentation and COA inquiries welcome</li>
            <li>Professional order assistance</li>
          </ul>
        </div>
        <div class="support-card">
          <span class="eyebrow">Support Email</span>
          <strong>Replace with your support email</strong>
          <p>Before publishing, replace this placeholder with your active customer support email.</p>
        </div>
      </div>
      <h2>Important Notice</h2>
      <p>All products sold by PeptidesCanada are intended strictly for research and laboratory use only. They are not for human consumption and are not intended to diagnose, treat, cure, or prevent any disease.</p>
    `
  },
  "shipping": {
    title: "Shipping Policy",
    seo: "PeptidesCanada shipping policy for domestic Canadian fulfillment, processing times, tracking, and research-use-only order handling.",
    body: `
      <h1>Shipping Policy</h1>
      <p>PeptidesCanada is committed to processing and delivering orders with clear communication, secure packaging, and domestic fulfillment standards.</p>
      <h2>Processing Time</h2>
      <p>Orders are generally prepared within 1 business day after payment confirmation. Processing times may vary during high-volume periods or when additional order verification is required.</p>
      <h2>Delivery and Tracking</h2>
      <p>Tracking information is provided when available. Customers are responsible for entering complete and accurate shipping details before submitting payment.</p>
      <h2>Shipping Issues</h2>
      <p>Carrier delays, address errors, and delivery interruptions may occur outside our control. Contact support with your order details if you need assistance.</p>
      <h2>Research Use Notice</h2>
      <p>All items are shipped as research-use-only materials and are not intended for human consumption, animal use, medical use, or therapeutic use.</p>
    `
  },
  "refund": {
    title: "Refund Policy",
    seo: "PeptidesCanada refund policy explaining final sale terms, damaged or incorrect orders, shipping issues, and research-use-only notices.",
    body: `
      <h1>Refund Policy</h1>
      <p>At PeptidesCanada, we strive to ensure that all orders are processed accurately and delivered in proper condition.</p>
      <h2>All Sales Final</h2>
      <p>Due to the nature of our products, all sales are considered final. We do not accept returns or offer refunds once an order has been processed and shipped.</p>
      <h2>Damaged or Incorrect Orders</h2>
      <p>If you receive a damaged or incorrect item, contact us within 48 hours of delivery. We may request your order number and photos of the damaged or incorrect item.</p>
      <p>Once reviewed, we will determine the appropriate resolution, which may include a replacement or store credit where appropriate.</p>
      <h2>Order Changes and Cancellations</h2>
      <p>Orders cannot be modified or canceled once they have been processed. If you need to make a change, contact us as soon as possible after placing your order.</p>
      <h2>Important Notice</h2>
      <p>All products are intended strictly for research and laboratory use only. They are not for human consumption and are not intended to diagnose, treat, cure, or prevent any disease.</p>
    `
  },
  "privacy": {
    title: "Privacy Policy",
    seo: "Privacy policy for PeptidesCanada covering customer information, website analytics, order communication, and data handling.",
    body: `
      <h1>Privacy Policy</h1>
      <p>This Privacy Policy explains how PeptidesCanada may collect, use, and protect information submitted through this website or through customer support communications.</p>
      <h2>Information We Collect</h2>
      <p>We may collect contact details, order-related details, payment confirmation details, support messages, and basic website analytics data.</p>
      <h2>How Information Is Used</h2>
      <p>Information is used to respond to inquiries, process manual orders, provide documentation support, improve website performance, and maintain responsible customer communication.</p>
      <h2>Data Protection</h2>
      <p>We use reasonable administrative and technical safeguards to protect information. Avoid submitting sensitive payment details through unsecured messages.</p>
      <h2>Third-Party Services</h2>
      <p>GitHub Pages, analytics tools, email providers, or payment providers may process limited information according to their own policies.</p>
    `
  },
  "terms": {
    title: "Terms of Service",
    seo: "Terms of Service for PeptidesCanada, including research-use-only terms, customer responsibility, compliance, and order limitations.",
    body: `
      <h1>Terms of Service</h1>
      <p>These Terms of Service govern your use of the PeptidesCanada website and any order inquiries submitted through this static website.</p>
      <h2>Research Use Only</h2>
      <p>All products are intended strictly for research and laboratory use only. Products are not for human consumption, animal use, medical use, or therapeutic use.</p>
      <h2>Customer Responsibility</h2>
      <p>Customers are responsible for ensuring that purchase, possession, handling, storage, and use comply with all applicable laws, regulations, and institutional requirements.</p>
      <h2>Website Information</h2>
      <p>Information on this website is provided for general research and product documentation purposes only. It is not medical advice and should not be relied upon as such.</p>
      <h2>Orders</h2>
      <p>This static website does not process checkout directly. Payment and order confirmation must be completed manually using the instructions on the payment page.</p>
    `
  },
  "payment": {
    title: "Payment Instructions",
    seo: "Manual payment instructions for PeptidesCanada orders through e-transfer and support confirmation.",
    body: `
      <h1>Payment Instructions</h1>
      <p>This GitHub Pages version does not include Shopify checkout or cart functionality. All order buttons redirect here so customers can follow manual payment instructions.</p>
      <div class="payment-steps">
        <div><span>1</span><strong>Choose products</strong><p>Browse the catalog and note the product names, quantities, and variants you want.</p></div>
        <div><span>2</span><strong>Send order details</strong><p>Email your product list, shipping name, and shipping address to your support email.</p></div>
        <div><span>3</span><strong>Send e-transfer</strong><p>Send payment by e-transfer to <strong>REPLACE_WITH_PAYMENT_EMAIL</strong>.</p></div>
        <div><span>4</span><strong>Wait for confirmation</strong><p>Your order is prepared after payment confirmation and support review.</p></div>
      </div>
      <div class="notice-box">
        <h2>Before Publishing</h2>
        <p>Replace the placeholder payment email and support email with your active business details. Add any required security question instructions if your bank account does not use auto-deposit.</p>
      </div>
      <h2>Important Notice</h2>
      <p>Payments are accepted only for research-use-only products. Products are not for human consumption and are not intended for medical, veterinary, therapeutic, cosmetic, or diagnostic use.</p>
    `
  },
  "research-blog": {
    title: "Research Blog",
    seo: "Educational research blog covering COA verification, HPLC testing, peptide storage, and responsible research-use-only product evaluation.",
    body: `
      <h1>Research Blog</h1>
      <p>Welcome to the PeptidesCanada Research Blog, a research-focused resource for educational content, product documentation guidance, laboratory handling concepts, and supplier transparency within the Canadian research peptide space.</p>
      <p>Our goal is to help researchers, laboratories, institutions, and qualified professionals better understand key topics related to research-use-only peptides, Certificates of Analysis, quality control, storage, sourcing, and responsible product evaluation.</p>
      <h2>Research Topics We Cover</h2>
      <ul>
        <li>How to read a COA for research peptides</li>
        <li>What HPLC testing means for research products</li>
        <li>How to store research peptides properly</li>
        <li>Why batch-level documentation matters</li>
        <li>What makes a trusted Canadian research peptide supplier</li>
      </ul>
      <div class="article-list">
        ${[
          "Best Place to Buy Peptides in Canada",
          "How to Verify a Peptide COA",
          "Trusted Peptide Supplier Canada Guide",
          "Research Peptides Canada Buyer Guide",
          "Peptide Storage Guide for Laboratory Research"
        ].map((title) => `<article><h3>${title}</h3><p>Educational article placeholder for research-use-only content. Replace with your full blog post when publishing.</p></article>`).join("")}
      </div>
      <h2>Important Notice</h2>
      <p><strong>All products referenced on this website are intended strictly for research and laboratory use only.</strong> They are not for human consumption and are not intended to diagnose, treat, cure, or prevent any disease.</p>
    `
  },
  "data-sharing-opt-out": {
    title: "Data Sharing Opt-Out",
    seo: "Data sharing opt-out information for visitors who want to manage privacy preferences and personal information use.",
    body: `
      <h1>Data Sharing Opt-Out</h1>
      <p>This page explains how visitors can request privacy preference changes or opt out of certain data sharing where applicable.</p>
      <h2>How to Submit a Request</h2>
      <p>Contact support with the subject line "Data Sharing Opt-Out" and include the email address associated with your inquiry or order.</p>
      <h2>Limitations</h2>
      <p>Some data may still be retained when required for security, legal, accounting, order support, or compliance purposes.</p>
    `
  },
  "disclaimer": {
    title: "Disclaimer",
    seo: "PeptidesCanada disclaimer covering research-use-only products, no medical advice, customer responsibility, and compliance.",
    body: `
      <h1>Disclaimer</h1>
      <p>The information provided on the PeptidesCanada website is for general informational and research purposes only.</p>
      <h2>No Medical Advice</h2>
      <p>The content on this website is not intended as medical advice and should not be relied upon as such. Nothing on this website is intended to diagnose, treat, cure, or prevent any disease or medical condition.</p>
      <h2>Research Use Only</h2>
      <p>All products are intended strictly for research and laboratory use only. Products are not for human consumption and are not approved for use in humans or animals.</p>
      <h2>Limitation of Liability</h2>
      <p>PeptidesCanada shall not be held liable for misuse, improper handling, or unauthorized use of products. Customers are responsible for proper handling and compliance.</p>
    `
  },
  "lab-testing-coa": {
    title: "Lab Testing and COA",
    seo: "Learn how PeptidesCanada approaches lab testing, HPLC purity verification, COA documentation, and batch-level transparency.",
    body: `
      <h1>Lab Testing and COA</h1>
      <p>Quality documentation is one of the strongest trust signals in research supply. PeptidesCanada focuses on transparent product presentation, batch-level review, and clear Certificate of Analysis support.</p>
      <h2>Certificate of Analysis</h2>
      <p>A COA helps researchers review product identity, purity, testing method, batch information, and analytical details before evaluating a research-use-only material.</p>
      <h2>HPLC Testing</h2>
      <p>High Performance Liquid Chromatography is commonly used to assess purity and support product documentation. Where applicable, product pages reference 99%+ HPLC verified purity.</p>
      <h2>How to Request Documentation</h2>
      <p>Contact support with the product name and batch number if available. Our team can provide documentation guidance based on available product records.</p>
    `
  },
  "faq": {
    title: "FAQ",
    seo: "Frequently asked questions about PeptidesCanada products, COA documentation, shipping, payment, storage, and research-use-only requirements.",
    body: `
      <h1>Frequently Asked Questions</h1>
      <div class="faq-list">
        ${[
          ["Are products for human use?", "No. All products are intended strictly for research and laboratory use only. They are not for human consumption, animal use, medical use, or therapeutic use."],
          ["Do you provide COA documentation?", "COA documentation is available for supported products and batches. Contact support with the product name and batch details."],
          ["How do I place an order on the static site?", "Use the product pages to review items, then follow the manual instructions on the Payment page."],
          ["Do you ship from Canada?", "The site is positioned around Canadian domestic fulfillment. Confirm current shipping details with support before placing an order."],
          ["Can I use these products clinically?", "No. Products are research-use-only materials and are not intended for clinical, diagnostic, therapeutic, cosmetic, human, or animal use."]
        ].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
      </div>
    `
  }
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function prefixFor(kind) {
  return kind === "nested" ? "../" : "./";
}

const SITE_URL = "https://pepcan.vercel.app";

function prefixedPath(prefix, pathname) {
  if (!pathname) return prefix === "../" ? ".." : "./";
  return `${prefix}${pathname}`;
}

function productUrl(product, prefix) {
  return prefixedPath(prefix, `products/${product.handle}`);
}

function collectionUrl(collection, prefix) {
  return prefixedPath(prefix, `collections/${collection.handle}`);
}

function webpAsset(folder, filename) {
  const webp = filename.replace(/\.[^.]+$/, ".webp");
  return fs.existsSync(path.join(sourceAssets, folder, webp)) ? webp : filename;
}

function productImage(product) {
  return webpAsset("products", product.image);
}

function collectionImage(collection) {
  return webpAsset("collections", collection.image);
}

function canonicalUrl(pathname = "") {
  return `${SITE_URL}${pathname ? `/${pathname}` : "/"}`;
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PeptidesCanada",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.svg`,
    sameAs: []
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path || "")
    }))
  };
}

function pageSchemas(crumbs = [], extra = []) {
  return [
    organizationSchema(),
    breadcrumbSchema([{ name: "Home", path: "" }, ...crumbs]),
    ...extra
  ];
}

function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    image: `${SITE_URL}/assets/products/${productImage(product)}`,
    sku: product.handle,
    brand: { "@type": "Brand", name: "PeptidesCanada" },
    category: "Research compounds",
    offers: {
      "@type": "Offer",
      url: canonicalUrl(`products/${product.handle}`),
      priceCurrency: "CAD",
      price: product.price.replace(/[^0-9.]/g, ""),
      availability: "https://schema.org/InStock"
    }
  };
}

function schemaScript(schema) {
  return schema && schema.length
    ? `  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>\n`
    : "";
}

function cleanInlineLinks(html) {
  return html.replace(/\.html\b/g, "");
}

function nav(prefix, active = "") {
  const links = [
    ["Home", prefixedPath(prefix, ""), "home"],
    ["Products", prefixedPath(prefix, "products"), "products"],
    ["Categories", prefixedPath(prefix, "collections"), "collections"],
    ["About", prefixedPath(prefix, "about"), "about"],
    ["Payment", prefixedPath(prefix, "payment"), "payment"]
  ];
  return `
    <header class="site-header">
      <a class="brand" href="${prefixedPath(prefix, "")}" aria-label="PeptidesCanada home">
        <img src="${prefix}assets/logo.svg" alt="PeptidesCanada" width="200" height="60">
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="primary-nav" data-nav>
        ${links.map(([label, href, key]) => {
          const classes = [active === key ? "active" : "", key === "payment" ? "nav-cta" : ""].filter(Boolean).join(" ");
          return `<a class="${classes}" href="${href}">${label}</a>`;
        }).join("")}
      </nav>
    </header>
  `;
}

function footer(prefix) {
  return `
    <footer class="site-footer">
      <div>
        <img src="${prefix}assets/logo.svg" alt="PeptidesCanada" width="180" height="54">
        <p>Premium research peptide catalog built for transparency, documentation, and responsible research-use-only browsing.</p>
      </div>
      <div>
        <h3>Catalog</h3>
        <a href="${prefixedPath(prefix, "products")}">All Products</a>
        <a href="${prefixedPath(prefix, "collections/healing")}">Healing</a>
        <a href="${prefixedPath(prefix, "collections/metabolic")}">Metabolic</a>
        <a href="${prefixedPath(prefix, "collections/nootropics")}">Nootropics</a>
      </div>
      <div>
        <h3>Support</h3>
        <a href="${prefixedPath(prefix, "contact")}">Contact</a>
        <a href="${prefixedPath(prefix, "shipping")}">Shipping Policy</a>
        <a href="${prefixedPath(prefix, "refund")}">Refund Policy</a>
        <a href="${prefixedPath(prefix, "payment")}">Payment</a>
      </div>
      <div>
        <h3>Trust</h3>
        <a href="${prefixedPath(prefix, "lab-testing-coa")}">Lab Testing and COA</a>
        <a href="${prefixedPath(prefix, "disclaimer")}">Disclaimer</a>
        <a href="${prefixedPath(prefix, "privacy")}">Privacy Policy</a>
        <a href="${prefixedPath(prefix, "terms")}">Terms of Service</a>
      </div>
      <p class="footer-bottom">Research use only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.</p>
    </footer>
  `;
}

function layout({ title, description, body, prefix = "./", active = "", className = "", urlPath = "", schema = [] }) {
  const canonical = canonicalUrl(urlPath);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | PeptidesCanada</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)} | PeptidesCanada">
  <meta property="og:description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:url" content="${canonical}">
${schemaScript(schema)}  <link rel="stylesheet" href="${prefix}style.css">
  <script src="${prefix}script.js" defer></script>
</head>
<body class="${className}">
  <div class="topbar">Canada-wide fulfillment | COA support | Research use only</div>
  ${nav(prefix, active)}
  <main>
    ${body}
  </main>
  ${footer(prefix)}
</body>
</html>
`;
}

function productCard(product, prefix) {
  return `
    <article class="product-card" data-product-card data-title="${esc(product.title.toLowerCase())}" data-category="${esc(product.collection)}">
      <a class="product-media" href="${productUrl(product, prefix)}">
        <img src="${prefix}assets/products/${productImage(product)}" alt="${esc(product.title)} research product image" width="700" height="700" loading="lazy" decoding="async">
      </a>
      <div class="product-body">
        <span class="pill">${esc(product.badge)}</span>
        <h3><a href="${productUrl(product, prefix)}">${esc(product.title)}</a></h3>
        <p>${esc(product.summary)}</p>
        <div class="product-meta">
          <strong>${esc(product.price)}</strong>
          <a class="card-order" href="${prefixedPath(prefix, "payment")}?product=${encodeURIComponent(product.title)}">Order</a>
        </div>
      </div>
    </article>
  `;
}

function collectionCard(collection, prefix) {
  const count = products.filter((product) => collection.handle === "frontpage" || product.collection === collection.handle).length;
  return `
    <a class="collection-card" href="${collectionUrl(collection, prefix)}">
      <img src="${prefix}assets/collections/${collectionImage(collection)}" alt="${esc(collection.title)} collection" width="600" height="600" loading="lazy" decoding="async">
      <div>
        <span>${count} ${count === 1 ? "product" : "products"}</span>
        <h3>${esc(collection.title)}</h3>
        <p>${esc(collection.description)}</p>
      </div>
    </a>
  `;
}

function trustBand() {
  return `
    <section class="trust-band">
      ${[
        ["Third-party tested", "Quality documentation and COA support where available."],
        ["Canada-wide shipping", "Fast fulfillment-focused order flow for Canadian researchers."],
        ["Research use only", "Compliance-first wording across every product and policy page."],
        ["Secure checkout", "Clear product-specific payment instructions reduce friction."]
      ].map(([title, text]) => `<div><span></span><strong>${title}</strong><p>${text}</p></div>`).join("")}
    </section>
  `;
}

function write(file, html) {
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html.replace(/[ \t]+$/gm, ""), "utf8");
}

function homepage() {
  const featuredHandles = ["bacteriostatic-water-10ml", "bpc-157", "cjc-1295-10-mg", "retatrutide-10mg"];
  const featured = featuredHandles.map((handle) => products.find((product) => product.handle === handle)).filter(Boolean);
  const spotlight = products.find((product) => product.handle === "bpc-157") || featured[0];
  const heroProduct = products.find((product) => product.handle === "bacteriostatic-water-10ml") || featured[0];
  return layout({
    title: "Premium Research Peptides in Canada",
    description: "Research peptides Canada catalog with quality documentation, Canada-wide shipping, secure ordering, and research-use-only positioning.",
    active: "home",
    urlPath: "",
    schema: pageSchemas(),
    body: `
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">Premium research supply</span>
          <h1>Research peptides, simplified for Canadian labs.</h1>
          <p>Premium research peptides Canada catalog built for clear product discovery, quality documentation, and fast Canada-wide fulfillment.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="./products">Browse Products</a>
            <a class="btn btn-secondary" href="./products">View Research Compounds</a>
          </div>
          <div class="hero-metrics">
            <div><strong>99%+</strong><span>purity standard where listed</span></div>
            <div><strong>CA</strong><span>domestic fulfillment focus</span></div>
            <div><strong>RUO</strong><span>research-use-only positioning</span></div>
          </div>
        </div>
        <div class="hero-product">
          <img src="./assets/products/${productImage(heroProduct)}" alt="Bacteriostatic Water 10ml research product vial" width="700" height="700" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>
      ${trustBand()}
      <section class="section spotlight-section">
        <div class="spotlight-copy">
          <span class="eyebrow">Product spotlight</span>
          <h2>Start with the essentials.</h2>
          <p>Featured products are presented with concise research context, visible pricing, and a direct order path so visitors can evaluate the catalog quickly.</p>
          <div class="spotlight-list">
            <div><strong>Clear pricing</strong><p>No buried product details or hidden order steps.</p></div>
            <div><strong>Documentation-first</strong><p>Quality, storage, and COA language stays close to the call to action.</p></div>
          </div>
        </div>
        ${productCard(spotlight, "./")}
      </section>
      <section class="section">
        <div class="section-heading">
          <span class="eyebrow">Shop by category</span>
          <h2>Research categories customers expect.</h2>
          <a class="text-link" href="./collections">View all categories</a>
        </div>
        <div class="quick-category-grid">
          <a class="quick-category-card" href="./collections/metabolic"><div><span>Fat loss</span><h3>Fat loss research</h3><p>Research compounds commonly grouped in metabolic and body-composition study contexts.</p></div><strong>View category</strong></a>
          <a class="quick-category-card" href="./collections/healing"><div><span>Recovery</span><h3>Recovery research</h3><p>Laboratory materials organized around repair, handling, and recovery pathway research.</p></div><strong>View category</strong></a>
          <a class="quick-category-card" href="./collections/nootropics"><div><span>Cognitive</span><h3>Cognitive research</h3><p>Research peptides frequently referenced in neuropeptide and cognitive pathway studies.</p></div><strong>View category</strong></a>
          <a class="quick-category-card" href="./collections/metabolic"><div><span>Metabolic</span><h3>Metabolic compounds</h3><p>Premium research compounds with clear pricing, documentation, and research-use-only context.</p></div><strong>View category</strong></a>
        </div>
      </section>
      <section class="section">
        <div class="section-heading">
          <span class="eyebrow">Featured products</span>
          <h2>Featured research compounds.</h2>
          <a class="text-link" href="./products">Browse full catalog</a>
        </div>
        <div class="product-grid">
          ${featured.map((product) => productCard(product, "./")).join("")}
        </div>
      </section>
      <section class="section quality-section">
        <div>
          <span class="eyebrow">Quality and support</span>
          <h2>Why choose PeptidesCanada.</h2>
          <p>The store keeps the purchase journey simple while preserving a research and educational tone across product pages, policies, and support content.</p>
        </div>
        <div class="quality-list">
          <div><strong>Quality control</strong><p>Product pages keep purity, storage, and documentation details close to the CTA.</p></div>
          <div><strong>Documentation</strong><p>COA and lab-testing information are easy to find before submitting an order.</p></div>
          <div><strong>Fast shipping</strong><p>Canada-wide fulfillment messaging stays visible throughout the purchase path.</p></div>
          <div><strong>Compliance language</strong><p>Every page avoids therapeutic, cosmetic, and human-use claims.</p></div>
        </div>
      </section>
    `
  });
}

function productsPage() {
  return layout({
    title: "Research Peptides Canada",
    description: "Browse research peptides Canada, peptide supplier Canada categories, and research compounds with clear pricing and research-use-only ordering.",
    active: "products",
    urlPath: "products",
    schema: pageSchemas([{ name: "Shop research products", path: "products" }]),
    body: `
      <section class="page-hero">
        <span class="eyebrow">Research catalog</span>
        <h1>Research peptides Canada catalog</h1>
        <p>Browse research-use-only products by name or category. Each order link opens the manual payment page with the product prefilled.</p>
      </section>
      <section class="catalog-tools">
        <label>
          Search products
          <input type="search" placeholder="Search by product name" data-product-search>
        </label>
        <label>
          Category
          <select data-category-filter>
            <option value="all">All categories</option>
            ${collections.filter((collection) => collection.handle !== "frontpage").map((collection) => `<option value="${collection.handle}">${collection.title}</option>`).join("")}
          </select>
        </label>
      </section>
      <section class="section catalog-section">
        <div class="section-heading">
          <span class="eyebrow">Shop all</span>
          <h2>Available research compounds</h2>
        </div>
        <div class="product-grid" data-product-grid>
          ${products.map((product) => productCard(product, "./")).join("")}
        </div>
      </section>
      <p class="empty-state" data-empty-products hidden>No products match those filters. Try a different search or category.</p>
    `
  });
}

function collectionsIndex() {
  return layout({
    title: "Research Categories",
    description: "Browse PeptidesCanada research peptide categories for recovery, metabolic, cognitive, and premium research compounds.",
    active: "collections",
    prefix: "../",
    urlPath: "collections",
    schema: pageSchemas([{ name: "Categories", path: "collections" }]),
    body: `
      <section class="page-hero">
        <span class="eyebrow">Categories</span>
        <h1>Shop research categories</h1>
        <p>Every category keeps product discovery focused, readable, and research-use-only.</p>
      </section>
      <section class="collection-grid">
        ${collections.map((collection) => collectionCard(collection, "../")).join("")}
      </section>
    `
  });
}

function collectionPage(collection) {
  const items = collection.handle === "frontpage" ? products : products.filter((product) => product.collection === collection.handle);
  return layout({
    title: `${collection.title} Research Category`,
    description: collection.description,
    active: "collections",
    prefix: "../",
    urlPath: `collections/${collection.handle}`,
    schema: pageSchemas([
      { name: "Categories", path: "collections" },
      { name: collection.title, path: `collections/${collection.handle}` }
    ]),
    body: `
      <section class="collection-hero">
        <div>
          <span class="eyebrow">Category</span>
          <h1>${esc(collection.title)}</h1>
          <p>${esc(collection.intro)}</p>
          <a class="btn btn-secondary" href="../products">View full catalog</a>
        </div>
        <img src="../assets/collections/${collectionImage(collection)}" alt="${esc(collection.title)} category artwork" width="600" height="600" loading="eager" decoding="async">
      </section>
      <section class="product-grid">
        ${items.map((product) => productCard(product, "../")).join("")}
      </section>
    `
  });
}

function productPage(product) {
  const collection = collections.find((item) => item.handle === product.collection);
  const related = product.related.map((handle) => products.find((item) => item.handle === handle)).filter(Boolean);
  return layout({
    title: `${product.title} | Research Product`,
    description: `${product.title} research product page with clear pricing, specifications, quality documentation context, shipping support, and research-use-only ordering.`,
    active: "products",
    prefix: "../",
    urlPath: `products/${product.handle}`,
    schema: pageSchemas([
      { name: "Products", path: "products" },
      { name: product.title, path: `products/${product.handle}` }
    ], [productSchema(product)]),
    body: `
      <section class="product-detail">
        <div class="product-gallery">
          <div class="detail-media">
            <img src="../assets/products/${productImage(product)}" alt="${esc(product.title)} product vial" width="700" height="700" loading="eager" decoding="async">
          </div>
          <div class="gallery-thumbs" aria-label="Product gallery">
            <span class="gallery-thumb is-active"><img src="../assets/products/${productImage(product)}" alt="${esc(product.title)} product vial thumbnail"></span>
            <span class="gallery-proof">Lab tested</span>
            <span class="gallery-proof">Research use only</span>
          </div>
        </div>
        <div class="detail-copy">
          <a class="breadcrumb" href="../collections/${collection.handle}">${esc(collection.title)}</a>
          <h1>${esc(product.title)}</h1>
          <p class="lead">${esc(product.summary)}</p>
          <ul class="benefit-list">
            <li>Research-use-only material</li>
            <li>Quality documentation support where available</li>
            <li>Canada-wide fulfillment workflow</li>
          </ul>
          <div class="purchase-panel">
            <div class="price-row"><strong>${esc(product.price)}</strong><span>Manual payment instructions</span></div>
            <div class="conversion-points">
              <span>Lab tested</span>
              <span>Ships from Canada</span>
              <span>Research-use only</span>
            </div>
            <a class="btn btn-primary btn-wide" href="../payment?product=${encodeURIComponent(product.title)}">Start Order Request</a>
            <p class="microcopy">Opens payment instructions with ${esc(product.title)} prefilled for a faster order request.</p>
          </div>
        </div>
      </section>
      <section class="section product-info-section">
        <div class="product-accordion">
          <details open>
            <summary>Description</summary>
            <p>${esc(product.summary)}</p>
          </details>
          <details>
            <summary>Research context</summary>
            <p>${esc(product.details)}</p>
            <p>This information is educational and research-focused only. Products are not for human consumption, clinical use, or cosmetic use.</p>
          </details>
          <details>
            <summary>Storage and specifications</summary>
            <ul class="spec-list">${product.specs.map((spec) => `<li>${esc(spec)}</li>`).join("")}</ul>
          </details>
        </div>
        <aside class="trust-stack" aria-label="Product trust details">
          <div><strong>Lab tested</strong><p>Quality and purity documentation are prioritized wherever batch details are available.</p></div>
          <div><strong>Research use only</strong><p>Product content avoids medical, therapeutic, cosmetic, and human-use claims.</p></div>
          <div><strong>Fast order path</strong><p>The product CTA opens payment instructions with this item already selected.</p></div>
        </aside>
      </section>
      ${product.seoSections ? `
      <section class="section product-copy">
        <div class="copy-panel">
          ${cleanInlineLinks(product.seoSections)}
          <h3>Research Use Notice</h3>
          <p><strong>For research use only.</strong></p>
          <p>${esc(product.title.replace(" 10mg", ""))} is not for human consumption and is not intended for medical, veterinary, therapeutic, diagnostic, cosmetic, or clinical use.</p>
          <p>This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </section>` : ""}
      <section class="section">
        <div class="section-heading">
          <span class="eyebrow">Related products</span>
          <h2>Continue browsing</h2>
        </div>
        <div class="product-grid small-grid">
          ${related.map((item) => productCard(item, "../")).join("")}
        </div>
      </section>
      <div class="mobile-sticky-cta"><div><strong>${esc(product.price)}</strong><span>${esc(product.title)}</span></div><a class="btn btn-primary" href="../payment?product=${encodeURIComponent(product.title)}">Order</a></div>
    `
  });
}

function simplePage(handle, data) {
  const pathName = handle === "about" ? "about" : handle;
  return layout({
    title: data.title,
    description: data.seo,
    active: handle === "about" ? "about" : handle === "payment" ? "payment" : "",
    urlPath: pathName,
    schema: pageSchemas([{ name: data.title, path: pathName }]),
    body: `
      <section class="content-page">
        ${data.body}
      </section>
    `
  });
}

function redirectPage(target, prefix) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting</title>
  <meta http-equiv="refresh" content="0; url=${prefix}${target}">
  <link rel="canonical" href="${prefix}${target}">
</head>
<body>
  <p>Redirecting to <a href="${prefix}${target}">${prefix}${target}</a>.</p>
</body>
</html>
`;
}

function nestedIndexPage(html) {
  return html.replace(/href="\.\."/g, 'href="../.."').replace(/\.\.\//g, "../../");
}

function sitemap() {
  const today = "2026-05-01";
  const paths = [
    "",
    "products",
    "collections",
    "about",
    "contact",
    "payment",
    "shipping",
    "refund",
    "privacy",
    "terms",
    "faq",
    "lab-testing-coa",
    "research-blog",
    "disclaimer",
    "data-sharing-opt-out",
    ...collections.map((collection) => `collections/${collection.handle}`),
    ...products.map((product) => `products/${product.handle}`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((pathname) => `  <url>
    <loc>${canonicalUrl(pathname)}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function vercelConfig() {
  return JSON.stringify({
    cleanUrls: true,
    trailingSlash: false,
    headers: [
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }, null, 2);
}

function css() {
  return `:root {
  --bg: #030407;
  --panel: #0c0f14;
  --panel-2: #141820;
  --line: rgba(255, 255, 255, 0.12);
  --text: #f6f7f9;
  --muted: #a8acb4;
  --soft: #d5d7dc;
  --red: #e00000;
  --red-dark: #9b0000;
  --green: #00d36a;
  --shadow: 0 18px 44px rgba(0, 0, 0, 0.34);
  --radius: 8px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--text);
  background: linear-gradient(180deg, #07080a 0%, var(--bg) 38rem);
  min-height: 100vh;
  font-size: 17px;
}
body.menu-open { overflow: hidden; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
h1,
h2,
h3 {
  overflow-wrap: anywhere;
}

.topbar {
  background: #090a0f;
  color: var(--muted);
  text-align: center;
  padding: 0.65rem 1rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.75rem clamp(1rem, 4vw, 4rem);
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);
}

.brand img { width: 176px; height: auto; }
.primary-nav { display: flex; align-items: center; gap: 1.55rem; }
.primary-nav a {
  color: var(--soft);
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 0;
  border-bottom: 2px solid transparent;
}
.primary-nav a:hover,
.primary-nav a.active { color: var(--text); border-color: var(--red); }
.primary-nav a.nav-cta {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--red);
  border-radius: 6px;
  padding: 0.65rem 0.95rem;
  color: white;
  background: rgba(224, 0, 0, 0.16);
}
.primary-nav a.nav-cta:hover,
.primary-nav a.nav-cta.active {
  background: var(--red);
  border-color: var(--red);
}
.menu-toggle { display: none; }

main { overflow: hidden; }
.hero,
.page-hero,
.collection-hero,
.product-detail,
.section,
.trust-band,
.confidence,
.catalog-tools,
.content-page {
  width: min(1200px, calc(100% - 2rem));
  margin-inline: auto;
}

.hero {
  min-height: 560px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(2.5rem, 6vw, 5.5rem) 0;
}
.hero h1,
.page-hero h1,
.collection-hero h1 {
  margin: 0;
  font-size: 5.4rem;
  line-height: 0.92;
  letter-spacing: 0;
}
.hero p,
.page-hero p,
.collection-hero p,
.lead {
  color: var(--muted);
  font-size: 1.12rem;
  line-height: 1.65;
  max-width: 720px;
}
.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.75rem;
}
.hero-metrics div {
  padding-left: 0.9rem;
  border-left: 1px solid var(--line);
}
.hero-metrics strong {
  display: block;
  color: white;
  font-size: 1.35rem;
  line-height: 1;
}
.hero-metrics span {
  display: block;
  margin-top: 0.4rem;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.4;
}
.hero-product {
  border-radius: var(--radius);
  background: var(--panel);
  border: 1px solid var(--line);
  padding: clamp(1rem, 2vw, 2rem);
  box-shadow: var(--shadow);
}
.hero-product img,
.detail-media img {
  border-radius: var(--radius);
  background: #f7f8fa;
}
.eyebrow {
  display: inline-block;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.hero-actions,
.section-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.btn {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0.9rem 1.35rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid var(--line);
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}
.btn:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.24); }
.btn-primary { background: var(--red); color: white; border-color: var(--red); }
.btn-primary:hover { background: #f00000; }
.btn-secondary { background: rgba(255,255,255,0.06); color: white; }
.btn-wide { width: 100%; margin-top: 1rem; }
.text-link {
  color: white;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.82rem;
}
.text-link:hover { color: var(--red); }

.trust-band {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 0 0 3rem;
}
.trust-band div,
.confidence-grid div,
.product-card,
.collection-card,
.catalog-tools,
.content-page,
.variant-box,
.split-section > div,
.support-card,
.notice-box,
.payment-steps > div {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
.trust-band div { padding: 1.2rem; }
.trust-band span {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 99px;
  background: var(--green);
  margin-bottom: 1rem;
}
.trust-band strong,
.confidence-grid strong { display: block; font-size: 1.05rem; margin-bottom: 0.45rem; }
.trust-band p,
.confidence-grid p { margin: 0; color: var(--muted); line-height: 1.55; }

.section { padding: clamp(3.5rem, 7vw, 6.5rem) 0; }
.section-heading { justify-content: space-between; margin: 0 0 2rem; }
.section-heading h2,
.confidence h2,
.content-page h1 {
  margin: 0;
  font-size: 3.4rem;
  line-height: 1;
}
.collection-grid,
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
.product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.small-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.collection-card {
  display: grid;
  grid-template-columns: 116px 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  min-height: 170px;
}
.collection-card img {
  border-radius: 6px;
  border: 1px solid var(--line);
}
.collection-card span {
  color: var(--muted);
  font-weight: 900;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.collection-card h3,
.product-card h3 {
  margin: 0.35rem 0;
  font-size: 1.08rem;
}
.collection-card p,
.product-card p,
.content-page p,
.content-page li,
.split-section p,
.spec-list li,
.article-list p,
details p {
  color: var(--muted);
  line-height: 1.65;
}
.product-card { overflow: hidden; display: flex; flex-direction: column; }
.product-media {
  display: block;
  margin: 1rem 1rem 0;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: #f7f8fa;
  overflow: hidden;
}
.product-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-body { padding: 1rem; display: flex; flex-direction: column; flex: 1; }
.product-body p { flex: 1; }
.product-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
.product-card {
  transition: transform 160ms ease, border-color 160ms ease;
}
.pill {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.4rem 0.7rem;
  background: rgba(0, 211, 106, 0.12);
  color: #4dff9c;
  border: 1px solid rgba(0, 211, 106, 0.28);
  font-weight: 900;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}
.card-order {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0.65rem 0.9rem;
  color: white;
  background: var(--red);
  border: 1px solid var(--red);
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.card-order:hover { background: #f00000; }
.product-meta strong,
.price-row strong { font-size: 1.5rem; }

.confidence {
  padding: clamp(4rem, 8vw, 7rem) 0;
  text-align: center;
}
.confidence-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  text-align: left;
}
.confidence-grid div { padding: 1.5rem; }
.spotlight-section,
.quality-section {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 2rem;
  align-items: center;
}
.spotlight-copy p,
.quality-section p {
  color: var(--muted);
  line-height: 1.65;
}
.spotlight-copy h2,
.quality-section h2 {
  margin: 0;
  font-size: 3.4rem;
  line-height: 1;
}
.spotlight-list {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.spotlight-list div {
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}
.spotlight-list strong {
  display: block;
  margin-bottom: 0.35rem;
}
.quality-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.quality-list div {
  padding: 1.2rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}
.quality-list strong {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 1.05rem;
}

.quick-category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
.quick-category-card {
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  transition: transform 160ms ease, border-color 160ms ease;
}
.quick-category-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.22);
}
.quick-category-card span {
  color: var(--green);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.quick-category-card h3 {
  margin: 1rem 0 0.55rem;
  font-size: 1.35rem;
}
.quick-category-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.page-hero {
  padding: clamp(4rem, 8vw, 7rem) 0 3rem;
  text-align: center;
}
.page-hero p { margin-inline: auto; }
.catalog-tools {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
}
label {
  display: grid;
  gap: 0.55rem;
  color: var(--muted);
  font-weight: 800;
}
input,
select {
  width: 100%;
  min-height: 48px;
  border-radius: 6px;
  border: 1px solid var(--line);
  background: rgba(0,0,0,0.35);
  color: white;
  padding: 0.85rem 1rem;
  font: inherit;
}
.empty-state {
  width: min(1200px, calc(100% - 2rem));
  margin: 1rem auto 4rem;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--muted);
  background: var(--panel);
  text-align: center;
}

.collection-hero,
.product-detail {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 2rem;
  align-items: center;
  padding: clamp(4rem, 8vw, 7rem) 0 3rem;
}
.collection-hero img {
  border-radius: var(--radius);
  border: 1px solid var(--line);
}
.product-detail {
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  align-items: start;
}
.detail-media {
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}
.product-gallery {
  display: grid;
  gap: 0.75rem;
}
.gallery-thumbs {
  display: grid;
  grid-template-columns: 82px repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
.gallery-thumb,
.gallery-proof {
  min-height: 74px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--panel);
  color: var(--soft);
  font-size: 0.78rem;
  font-weight: 900;
  text-align: center;
}
.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.gallery-thumb.is-active {
  border-color: var(--red);
}
.detail-copy h1 {
  margin: 0 0 1rem;
  font-size: 4.35rem;
  line-height: 0.95;
}
.breadcrumb {
  color: var(--red);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: var(--muted);
}
.purchase-panel {
  margin-top: 1.2rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
}
.purchase-panel .price-row {
  padding-top: 0;
  border-top: 0;
}
.conversion-points {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}
.conversion-points span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  border: 1px solid rgba(0, 211, 106, 0.24);
  border-radius: 6px;
  padding: 0.55rem 0.65rem;
  color: var(--soft);
  background: rgba(0, 211, 106, 0.08);
  font-size: 0.78rem;
  font-weight: 900;
  text-align: center;
}
.microcopy {
  margin: 0.75rem 0 0;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.5;
}
.benefit-list {
  display: grid;
  gap: 0.55rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}
.benefit-list li {
  color: var(--soft);
  line-height: 1.45;
}
.benefit-list li::before {
  content: "";
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-right: 0.55rem;
  border-radius: 999px;
  background: var(--green);
}
.variant-box { margin-top: 1.2rem; padding: 1rem; }
.variant-box h2 { margin-top: 0; }
.variant-grid,
.payment-steps,
.article-list,
.contact-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.variant-grid div,
.article-list article { padding: 1rem; border: 1px solid var(--line); border-radius: 6px; background: rgba(0,0,0,0.25); }
.variant-grid p { color: var(--muted); margin-bottom: 0; }
.split-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.split-section > div { padding: 1.5rem; }
.product-info-section {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 1rem;
  align-items: start;
}
.product-accordion details,
.trust-stack > div {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}
.product-accordion details {
  padding: 0;
  overflow: hidden;
}
.product-accordion summary {
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  list-style: none;
}
.product-accordion summary::-webkit-details-marker { display: none; }
.product-accordion summary::after {
  content: "+";
  color: var(--red);
  font-size: 1.2rem;
}
.product-accordion details[open] summary::after { content: "-"; }
.product-accordion details > p,
.product-accordion details > ul {
  margin: 0;
  padding: 0 1rem 1rem;
}
.trust-stack {
  display: grid;
  gap: 1rem;
}
.trust-stack > div {
  padding: 1.2rem;
}
.trust-stack strong {
  display: block;
  margin-bottom: 0.4rem;
}
.trust-stack p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}
.mobile-sticky-cta {
  display: none;
}
.spec-list { padding-left: 1.2rem; }
.product-copy { padding-top: 0; }
.copy-panel {
  max-width: 950px;
  margin-inline: auto;
  padding: clamp(1.2rem, 4vw, 3rem);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
.copy-panel h2 { margin-top: 0; font-size: 2.6rem; }
.copy-panel h3 { margin-top: 2rem; font-size: 1.35rem; }
.copy-panel a { color: white; border-bottom: 1px solid rgba(224,0,0,0.75); }
.copy-panel a:hover { color: var(--red); }

.content-page {
  max-width: 950px;
  margin-top: clamp(3rem, 7vw, 6rem);
  margin-bottom: clamp(4rem, 8vw, 7rem);
  padding: clamp(1.2rem, 4vw, 3rem);
}
.content-page h2 { margin-top: 2rem; font-size: 1.8rem; }
.content-page ul { padding-left: 1.25rem; }
.support-card,
.notice-box { padding: 1.2rem; }
.payment-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.payment-steps > div { padding: 1.2rem; }
.payment-steps span {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 99px;
  background: var(--red);
  margin-bottom: 1rem;
  font-weight: 900;
}
details {
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: rgba(0,0,0,0.22);
}
summary {
  cursor: pointer;
  font-weight: 900;
}
.site-footer {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 2rem;
  padding: clamp(2rem, 5vw, 4rem);
  background: #020203;
  border-top: 1px solid var(--line);
}
.site-footer p,
.footer-bottom { color: var(--muted); line-height: 1.6; }
.site-footer h3 { margin: 0 0 1rem; }
.site-footer a {
  display: block;
  color: var(--muted);
  margin: 0.55rem 0;
}
.site-footer a:hover { color: white; }
.footer-bottom {
  grid-column: 1 / -1;
  border-top: 1px solid var(--line);
  padding-top: 1.2rem;
  margin: 0;
}

@media (max-width: 980px) {
  .site-header {
    min-height: 68px;
    position: sticky;
  }
  .menu-toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 46px;
    height: 46px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(255,255,255,0.04);
    position: relative;
    z-index: 70;
    cursor: pointer;
  }
  .menu-toggle span {
    display: block;
    width: 23px;
    height: 2px;
    margin-inline: auto;
    background: white;
    transition: transform 160ms ease, opacity 160ms ease;
  }
  body.menu-open .menu-toggle span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  body.menu-open .menu-toggle span:nth-child(2) { opacity: 0; }
  body.menu-open .menu-toggle span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  .primary-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
    padding: 1rem;
    background: rgba(0,0,0,0.96);
    border-bottom: 1px solid var(--line);
    box-shadow: var(--shadow);
    max-height: calc(100vh - 68px);
    overflow-y: auto;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    visibility: hidden;
    transition: opacity 160ms ease, transform 160ms ease, visibility 160ms ease;
  }
  .primary-nav.is-open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    visibility: visible;
  }
  .primary-nav a {
    min-height: 50px;
    display: flex;
    align-items: center;
    padding: 0.65rem 0.2rem;
    border-bottom: 1px solid var(--line);
  }
  .primary-nav a.nav-cta {
    justify-content: center;
    margin-top: 0.35rem;
  }
  .hero h1,
  .page-hero h1,
  .collection-hero h1 { font-size: 3.65rem; }
  .detail-copy h1 { font-size: 3.25rem; }
  .section-heading h2,
  .confidence h2,
  .content-page h1,
  .spotlight-copy h2,
  .quality-section h2 { font-size: 2.65rem; }
  .hero,
  .collection-hero,
  .product-detail,
  .split-section,
  .product-info-section,
  .spotlight-section,
  .quality-section {
    grid-template-columns: 1fr;
  }
  .trust-band,
  .confidence-grid,
  .collection-grid,
  .product-grid,
  .small-grid,
  .quick-category-grid,
  .payment-steps,
  .site-footer {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .catalog-tools { grid-template-columns: 1fr; }
  .hero { min-height: auto; }
  .detail-media {
    max-width: 520px;
    margin-inline: auto;
  }
}

@media (max-width: 620px) {
  body { font-size: 18px; padding-bottom: 86px; }
  .topbar { font-size: 0.68rem; }
  .brand img { width: 148px; }
  .site-header { padding-inline: 1rem; }
  .hero,
  .section,
  .page-hero,
  .collection-hero,
  .product-detail,
  .confidence { width: min(100% - 1.25rem, 1200px); }
  .hero,
  .page-hero,
  .collection-hero,
  .product-detail { padding-top: 2rem; }
  .hero h1,
  .page-hero h1,
  .collection-hero h1,
  .detail-copy h1 { font-size: 2.7rem; line-height: 1; }
  .trust-band,
  .confidence-grid,
  .collection-grid,
  .product-grid,
  .small-grid,
  .hero-metrics,
  .quick-category-grid,
  .quality-list,
  .payment-steps,
  .variant-grid,
  .contact-panel,
  .site-footer {
    grid-template-columns: 1fr;
  }
  .hero-actions,
  .section-heading {
    align-items: stretch;
    flex-direction: column;
  }
  .hero-actions .btn,
  .section-heading .text-link {
    width: 100%;
  }
  .collection-card { grid-template-columns: 88px 1fr; min-height: 140px; }
  .section-heading { align-items: stretch; }
  .price-row { align-items: flex-start; flex-direction: column; }
  .detail-copy { order: -1; }
  .product-detail { gap: 1.25rem; }
  .purchase-panel { padding: 0.9rem; }
  .conversion-points { grid-template-columns: 1fr; }
  .product-meta {
    align-items: stretch;
    flex-direction: column;
  }
  .card-order { width: 100%; }
  .copy-panel h2 { font-size: 2rem; }
  .btn,
  .card-order {
    min-height: 54px;
    font-size: 0.84rem;
  }
  .quick-category-card { min-height: 180px; }
  .gallery-thumbs { grid-template-columns: 76px 1fr; }
  .gallery-proof:last-child { grid-column: 1 / -1; }
  .mobile-sticky-cta {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 80;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: center;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--line);
    background: rgba(3, 4, 7, 0.96);
    backdrop-filter: blur(16px);
  }
  .mobile-sticky-cta strong {
    display: block;
    font-size: 1rem;
  }
  .mobile-sticky-cta span {
    display: block;
    color: var(--muted);
    font-size: 0.78rem;
  }
  .mobile-sticky-cta .btn {
    min-height: 48px;
    padding-inline: 1rem;
  }
}
`;
}

function js() {
  return `(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const desktopNav = window.matchMedia("(min-width: 981px)");

  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }

  function setMenuState(isOpen) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });

    desktopNav.addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  const search = document.querySelector("[data-product-search]");
  const category = document.querySelector("[data-category-filter]");
  const cards = Array.from(document.querySelectorAll("[data-product-card]"));
  const emptyState = document.querySelector("[data-empty-products]");

  function filterCards() {
    const term = search ? search.value.trim().toLowerCase() : "";
    const selected = category ? category.value : "all";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesTerm = !term || card.dataset.title.includes(term);
      const matchesCategory = selected === "all" || card.dataset.category === selected;
      const isVisible = matchesTerm && matchesCategory;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
  }

  if (search) search.addEventListener("input", filterCards);
  if (category) category.addEventListener("change", filterCards);
})();
`;
}

function readme() {
  return `# PeptidesCanada Static GitHub Pages Site

This folder is a complete static website version of the PeptidesCanada catalog.

## Files

- \`index.html\` is at the root for GitHub Pages.
- \`products.html\` lists all products.
- \`products/\` contains individual product pages.
- \`collections/\` contains collection pages.
- \`assets/\` contains local images and the logo.
- \`style.css\` and \`script.js\` power the static design and simple interactions.

## Upload to GitHub Pages

1. Create or open your GitHub repository.
2. Upload the contents of this folder, not the folder itself.
3. Make sure \`index.html\` is directly at the repository root.
4. Go to repository Settings > Pages.
5. Select the branch and root folder, then save.

## Payment Setup

The site does not use Shopify checkout. All order buttons redirect to \`payment.html\`.

Before publishing, edit:

- \`payment.html\` and replace \`REPLACE_WITH_PAYMENT_EMAIL\`.
- \`contact.html\` and replace the support email placeholder.

## Compliance Note

All product copy is written for research-use-only positioning and avoids medical, therapeutic, cosmetic, human-use, or disease claims.
`;
}

write("style.css", css());
write("script.js", js());
write("README.md", readme());
write("index.html", homepage());
write("products.html", productsPage());
write("collections/index.html", collectionsIndex());

for (const collection of collections) {
  const html = collectionPage(collection);
  write(`collections/${collection.handle}.html`, html);
  write(`collections/${collection.handle}/index.html`, nestedIndexPage(html));
}

for (const product of products) {
  const html = productPage(product);
  write(`products/${product.handle}.html`, html);
  write(`products/${product.handle}/index.html`, nestedIndexPage(html));
}

// Keep the common Tesamorelin spelling reachable while the visible page uses the
// customer's current product spelling, Tesamoralin.
write("products/tesamorelin-10mg.html", redirectPage("tesamoralin-10mg", "./"));
write("products/tesamorelin-10mg/index.html", redirectPage("products/tesamoralin-10mg", "/"));

const pageAliases = {
  "shipping-policy": "shipping",
  "refund-policy": "refund",
  "privacy-policy": "privacy",
  "terms-of-service": "terms",
  "research-blog": "research-blog",
  "data-sharing-opt-out": "data-sharing-opt-out",
  "about-us": "about",
  "contact": "contact",
  "disclaimer": "disclaimer",
  "lab-testing-coa": "lab-testing-coa",
  "faq": "faq"
};

for (const [handle, data] of Object.entries(pageData)) {
  const file = handle === "about" ? "about.html" : `${handle}.html`;
  write(file, simplePage(handle, data));
}

for (const [oldHandle, target] of Object.entries(pageAliases)) {
  write(`pages/${oldHandle}/index.html`, redirectPage(target, "../../"));
}

write("404.html", layout({
  title: "Page Not Found",
  description: "The requested static page could not be found.",
  body: `
    <section class="page-hero">
      <span class="eyebrow">404</span>
      <h1>Page Not Found</h1>
      <p>The page you requested is not available in this static GitHub Pages build.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="./">Return Home</a>
        <a class="btn btn-secondary" href="./products">Browse Products</a>
      </div>
    </section>
  `
}));

write("sitemap.xml", sitemap());
write("robots.txt", robots());
write("vercel.json", vercelConfig());

console.log(`Generated ${output}`);
console.log(`Suggested zip path: ${downloadsZip}`);
