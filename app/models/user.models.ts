import mongoose, { Document, Schema } from 'mongoose';

interface ITeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
}

interface IEvent {
  id: string;
  title: string;
}

interface IPrimaryParticipant {
  name: string;
  email: string;
  phone: string;
  college: string;
}

interface IRegistration extends Document {
  primaryParticipant: IPrimaryParticipant;
  teamMembers: ITeamMember[];
  specialRequirements: string;
  events: IEvent[];
  agreeToTerms: boolean;
  registrationDate: Date;
}

const teamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  college: { type: String, default: '' }
});

const eventSchema = new Schema<IEvent>({
  id: { type: String, required: true },
  title: { type: String, required: true }
});

const registrationSchema = new Schema<IRegistration>({
  primaryParticipant: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true }
  },
  teamMembers: [teamMemberSchema],
  specialRequirements: { type: String, default: 'none' },
  events: [eventSchema],
  agreeToTerms: { type: Boolean, required: true },
  registrationDate: { type: Date, default: Date.now }
});

// Compound index to prevent duplicate registrations per event
registrationSchema.index(
  { 'primaryParticipant.email': 1, 'events.id': 1 },
  { unique: true }
);

const Registration = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', registrationSchema);
export default Registration;