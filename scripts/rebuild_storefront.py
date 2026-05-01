from __future__ import annotations

import html
import json
import re
import shutil
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOCX_PATH = Path(r"C:\Users\figng\Downloads\description.docx")
BASE_URL = "https://pepcan.vercel.app"


def clean(value: str | None) -> str:
    text = "" if value is None else str(value)
    replacements = {
        "\u2019": "'",
        "\u2018": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u2212": "-",
        "\u00a0": " ",
        "\u2265": ">=",
        "\u2264": "<=",
        "\u00b0C": "C",
        "\u00b0": " degrees ",
        "\u2022": "-",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return re.sub(r"\s+", " ", text).strip()


def esc(value: str | None) -> str:
    return html.escape(clean(value), quote=True)


COLLECTIONS = [
    {
        "handle": "anti-aging",
        "title": "Anti-Aging",
        "label": "Anti-aging research",
        "short": "Longevity and age-related research category.",
        "description": "Research peptides frequently referenced in age-related laboratory pathway studies.",
        "image": "anti-aging-cat.webp",
        "tag": "Anti-aging",
        "icon": "AA",
    },
    {
        "handle": "healing",
        "title": "Healing",
        "label": "Recovery research",
        "short": "Recovery and tissue-support research workflows.",
        "description": "Laboratory materials organized around repair, handling, and recovery pathway research.",
        "image": "healing-cat.webp",
        "tag": "Recovery",
        "icon": "HE",
    },
    {
        "handle": "metabolic",
        "title": "Metabolic",
        "label": "Metabolic compounds",
        "short": "Metabolic and body-composition study contexts.",
        "description": "Premium research compounds with clear pricing, documentation, and research-use-only context.",
        "image": "metabolic-cat.webp",
        "tag": "Metabolic",
        "icon": "ME",
    },
    {
        "handle": "nootropics",
        "title": "Nootropics",
        "label": "Cognitive research",
        "short": "Cognition, focus, and neurological pathway research.",
        "description": "Research peptides frequently referenced in neuropeptide and cognitive pathway studies.",
        "image": "nootropics-cat.webp",
        "tag": "Cognitive",
        "icon": "NO",
    },
    {
        "handle": "performance",
        "title": "Performance",
        "label": "Performance research",
        "short": "Performance, recovery, and training research.",
        "description": "Research peptides commonly grouped for performance-oriented laboratory categories.",
        "image": "performance-cat.webp",
        "tag": "Performance",
        "icon": "PE",
    },
    {
        "handle": "premium-blend",
        "title": "Premium Blend",
        "label": "Premium blends",
        "short": "Curated blends for targeted research protocols.",
        "description": "Curated research blends with clear product identity and responsible research-use-only positioning.",
        "image": "premium-blend-cat.webp",
        "tag": "Blends",
        "icon": "PB",
    },
    {
        "handle": "reconstitution",
        "title": "Reconstitution",
        "label": "Reconstitution support",
        "short": "Research essentials and preparation support.",
        "description": "Research essentials and preparation support for laboratory handling workflows.",
        "image": "reconstitution-cat.webp",
        "tag": "Prep",
        "icon": "RE",
    },
    {
        "handle": "tanning",
        "title": "Tanning",
        "label": "Tanning research",
        "short": "Pigmentation and melanocortin pathway research.",
        "description": "Research-use-only compounds listed without cosmetic or human-use claims.",
        "image": "tanning-cat.webp",
        "tag": "Tanning",
        "icon": "TA",
    },
]
COLLECTION_BY_HANDLE = {item["handle"]: item for item in COLLECTIONS}


PRODUCTS = [
    {
        "title": "Bacteriostatic Water 10ml",
        "handle": "bacteriostatic-water-10ml",
        "image": "bacteriostatic-water-10ml.webp",
        "collection": "reconstitution",
        "price": 14.99,
        "summary": "Laboratory reconstitution support item for research workflows and handling preparation.",
        "purity": "Research support item",
        "form": "10ml vial",
        "storage": "Store at controlled room temperature. Protect from light.",
        "kit": False,
        "sort": 1,
    },
    {
        "title": "BPC-157 10mg",
        "handle": "bpc-157",
        "image": "bpc-157-10mg.webp",
        "collection": "healing",
        "price": 49.99,
        "summary": "High-purity research peptide supplied for controlled laboratory and analytical workflows.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 2,
    },
    {
        "title": "CJC-1295 10mg",
        "handle": "cjc-1295-10-mg",
        "image": "cjc-1295-10mg.webp",
        "collection": "performance",
        "price": 69.99,
        "summary": "Research-use-only peptide for analytical workflows, documentation, and lab evaluation.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 3,
    },
    {
        "title": "Retatrutide 10mg",
        "handle": "retatrutide-10mg",
        "image": "retatrutide-10mg.webp",
        "collection": "metabolic",
        "price": 79.99,
        "summary": "Premium research compound for laboratory, analytical, and research-use-only applications.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 4,
    },
    {
        "title": "Tirzepatide 10mg",
        "handle": "tirzepatide-10mg",
        "image": "tirzepatide-10mg.webp",
        "collection": "metabolic",
        "price": 59.99,
        "summary": "Research-use-only peptide material for analytical laboratory environments.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 5,
    },
    {
        "title": "Tesamorelin 10mg",
        "handle": "tesamorelin-10mg",
        "aliases": ["tesamoralin-10mg"],
        "image": "tesamorelin-10mg.webp",
        "collection": "performance",
        "price": 84.99,
        "summary": "Synthetic research peptide supplied for laboratory, analytical, and research-use-only applications.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 6,
    },
    {
        "title": "Sermorelin 10mg",
        "handle": "sermorelin",
        "image": "sermorelin-10mg.webp",
        "collection": "performance",
        "price": 69.99,
        "summary": "Research peptide material prepared for laboratory handling and documentation-first workflows.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 7,
    },
    {
        "title": "Ipamorelin 10mg",
        "handle": "ipamorelin-10mg",
        "aliases": ["ipamoralin-10mg"],
        "image": "ipamorelin-10mg.webp",
        "collection": "performance",
        "price": 69.99,
        "summary": "High-purity research peptide supplied for controlled laboratory use only.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 8,
    },
    {
        "title": "MOTS-c 10mg",
        "handle": "mots-c-10mg",
        "image": "mots-c-10mg.webp",
        "collection": "metabolic",
        "price": 49.99,
        "summary": "Research peptide supplied for analytical studies involving metabolic-pathway laboratory contexts.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 9,
    },
    {
        "title": "GHK-Cu 50mg",
        "handle": "ghk-cu-50mg",
        "image": "ghk-cu-50mg.webp",
        "collection": "anti-aging",
        "price": 44.99,
        "summary": "Copper-binding research peptide supplied for laboratory and analytical use only.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 10,
    },
    {
        "title": "Selank 10mg",
        "handle": "selank-10mg",
        "image": "selank-10mg.webp",
        "collection": "nootropics",
        "price": 49.99,
        "summary": "Research peptide listed for neuropeptide-pathway laboratory and analytical contexts only.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 11,
    },
    {
        "title": "Semax 10mg",
        "handle": "semax-10mg",
        "image": "semax-10mg.webp",
        "collection": "nootropics",
        "price": 49.99,
        "summary": "Research-use-only peptide material prepared for laboratory documentation workflows.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 12,
    },
    {
        "title": "Melanotan 1 10mg",
        "handle": "melanotan-1-10mg",
        "image": "melanotan-1-10mg.webp",
        "collection": "tanning",
        "price": 54.99,
        "summary": "Research-use-only compound listed for melanocortin pathway laboratory studies.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 13,
    },
    {
        "title": "Melanotan 2 10mg",
        "handle": "melanotan-2-10mg",
        "image": "melanotan-2-10mg.webp",
        "collection": "tanning",
        "price": 54.99,
        "summary": "Research compound supplied with research-use-only positioning and no cosmetic-use claims.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 14,
    },
    {
        "title": "TB-500 10mg",
        "handle": "tb-500",
        "image": "tb-500-10mg.webp",
        "collection": "healing",
        "price": 64.99,
        "summary": "Research-grade peptide material for laboratory studies and controlled analytical evaluation.",
        "purity": ">=99% HPLC verified",
        "form": "Lyophilized powder",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 15,
    },
    {
        "title": "Klow Blend 80mg",
        "handle": "klow-blend-80mg",
        "image": "klow-blend-80mg.webp",
        "collection": "premium-blend",
        "price": 119.99,
        "summary": "Curated research blend for controlled laboratory workflows and documentation-first handling.",
        "purity": "Blend-specific documentation where available",
        "form": "Lyophilized blend",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 16,
    },
    {
        "title": "Glow Blend 50mg",
        "handle": "glow-blend-50mg",
        "aliases": ["glow-blend-70mg"],
        "image": "glow-blend-50mg.webp",
        "collection": "premium-blend",
        "price": 89.99,
        "summary": "Premium research blend listed for laboratory, analytical, and research-use-only applications.",
        "purity": "Blend-specific documentation where available",
        "form": "Lyophilized blend",
        "storage": "Store at -20C. Protect from light.",
        "kit": True,
        "sort": 17,
    },
]

for product in PRODUCTS:
    product["collection_title"] = COLLECTION_BY_HANDLE[product["collection"]]["title"]
    product["kit_price"] = float(int(product["price"] * 7) + 0.99) if product["kit"] else None

PRODUCT_BY_HANDLE = {product["handle"]: product for product in PRODUCTS}


def money(value: float) -> str:
    return f"${value:,.2f}"


def read_docx_paragraphs() -> list[str]:
    if not DOCX_PATH.exists():
        return []
    with zipfile.ZipFile(DOCX_PATH) as zf:
        document = zf.read("word/document.xml")
    root = ET.fromstring(document)
    ns = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    paragraphs: list[str] = []
    for para in root.iter(ns + "p"):
        bits: list[str] = []
        for node in para.iter():
            if node.tag == ns + "t" and node.text:
                bits.append(node.text)
            elif node.tag == ns + "tab":
                bits.append(" ")
        text = clean("".join(bits))
        if text:
            paragraphs.append(text)
    return paragraphs


DOC_HEADINGS = {
    "selank-10mg": "Selank Research Peptide Canada",
    "semax-10mg": "Semax Research Peptide Canada",
    "sermorelin": "Sermorelin Research Peptide Canada",
    "bacteriostatic-water-10ml": "Bacteriostatic Water 10ml Research Use Canada",
    "klow-blend-80mg": "Klow Blend Research Peptide Blend Canada",
    "glow-blend-50mg": "Glow Blend Research Peptide Blend Canada",
    "cjc-1295-10-mg": "CJC-1295 Research Peptide Canada",
    "melanotan-2-10mg": "Melanotan 2 Research Peptide Canada",
    "melanotan-1-10mg": "Melanotan 1 Research Peptide Canada",
    "mots-c-10mg": "MOTS-c Research Peptide Canada",
    "ipamorelin-10mg": "Ipamoralin Research Peptide Canada",
    "ghk-cu-50mg": "GHK-Cu Research Peptide Canada",
    "tb-500": "TB-500 Research Peptide Canada",
    "bpc-157": "BPC-157 Research Peptide Canada",
}

SECTION_HEADINGS = {
    "Product Details",
    "Quality, Purity & Documentation",
    "Canadian Research Peptide Supplier",
    "Canadian Research Reconstitution Supplier",
    "Related Research Categories",
    "Storage & Handling",
    "Frequently Asked Questions",
    "Research Use Notice",
}


def doc_sections() -> dict[str, list[str]]:
    paragraphs = read_docx_paragraphs()
    positions = [(i, p) for i, p in enumerate(paragraphs) if p in set(DOC_HEADINGS.values())]
    sections: dict[str, list[str]] = {}
    for handle, heading in DOC_HEADINGS.items():
        matches = [i for i, value in positions if value == heading]
        if not matches:
            continue
        start = matches[-1] if handle == "bacteriostatic-water-10ml" else matches[0]
        next_starts = [i for i, _ in positions if i > start]
        end = min(next_starts) if next_starts else len(paragraphs)
        sections[handle] = [p for p in paragraphs[start:end] if not p.lower().startswith("aration material")]
    return sections


DOC_SECTIONS = doc_sections()


def linkify(text: str) -> str:
    safe = esc(text)
    if "Lab Testing &amp; COA information" in safe:
        return safe.replace("Lab Testing &amp; COA information", '<a href="/lab-testing-coa">Lab Testing &amp; COA information</a>')
    return safe.replace("Lab Testing &amp; COA", '<a href="/lab-testing-coa">Lab Testing &amp; COA</a>')


def description_html(product: dict) -> str:
    paragraphs = DOC_SECTIONS.get(product["handle"], [])
    if not paragraphs:
        return f"""
          <h2>{esc(product["title"])} Research Product Canada</h2>
          <p>{esc(product["title"])} is supplied by PeptidesCanada for laboratory, analytical, and research-use-only applications. Product content avoids medical, therapeutic, cosmetic, and human-use claims.</p>
          <h3>{esc(product["title"])} Product Details</h3>
          <ul>
            <li><strong>Product Name:</strong> {esc(product["title"])}</li>
            <li><strong>Category:</strong> {esc(product["collection_title"])} research category</li>
            <li><strong>Purity:</strong> {esc(product["purity"])}</li>
            <li><strong>Form:</strong> {esc(product["form"])}</li>
            <li><strong>Storage:</strong> {esc(product["storage"])}</li>
            <li><strong>Intended Use:</strong> Research and laboratory use only</li>
          </ul>
          <h3>Quality, Purity &amp; Documentation</h3>
          <p>PeptidesCanada focuses on product identity, batch consistency, responsible presentation, and quality documentation where available. Customers can review <a href="/lab-testing-coa">Lab Testing &amp; COA information</a> or contact support with product and batch details.</p>
          <h3>Research Use Notice</h3>
          <p>This product is intended exclusively for laboratory and research purposes. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.</p>
        """
    parts: list[str] = [f"<h2>{esc(product['title'])} Research Product Canada</h2>"]
    in_list = False
    details_mode = False
    faq_mode = False
    for paragraph in paragraphs[1:]:
        if paragraph in SECTION_HEADINGS or paragraph.endswith("Product Details"):
            if in_list:
                parts.append("</ul>")
                in_list = False
            details_mode = paragraph.endswith("Product Details")
            faq_mode = paragraph == "Frequently Asked Questions"
            heading = paragraph if not paragraph.endswith("Product Details") else f"{product['title']} Product Details"
            parts.append(f"<h3>{esc(heading)}</h3>")
            continue
        if details_mode and ":" in paragraph and len(paragraph) < 190:
            if not in_list:
                parts.append("<ul>")
                in_list = True
            key, value = paragraph.split(":", 1)
            parts.append(f"<li><strong>{esc(key)}:</strong> {linkify(value)}</li>")
            continue
        if faq_mode and "?" in paragraph:
            if in_list:
                parts.append("</ul>")
                in_list = False
            question, answer = paragraph.split("?", 1)
            parts.append(f"<p><strong>{esc(question)}?</strong><br>{linkify(answer)}</p>")
            continue
        if in_list:
            parts.append("</ul>")
            in_list = False
        parts.append(f"<p>{linkify(paragraph)}</p>")
    if in_list:
        parts.append("</ul>")
    return "\n".join(parts)


def icon(name: str) -> str:
    icons = {
        "search": '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4 4"></path></svg>',
        "user": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="8" r="4"></circle></svg>',
        "cart": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h15l-1.5 9h-12z"></path><path d="M6 7 5 3H2"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>',
        "shield": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"></path><path d="m9 12 2 2 4-5"></path></svg>',
        "truck": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h12v10H3z"></path><path d="M15 10h4l2 3v4h-6z"></path><circle cx="7" cy="19" r="2"></circle><circle cx="18" cy="19" r="2"></circle></svg>',
        "bag": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 13H7z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>',
        "doc": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"></path><path d="M14 3v6h5"></path><path d="M10 13h6M10 17h6"></path></svg>',
        "instagram": '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17" cy="7" r="1"></circle></svg>',
        "tiktok": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.2a4.2 4.2 0 1 1-4.2-4.2"></path><path d="M14 5c1.2 2.3 2.8 3.5 5 3.8"></path></svg>',
    }
    return icons[name]


def catalog_json() -> str:
    items = []
    for product in PRODUCTS:
        items.append(
            {
                "handle": product["handle"],
                "aliases": product.get("aliases", []),
                "title": product["title"],
                "price": product["price"],
                "kitPrice": product["kit_price"],
                "kit": product["kit"],
                "image": f"/assets/products/{product['image']}",
                "url": f"/products/{product['handle']}",
                "category": product["collection"],
                "categoryTitle": product["collection_title"],
                "summary": product["summary"],
                "sort": product["sort"],
                "featured": product["sort"] <= 4,
            }
        )
    return json.dumps(items, separators=(",", ":"))


def header(active: str) -> str:
    links = [
        ("HOME", "/", "home"),
        ("SHOP", "/products", "products"),
        ("ABOUT", "/about", "about"),
        ("LAB TESTING", "/lab-testing-coa", "lab"),
        ("BLOG", "/research-blog", "blog"),
        ("FAQ", "/faq", "faq"),
        ("CONTACT", "/contact", "contact"),
    ]
    nav = []
    for label, href, key in links:
        cls = "active" if active == key or (active == "collections" and key == "products") else ""
        if key == "products":
            category_tiles = "".join(
                f'<a class="mega-category" href="/collections/{c["handle"]}"><img src="/assets/collections/{c["image"]}" alt="{esc(c["title"])} collection" width="92" height="92" loading="lazy"><span><em>{len([p for p in PRODUCTS if p["collection"] == c["handle"]])} products</em><strong>{esc(c["title"])}</strong><small>{esc(c["short"])}</small></span></a>'
                for c in COLLECTIONS
            )
            featured_tiles = "".join(
                f'<a class="mega-product" href="/products/{p["handle"]}"><img src="/assets/products/{p["image"]}" alt="{esc(p["title"])} product vial" width="84" height="84" loading="lazy"><span><strong>{esc(p["title"])}</strong><em>{money(p["price"])}</em><small>View product</small></span></a>'
                for p in [PRODUCT_BY_HANDLE["bacteriostatic-water-10ml"], PRODUCT_BY_HANDLE["bpc-157"], PRODUCT_BY_HANDLE["cjc-1295-10-mg"]]
            )
            nav.append(
                f'<div class="nav-dropdown" data-shop-menu><a class="nav-shop-trigger {cls}" href="/products" aria-expanded="false" data-shop-trigger>{label}<span>v</span></a><div class="nav-menu mega-menu"><div class="mega-head"><div><strong>Shop by category</strong><p>Find products based on your research goals and peptide category.</p></div><a href="/products">View full catalog</a></div><div class="mega-category-grid">{category_tiles}</div><div class="mega-products"><div class="mega-products-head"><h3>Featured Products</h3><a href="/products">Browse all</a></div><div class="mega-product-grid">{featured_tiles}</div></div><a class="mega-cta" href="/products">View full catalog -></a></div></div>'
            )
        else:
            nav.append(f'<a class="{cls}" href="{href}">{label}</a>')
    return f"""
  <div class="promo-bar"><div><span>NO CODE NEEDED - APPLIED AUTOMATICALLY</span><span>COMPLIMENTARY SHIPPING ON ORDERS $249.99+ CAD</span><span>NO CODE NEEDED - APPLIED AUTOMATICALLY</span><span>COMPLIMENTARY SHIPPING ON ORDERS $249.99+ CAD</span></div></div>
  <header class="site-header">
    <a class="brand" href="/" aria-label="PeptidesCanada home"><img src="/assets/logo.svg" alt="PeptidesCanada" width="190" height="58" decoding="async"></a>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle><span></span><span></span><span></span></button>
    <nav class="primary-nav" data-nav>{"".join(nav)}</nav>
    <div class="header-actions">
      <button class="icon-btn" type="button" aria-label="Search products" data-search-open>{icon("search")}</button>
      <a class="icon-btn" href="/account" aria-label="Account dashboard">{icon("user")}</a>
      <button class="icon-btn cart-icon" type="button" aria-label="Open cart" data-cart-open>{icon("cart")}<span class="cart-count" data-cart-count>0</span></button>
    </div>
  </header>
"""


def overlays() -> str:
    return """
  <div class="search-backdrop" data-search-close></div>
  <section class="search-panel" data-search-panel aria-label="Product search">
    <div class="search-panel-head"><strong>Search catalog</strong><button type="button" aria-label="Close search" data-search-close>x</button></div>
    <input type="search" placeholder="Search research compounds" data-site-search>
    <div class="search-results" data-site-search-results></div>
  </section>
  <div class="cart-backdrop" data-cart-close></div>
  <aside class="cart-drawer" data-cart-drawer aria-label="Shopping cart">
    <div class="cart-head"><div><span class="eyebrow">Secure cart</span><h2>Your Cart (<span data-cart-title-count>0</span>)</h2></div><button type="button" aria-label="Close cart" data-cart-close>x</button></div>
    <section class="shipping-card"><h3>Complimentary Priority Shipping</h3><p>Unlocked automatically on orders of $249.99+ CAD.</p><p data-shipping-copy>Only $249.99 left for complimentary priority shipping.</p><div class="progress"><span data-shipping-progress></span></div></section>
    <div class="cart-items" data-cart-items></div>
    <section class="cart-recs"><div><h3>Frequently Bought Together</h3><p>Relevant research pairings</p></div><div data-cart-recommendations></div></section>
    <div class="cart-footer"><p class="cart-error" data-cart-error></p><div class="subtotal"><span>Subtotal</span><strong data-cart-subtotal>$0.00 CAD</strong></div><button class="btn btn-primary btn-wide" type="button" data-stripe-checkout>Proceed to Secure Checkout -></button><a class="btn btn-secondary btn-wide" href="/products">View Full Catalog</a></div>
  </aside>
"""


def product_card(product: dict) -> str:
    collection = COLLECTION_BY_HANDLE[product["collection"]]
    return f"""
    <article class="product-card" data-product-card data-title="{esc(product["title"].lower())}" data-category="{esc(product["collection"])}" data-price="{product["price"]:.2f}" data-sort="{product["sort"]}" data-featured="{"true" if product["sort"] <= 4 else "false"}">
      <a class="product-media" href="/products/{product["handle"]}"><img src="/assets/products/{product["image"]}" alt="{esc(product["title"])} research product vial" width="700" height="700" loading="lazy" decoding="async"></a>
      <div class="product-body"><span class="pill">{esc(collection["title"])}</span><h3><a href="/products/{product["handle"]}">{esc(product["title"])}</a></h3><p>{esc(product["summary"])}</p><div class="product-meta"><strong>{money(product["price"])}</strong><button class="card-order" type="button" data-add-to-cart data-handle="{esc(product["handle"])}">Add</button></div></div>
    </article>
"""


def category_card(collection: dict) -> str:
    count = len([p for p in PRODUCTS if p["collection"] == collection["handle"]])
    return f"""
    <a class="category-card" href="/collections/{collection["handle"]}">
      <img src="/assets/collections/{collection["image"]}" alt="{esc(collection["title"])} collection image" width="700" height="520" loading="lazy" decoding="async">
      <span>{count} products</span><h3>{esc(collection["title"])}</h3><p>Browse one of the most relevant product paths for first-time visitors.</p><strong>Explore collection</strong>
    </a>
"""


def compact_category(collection: dict) -> str:
    count = len([p for p in PRODUCTS if p["collection"] == collection["handle"]])
    return f"""
    <a class="category-row-card" href="/collections/{collection["handle"]}">
      <img src="/assets/collections/{collection["image"]}" alt="{esc(collection["title"])} collection image" width="108" height="108" loading="lazy" decoding="async">
      <span><em>{count} products</em><strong>{esc(collection["title"])}</strong><small>{esc(collection["short"])}</small></span>
    </a>
"""


def compact_product(product: dict) -> str:
    return f"""
    <a class="compact-product" href="/products/{product["handle"]}">
      <img src="/assets/products/{product["image"]}" alt="{esc(product["title"])} product vial" width="80" height="80" loading="lazy" decoding="async"><span><strong>{esc(product["title"])}</strong><em>{money(product["price"])}</em><small>View product</small></span>
    </a>
"""


def seo_head(title: str, description: str, canonical: str, robots: str = "index, follow", extra_ld: list | None = None) -> str:
    ld = [{"@context": "https://schema.org", "@type": "Organization", "name": "PeptidesCanada", "url": BASE_URL, "logo": f"{BASE_URL}/assets/logo.svg", "sameAs": ["https://www.instagram.com/peptidescanadaofficial/", "https://www.tiktok.com/@peptidescanada.store"]}]
    if extra_ld:
        ld.extend(extra_ld)
    return f"""  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <meta name="robots" content="{esc(robots)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <link rel="canonical" href="{BASE_URL}{canonical}">
  <meta property="og:url" content="{BASE_URL}{canonical}">
  <meta property="og:image" content="{BASE_URL}/assets/products/bacteriostatic-water-10ml.webp">
  <script type="application/ld+json">{json.dumps(ld, separators=(",", ":"))}</script>
  <link rel="stylesheet" href="/style.css">
  <script>window.PEPCAN_CATALOG={catalog_json()};</script>
  <script src="/script.js" defer></script>"""


def render_document(title: str, description: str, canonical: str, active: str, body: str, robots: str = "index, follow", body_class: str = "", extra_ld: list | None = None) -> str:
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
{seo_head(title, description, canonical, robots, extra_ld)}
</head>
<body class="{esc(body_class)}">
{header(active)}
  <main>
{body}
  </main>
{footer()}
{overlays()}
</body>
</html>
"""


def footer() -> str:
    return f"""
  <footer class="site-footer">
    <div class="footer-inner">
      <section class="footer-brand">
        <img src="/assets/logo.svg" alt="PeptidesCanada" width="190" height="58" decoding="async">
        <p>Canada's trusted source for premium research peptides. Every product is HPLC tested, third-party verified, and shipped fast from within Canada.</p>
        <strong>Premium research peptides with verified purity standards.</strong>
        <div class="social-links">
          <a href="https://www.instagram.com/peptidescanadaofficial/" target="_blank" rel="noopener noreferrer" aria-label="Peptides Canada Instagram">{icon("instagram")}</a>
          <a href="https://www.tiktok.com/@peptidescanada.store" target="_blank" rel="noopener noreferrer" aria-label="Peptides Canada TikTok">{icon("tiktok")}</a>
        </div>
      </section>
      <section><h3>Shop Collections</h3><a href="/products">All Products</a><a href="/collections/anti-aging">Anti-Aging</a><a href="/collections/healing">Healing</a><a href="/collections/metabolic">Metabolic</a><a href="/collections/nootropics">Nootropics</a><a href="/collections/performance">Performance</a><a href="/collections/premium-blend">Premium Blend</a><a href="/collections/reconstitution">Reconstitution</a><a href="/collections/tanning">Tanning</a></section>
      <section><h3>Company Information</h3><a href="/about">About Us</a><a href="/lab-testing-coa">Lab Testing &amp; COA</a><a href="/research-blog">Research Blog</a><a href="/faq">FAQ</a><a href="/contact">Contact</a></section>
      <section><h3>Policies &amp; Compliance</h3><a href="/terms">Terms of Service</a><a href="/privacy">Privacy Policy</a><a href="/refund">Refund Policy</a><a href="/shipping">Shipping Policy</a><a href="/disclaimer">Disclaimer</a></section>
      <section class="footer-notice"><h3>Research Use Notice</h3><p>All products are for research and laboratory use only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease. Buyer confirms products will not be used in violation of any applicable laws.</p></section>
      <div class="footer-bottom"><span>&copy; 2026 Peptides Canada. All rights reserved.</span><span>Secure Payment Methods</span><span class="payment-pills"><em>Visa</em><em>MC</em><em>Amex</em></span></div>
    </div>
  </footer>
"""


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def breadcrumb(items: list[tuple[str, str]]) -> dict:
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": index + 1, "name": name, "item": f"{BASE_URL}{url}"}
            for index, (name, url) in enumerate(items)
        ],
    }


def render_home() -> None:
    featured = [
        PRODUCT_BY_HANDLE["ghk-cu-50mg"],
        PRODUCT_BY_HANDLE["sermorelin"],
        PRODUCT_BY_HANDLE["bpc-157"],
        PRODUCT_BY_HANDLE["bacteriostatic-water-10ml"],
        PRODUCT_BY_HANDLE["cjc-1295-10-mg"],
        PRODUCT_BY_HANDLE["glow-blend-50mg"],
        PRODUCT_BY_HANDLE["ipamorelin-10mg"],
        PRODUCT_BY_HANDLE["klow-blend-80mg"],
        PRODUCT_BY_HANDLE["melanotan-2-10mg"],
        PRODUCT_BY_HANDLE["mots-c-10mg"],
        PRODUCT_BY_HANDLE["selank-10mg"],
    ]
    assurances = [
        ("shield", "Quality controlled", "High-purity inventory handled with consistency-first standards."),
        ("bag", "Trusted purchase experience", "Secure checkout, clear policies, and discreet order handling from cart to delivery."),
        ("truck", "Fast Canadian shipping", "Domestic fulfillment designed to reduce friction at checkout."),
    ]
    confidence = [
        ("shield", "Third-Party Lab Tested", "Verified quality standards for serious research workflows."),
        ("truck", "Fast Canadian Shipping", "Domestic fulfillment designed for faster delivery across Canada."),
        ("bag", "Trusted Purchase Experience", "Stripe Checkout, clear policies, and cart-to-delivery order handling."),
        ("doc", "Research Use Compliance", "Clear product positioning and compliance-forward site experience."),
    ]
    body = f"""
    <section class="hero shopify-hero">
      <div class="hero-copy"><span class="hero-badge"><i></i> Canada's #1 research peptide supplier</span><h1>Premium Research Peptides in Canada</h1><p>HPLC-verified, high-quality peptides with 99%+ purity. Fast domestic shipping across Canada. Trusted by researchers nationwide.</p><div class="hero-tags"><span>99%+ purity standard</span><span>Third-party lab focus</span><span>Domestic Canadian shipping</span></div><div class="hero-actions"><a class="btn btn-primary" href="/products">Shop Now</a><a class="btn btn-secondary" href="/lab-testing-coa">View Lab Testing</a></div><div class="hero-metrics"><span><strong>99%+</strong><em>Purity verified</em></span><span><strong>24h</strong><em>Fast dispatch target</em></span><span><strong>Canada</strong><em>Domestic fulfillment</em></span></div></div>
      <aside class="hero-product-card"><span class="eyebrow">Featured product spotlight</span><div class="hero-product-image"><img src="/assets/products/bacteriostatic-water-10ml.webp" alt="Bacteriostatic Water 10ml vial in a clean laboratory setting" width="900" height="900" loading="eager" decoding="async"></div><div class="hero-product-meta"><span>Recommended starting point</span><h2>Bacteriostatic Water 10ml</h2><div><em>Research use only</em><em>Secure checkout</em></div></div></aside>
    </section>
    <section class="trust-strip assurance-strip">{"".join(f'<article><span>{icon(i)}</span><div><strong>{esc(t)}</strong><p>{esc(d)}</p></div></article>' for i,t,d in assurances)}</section>
    <section class="section category-showcase"><div class="section-heading split-heading"><div><span class="eyebrow">Shop by category</span><h2>Browse research categories</h2></div><a href="/collections">View full catalog</a></div><div class="category-grid image-categories">{"".join(category_card(c) for c in COLLECTIONS[:3])}</div></section>
    <section class="section product-carousel-section"><div class="section-heading split-heading"><div><span class="eyebrow">Featured products</span><h2>Featured research compounds.</h2></div><div class="carousel-actions"><a href="/products">Browse full catalog</a></div></div><div class="product-carousel-frame"><button class="carousel-arrow carousel-arrow-prev" type="button" aria-label="Previous products" data-carousel-prev="home-products">&lsaquo;</button><div class="product-carousel" id="home-products" data-product-carousel>{"".join(product_card(p) for p in featured)}</div><button class="carousel-arrow carousel-arrow-next" type="button" aria-label="Next products" data-carousel-next="home-products">&rsaquo;</button></div></section>
    <section class="section confidence-section"><div class="section-heading centered"><span class="eyebrow">Final confidence check</span><h2>Why Researchers Choose Us</h2></div><div class="confidence-grid">{"".join(f'<article class="confidence-card"><span>{icon(i)}</span><h3>{esc(t)}</h3><p>{esc(d)}</p></article>' for i,t,d in confidence)}</div><form class="updates-card" data-subscribe-form><div><span class="eyebrow">Research updates</span><h2>Join Our Research Updates</h2><p>New product alerts, restock notes, and concise research-grade catalog updates.</p></div><div class="subscribe-fields"><input type="text" name="fullName" placeholder="Full name" autocomplete="name"><input type="email" name="email" placeholder="Email address" autocomplete="email" required><button class="btn btn-primary" type="submit">Subscribe</button></div><p class="form-message" data-form-message></p></form></section>
"""
    write("index.html", render_document("Research Peptides Canada | PeptidesCanada", "Premium research peptides Canada catalog with research compounds, clear pricing, lab-testing context, Stripe Checkout, and Canada-wide fulfillment.", "/", "home", body, extra_ld=[breadcrumb([("Home", "/")])]))


def render_products() -> None:
    chips = '<button class="chip is-active" type="button" data-category-filter-chip="all"><span>ALL</span> All Products</button>' + "".join(f'<button class="chip" type="button" data-category-filter-chip="{c["handle"]}"><span>{esc(c["icon"])}</span> {esc(c["title"])}</button>' for c in COLLECTIONS)
    sorts = "".join(f'<button class="sort-btn {"is-active" if value == "featured" else ""}" type="button" data-sort="{value}">{label}</button>' for value, label in [("featured", "Featured"), ("best", "Best Selling"), ("newest", "Newest"), ("price-asc", "Price Low to High"), ("price-desc", "Price High to Low"), ("az", "A-Z")])
    body = f"""
    <section class="products-hero"><h1>Products</h1></section>
    <section class="product-control-panel"><div class="panel-head"><div><h2>Shop by Category</h2><p>Choose a research category to explore products faster.</p></div><label class="inline-search"><span>Search</span><input type="search" placeholder="Search products" data-product-search></label></div><div class="control-grid"><div><span class="eyebrow">Categories</span><div class="chip-list">{chips}</div></div><div><span class="eyebrow">Sort by</span><div class="sort-list">{sorts}</div></div></div></section>
    <section class="section catalog-results"><div class="product-grid" data-product-grid>{"".join(product_card(p) for p in PRODUCTS)}</div><p class="empty-products" data-empty-products hidden>No products match this filter.</p></section>
"""
    write("products.html", render_document("Products | Research Peptides Canada", "Shop research peptides Canada and research compounds by category, price, and product name with secure Stripe Checkout.", "/products", "products", body, extra_ld=[breadcrumb([("Home", "/"), ("Products", "/products")])]))


def render_collections() -> None:
    body = f"""
    <section class="products-hero compact"><span class="eyebrow">Shop by category</span><h1>Research categories</h1><p>Compact category browsing with collection images, product counts, and clear paths into the catalog.</p></section>
    <section class="section shop-category-panel"><div class="section-heading split-heading"><div><h2>Shop by Category</h2><p>Find products based on research goals and peptide category.</p></div><a href="/products">View full catalog</a></div><div class="category-row-grid">{"".join(compact_category(c) for c in COLLECTIONS)}</div><div class="featured-strip"><div class="featured-strip-head"><h3>Featured Products</h3><a href="/products">Browse all</a></div><div class="featured-product-grid">{"".join(compact_product(p) for p in PRODUCTS[:3])}</div></div><a class="shop-category-cta" href="/products">View full catalog -></a></section>
"""
    write("collections/index.html", render_document("Research Categories | PeptidesCanada", "Browse PeptidesCanada research categories with collection images, product counts, and research-use-only product paths.", "/collections", "collections", body, extra_ld=[breadcrumb([("Home", "/"), ("Collections", "/collections")])]))
    write("collections/frontpage.html", (ROOT / "products.html").read_text(encoding="utf-8"))
    (ROOT / "collections/frontpage").mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / "collections/frontpage.html", ROOT / "collections/frontpage/index.html")
    for collection in COLLECTIONS:
        items = [p for p in PRODUCTS if p["collection"] == collection["handle"]]
        body = f"""
    <section class="collection-hero"><div><span class="eyebrow">{esc(collection["tag"])}</span><h1>{esc(collection["label"])}</h1><p>{esc(collection["description"])}</p><a class="btn btn-secondary" href="/collections">All categories</a></div><img src="/assets/collections/{collection["image"]}" alt="{esc(collection["title"])} collection image" width="280" height="280" loading="eager" decoding="async"></section>
    <section class="section"><div class="section-heading split-heading"><div><span class="eyebrow">{len(items)} products</span><h2>{esc(collection["title"])} catalog</h2></div><a href="/products">Browse all products</a></div><div class="product-grid">{"".join(product_card(p) for p in items)}</div></section>
"""
        html_doc = render_document(f"{collection['title']} Research Products | PeptidesCanada", f"Browse {collection['title'].lower()} research peptides and research compounds in Canada with research-use-only product pages.", f"/collections/{collection['handle']}", "collections", body, extra_ld=[breadcrumb([("Home", "/"), ("Collections", "/collections"), (collection["title"], f"/collections/{collection['handle']}")])])
        write(f"collections/{collection['handle']}.html", html_doc)
        write(f"collections/{collection['handle']}/index.html", html_doc)


def render_product_pages() -> None:
    for product in PRODUCTS:
        related = [p for p in PRODUCTS if p["collection"] == product["collection"] and p["handle"] != product["handle"]][:3]
        if len(related) < 3:
            related.extend([p for p in PRODUCTS if p["handle"] != product["handle"] and p not in related][: 3 - len(related)])
        kit_button = f'<button type="button" data-variant-option data-variant="1 kit" data-price="{product["kit_price"]:.2f}">1 Kit</button>' if product["kit"] else ""
        product_ld = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product["title"],
            "description": product["summary"],
            "image": f"{BASE_URL}/assets/products/{product['image']}",
            "brand": {"@type": "Brand", "name": "PeptidesCanada"},
            "offers": {"@type": "Offer", "priceCurrency": "CAD", "price": f"{product['price']:.2f}", "availability": "https://schema.org/InStock", "url": f"{BASE_URL}/products/{product['handle']}"},
        }
        body = f"""
    <section class="product-detail ecommerce-product" data-product-page data-product-handle="{esc(product["handle"])}">
      <div class="product-gallery"><div class="detail-media"><img src="/assets/products/{product["image"]}" alt="{esc(product["title"])} product vial in laboratory setting" width="900" height="900" loading="eager" decoding="async"></div></div>
      <div class="detail-copy buy-box"><span class="stock-pill">In stock - ships within 24h</span><h1>{esc(product["title"])}</h1><p class="product-category-label">{esc(product["collection_title"])}</p><p class="product-price" data-product-price>{money(product["price"])}</p><div class="spec-table"><span>Purity</span><strong>{esc(product["purity"])}</strong><span>Form</span><strong>{esc(product["form"])}</strong><span>Storage</span><strong>{esc(product["storage"])}</strong></div><div class="variant-area"><span>1 vial</span><div class="variant-options"><button class="is-active" type="button" data-variant-option data-variant="1 vial" data-price="{product["price"]:.2f}">1 Vial</button>{kit_button}</div></div><div class="quantity-row"><button type="button" data-qty-minus>-</button><input type="number" min="1" max="99" value="1" aria-label="Quantity" data-product-qty><button type="button" data-qty-plus>+</button></div><button class="btn btn-primary btn-wide add-main" type="button" data-product-add data-handle="{esc(product["handle"])}">Add to Cart - {money(product["price"])}</button><div class="buy-trust"><span>{icon("shield")} 99%+ purity - HPLC verified where listed</span><span>{icon("truck")} Canada-wide fulfillment</span><span>{icon("doc")} Research use only</span></div><p class="research-notice"><strong>Research Use Only:</strong> This product is intended exclusively for laboratory and research purposes. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.</p></div>
    </section>
    <section class="section description-tabs" data-tabs><div class="tab-list" role="tablist"><button class="is-active" type="button" data-tab="description">Description</button><button type="button" data-tab="coa">Certificate of Analysis</button></div><div class="tab-panel is-active product-description-copy" data-tab-panel="description">{description_html(product)}</div><div class="tab-panel product-description-copy" data-tab-panel="coa"><h2>Certificate of Analysis</h2><p>COA documentation may be available by batch where testing details are provided. For documentation requests, contact support with the product name, order reference, and batch information if listed on your vial.</p><p><a href="/lab-testing-coa">View Lab Testing &amp; COA information</a></p><h3>Research Use Compliance</h3><p>Documentation is provided for laboratory identity and quality-control review only. Products are not intended for human consumption, clinical use, cosmetic use, or therapeutic use.</p></div></section>
    <section class="section related-products"><div class="section-heading split-heading"><div><span class="eyebrow">Related products</span><h2>Frequently paired research items</h2></div><button type="button" data-cart-open>Open cart</button></div><div class="product-grid small-grid">{"".join(product_card(p) for p in related)}</div></section>
    <div class="mobile-sticky-buy"><div><strong data-mobile-product-price>{money(product["price"])}</strong><span>{esc(product["title"])}</span></div><button class="btn btn-primary" type="button" data-product-add data-handle="{esc(product["handle"])}">Add</button></div>
"""
        html_doc = render_document(f"{product['title']} | Research Product Canada", f"{product['title']} research product page with price, storage, purity context, Stripe Checkout cart, and research-use-only description.", f"/products/{product['handle']}", "products", body, body_class="has-sticky-buy", extra_ld=[breadcrumb([("Home", "/"), ("Products", "/products"), (product["title"], f"/products/{product['handle']}")]), product_ld])
        write(f"products/{product['handle']}.html", html_doc)
        write(f"products/{product['handle']}/index.html", html_doc)
        for alias in product.get("aliases", []):
            write(f"products/{alias}.html", html_doc)
            write(f"products/{alias}/index.html", html_doc)


def render_simple_pages() -> None:
    pages = {
        "success.html": ("Payment Successful | PeptidesCanada", "Payment successful confirmation for PeptidesCanada Stripe Checkout orders.", "/success", "Payment received", "Thank you. Your payment was completed securely through Stripe, and your order has been received for processing.", "success"),
        "cancel.html": ("Payment Cancelled | PeptidesCanada", "Return to the PeptidesCanada cart after cancelling Stripe Checkout.", "/cancel", "Payment cancelled", "Your payment was cancelled. Your cart is still saved, so you can review it and return to secure checkout whenever you are ready.", "cancel"),
        "admin.html": ("Admin Dashboard | PeptidesCanada", "Private PeptidesCanada dashboard for subscriber and order records.", "/admin", "Orders and Subscribers", "Enter the admin API key configured in Vercel to load newsletter subscribers and Stripe order records from the connected database.", "admin"),
    }
    for filename, (title, desc, canonical, h1, intro, kind) in pages.items():
        if kind == "admin":
            body = f"""
    <section class="admin-page"><span class="eyebrow">Private dashboard</span><h1>{h1}</h1><p>{intro}</p><form class="admin-login" data-admin-form><input type="password" name="adminKey" placeholder="Admin API key" autocomplete="off" required><button class="btn btn-primary" type="submit">Load Dashboard</button></form><p class="form-message" data-admin-message></p><div class="admin-stats"><span><strong data-admin-orders-count>0</strong>Orders</span><span><strong data-admin-subs-count>0</strong>Subscribers</span><span><strong data-admin-revenue>$0.00</strong>Paid total</span></div><div class="admin-grid"><section><h2>Recent Orders</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Customer</th><th>Email</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody data-admin-orders></tbody></table></div></section><section><h2>Subscribers</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Source</th></tr></thead><tbody data-admin-subscribers></tbody></table></div></section></div></section>
"""
            write(filename, render_document(title, desc, canonical, "", body, robots="noindex, nofollow"))
            continue
        action = '<button class="btn btn-primary" type="button" data-cart-open>Return to Cart</button>' if kind == "cancel" else '<a class="btn btn-primary" href="/products">Continue Shopping</a>'
        body = f"""<section class="content-page status-page"><span class="eyebrow">Stripe Checkout</span><h1>{esc(h1)}</h1><p>{esc(intro)}</p><div class="hero-actions">{action}<a class="btn btn-secondary" href="/contact">Contact Support</a></div></section>"""
        write(filename, render_document(title, desc, canonical, "products", body, extra_ld=[breadcrumb([("Home", "/"), (h1, canonical)])]))
    payment_body = """<section class="checkout-page"><div class="checkout-copy"><span class="eyebrow">Secure checkout</span><h1>Complete Secure Checkout</h1><p>Review your cart, then continue to Stripe Checkout. Product names, quantities, and prices are validated again on the server before Stripe creates the payment page.</p><div class="research-notice"><strong>Research Use Only:</strong> Products are intended exclusively for laboratory and research purposes. Not for human consumption.</div></div><div class="checkout-form"><h2>Cart summary</h2><div class="checkout-summary" data-checkout-summary></div><p class="cart-error" data-cart-error></p><button class="btn btn-primary btn-wide" type="button" data-stripe-checkout>Continue to Stripe Checkout</button></div></section>"""
    write("payment.html", render_document("Secure Stripe Checkout | PeptidesCanada", "Review your PeptidesCanada research-use-only cart and continue to secure Stripe Checkout.", "/payment", "products", payment_body, extra_ld=[breadcrumb([("Home", "/"), ("Checkout", "/payment")])]))


def render_lab_testing_page() -> None:
    body = """
    <section class="content-page lab-testing-page">
      <span class="eyebrow">Our Commitment to Quality &amp; Transparency</span>
      <h1>Lab Testing &amp; Certificates of Analysis (COA)</h1>
      <p>At Peptides Canada, product quality is verified through structured testing processes.</p>
      <p>Each batch undergoes third-party laboratory analysis to confirm purity, identity, consistency, and compliance with quality standards.</p>
      <p>We prioritize transparency so you can clearly understand what you are receiving.</p>

      <h2>What is a Certificate of Analysis (COA)?</h2>
      <p>A Certificate of Analysis (COA) is an official laboratory document that provides detailed information about a specific batch of a product.</p>
      <p>It typically includes:</p>
      <ul>
        <li>Purity level, such as 98-99%+</li>
        <li>Molecular identity confirmation</li>
        <li>Batch or lot number</li>
        <li>Analytical methods used, including HPLC and Mass Spectrometry</li>
        <li>Date of testing and validation</li>
      </ul>
      <p>Each COA is specific to a batch, not a general product.</p>

      <h2>Our Testing Process</h2>
      <ol class="lab-process">
        <li><strong>Batch Production</strong><span>Each product is manufactured in controlled conditions.</span></li>
        <li><strong>Third-Party Laboratory Testing</strong><span>Independent laboratories conduct High Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS).</span></li>
        <li><strong>Quality Verification</strong><span>Results are reviewed to ensure purity meets internal standards and no significant impurities or inconsistencies are present.</span></li>
        <li><strong>Batch Release</strong><span>Only batches that meet all criteria are made available.</span></li>
      </ol>

      <h2>Why Lab Testing Matters</h2>
      <p>Proper testing is essential for ensuring product reliability.</p>
      <p>Lab-tested products provide consistent composition, verified purity levels, and greater confidence in research applications.</p>
      <p>Without third-party validation, product claims cannot be independently confirmed.</p>

      <h2>Access to COAs</h2>
      <p>Batch-specific COAs are available for transparency.</p>
      <p>You can access them directly on individual product pages or by submitting a support request through our contact page.</p>
      <p>It is recommended to match the batch number on your product with the corresponding COA.</p>

      <h2>Information Included in a COA</h2>
      <ul>
        <li>Product name</li>
        <li>Batch or lot number</li>
        <li>Purity percentage from HPLC results</li>
        <li>Chromatogram data</li>
        <li>Testing methodology</li>
        <li>Analyst validation</li>
        <li>Date of analysis</li>
      </ul>

      <h2>Important Notice</h2>
      <p>All products available on this website are intended for research purposes only.</p>
      <p>They are not approved for human consumption and are not intended to diagnose, treat, cure, or prevent any disease.</p>

      <h2>Why Choose Peptides Canada</h2>
      <ul class="check-list">
        <li>Third-party laboratory tested</li>
        <li>Batch-level transparency</li>
        <li>High purity standards</li>
        <li>Reliable sourcing</li>
        <li>Consistent quality control</li>
      </ul>
    </section>
