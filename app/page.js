'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your message has been sent to our team!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMsg('Failed to send message. Please check your connection.');
    }
  };

  return (
    <div className="container animate-fade-in">
      <h1>Get in Touch</h1>
      <p className="subtitle">
        Have a question or want to work together? <br />
        Connect with our automated workflow instantly.
      </p>

      <div className="contact-card">
        {status === 'success' && (
          <div className="alert alert-success">
            <span>✅</span> {responseMsg}
          </div>
        )}

        {status === 'error' && (
          <div className="alert alert-error">
            <span>⚠️</span> {responseMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="spinner"></span> Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>

      <footer>
        &copy; {new Date().getFullYear()} UiPath Connector App. All rights reserved.
      </footer>
    </div>
  );
}
