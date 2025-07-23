// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";
// import { motion, Variants } from "framer-motion";
// import { ArrowRight, CheckCircle2, X, Plus } from "lucide-react";
// // import { useCartStore } from "@/store/cartStore";
// import { useCartStore } from "@/store/data";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";

// // Validation schema
// const registrationSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
//   college: z.string().min(2, "College name is required"),
//   teamMembers: z
//     .array(
//       z.object({
//         name: z.string().min(2, "Name must be at least 2 characters"),
//         email: z.string().email("Please enter a valid email address"),
//       })
//     )
//     .optional(),
//   specialRequirements: z.string().optional(),
//   agreeToTerms: z.boolean().refine((val) => val === true, {
//     message: "You must agree to the terms and conditions",
//   }),
// });

// type RegistrationFormData = z.infer<typeof registrationSchema>;

// // Animation variants
// const containerVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4 },
//   },
// };

// const Registration = () => {
//   const { events, clearCart, removeEvent } = useCartStore();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [teamMembers, setTeamMembers] = useState<
//     Array<{ name: string; email: string }>
//   >([]);

//   const form = useForm<RegistrationFormData>({
//     resolver: zodResolver(registrationSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       college: "",
//       specialRequirements: "",
//       agreeToTerms: false,
//     },
//   });

//   const handleAddTeamMember = () => {
//     setTeamMembers([...teamMembers, { name: "", email: "" }]);
//   };

//   const handleRemoveTeamMember = (index: number) => {
//     const updatedMembers = [...teamMembers];
//     updatedMembers.splice(index, 1);
//     setTeamMembers(updatedMembers);
//   };

//   const handleRemoveEvent = (eventId: string) => {
//     removeEvent(eventId);
//     // Optional: Show a toast notification
//     const event = events.find((e) => e.id === eventId);
//     if (event) {
//       // toast.success(`Removed ${event.title} from registration`, {
//       //   position: "bottom-center",
//       //   style: {
//       //     background: "#ef4444",
//       //     color: "#fff",
//       //   },
//       // });
//     }
//   };

//   const handleTeamMemberChange = (
//     index: number,
//     field: "name" | "email",
//     value: string
//   ) => {
//     const updatedMembers = [...teamMembers];
//     updatedMembers[index] = { ...updatedMembers[index], [field]: value };
//     setTeamMembers(updatedMembers);
//   };

//   const onSubmit = async (data: RegistrationFormData) => {
//     setIsSubmitting(true);

//     // Prepare the complete registration data
//     const registrationData = {
//       ...data,
//       teamMembers,
//       events: events.map((event) => ({
//         id: event.id,
//         title: event.title,
//         // time: event.time,
//       })),
//     };

//     console.log("registratoindata:", registrationData);
//     // Simulate API call
//     const response = await axios.post("/api/registration", registrationData);
//     console.log("response...response:", response);
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     console.log("Registration data:", registrationData);
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     clearCart();
//   };

//   if (events.length === 0 && !isSubmitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black to-gray-900">
//         <Card className="w-full max-w-md border-emerald-700 bg-black/40 backdrop-blur-sm">
//           <CardContent className="p-8 text-center">
//             <h2 className="text-2xl font-bold text-emerald-400 mb-4">
//               Your Cart is Empty
//             </h2>
//             <p className="text-gray-300 mb-6">
//               You havent selected any events to register for.
//             </p>
//             <Link href="/timeline">
//               <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-black">
//                 Browse Events
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (isSubmitted) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black to-gray-900"
//       >
//         <Card className="w-full max-w-md border-emerald-700 bg-black/40 backdrop-blur-sm">
//           <CardContent className="p-8 text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             >
//               <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
//             </motion.div>
//             <h2 className="text-2xl font-bold text-emerald-400 mb-2">
//               Registration Successful!
//             </h2>
//             <p className="text-gray-300 mb-6">
//               Thank you for registering. You will receive a confirmation email
//               shortly.
//             </p>
//             <div className="space-y-3">
//               <Link href="/timeline">
//                 <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-black">
//                   Browse More Events
//                 </Button>
//               </Link>
//               <Button
//                 variant="outline"
//                 className="w-full border-emerald-600 text-emerald-400 hover:bg-emerald-900/30"
//                 onClick={() => {
//                   setIsSubmitted(false);
//                   form.reset();
//                 }}
//               >
//                 Register Another Participant
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 py-16 px-6">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-5xl mx-auto"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-10">
//           <h1 className="text-5xl font-extrabold text-emerald-400 mb-4 tracking-wide">
//             Event Registration
//           </h1>
//           <p className="text-xl text-emerald-200">
//             Complete your registration for the selected events
//           </p>
//         </motion.div>

