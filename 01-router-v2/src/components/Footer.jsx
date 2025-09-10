import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="px-5 py-8 text-xs bg-blue-200">
      <div className="grid grid-cols-3">
        {/* Customer Support */}
        <div>
          <h3 className="mb-3 text-sm font-bold">
            Customer <br /> Support
          </h3>
          <ul className="space-y-1">
            <li>
              <Link className="hover:underline" to="#">
                FAQs
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="#">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="#">
                Order Tracking
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="#">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-3 text-sm font-bold">Follow Us</h3>
          <ul className="space-y-1">
            <li>
              <Link className="hover:underline" to="#">
                Facebook
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="#">
                Instagram
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="#">
                Twitter
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="#">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-3 text-sm font-bold">Contact Us</h3>
          <p>Email: support@yourstore.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Market Street, City, Country</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-7">
        <p>&copy; 2025 YourStore. All rights reserved.</p>
      </div>
    </footer>
  )
}
