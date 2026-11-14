const themeButton = document.getElementById('theme-toggle');
const preferredDark = matchMedia('(prefers-color-scheme: dark)');
const sections = [...document.querySelectorAll('main > .view')];
const tabs = [...document.querySelectorAll('.tab')];
const wikiContent = document.getElementById('wiki-content');
const readingContent = document.getElementById('reading-content');
const state = { posts: null, renderToken: 0, tocObserver: null };

try { document.documentElement.dataset.theme = localStorage.getItem('portfolio-theme') || ''; } catch {}

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && preferredDark.matches);
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

themeButton.addEventListener('click', () => {
  document.documentElement.dataset.theme = themeButton.getAttribute('aria-label') === 'Switch to light mode' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', document.documentElement.dataset.theme); } catch {}
  updateThemeButton();
});

preferredDark.addEventListener('change', updateThemeButton);

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const safeUrl = value => {
  const url = String(value ?? '').trim();
  if (/^(?:https?:|mailto:|#|\/{1}|\.{1,2}\/)/i.test(url)) return url;
  if (/^[a-z0-9_-]+(?:\/[a-z0-9_./-]+)?$/i.test(url)) return url;
  return '#';
};

const sourceLink = value => {
  const decoded = String(value ?? '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const href = safeUrl(decoded);
  const external = /^(https?:|mailto:)/i.test(href);
  return `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>`;
};

function inlineMarkdown(source) {
  const tokens = [];
  const protect = markup => {
    const token = `\u0000${tokens.length}\u0000`;
    tokens.push(markup);
    return token;
  };
  let value = escapeHtml(source);

  value = value.replace(/`([^`]+)`/g, (_, code) => protect(`<code>${code}</code>`));
  value = value.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+["']([^"']+)["'])?\)/g, (_, label, url, title) => {
    const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
    return protect(`${sourceLink(url).replace(/>$/, `${titleAttribute}>`)}${label}</a>`);
  });
  value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  value = value.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  value = value.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  value = value.replace(/(^|[\s(])((?:https?:\/\/|mailto:)[^\s<]+)/g, (_, prefix, rawUrl) => {
    const trailing = rawUrl.match(/[.,;:!?]+$/)?.[0] || '';
    const url = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;
    return `${prefix}${sourceLink(url)}${url}</a>${trailing}`;
  });

  return value.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
}

function slugify(value) {
  return String(value).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function parseDocument(source) {
  const normalized = String(source).replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: normalized };

  const data = {};
  match[1].split('\n').forEach(line => {
    const separator = line.indexOf(':');
    if (separator < 0) return;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return { data, body: match[2] };
}

function renderMarkdown(source) {
  const lines = String(source).trim().split('\n');
  const html = [];
  const headings = [];
  let paragraph = [];
  let quote = [];
  let listType = '';
  let listItems = [];
  let code = null;
  let codeLanguage = '';

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
    quote = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    html.push(`<${listType}>${listItems.map(item => `<li>${inlineMarkdown(item)}</li>`).join('')}</${listType}>`);
    listType = '';
    listItems = [];
  };
  const flushText = () => {
    flushParagraph();
    flushQuote();
    flushList();
  };

  for (const line of lines) {
    if (code) {
      if (/^```/.test(line.trim())) {
        const languageClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : '';
        html.push(`<pre><code${languageClass}>${escapeHtml(code.join('\n'))}</code></pre>`);
        code = null;
        codeLanguage = '';
      } else {
        code.push(line);
      }
      continue;
    }

    const fence = line.trim().match(/^```(.*)$/);
    if (fence) {
      flushText();
      code = [];
      codeLanguage = fence[1].trim();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      flushText();
      const level = heading[1].length;
      const text = heading[2];
      const id = slugify(text) || `section-${headings.length + 1}`;
      headings.push({ id, text });
      html.push(`<h${level} id="${escapeHtml(id)}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (/^\s*>/.test(line)) {
      flushParagraph();
      flushList();
      quote.push(line.replace(/^\s*>\s?/, '').trim());
      continue;
    }
    if (quote.length) flushQuote();

    const list = line.match(/^\s*([-*+]|\d+\.)\s+(.+)$/);
    if (list) {
      flushParagraph();
      const nextType = /^\d/.test(list[1]) ? 'ol' : 'ul';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push(list[2]);
      continue;
    }
    if (listItems.length) flushList();

    if (/^\s*([-*_])\s*(?:\1\s*){2,}$/.test(line)) {
      flushParagraph();
      html.push('<hr>');
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      continue;
    }
    paragraph.push(line.trim());
  }

  if (code) html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
  flushText();
  return { html: html.join(''), headings };
}

