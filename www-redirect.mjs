export default {
  fetch(request) {
    const destination = new URL(request.url);
    destination.protocol = 'https:';
    destination.hostname = 'colerippe.com';
    destination.port = '';
    return Response.redirect(destination.href, 301);
  }
};
