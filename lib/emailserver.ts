// // import nodemailer from "nodemailer"

// // // Configure transporter using your SMTP service credentials
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // const sendConfirmationEmail = async (toEmail:string, fullName:string) => {
// //   const mailOptions = {
// //     from: `"CUMUN 2025 Registration" <${process.env.EMAIL_USER}>`,
// //     to: toEmail,
// //     subject: "Welcome to CUMUN 2025 – Registration Confirmation",
// //     html: `
// //       <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
// //         <p>Dear ${fullName},</p>

// //         <p>Thank you for registering for <strong>CUMUN 2025</strong>, hosted by the <strong>ISTE Student Chapter</strong> at <strong>Chandigarh University</strong>. We are thrilled to have you join us for this prestigious Model United Nations event, scheduled to be held during the <strong>first week of September 2025</strong> as a proud part of <strong>Technisia 2025</strong>.</p>

// //         <p>Our team has successfully received your registration details and will be reaching out to you shortly regarding the next steps, including allotments, event guidelines, and participation formalities.</p>

// //         <p style="color: #c0392b;"><strong>Important Notice:</strong><br/>
// //         Please <u>do not make any payments</u> to unofficial sources. All official communication and updates will be shared by the CUMUN 2025 team only.</p>

// //         <p>Stay connected with us on Instagram for real-time updates on <strong>portfolio matrix releases</strong>, <strong>event announcements</strong>, and more:<br/>
// //         👉 <a href="https://www.instagram.com/cumodelunitednations?igsh=OG1xZWxtY3hweDRw" style="color: #2980b9;">@cumunofficial</a></p>

// //         <p>If you have any queries, feel free to contact us at <a href="mailto: iste@cumail.in ">iste.cu@chandigarh.edu</a></p>

// //         <p>Warm regards,<br/>
// //         <strong>Team CUMUN 2025</strong><br/>
// //         ISTE Student Chapter<br/>
// //         Chandigarh University</p>
// //       </div>
// //     `,
// //   };

// //   try {
// //     let info = await transporter.sendMail(mailOptions);
// //     console.log("Email sent: ", info.response);
// //   } catch (err) {
// //     console.error("Error sending email:", err);
// //     throw err;
// //   }
// // };

// // export default sendConfirmationEmail


// import nodemailer from 'nodemailer';

