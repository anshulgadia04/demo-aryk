import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Instagram, Facebook, Twitter } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Header
        onCartClick={() => {}}
        onAuthClick={() => {}}
        cartCount={0}
        variant="solid"
      />
      
      <div className="min-h-screen bg-background pt-0">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-serif font-light text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We'd love to hear from you! Whether you have a question about our products, 
                need help with your order, or want to share your experience, we're here to help.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-background rounded-xl border">
                <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Email Us</h3>
                <p className="text-muted-foreground mb-2">
                  hello@arykorganics.com
                </p>
                <p className="text-muted-foreground text-sm">
                  We'll respond within 24 hours
                </p>
              </div>
              
              <div className="text-center p-6 bg-background rounded-xl border">
                <Phone className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Call Us</h3>
                <p className="text-muted-foreground mb-2">
                  +91 98765 43210
                </p>
                <p className="text-muted-foreground text-sm">
                  Mon-Sat, 9 AM - 6 PM IST
                </p>
              </div>
              
              <div className="text-center p-6 bg-background rounded-xl border">
                <MessageCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">Live Chat</h3>
                <p className="text-muted-foreground mb-2">
                  Available 24/7
                </p>
                <p className="text-muted-foreground text-sm">
                  Get instant help anytime
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl border">
                <h2 className="text-3xl font-serif font-light text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Inquiry Type
                    </label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleChange("inquiryType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us more..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-light text-foreground mb-6">
                    Visit Our Office
                  </h2>
                  <div className="bg-white p-6 rounded-xl border">
                    <div className="flex items-start gap-4 mb-4">
                      <MapPin className="h-6 w-6 text-blue-500 mt-1" />
                      <div>
                        <h3 className="font-medium text-foreground">Head Office</h3>
                        <p className="text-muted-foreground">
                          123 Nature Valley, Organic Lane<br />
                          Mumbai, Maharashtra 400001<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <Clock className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h3 className="font-medium text-foreground">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-purple-500 mt-1" />
                      <div>
                        <h3 className="font-medium text-foreground">Emergency Contact</h3>
                        <p className="text-muted-foreground">
                          For urgent matters: +91 98765 43211<br />
                          Available 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* FAQ Quick Links */}
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-4">
                    Quick Help
                  </h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      How to track my order?
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      What's your return policy?
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      How to choose the right product?
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Are your products cruelty-free?
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-light text-foreground text-center mb-12">
              Find Us
            </h2>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Interactive Map Coming Soon
                </p>
                <p className="text-gray-400">
                  We're working on adding an interactive map to help you find us easily
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-light mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our customer support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-blue-600">
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactUs;
