import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setError(false);
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill all the fields");
      setError(true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);

    try {

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("subject", formData.subject);
      submitData.append("message", formData.message);
  
      const response = await axios.post(
        "https://tssrcouncil.com/sendEmail.php",
        formData,
      );
      if (response.status === 200) {
        toast.success("Thank you for your message. We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }

  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center flex-col justify-center p-4">
      <div className="w-full h-20"></div>
      <Card className="w-full max-w-5xl bg-white shadow-lg">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Contact Information */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                    WE'RE HERE TO HELP YOU
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Expand Your Training Institute with TSSR Council
                  </h1>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  Are you an educational institution or training center looking
                  to expand your offerings? Technical Study and Skill Research
                  (TSSR) Council provides franchise opportunities for
                  institutions that conduct short-term technical and skill-based
                  training programs.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">E-mail</p>
                      <p className="text-gray-900 font-medium">
                        tssrcouncil@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone number</p>
                      <p className="text-gray-900 font-medium">
                        +91 9400 867 461
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="bg-gray-50 p-8 md:p-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    type="text"
                    placeholder="Jane Smith"
                    className={`bg-white  ${
                      error && formData.name === ""
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="jane@frame.com"
                    className={`bg-white  ${
                      error && formData.email === ""
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="Subject"
                    className="text-sm font-medium text-gray-700"
                  >
                    Subject
                  </Label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    id="Subject"
                    type="text"
                    placeholder="Subject of mail"
                    className={`bg-white  ${
                      error && formData.subject === ""
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`bg-white  ${
                      error && formData.message === ""
                        ? "border-red-500"
                        : "border-gray-200"
                    } resize-none`}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Get a Solution"
                  )}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