"""
    write("lab-testing-coa.html", render_document("Lab Testing & COA | PeptidesCanada", "Learn how PeptidesCanada approaches third-party lab testing, COA documentation, purity verification, and batch-level transparency.", "/lab-testing-coa", "lab", body, extra_ld=[breadcrumb([("Home", "/"), ("Lab Testing & COA", "/lab-testing-coa")])]))


def render_contact_page() -> None:
    body = """
    <section class="content-page contact-page">
      <span class="eyebrow">Precision. Transparency. Performance.</span>
      <h1>Contact PeptidesCanada</h1>
      <p>If you have questions about our research-use-only products, order status, shipping, product documentation, or general inquiries, the PeptidesCanada support team is here to help.</p>
      <p>We aim to provide clear, professional, and timely support so customers can get the information they need with confidence.</p>

      <div class="contact-support-grid">
        <section class="contact-copy-card">
          <h2>Customer Support</h2>
          <p>Our team aims to respond to all inquiries within 24 hours during regular business days.</p>
          <ul>
            <li>Email support available</li>
            <li>Order and shipping assistance</li>
            <li>Product documentation support</li>
            <li>COA request support when applicable</li>
            <li>Professional assistance for research customers</li>
          </ul>
        </section>
        <section class="contact-copy-card accent">
          <span class="eyebrow">Support Requests</span>
          <h2>Product documentation and order support</h2>
          <p>Include your product name, order number, and any batch information available so our team can review your request faster.</p>
          <a class="btn btn-primary" href="/contact#research-updates">Get Updates</a>
        </section>
      </div>

      <section class="contact-copy-card">
        <h2>What We Can Help With</h2>
        <p>You can contact us for support related to:</p>
        <ul class="check-list">
          <li>Order confirmation and tracking information</li>
          <li>Shipping questions within Canada</li>
          <li>Product availability</li>
          <li>Batch information and COA requests when available</li>
          <li>Website, account, or checkout questions</li>
          <li>General research-use-only product inquiries</li>
        </ul>
      </section>

      <section class="contact-copy-card">
        <h2>Product Documentation Requests</h2>
        <p>If you are contacting us about product documentation, please include the product name, order number if applicable, and any batch information available on your product label or order details.</p>
        <p>This helps our team review your request faster and provide the most accurate information available.</p>
      </section>

      <section class="contact-copy-card important">
        <h2>Important Notice</h2>
        <p>All products sold by PeptidesCanada are intended strictly for research and laboratory use only.</p>
        <p>They are not for human consumption and are not intended to diagnose, treat, cure, or prevent any disease.</p>
        <p>PeptidesCanada does not provide medical advice, dosage guidance, human-use instructions, or treatment recommendations.</p>
      </section>

      <form id="research-updates" class="updates-card contact-updates-card" data-subscribe-form>
        <div><span class="eyebrow">Research updates</span><h2>Join Our Research Updates</h2><p>New product alerts, restock notes, and concise research-grade catalog updates.</p></div>
        <div class="subscribe-fields"><input type="email" name="email" placeholder="Email address" autocomplete="email" required><button class="btn btn-primary" type="submit">Subscribe</button></div>
        <p class="form-message" data-form-message></p>
      </form>
    </section>
