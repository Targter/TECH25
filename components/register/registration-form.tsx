"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { competitions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// Validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  competition: z.string().min(1, "Please select a competition"),
  experience: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your experience level",
  }),
  teamName: z.string().optional(),
  specialRequirements: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  agreeToMarketing: z.boolean().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      competition: "",
      teamName: "",
      specialRequirements: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Registration data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering. You will receive a confirmation email shortly.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              className="w-full"
            >
              Register Another Participant
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-black  py-16 px-6">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-emerald-400 mb-4 tracking-wide">
          Competition Registration
        </h1>
        <p className="text-xl text-emerald-200">
          Join us for an exciting competition experience
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="rounded-2xl shadow-lg border border-emerald-700 bg-black/40 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 text-emerald-100">
                {/* Personal Information */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-200">First Name</FormLabel>
                          <FormControl>
                            <Input className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500" placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-200">Last Name</FormLabel>
                          <FormControl>
                            <Input className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500" placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-200">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-200">Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500" placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-200">Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Competition Details */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
                    Competition Details
                  </h3>

                  <FormField
                    control={form.control}
                    name="competition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-200">Select Competition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/60 text-emerald-100 border border-emerald-600">
                              <SelectValue placeholder="Choose a competition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black text-emerald-100 border border-emerald-600">
                            {competitions.map((competition) => (
                              <SelectItem key={competition.id} value={competition.id.toString()}>
                                {competition.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-200">Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/60 text-emerald-100 border border-emerald-600">
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black text-emerald-100 border border-emerald-600">
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-200">Team Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Team Phoenix" className="bg-black/60 text-emerald-100 border border-emerald-600" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-200">Special Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any dietary restrictions or other needs..."
                            className="bg-black/60 text-emerald-100 border border-emerald-600 min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Terms */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
                    Terms & Conditions
                  </h3>

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="text-emerald-400 border-emerald-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-tight">
                          <FormLabel className="text-emerald-200">
                            I agree to the terms and conditions *
                          </FormLabel>
                          <p className="text-sm text-emerald-400">
                            You agree to our terms of service and privacy policy.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToMarketing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="text-emerald-400 border-emerald-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-tight">
                          <FormLabel className="text-emerald-200">
                            I’d like to receive event updates
                          </FormLabel>
                          <p className="text-sm text-emerald-400">
                            Stay informed about future competitions.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg font-bold shadow-xl bg-emerald-600 hover:bg-emerald-700 text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <ArrowRight className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  </div>
);

};

export default Registration;