import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: Mail, label: "Email", href: "mailto:singhshreya1505@gmail.com", color: "hover:text-primary" },
    { icon: Github, label: "GitHub", href: "https://github.com/ShreyaSingh1505", color: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shreya-singh-8ab20b311/", color: "hover:text-secondary" },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-card border-border focus:border-primary transition-colors"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-card border-border focus:border-primary transition-colors"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-card border-border focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Social Links */}
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-lg bg-muted/50 ${social.color} transition-all duration-300 group hover:bg-muted`}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <h4 className="text-lg font-semibold mb-2 text-foreground">Response Time</h4>
              <p className="text-muted-foreground">I typically respond within 24-48 hours during weekdays.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
