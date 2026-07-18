// Demo lead endpoint. No external calls — validation only.
module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  var body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  body = body || {};

  var name = typeof body.name === 'string' ? body.name.trim() : '';
  var grade = typeof body.grade === 'string' ? body.grade.trim() : '';
  var contact = typeof body.contact === 'string' ? body.contact.trim() : '';

  if (!name || !grade || !contact) {
    res.status(400).json({ ok: false, error: 'All fields are required' });
    return;
  }

  res.status(200).json({ ok: true, demo: true });
};