function route() {
  const queryRoute = new URLSearchParams(location.search).get('route');
  if (queryRoute) {
    const cleanPath = queryRoute.startsWith('/') ? queryRoute : `/${queryRoute}`;
    history.replaceState({}, '', cleanPath);
  }
  if (location.hash.startsWith('#/')) history.replaceState({}, '', location.hash.slice(1));
  return location.pathname.replace(/\/$/, '').split('/').filter(Boolean).map(value => {
    try { return decodeURIComponent(value); } catch { return value; }
  });
}

function routeHref(path) {
  return path;
}

function sectionFor(parts) {
  return ['home', 'craft', 'work', 'wiki', 'reading'].includes(parts[0]) ? parts[0] : 'home';
}

function updateNavigation(section) {
  const active = section;
  for (const tab of tabs) {
    const tabSection = new URL(tab.href, location.origin).pathname.replace(/^\//, '').replace(/\/$/, '') || 'home';
    if (tabSection === active) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  }
}

function showSection(section) {
  const selected = sections.find(item => item.id === section) || sections[0];
  for (const item of sections) item.hidden = item !== selected;
  updateNavigation(section);
  return selected;
}

function isAppRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === '/' || /^\/(?:home|craft|work|wiki|reading)(?:\/[^/]+)?$/.test(path);
}

