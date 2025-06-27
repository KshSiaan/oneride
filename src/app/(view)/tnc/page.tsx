import React from "react";

export default function Page() {
  return (
    <div className="w-4/5 mx-auto! !py-12 px-[7%]!">
      <h1 className="text-6xl text-center font-bold text-white mb-4! !mt-4">
        Terms & Conditions
      </h1>
      <p className="mb-6!">Effective Date: 22/6/2025</p>
      <p className="mb-8!">
        By accessing or using our website and services, you agree to the
        following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        Use of Service
      </h2>
      <p className="mb-6!">
        Our platform provides transportation services for event-goers. By
        booking a seat or chartering a bus, you agree to provide accurate
        information and use our services only for lawful purposes.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        Booking & Payments
      </h2>
      <ul className="list-disc !pl-6 mb-6">
        <li className="mb-2!">
          All bookings are subject to availability and confirmation.
        </li>
        <li className="mb-2!">
          Payments must be made at the time of booking unless otherwise stated.
        </li>
        <li>Once confirmed, bookings are non-transferable.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        Cancellations & Refunds
      </h2>
      <ul className="list-disc !pl-6 mb-6">
        <li className="mb-2!">
          Cancellations must be made [insert hours] before the departure time.
        </li>
        <li className="mb-2!">
          Refund policies may vary based on the event or type of booking.
        </li>
        <li>No-shows will not be refunded.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        Charter Requests
      </h2>
      <p className="mb-6!">
        For private bus hires, you must fill out our charter form. Quotes and
        confirmations will be provided based on availability and requirements.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        User Responsibilities
      </h2>
      <ul className="list-disc !pl-6 mb-6">
        <li className="mb-2!">You must arrive at the pickup point on time.</li>
        <li>
          Any misconduct, damage, or disruptive behavior may result in removal
          from the ride without a refund.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        Limitation of Liability
      </h2>
      <p className="mb-6!">
        We are not responsible for delays caused by traffic, weather, or event
        changes. While we strive to provide a reliable service, we do not
        guarantee exact arrival or departure times.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3!">Privacy</h2>
      <p className="mb-6!">
        All personal information is handled in accordance with our [Privacy
        Policy].
      </p>

      <h2 className="text-2xl font-semibold text-white mb-3!">
        Changes to Terms
      </h2>
      <p className="mb-6!">
        We may update these Terms at any time. Continued use of the website
        means you accept the revised terms.
      </p>
    </div>
  );
}
