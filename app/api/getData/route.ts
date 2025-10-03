import { NextRequest, NextResponse } from 'next/server';
import Registration from '@/app/models/user.models';


// Connect to MongoDB
// async function connectToDatabase() {
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(MONGODB_URI);
//   }
// }

import { connectToDatabase } from '@/lib/db';
// Connect to MongoDB
await connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'registrationDate';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build search filter
    const searchFilter = search ? {
      $or: [
        { 'primaryParticipant.name': { $regex: search, $options: 'i' } },
        { 'primaryParticipant.email': { $regex: search, $options: 'i' } },
        { 'primaryParticipant.college': { $regex: search, $options: 'i' } },
        { 'teamMembers.name': { $regex: search, $options: 'i' } },
        { 'teamMembers.email': { $regex: search, $options: 'i' } },
        { 'events.title': { $regex: search, $options: 'i' } }
      ]
    } : {};

    // Build sort object
    // const sort: any = {};
        const sort: Record<string, 1 | -1> = {};

    if (sortBy.includes('primaryParticipant.')) {
      const field = sortBy.replace('primaryParticipant.', '');
      sort[`primaryParticipant.${field}`] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Get registrations with pagination
    const registrations = await Registration.find(searchFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Registration.countDocuments(searchFilter);

    return NextResponse.json({
      registrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}