function formatDate(value) {
  if (!value) return '';
  const dateValue = String(value).match(/^\d{4}-\d{2}-\d{2}/)?.[0] || String(value);
  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function loadingView(label = 'Loading...') {
  return `<p class="annotation">${label}</p>`;
}

function errorView(message) {
  return `<section class="notes-error view"><h2>Could not load this view.</h2><p>${escapeHtml(message)}</p><a class="chip" href="${routeHref('/work')}">Back to Work</a></section>`;
}

async function ensurePosts() {
  if (state.posts) return state.posts;
  const response = await fetch('/posts/index.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`The post manifest returned ${response.status}.`);
  const data = await response.json();
  state.posts = (Array.isArray(data) ? data : data.posts || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return state.posts;
}

async function readPost(entry) {
  const response = await fetch(`/${entry.path}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`The post returned ${response.status}.`);
  const source = await response.text();
  const parsed = parseDocument(source);
  return { ...entry, ...parsed.data, body: parsed.body };
}

function postRow(post) {
  const label = post.type || 'Post';
  const meta = post.read || formatDate(post.date);
  return `<a class="work-row notes-post-row" href="${routeHref(`/wiki/${encodeURIComponent(post.slug)}`)}" aria-label="Open ${escapeHtml(post.title)}">
    <span class="row-left"><span class="row-title">${escapeHtml(post.title)}</span><span class="row-meta">${escapeHtml(meta)}</span></span>
    <span class="row-type">${escapeHtml(label)}</span>
  </a>`;
}

function listingView(posts, heading = 'Notes') {
  return `<section class="notes-listing view" aria-labelledby="notes-list-heading">
    <h2 class="section-kicker" id="notes-list-heading">${heading}</h2>
    <div class="notes-post-list">${posts.length ? posts.map(postRow).join('') : '<p class="annotation">No posts are listed yet.</p>'}</div>
  </section>`;
}

function metaItem(label, value) {
  if (!value) return '';
  return `<div><div class="notes-meta-label">${escapeHtml(label)}</div><p class="notes-meta-value">${escapeHtml(value)}</p></div>`;
}

function detailView(post, rendered) {
  const summary = post.summary || post.result || 'A Markdown post rendered in the site reader.';
  const meta = [
    metaItem('Type', post.type || 'Post'),
    metaItem('Date', formatDate(post.date)),
    metaItem('Role', post.role),
    metaItem('Team', post.team)
  ].filter(Boolean).join('');
  const toc = rendered.headings.length
    ? rendered.headings.map(heading => `<button type="button" data-toc="${escapeHtml(heading.id)}">${escapeHtml(heading.text)}</button>`).join('')
    : '<span class="notes-toc-empty"></span>';

  return `<section class="notes-detail view">
    <div class="notes-detail-back"><a class="back-link" href="${routeHref('/wiki')}"><span class="keycap">&larr;</span>Back to Wiki</a></div>
    <div class="notes-detail-grid">
      <nav class="notes-toc" aria-label="On this page">${toc}</nav>
      <article class="notes-article">
        <header class="post-header">
          <p class="section-kicker">${escapeHtml(post.type || 'Post')}</p>
          <h2>${escapeHtml(post.title || 'Untitled post')}</h2>
          <p class="post-summary">${escapeHtml(summary)}</p>
        </header>
        <div class="notes-meta-grid">${meta}</div>
        <div class="notes-body">${rendered.html}</div>
      </article>
      <aside class="notes-preview" aria-label="Post summary">
        <div class="notes-preview-card">
          <span class="notes-preview-type">Source Markdown</span>
          <h3>${escapeHtml(post.title || 'Untitled post')}</h3>
          <p>${escapeHtml(summary)}</p>
          <div class="notes-preview-rule"></div>
          <a class="notes-preview-link" href="${escapeHtml(`/${post.path}`)}">Open source <span>&nearr;</span></a>
        </div>
      </aside>
    </div>
  </section>`;
}

function wireToc() {
  state.tocObserver?.disconnect();
  document.querySelectorAll('[data-toc]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      document.getElementById(link.dataset.toc)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('[data-toc]').forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
  const headings = [...document.querySelectorAll('.notes-body h1, .notes-body h2, .notes-body h3, .notes-body h4, .notes-body h5, .notes-body h6')];
  if (!('IntersectionObserver' in window) || !headings.length) return;
  state.tocObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    document.querySelectorAll('[data-toc]').forEach(link => link.classList.toggle('active', link.dataset.toc === visible.target.id));
  }, { rootMargin: '-20% 0px -65% 0px' });
  headings.forEach(heading => state.tocObserver.observe(heading));
}

async function detailRoute(host, posts, slug, token) {
  const entry = posts.find(post => post.slug === slug);
  if (!entry) {
    host.innerHTML = errorView('That post is not in the manifest.');
    return;
  }
  host.innerHTML = loadingView('Loading post...');
  const post = await readPost(entry);
  if (token !== state.renderToken) return;
  host.innerHTML = detailView(post, renderMarkdown(post.body));
  wireToc();
  document.title = `${post.title || 'Post'} | Yash Gaur`;
}

async function readingView(token) {
  readingContent.innerHTML = loadingView('Loading reading list...');
  const response = await fetch('/references.md', { cache: 'no-store' });
  if (!response.ok) throw new Error(`The reading list returned ${response.status}.`);
  if (token !== state.renderToken) return;
  const parsed = parseDocument(await response.text());
  const rendered = renderMarkdown(parsed.body);
  readingContent.innerHTML = `<section class="notes-reading view">
    <div class="notes-reading-head"><h2>${escapeHtml(parsed.data.title || 'Reading list')}</h2></div>
    <article class="notes-article notes-reading-article"><div class="notes-body">${rendered.html}</div></article>
  </section>`;
  document.title = 'Reading list | Yash Gaur';
}

async function render() {
  const token = ++state.renderToken;
  const parts = route();
  const section = sectionFor(parts);
  if (section === 'work' && parts[1]) {
    history.replaceState({}, '', `/wiki/${encodeURIComponent(parts[1])}`);
    render();
    return;
  }
  const selected = showSection(section);

  try {
    if (section === 'wiki') {
      const posts = await ensurePosts();
      if (token !== state.renderToken) return;
      if (parts[1]) await detailRoute(wikiContent, posts, parts[1], token);
      else wikiContent.innerHTML = listingView(posts, 'Wiki');
      if (!parts[1]) document.title = 'Wiki | Yash Gaur';
    } else if (section === 'reading') {
      await readingView(token);
    } else {
      document.title = section === 'craft' ? 'Craft | Yash Gaur' : 'Yash Gaur — Work';
    }
    if (token === state.renderToken) {
      window.scrollTo(0, 0);
      selected.focus({ preventScroll: true });
    }
  } catch (error) {
    if (token === state.renderToken) {
      const host = section === 'wiki' ? wikiContent : readingContent;
      host.innerHTML = errorView(error.message || 'Unknown error.');
    }
  }
}

document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href]');
  if (!link || link.origin !== location.origin || !isAppRoute(link.pathname)) return;
  event.preventDefault();
  history.pushState({}, '', `${link.pathname}${link.search}`);
  render();
});

window.addEventListener('popstate', render);
window.addEventListener('hashchange', render);
window.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '') ||
      document.activeElement?.isContentEditable) return;
  const target = { '1': '/home', '2': '/craft', '3': '/work', '4': '/wiki', '5': '/reading' }[event.key];
  if (target) {
    history.pushState({}, '', target);
    render();
  }
  if (event.key === 'Escape') {
    const parts = route();
    if ((parts[0] === 'work' || parts[0] === 'wiki') && parts[1]) {
      history.pushState({}, '', `/${parts[0]}`);
      render();
    }
  }
});

updateThemeButton();
render();
