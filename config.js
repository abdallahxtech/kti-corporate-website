/** Public website configuration. These settings do not control Odoo security. */
window.KTI_CONFIG = {
  brand: 'Korean Techno Inspection Middle East Co. LLC',
  email: 'info@kti.ae',
  phone: '+971-2-557-5560',
  portalBase: 'https://starlink.kti.ae',
  // The public badges below must stay hidden until approved by KTI, with proof
  // of current certificate/program validity and permission to display each logo.
  // Until then, sources are in pending-credentials/ and not deployed.
  publishCredentialLogos: false,
  approvedCredentials: [
    {label:'ADNOC ICV Certified',file:'adnoc_icv_certified.png'},
    {label:'SGS ISO 9001',file:'iso_9001_sgs.png'},
    {label:'SGS ISO 14001',file:'iso_14001_sgs.png'},
    {label:'SGS ISO 45001',file:'iso_45001_sgs.png'},
    {label:'Made in the Emirates',file:'Made-in-the-Emirates.jpg'},
    {label:'The Emirates mark',file:'emirates-new-logo.png'}
  ]
};