// // Configure transporter using your SMTP service credentials
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendConfirmationEmail = async (
//   toEmail: string,
//   fullName: string,
//   events: { id: string; title: string }[],
//   teamMembers: { name: string; email: string }[],
//   specialRequirements: string
// ) => {
//   const eventList = events
//     .map((event) => `<li>${event.title}</li>`)
//     .join('');
//   const teamMemberList = teamMembers.length
//     ? teamMembers
//         .map((member) => `<li>${member.name} (${member.email})</li>`)
//         .join('')
//     : '<li>None</li>';

//   const mailOptions = {
//     from: `"CUMUN 2025 Registration" <${process.env.EMAIL_USER}>`,
//     to: toEmail,
//     subject: 'CUMUN 2025 – Registration Confirmation',
//     html: `
//       <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//         <p>Dear ${fullName},</p>

//         <p>Thank you for registering for <strong>CUMUN 2025</strong>, hosted by the <strong>ISTE Student Chapter</strong> at <strong>Chandigarh University</strong>. We are thrilled to have you join us for this prestigious Model United Nations event, scheduled to be held during the <strong>first week of September 2025</strong> as a proud part of <strong>Technisia 2025</strong>.</p>

//         <h3>Your Registered Events:</h3>
//         <ul>
//           ${eventList}
//         </ul>

//         <h3>Your Team Members:</h3>
//         <ul>
//           ${teamMemberList}
//         </ul>

//         ${
//           specialRequirements && specialRequirements !== 'none'
//             ? `
//               <h3>Special Requirements:</h3>
//               <p>${specialRequirements}</p>
//             `
//             : ''
//         }

//         <p>Our team has successfully received your registration details and will be reaching out to you shortly regarding the next steps, including allotments, event guidelines, and participation formalities.</p>

//         <p style="color: #c0392b;"><strong>Important Notice:</strong><br/>
//         Please <u>do not make any payments</u> to unofficial sources. All official communication and updates will be shared by the CUMUN 2025 team only.</p>

//         <p>Stay connected with us on Instagram for real-time updates on <strong>portfolio matrix releases</strong>, <strong>event announcements</strong>, and more:<br/>
//         👉 <a href="https://www.instagram.com/cumodelunitednations?igsh=OG1xZWxtY3hweDRw" style="color: #2980b9;">@cumunofficial</a></p>

//         <p>If you have any queries, feel free to contact us at <a href="mailto:iste@cumail.in">iste.cu@chandigarh.edu</a></p>

//         <p>Warm regards,<br/>
//         <strong>Team CUMUN 2025</strong><br/>
//         ISTE Student Chapter<br/>
//         Chandigarh University</p>
//       </div>
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     return info;
//   } catch (err) {
//     console.error('Error sending email:', err);
//     throw new Error('Failed to send confirmation email');
//   }
// };

// export default sendConfirmationEmail;


// 

import nodemailer from 'nodemailer';

// Configure transporter using your SMTP service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (
  toEmail: string,
  fullName: string,
  events: { id: string; title: string }[],
  teamMembers: { name: string; email: string }[],
  specialRequirements: string
) => {
  const eventList = events
    .map((event) => `<li>${event.title}</li>`)
    .join('');
  const teamMemberList = teamMembers.length
    ? teamMembers
        .map((member) => `<li>${member.name} (${member.email})</li>`)
        .join('')
    : '<li>None</li>';

  const mailOptions = {
    from: `"Technisia 2025 Registration" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Technisia 2025 – Registration Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Dear ${fullName},</p>

        <p>Congratulations on registering for <strong>Technisia 2025</strong>, one of the largest and most vibrant events hosted by the <strong>ISTE Student Chapter</strong> at <strong>Chandigarh University</strong>! With over <strong>50,000 registrations</strong>, this spectacular 3-day event is packed with a variety of exciting activities, including games, event bootcamps, Model United Nations conferences, and so much more!</p>

        <p>You are now officially part of this incredible experience, scheduled for the <strong>first week of September 2025</strong>. Get ready for an unforgettable journey of learning, competition, and fun!</p>

        <h3>Your Registered Events:</h3>
        <ul>
          ${eventList}
        </ul>

        <h3>Your Team Members:</h3>
        <ul>
          ${teamMemberList}
        </ul>

        ${
          specialRequirements && specialRequirements !== 'none'
            ? `
              <h3>Special Requirements:</h3>
              <p>${specialRequirements}</p>
            `
            : ''
        }

        <p>Our team has successfully received your registration details and will reach out soon with the next steps, including event allotments, guidelines, and participation details.</p>

        <p style="color: #c0392b;"><strong>Important Notice:</strong><br/>
        Please <u>do not make any payments</u> to unofficial sources. All official communication and updates will be shared by the Technisia 2025 team only.</p>

        <p>Want to explore more? <a href="https://your-event-site.com/timeline" style="color: #2980b9;">Browse more events</a> and join additional activities to make the most of Technisia 2025!</p>

        <p>Stay connected with us on Instagram for real-time updates on <strong>event announcements</strong>, <strong>schedules</strong>, and more:<br/>
        👉 <a href="https://www.instagram.com/cumodelunitednations?igsh=OG1xZWxtY3hweDRw" style="color: #2980b9;">@cumunofficial</a></p>

        <p>If you have any queries, feel free to contact us at <a href="mailto:iste@cumail.in" style="color: #2980b9;">iste.cu@chandigarh.edu</a>.</p>

        <p>Warm regards,<br/>
        <strong>Team Technisia 2025</strong><br/>
        ISTE Student Chapter<br/>
        Chandigarh University</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send confirmation email');
  }
};

export default sendConfirmationEmail;