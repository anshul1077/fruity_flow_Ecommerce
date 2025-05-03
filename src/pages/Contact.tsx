// src/pages/Contact.tsx
import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you shortly.",
    });
    e.currentTarget.reset();
  };

  return (
    <section className="container py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-fruity-green mb-6 text-center">Contact Us</h1>

      <p className="text-center text-muted-foreground mb-10">
        Have a question about our fresh fruits and vegetables? Drop us a message — we’d love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" name="name" placeholder="Your Name" required />
        <Input type="email" name="email" placeholder="Your Email" required />
        <Textarea name="message" placeholder="Your Message" rows={4} required />

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-fruity-green to-fruity-lightGreen"
        >
          Send Message
        </Button>
      </form>

      <div className="mt-12 flex flex-col md:flex-row justify-around gap-4 text-center">
        <Button 
          variant="outline" 
          className="w-full md:w-auto border-fruity-green text-fruity-green hover:bg-fruity-green hover:text-white"
          asChild
        >
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp
          </a>
        </Button>

        <Button 
          variant="outline" 
          className="w-full md:w-auto border-fruity-green text-fruity-green hover:bg-fruity-green hover:text-white"
          asChild
        >
          <a href="tel:+919999999999">
            <Phone className="h-5 w-5 mr-2" /> Call Us
          </a>
        </Button>

        <Button 
          variant="outline" 
          className="w-full md:w-auto border-fruity-green text-fruity-green hover:bg-fruity-green hover:text-white"
          asChild
        >
          <a href="mailto:contact@fruityflow.com">
            <Mail className="h-5 w-5 mr-2" /> Email
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Contact;