"""
    write("contact.html", render_document("Contact PeptidesCanada | PeptidesCanada", "Contact PeptidesCanada for research-use-only product questions, order status, shipping support, COA requests, and product documentation inquiries.", "/contact", "contact", body, extra_ld=[breadcrumb([("Home", "/"), ("Contact", "/contact")])]))


def update_existing_shells() -> None:
    html_files = [p for p in ROOT.rglob("*.html") if "github-pages-static-site-complete" not in str(p)]
    for path in html_files:
        text = path.read_text(encoding="utf-8")
        active = "home"
        rel = path.relative_to(ROOT).as_posix()
        if rel.startswith("products") or rel == "products.html" or rel in {"payment.html", "success.html", "cancel.html"}:
            active = "products"
        elif rel.startswith("collections"):
            active = "collections"
        elif "about" in rel:
            active = "about"
        elif "faq" in rel:
            active = "faq"
        elif "lab-testing" in rel:
            active = "lab"
        elif "research-blog" in rel:
            active = "blog"
        elif "contact" in rel:
            active = "contact"
        text = re.sub(r'\s*<div class="(?:topbar|promo-bar)".*?</header>', "\n" + header(active), text, flags=re.S)
        text = re.sub(r'\s*<footer class="site-footer">.*?</footer>', "\n" + footer(), text, flags=re.S)
        text = re.sub(r'<link rel="stylesheet" href="[^"]*style\.css">', '<link rel="stylesheet" href="/style.css">', text)
        if "window.PEPCAN_CATALOG" in text:
            text = re.sub(r'<script src="[^"]*script\.js" defer></script>', '<script src="/script.js" defer></script>', text)
        else:
            text = re.sub(r'<script src="[^"]*script\.js" defer></script>', f'<script>window.PEPCAN_CATALOG={catalog_json()};</script>\n  <script src="/script.js" defer></script>', text)
        if "cart-drawer" not in text:
            text = text.replace("</body>", overlays() + "\n</body>")
        path.write_text(text, encoding="utf-8")


def main() -> None:
    render_home()
    render_products()
    render_collections()
    render_product_pages()
    render_simple_pages()
    render_lab_testing_page()
    render_contact_page()
    update_existing_shells()
    print("Storefront rebuilt with", len(PRODUCTS), "products and", len(COLLECTIONS), "collections.")


if __name__ == "__main__":
    main()
