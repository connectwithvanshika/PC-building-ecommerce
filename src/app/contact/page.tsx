import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black tracking-tighter mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Have a question about your order or need help choosing the right hardware? Our team of experts is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us more..." rows={6} className="resize-none" />
            </div>
            <Button size="lg" className="w-full rounded-full font-bold">Send Message</Button>
          </form>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 shrink-0"><MapPin className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="font-semibold mb-1">Our Office</div>
                <p className="text-muted-foreground">123 Tech Boulevard<br />Silicon Valley, CA 94025</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 shrink-0"><Phone className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="font-semibold mb-1">Phone</div>
                <p className="text-muted-foreground">1-800-NEXUS-PC</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 shrink-0"><Mail className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="font-semibold mb-1">Email</div>
                <p className="text-muted-foreground">support@nexustech.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 shrink-0"><Clock className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="font-semibold mb-1">Business Hours</div>
                <p className="text-muted-foreground">Monday – Friday: 9am – 6pm PST<br />Saturday: 10am – 4pm PST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