//         <motion.div
//           variants={itemVariants}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         >
//           {/* Selected Events */}
//           <Card className="lg:col-span-1 rounded-2xl shadow-lg border border-emerald-700 bg-black/40 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <h3 className="text-2xl font-semibold text-emerald-300 mb-4 flex items-center gap-2">
//                 <span>Your Events</span>
//                 <span className="text-emerald-200 text-sm bg-emerald-900/50 px-2 py-1 rounded-full">
//                   {events.length}
//                 </span>
//               </h3>

//               <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2">
//                 {events.map((event) => (
//                   <motion.div
//                     key={event.id}
//                     className="p-3 rounded-lg bg-gray-800/50 border border-emerald-700/50 relative group"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <button
//                       onClick={() => handleRemoveEvent(event.id)}
//                       className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-2"
//                       aria-label={`Remove ${event.title}`}
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                     <h4 className="font-medium text-emerald-300 pr-4">
//                       {event.title}
//                     </h4>
//                     <p className="text-sm text-emerald-200 mt-1">
//                       {event.time}
//                     </p>
//                     <p className="text-xs text-emerald-400 mt-1">
//                       {event.participants}
//                     </p>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Clear All Button */}
//               {events.length > 0 && (
//                 <motion.div
//                   className="mt-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <Button
//                     variant="outline"
//                     className="w-full border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-300"
//                     onClick={clearCart}
//                   >
//                     <X className="h-4 w-4 mr-2" />
//                     Clear All Events
//                   </Button>
//                 </motion.div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Registration Form */}
//           <Card className="lg:col-span-2 rounded-2xl shadow-lg border border-emerald-700 bg-black/40 backdrop-blur-sm">
//             <CardContent className="p-8 mt-2">
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-8 text-emerald-100"
//                 >
//                   {/* Personal Information */}
//                   <motion.div variants={itemVariants} className="space-y-6">
//                     <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
//                       Participant Information
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <FormField
//                         control={form.control}
//                         name="firstName"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-emerald-200">
//                               First Name *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
//                                 placeholder="Enter your first name"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="lastName"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-emerald-200">
//                               Last Name *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
//                                 placeholder="Enter your last name"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-emerald-200">
//                               Email Address *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="email"
//                                 className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
//                                 placeholder="your.email@example.com"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="phone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-emerald-200">
//                               Phone Number *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="tel"
//                                 className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
//                                 placeholder="+91 9876543210"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <FormField
//                       control={form.control}
//                       name="college"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-emerald-200">
//                             College/Organization *
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
//                               placeholder="Your college or organization name"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Team Members */}
//                   {events.some((e) => e.participants.includes("Team")) && (
//                     <motion.div variants={itemVariants} className="space-y-6">
//                       <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
//                         Team Members
//                       </h3>
//                       <p className="text-emerald-200">
//                         Add your team members (if applicable)
//                       </p>

//                       <div className="space-y-4">
//                         {teamMembers.map((member, index) => (
//                           <div
//                             key={index}
//                             className="p-4 rounded-lg bg-gray-800/30 border border-emerald-700/50"
//                           >
//                             <div className="flex justify-between items-center mb-3">
//                               <span className="font-medium text-emerald-300">
//                                 Member #{index + 1}
//                               </span>
//                               <Button
//                                 type="button"
//                                 variant="ghost"
//                                 size="sm"
//                                 className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
//                                 onClick={() => handleRemoveTeamMember(index)}
//                               >
//                                 <X className="h-4 w-4" />
//                               </Button>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div>
//                                 <label className="block text-sm text-emerald-200 mb-1">
//                                   Name *
//                                 </label>
//                                 <Input
//                                   value={member.name}
//                                   onChange={(e) =>
//                                     handleTeamMemberChange(
//                                       index,
//                                       "name",
//                                       e.target.value
//                                     )
//                                   }
//                                   className="bg-black/60 text-emerald-100 border border-emerald-600"
//                                   placeholder="Member name"
//                                 />
//                                 {!member.name &&
//                                   index === teamMembers.length - 1 && (
//                                     <p className="text-xs text-red-400 mt-1">
//                                       Name is required
//                                     </p>
//                                   )}
//                               </div>
//                               <div>
//                                 <label className="block text-sm text-emerald-200 mb-1">
//                                   Email *
//                                 </label>
//                                 <Input
//                                   type="email"
//                                   value={member.email}
//                                   onChange={(e) =>
//                                     handleTeamMemberChange(
//                                       index,
//                                       "email",
//                                       e.target.value
//                                     )
//                                   }
//                                   className="bg-black/60 text-emerald-100 border border-emerald-600"
//                                   placeholder="member@example.com"
//                                 />
//                                 {!member.email &&
//                                   index === teamMembers.length - 1 && (
//                                     <p className="text-xs text-red-400 mt-1">
//                                       Valid email is required
//                                     </p>
//                                   )}
//                               </div>
//                             </div>
//                           </div>
//                         ))}

