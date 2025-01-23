import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import {  ToastContainer ,toast } from 'react-toastify';
import { ContactModalProps } from '../../interfaces/event.interface';

function ContactModal({ isOpen, onClose }: ContactModalProps): JSX.Element | null{

    const form = useRef<HTMLFormElement | null>(null);

    const serviceKey = import.meta.env.VITE_SERVICE_EMAILJS || '';
    const templateKey = import.meta.env.VITE_TEMPLATE_EMAILJS || '';
    const publicKey = import.meta.env.VITE_PUBLIC_KEY || '';

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(serviceKey, templateKey, form.current, publicKey)
        .then(
          () => {
            toast.success('Message sent successfully!', { position: 'top-right' });
            console.log('SUCCESS!');
          },
          (error) => {
            toast.error('Error sending messsage !', { position: 'top-right' });
            console.log('FAILED...', error.text);
          },
        );
    }
  };
  if (!isOpen) return null;

  return (
    <div>
    <ToastContainer />
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">We would love to hear from you! Please fill out the form below:</p>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Your name"
              name="user_name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Your email"
              name="user_email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Your message"
              name="message"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              value="Send"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
    </div>
  );
};

export default ContactModal;
