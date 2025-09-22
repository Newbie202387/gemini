"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Coffee,
  Laptop,
  Heart,
  ArrowRight,
  Briefcase,
  Upload,
  X,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import ScrollToTop from "../layout/ScrollToTop";

// Type definitions
interface Job {
  id: number | string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}

interface ApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

interface FileData {
  resume: File | null;
  portfolio: File | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  coverLetter?: string;
  resume?: string;
  portfolio?: string;
}

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Value {
  title: string;
  description: string;
}

interface ApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: globalThis.FormData) => Promise<void>;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantName: string;
}

// Application Modal Component
const ApplicationModal: React.FC<ApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const [files, setFiles] = useState<FileData>({
    resume: null,
    portfolio: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fileType: keyof FileData
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes =
        fileType === "resume"
          ? [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]
          : ["application/pdf", "image/jpeg", "image/png"];

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          [fileType]: "File size must be less than 5MB",
        }));
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        const typeText =
          fileType === "resume" ? "PDF or Word document" : "PDF, JPG, or PNG";
        setErrors((prev) => ({
          ...prev,
          [fileType]: `Please upload a ${typeText}`,
        }));
        return;
      }

      setFiles((prev) => ({ ...prev, [fileType]: file }));
      setErrors((prev) => ({ ...prev, [fileType]: "" }));
    }
  };

  const removeFile = (fileType: keyof FileData) => {
    setFiles((prev) => ({ ...prev, [fileType]: null }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.coverLetter.trim())
      newErrors.coverLetter = "Cover letter is required";
    if (!files.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || !job) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      // Add form data
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key as keyof ApplicationForm]);
      });

      // Add job info
      submitData.append("jobTitle", job.title);
      submitData.append("jobDepartment", job.department);

      // Add files
      if (files.resume) submitData.append("resume", files.resume);
      if (files.portfolio) submitData.append("portfolio", files.portfolio);

      await onSubmit(submitData);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        coverLetter: "",
        linkedinUrl: "",
        portfolioUrl: "",
      });
      setFiles({ resume: null, portfolio: null });
      setErrors({});
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-100">
              Apply for Position
            </h3>
            <p className="text-cyan-400 mt-1">{job?.title}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            title="Close modal"
            className="text-gray-400 hover:text-gray-200 transition-colors"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="John"
                required
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Doe"
                required
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="john@example.com"
                required
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
                required
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Resume * (PDF, DOC, DOCX - Max 5MB)
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                {files.resume ? (
                  <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-cyan-400 mr-2" />
                      <span className="text-gray-300">{files.resume.name}</span>
                    </div>
                    <button
                      type="button"
                      title="Remove file"
                      onClick={() => removeFile("resume")}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">
                      Click to upload your resume
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, "resume")}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Choose File
                    </label>
                  </>
                )}
              </div>
              {errors.resume && (
                <p className="text-red-400 text-sm mt-1">{errors.resume}</p>
              )}
            </div>

            {/* Portfolio Upload (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio (PDF, JPG, PNG - Max 5MB)
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                {files.portfolio ? (
                  <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-cyan-400 mr-2" />
                      <span className="text-gray-300">
                        {files.portfolio.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      title="Remove file"
                      onClick={() => removeFile("portfolio")}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 mb-2">
                      Upload portfolio samples
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "portfolio")}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label
                      htmlFor="portfolio-upload"
                      className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Choose File
                    </label>
                  </>
                )}
              </div>
              {errors.portfolio && (
                <p className="text-red-400 text-sm mt-1">{errors.portfolio}</p>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cover Letter *
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-vertical"
              placeholder="Tell us why you're interested in this position and how your experience makes you a great fit..."
              required
            />
            {errors.coverLetter && (
              <p className="text-red-400 text-sm mt-1">{errors.coverLetter}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-cyan-400 bg-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Success Modal
const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  applicantName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-gray-800 rounded-2xl max-w-md w-full p-8 border border-gray-700 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-100 mb-4">
          Application Submitted!
        </h3>

        <p className="text-gray-300 mb-6">
          Thank you for your interest, {applicantName}! We&apos;ve received your
          application and you should receive a confirmation email shortly.
          We&apos;ll review your application and get back to you within 5-7
          business days.
        </p>

        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-8 py-3"
        >
          Got it!
        </Button>
      </motion.div>
    </div>
  );
};

const Careers: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [applicantName, setApplicantName] = useState<string>("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const jobOpenings: Job[] = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Development",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      description:
        "We're looking for an experienced full stack developer to join our growing team and help build amazing web applications.",
      requirements: [
        "5+ years of experience with React/Next.js",
        "Strong backend skills (Node.js, PostgreSQL)",
        "Experience with modern deployment practices",
        "Excellent communication skills",
      ],
    },
    {
      id: 2,
      title: "UI-UX Designer",
      department: "Design",
      location: "Tampa, FL - Remote",
      type: "Full-time",
      salary: "$60,000 - $90,000",
      description:
        "Join our design team to create beautiful, user-centered interfaces that delight our clients and their customers.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio demonstrating modern design",
        "Understanding of web development principles",
      ],
    },
    {
      id: 3,
      title: "Project Manager",
      department: "Operations",
      location: "Tampa, FL",
      type: "Full-time",
      salary: "$55,000 - $75,000",
      description:
        "Help coordinate our client projects and ensure smooth delivery from conception to launch.",
      requirements: [
        "2+ years of project management experience",
        "Experience with web development projects",
        "Strong organizational and communication skills",
        "PMP certification preferred",
      ],
    },
  ];

  const benefits: Benefit[] = [
    {
      icon: Laptop,
      title: "Remote-First Culture",
      description:
        "Work from anywhere with flexible hours and modern equipment provided.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance and wellness programs for you and your family.",
    },
    {
      icon: Coffee,
      title: "Professional Growth",
      description:
        "Learning budget, conference attendance, and mentorship opportunities.",
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description:
        "Work with passionate professionals in a supportive, inclusive environment.",
    },
  ];

  const values: Value[] = [
    {
      title: "Innovation First",
      description:
        "We embrace new technologies and creative solutions to solve complex problems.",
    },
    {
      title: "Work-Life Balance",
      description:
        "We believe great work happens when people have time to recharge and pursue their passions.",
    },
    {
      title: "Continuous Learning",
      description:
        "We invest in our team's growth through training, conferences, and skill development.",
    },
    {
      title: "Client Success",
      description:
        "Every team member contributes to delivering exceptional results for our clients.",
    },
  ];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();

      console.log("Application submitted successfully:", result);

      // Get applicant name from form data
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      setApplicantName(`${firstName} ${lastName}`);

      // Close application modal and show success
      setShowApplicationModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        "There was an error submitting your application. Please try again."
      );
    }
  };

  const handleGeneralApplication = () => {
    const generalJob: Job = {
      id: "general",
      title: "General Application",
      department: "Various",
      location: "Remote/Tampa, FL",
      type: "Various",
      salary: "Competitive",
      description: "General application for future opportunities",
      requirements: [],
    };
    handleApplyClick(generalJob);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 py-5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join Our Amazing Team
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Help us create exceptional digital experiences while growing your
            career in a supportive, innovative environment.
          </motion.p>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Why Choose Gemini Pixel Craft?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 text-center group border border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Openings */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Current Openings
          </h3>
          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.3)",
                }}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="h-6 w-6 text-cyan-400" />
                      <h4 className="text-2xl font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
                        {job.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{job.description}</p>

                    {job.requirements.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-100 mb-2">
                          Requirements:
                        </h5>
                        <ul className="space-y-1 text-gray-400">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-cyan-400 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-48 flex-shrink-0">
                    <Button
                      onClick={() => handleApplyClick(job)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white py-3"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* General Application Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              Don&apos;t See Your Perfect Role?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We&apos;re always looking for talented individuals to join our
              team. If you don&apos;t see a position that matches your skills
              but believe you&apos;d be a great fit for Gemini Pixel Craft,
              we&apos;d love to hear from you!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleGeneralApplication}
                className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white px-8 py-3"
              >
                Submit General Application
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <ApplicationModal
        job={selectedJob}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        applicantName={applicantName}
      />

      {isLoaded && <ScrollToTop />}
    </section>
  );
};

export default Careers;
