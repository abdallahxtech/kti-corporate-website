(() => {
  'use strict';
  const cfg = window.KTI_CONFIG || {};
  document.documentElement.classList.add('js-enabled');
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const header = $('#siteHeader');
  const nav = $('#navLinks');
  const toggle = $('#menuToggle');
  const closeMenu = () => { document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation'); };
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 940) closeMenu(); });
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 12);
  window.addEventListener('scroll', onScroll, {passive:true});onScroll();
  const observer = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches
    ? new IntersectionObserver(entries => { entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}});},{rootMargin:'0px 0px -30px 0px',threshold:0.03}) : null;
  $$('.reveal').forEach(el => {if (observer) observer.observe(el); else el.classList.add('revealed');});
  const sectionObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {entries.forEach(entry=>{if(!entry.isIntersecting)return; $$('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));});},{rootMargin:'-18% 0px -65% 0px',threshold:0}) : null;
  if(sectionObserver) $$('main section[id]').forEach(el => sectionObserver.observe(el));
  const base = (cfg.portalBase || 'https://starlink.kti.ae').replace(/\/+$/,'');
  const routes = {employee:'/web/login?redirect=%2Fweb',client:'/web/login?redirect=%2Fmy',inspector:'/web/login?redirect=%2Fmy'};
  $$('[data-portal]').forEach(a => {
    const role=a.dataset.portal;
    if(routes[role]) a.href = base + routes[role];
  });
  $$('[data-service]').forEach(a => a.addEventListener('click',() => {
    const select=$('#serviceSelect');
    if(select) select.value=a.dataset.service;
  }));
  const form = $('#enquiryForm');
  if(form) form.addEventListener('submit', e => {
    e.preventDefault();
    if(!form.reportValidity()) return;
    const data=Object.fromEntries(new FormData(form).entries());
    const safeValue = s => String(s||'').trim();
    const subject='KTI Website Enquiry - '+safeValue(data.service)+' - '+safeValue(data.company);
    const message=[
      'Dear KTI Team,','','I would like to enquire about the following project requirements.','',
      'Full Name: '+safeValue(data.name),'Company: '+safeValue(data.company),
      'Work Email: '+safeValue(data.email),'Phone: '+safeValue(data.phone),
      'Service Requested: '+safeValue(data.service),'',
      'Project Details:',safeValue(data.message),'',
      'Kind regards,',safeValue(data.name)
    ].join('\n');
    const url='mailto:'+encodeURIComponent(cfg.email||'info@kti.ae')+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message);
    const status=$('#formStatus');
    status.textContent='Opening your email application. Please review the message and press Send. If nothing opens, email info@kti.ae directly.';
    window.location.href=url;
  });
  const credentialSection=$('#credentials');
  const credentialGrid=$('#credentialGrid');
  if(cfg.publishCredentialLogos===true && Array.isArray(cfg.approvedCredentials) && credentialGrid && credentialSection){
    // Manual sign-off of every logo and current eligibility is required before enabling.
    cfg.approvedCredentials.forEach(entry=>{
      if(!entry.file || !entry.label || !/^[\w.-]+$/.test(entry.file)) return;
      const fig=document.createElement('figure');
      const img=document.createElement('img');img.src='/assets/credentials/'+entry.file;img.alt=entry.label;img.loading='lazy';
      const caption=document.createElement('figcaption');caption.textContent=entry.label;
      fig.append(img,caption);credentialGrid.append(fig);
    });
    credentialSection.hidden=false;
  }
  const y=$('#year'); if(y)y.textContent=String(new Date().getFullYear());
})();
