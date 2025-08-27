import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { howl, idk } from "@/lib/utils";
import React from "react";

export default async function FAQ() {
  const call: idk = await howl("/faqs");
  const faqs = call.data;

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq: idk) => (
        <AccordionItem key={faq._id} value={faq._id}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground">{faq.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