//                         <Button
//                           type="button"
//                           variant="outline"
//                           className="border-emerald-600 text-emerald-400 hover:bg-emerald-900/30 w-full"
//                           onClick={handleAddTeamMember}
//                         >
//                           <Plus className="h-4 w-4 mr-2" />
//                           Add Team Member
//                         </Button>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Special Requirements */}
//                   <motion.div variants={itemVariants} className="space-y-6">
//                     <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
//                       Additional Information
//                     </h3>

//                     <FormField
//                       control={form.control}
//                       name="specialRequirements"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-emerald-200">
//                             Special Requirements
//                           </FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder="Any dietary restrictions, accessibility needs, or other requirements..."
//                               className="bg-black/60 text-emerald-100 border border-emerald-600 min-h-[100px]"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Terms */}
//                   <motion.div variants={itemVariants} className="space-y-6">
//                     <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
//                       Terms & Conditions
//                     </h3>

//                     <FormField
//                       control={form.control}
//                       name="agreeToTerms"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                           <FormControl>
//                             <Checkbox
//                               checked={field.value}
//                               onCheckedChange={field.onChange}
//                               className="text-emerald-400 border-emerald-600"
//                             />
//                           </FormControl>
//                           <div className="space-y-1 leading-tight">
//                             <FormLabel className="text-emerald-200">
//                               I agree to the terms and conditions *
//                             </FormLabel>
//                             <p className="text-sm text-emerald-400">
//                               You agree to our terms of service and privacy
//                               policy.
//                             </p>
//                             <FormMessage />
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Submit */}
//                   <motion.div variants={itemVariants}>
//                     <Button
//                       type="submit"
//                       className="w-full py-6 text-lg font-bold shadow-xl bg-emerald-600 hover:bg-emerald-700 text-black"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{
//                             duration: 1,
//                             repeat: Infinity,
//                             ease: "linear",
//                           }}
//                           className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
//                         />
//                       ) : (
//                         <ArrowRight className="w-5 h-5 mr-2" />
//                       )}
//                       {isSubmitting ? "Processing..." : "Complete Registration"}
//                     </Button>
//                   </motion.div>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Registration;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, X, Plus } from "lucide-react";
import { useCartStore } from "@/store/data";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

// Validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  college: z.string().min(2, "College name is required"),
  teamMembers: z
    .array(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
      })
    )
    .optional()
    .refine(
      (members) => {
        if (!members || members.length === 0) return true;
        const emails = members.map((m) => m.email);
        return new Set(emails).size === emails.length;
      },
      { message: "Team member emails must be unique" }
    ),
  specialRequirements: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
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
  const { events, clearCart, removeEvent } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [teamMembers, setTeamMembers] = useState<
    Array<{ name: string; email: string }>
  >([]);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      college: "",
      specialRequirements: "",
      agreeToTerms: false,
    },
  });

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "" }]);
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  const handleRemoveEvent = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    removeEvent(eventId);
    if (event) {
      toast.success(`Removed ${event.title} from registration`, {
        position: "bottom-center",
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
    }
  };

  const handleTeamMemberChange = (
    index: number,
    field: "name" | "email",
    value: string
  ) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    const registrationData = {
      ...data,
      teamMembers,
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
      })),
    };

    try {
      const response = await axios.post("/api/registration", registrationData);
      console.log("Registration response:", response.data);
      toast.success(
        "Registration successful! Check your email for confirmation.",
        {
          position: "bottom-center",
          style: {
            background: "#10b981",
            color: "#fff",
          },
        }
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
      clearCart();
    } catch (error: any) {
      console.error("Error during submission:", error.response?.data || error);
      setIsSubmitting(false);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "bottom-center",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  if (events.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black to-gray-900">
        <Card className="w-full max-w-md border-emerald-700 bg-black/40 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-300 mb-6">
              You havent selected any events to register for.
            </p>
            <Link href="/timeline">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-black">
                Browse Events
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black to-gray-900"
      >
        <Card className="w-full max-w-md border-emerald-700 bg-black/40 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-300 mb-6">
              Thank you for registering for TECHNICIA&apos;25. Check your email for
              confirmation.
            </p>
            <div className="space-y-3">
              <Link href="/timeline">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-black">
                  Browse More Events
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-400 hover:bg-emerald-900/30"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
              >
                Register Another Participant
              </Button>
            </div>
          </CardContent>
        </Card>
        <Toaster />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 py-16 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-emerald-400 mb-4 tracking-wide">
            TECHNICIA&apos;25 Registration
          </h1>
          <p className="text-xl text-emerald-200">
            Complete your registration for the selected events
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Selected Events */}
          <Card className="lg:col-span-1 rounded-2xl shadow-lg border border-emerald-700 bg-black/40 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                <span>Your Events</span>
                <span className="text-emerald-200 text-sm bg-emerald-900/50 px-2 py-1 rounded-full">
                  {events.length}
                </span>
              </h3>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    className="p-3 rounded-lg bg-gray-800/50 border border-emerald-700/50 relative group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-2"
                      aria-label={`Remove ${event.title}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <h4 className="font-medium text-emerald-300 pr-4">
                      {event.title}
                    </h4>
                    <p className="text-sm text-emerald-200 mt-1">
                      {event.time}
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">
                      {event.participants}
                    </p>
                  </motion.div>
                ))}
              </div>

              {events.length > 0 && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    onClick={() => {
                      clearCart();
                      toast.success("All events cleared from cart", {
                        position: "bottom-center",
                        style: {
                          background: "#10b981",
                          color: "#fff",
                        },
                      });
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Events
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="lg:col-span-2 rounded-2xl shadow-lg border border-emerald-700 bg-black/40 backdrop-blur-sm">
            <CardContent className="p-8 mt-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 text-emerald-100"
                >
                  {/* Personal Information */}
                  <motion.div variants={itemVariants} className="space-y-6">
                    <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
                      Participant Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-emerald-200">
                              First Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
                                placeholder="Enter your first name"
                                {...field}
                              />
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
                            <FormLabel className="text-emerald-200">
                              Last Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
                                placeholder="Enter your last name"
                                {...field}
                              />
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
                            <FormLabel className="text-emerald-200">
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
                                placeholder="your.email@example.com"
                                {...field}
                              />
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
                            <FormLabel className="text-emerald-200">
                              Phone Number *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
                                placeholder="+91 9876543210"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-200">
                            College/Organization *
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-black/60 text-emerald-100 border border-emerald-600 focus:ring-emerald-500"
                              placeholder="Your college or organization name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Team Members */}
                  {events.some((e) => e.participants.includes("Team")) && (
                    <motion.div variants={itemVariants} className="space-y-6">
                      <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
                        Team Members
                      </h3>
                      <p className="text-emerald-200">
                        Add your team members (if applicable)
                      </p>

                      <div className="space-y-4">
                        {teamMembers.map((member, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-lg bg-gray-800/30 border border-emerald-700/50"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-medium text-emerald-300">
                                Member #{index + 1}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                onClick={() => handleRemoveTeamMember(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-emerald-200 mb-1">
                                  Name *
                                </label>
                                <Input
                                  value={member.name}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="bg-black/60 text-emerald-100 border border-emerald-600"
                                  placeholder="Member name"
                                />
                                {!member.name &&
                                  index === teamMembers.length - 1 && (
                                    <p className="text-xs text-red-400 mt-1">
                                      Name is required
                                    </p>
                                  )}
                              </div>
                              <div>
                                <label className="block text-sm text-emerald-200 mb-1">
                                  Email *
                                </label>
                                <Input
                                  type="email"
                                  value={member.email}
                                  onChange={(e) =>
                                    handleTeamMemberChange(
                                      index,
                                      "email",
                                      e.target.value
                                    )
                                  }
                                  className="bg-black/60 text-emerald-100 border border-emerald-600"
                                  placeholder="member@example.com"
                                />
                                {!member.email &&
                                  index === teamMembers.length - 1 && (
                                    <p className="text-xs text-red-400 mt-1">
                                      Valid email is required
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          className="border-emerald-600 text-emerald-400 hover:bg-emerald-900/30 w-full"
                          onClick={handleAddTeamMember}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Team Member
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Special Requirements */}
                  <motion.div variants={itemVariants} className="space-y-6">
                    <h3 className="text-2xl font-semibold text-emerald-300 border-b border-emerald-600 pb-2">
                      Additional Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="specialRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-200">
                            Special Requirements
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any dietary restrictions, accessibility needs, or other requirements..."
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
                              You agree to our terms of service and privacy
                              policy.
                            </p>
                            <FormMessage />
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
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
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
      <Toaster />
    </div>
  );
};

export default Registration;
