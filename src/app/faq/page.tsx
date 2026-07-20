const faqs = [
  { q: "Do you offer free shipping?", a: "Yes! We offer free standard shipping on all orders over $99. Orders under $99 have a flat shipping fee of $9.99." },
  { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy on all products. Items must be in original condition and packaging. Custom-built PCs must be reported within 15 days." },
  { q: "How long does delivery take?", a: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available at checkout for an additional fee." },
  { q: "Do you build custom PCs?", a: "Yes! You can use our PC Builder tool to configure a custom build and one of our expert technicians will assemble and test it before shipping." },
  { q: "Are the products covered under warranty?", a: "All products come with at least a 1-year manufacturer warranty. Our custom pre-built PCs come with an exclusive 3-year NexusTech warranty." },
  { q: "Can I track my order?", a: "Yes! Once your order ships, you will receive a tracking number via email. You can also track it from your account dashboard." },
  { q: "Do you accept international orders?", a: "Currently we ship to the US and Canada. International shipping to select countries is coming soon." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. All transactions are secured with 256-bit SSL encryption." },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black tracking-tighter mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">Everything you need to know about NexusTech.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-xl bg-card overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-base select-none list-none">
                {faq.q}
                <span className="ml-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t pt-4">{faq.a}</div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
