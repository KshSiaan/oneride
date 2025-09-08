import { Button } from "@/components/ui/button";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { howl, idk } from "@/lib/utils";
export default async function Questions() {
  const call: idk = await howl("/faqs");
  const faqs = call.data.slice(0, 6);
  return (
    <div className="w-full px-[7%]! grid lg:grid-cols-2 gap-6 mt-24! border-t pt-12!">
      <div className="space-y-6!">
        <h2 className="text-3xl lg:text-6xl">
          Got Questions ? <br /> We&apos;ve Got Answers
        </h2>
        <p>
          We are always happy to hear from you. If you have any questions,
          suggestions or opinions, please do not hesitate to reach out to us.
        </p>
        <Button size="lg" className="text-foreground font-semibold">
          Contact Us
        </Button>
      </div>
      <div className="">
        <Accordion type="single" collapsible>
          {faqs.map((faq: idk) => (
            <AccordionItem key={faq._id} value={faq._id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "How can I purchase a ticket from ONERIDE Platform?",
    answer:
      "To purchase a ticket, log in to your account, navigate to the 'Tickets' section, choose your destination, select a time slot, and proceed to payment.",
  },
  {
    question: "Can I cancel my ticket after booking?",
    answer:
      "Yes, you can cancel your ticket within the allowed cancellation window found in our policy section. A small cancellation fee may apply.",
  },
  {
    question: "Are refunds instant?",
    answer:
      "Refunds are usually processed within 3–5 business days, depending on your payment method.",
  },
  {
    question: "Is there a mobile app for ONERIDE?",
    answer:
      "Yes, ONERIDE is available on both iOS and Android. Download it to manage your trips on the go.",
  },
];
