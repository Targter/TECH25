// "use client";

// import { useState, useEffect } from "react";

// interface ITeamMember {
//   name: string;
//   email: string;
//   phone: string;
//   college: string;
// }

// interface IEvent {
//   id: string;
//   title: string;
// }

// interface IPrimaryParticipant {
//   name: string;
//   email: string;
//   phone: string;
//   college: string;
// }

// interface IRegistration {
//   _id: string;
//   primaryParticipant: IPrimaryParticipant;
//   teamMembers: ITeamMember[];
//   specialRequirements: string;
//   events: IEvent[];
//   agreeToTerms: boolean;
//   registrationDate: string;
// }

// interface PaginationInfo {
//   page: number;
//   limit: number;
//   total: number;
//   pages: number;
// }

// export default function AdminPanel() {
//   const [registrations, setRegistrations] = useState<IRegistration[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("registrationDate");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [pagination, setPagination] = useState<PaginationInfo>({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0,
//   });
//   const [selectedRegistration, setSelectedRegistration] =
//     useState<IRegistration | null>(null);

//   const fetchRegistrations = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         search,
//         sortBy,
//         sortOrder,
//         page: pagination.page.toString(),
//         limit: pagination.limit.toString(),
//       });

//       const response = await fetch(`/api/getData?${params}`);
//       const data = await response.json();

//       if (response.ok) {
//         setRegistrations(data.registrations);
//         setPagination(data.pagination);
//       } else {
//         console.error("Error fetching data:", data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching registrations:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRegistrations();
//   }, [pagination.page, pagination.limit, sortBy, sortOrder]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchRegistrations();
//   };

//   const handleSort = (field: string) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     setPagination((prev) => ({ ...prev, page: newPage }));
//   };

//   const handleLimitChange = (newLimit: number) => {
//     setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
//   };

//   const SortIcon = ({ field }: { field: string }) => {
//     if (sortBy !== field) return <span>↕️</span>;
//     return sortOrder === "asc" ? <span>⬆️</span> : <span>⬇️</span>;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Registration Admin Panel
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage and view all event registrations
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
//             <div className="flex-1 min-w-[300px]">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name, email, college, or event..."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//               />
//             </div>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Search
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setSearch("");
//                 setSortBy("registrationDate");
//                 setSortOrder("desc");
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//                 fetchRegistrations();
//               }}
//               className="px-6 py-2 bg-gray-500 text-black rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               Reset
//             </button>
//           </form>

//           {/* Results Count */}
//           <div className="mt-4 text-sm text-gray-600">
//             Showing {registrations.length} of {pagination.total} registrations
//           </div>
//         </div>

//         {/* Registrations Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {loading ? (
//             <div className="flex justify-center items-center p-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                         onClick={() => handleSort("primaryParticipant.name")}
//                       >
//                         <div className="flex items-center gap-2">
//                           Primary Participant
//                           <SortIcon field="primaryParticipant.name" />
//                         </div>
//                       </th>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                         onClick={() => handleSort("primaryParticipant.email")}
//                       >
//                         <div className="flex items-center gap-2">
//                           Email
//                           <SortIcon field="primaryParticipant.email" />
//                         </div>
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Team Size
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Events
//                       </th>
//                       <th
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                         onClick={() => handleSort("registrationDate")}
//                       >
//                         <div className="flex items-center gap-2">
//                           Registration Date
//                           <SortIcon field="registrationDate" />
//                         </div>
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {registrations.map((registration) => (
//                       <tr key={registration._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {registration.primaryParticipant.name}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {registration.primaryParticipant.college}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {registration.primaryParticipant.phone}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {registration.primaryParticipant.email}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {registration.teamMembers.length + 1}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex flex-wrap gap-1">
//                             {registration.events.map((event) => (
//                               <span
//                                 key={event.id}
//                                 className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                               >
//                                 {event.title}
//                               </span>
//                             ))}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {new Date(
//                             registration.registrationDate
//                           ).toLocaleDateString()}{" "}
//                           at{" "}
//                           {new Date(
//                             registration.registrationDate
//                           ).toLocaleTimeString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button
//                             onClick={() =>
//                               setSelectedRegistration(registration)
//                             }
//                             className="text-blue-600 hover:text-blue-900 mr-4"
//                           >
//                             View Details
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 text-black">
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-gray-700">Show</span>
//                   <select
//                     value={pagination.limit}
//                     onChange={(e) => handleLimitChange(Number(e.target.value))}
//                     className="border border-gray-300 rounded-md px-3 py-1 text-sm"
//                   >
//                     <option value="10">10</option>
//                     <option value="25">25</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </select>
//                   <span className="text-sm text-gray-700">per page</span>
//                 </div>
//                 <div className="flex gap-2 text-black">
//                   <button
//                     onClick={() => handlePageChange(pagination.page - 1)}
//                     disabled={pagination.page === 1}
//                     className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed text-black"
//                   >
//                     Previous
//                   </button>
//                   <span className="px-3 py-1 text-sm text-gray-700">
//                     Page {pagination.page} of {pagination.pages}
//                   </span>
//                   <button
//                     onClick={() => handlePageChange(pagination.page + 1)}
//                     disabled={pagination.page === pagination.pages}
//                     className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Registration Details Modal */}
//       {selectedRegistration && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Registration Details
//                 </h2>
//                 <button
//                   onClick={() => setSelectedRegistration(null)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Primary Participant */}
//                 <div className="col-span-2">
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
//                     Primary Participant
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         Name
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedRegistration.primaryParticipant.name}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         Email
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedRegistration.primaryParticipant.email}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         Phone
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedRegistration.primaryParticipant.phone}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         College
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedRegistration.primaryParticipant.college}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Team Members */}
//                 {selectedRegistration.teamMembers.length > 0 && (
//                   <div className="col-span-2">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
//                       Team Members ({selectedRegistration.teamMembers.length})
//                     </h3>
//                     <div className="space-y-4">
//                       {selectedRegistration.teamMembers.map((member, index) => (
//                         <div key={index} className="border rounded-lg p-4">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <label className="text-sm font-medium text-gray-500">
//                                 Name
//                               </label>
//                               <p className="text-gray-900">{member.name}</p>
//                             </div>
//                             <div>
//                               <label className="text-sm font-medium text-gray-500">
//                                 Email
//                               </label>
//                               <p className="text-gray-900">{member.email}</p>
//                             </div>
//                             <div>
//                               <label className="text-sm font-medium text-gray-500">
//                                 Phone
//                               </label>
//                               <p className="text-gray-900">
//                                 {member.phone || "Not provided"}
//                               </p>
//                             </div>
//                             <div>
//                               <label className="text-sm font-medium text-gray-500">
//                                 College
//                               </label>
//                               <p className="text-gray-900">
//                                 {member.college || "Not provided"}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Events */}
//                 <div className="col-span-2">
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
//                     Registered Events ({selectedRegistration.events.length})
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedRegistration.events.map((event) => (
//                       <span
//                         key={event.id}
//                         className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
//                       >
//                         {event.title}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Additional Information */}
//                 <div className="col-span-2">
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
//                     Additional Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         Special Requirements
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedRegistration.specialRequirements || "None"}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         Terms Accepted
//                       </label>
//                       <p className="text-gray-900">
//                         {selectedRegistration.agreeToTerms ? "Yes" : "No"}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-500">
//                         Registration Date
//                       </label>
//                       <p className="text-gray-900">
//                         {new Date(
//                           selectedRegistration.registrationDate
//                         ).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={() => setSelectedRegistration(null)}
//                   className="px-6 py-2 bg-gray-500 text-black rounded-lg hover:bg-gray-600 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";

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

interface IRegistration {
  _id: string;
  primaryParticipant: IPrimaryParticipant;
  teamMembers: ITeamMember[];
  specialRequirements: string;
  events: IEvent[];
  agreeToTerms: boolean;
  registrationDate: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState<IRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("registrationDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [selectedRegistration, setSelectedRegistration] =
    useState<IRegistration | null>(null);
  const [downloading, setDownloading] = useState(false);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        sortBy,
        sortOrder,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      const response = await fetch(`/api/getData?${params}`);
      const data = await response.json();

      if (response.ok) {
        setRegistrations(data.registrations);
        setPagination(data.pagination);
      } else {
        console.error("Error fetching data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  }, [search, sortBy, sortOrder, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  // Function to download Excel file
  const downloadExcel = async () => {
    setDownloading(true);
    try {
      // Fetch all data without pagination for export
      const params = new URLSearchParams({
        search,
        sortBy: "registrationDate",
        sortOrder: "desc",
        page: "1",
        limit: "10000", // Large number to get all data
      });

      const response = await fetch(`/api/getData?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      // Convert data to CSV format
      const csvData = convertToCSV(data.registrations);

      // Create and download the file
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `registrations-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel:", error);
      alert("Failed to download registrations. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Function to convert registrations to CSV format
  const convertToCSV = (data: IRegistration[]): string => {
    const headers = [
      "Primary Name",
      "Primary Email",
      "Primary Phone",
      "Primary College",
      "Team Size",
      "Events",
      "Team Members",
      "Special Requirements",
      "Terms Accepted",
      "Registration Date",
    ];

    const csvRows = [headers.join(",")];

    data.forEach((registration) => {
      const events = registration.events.map((e) => e.title).join("; ");
      const teamMembers = registration.teamMembers
        .map((member) => `${member.name} (${member.email})`)
        .join("; ");

      const row = [
        `"${registration.primaryParticipant.name}"`,
        `"${registration.primaryParticipant.email}"`,
        `"${registration.primaryParticipant.phone}"`,
        `"${registration.primaryParticipant.college}"`,
        (registration.teamMembers.length + 1).toString(),
        `"${events}"`,
        `"${teamMembers}"`,
        `"${registration.specialRequirements || "None"}"`,
        registration.agreeToTerms ? "Yes" : "No",
        `"${new Date(registration.registrationDate).toLocaleString()}"`,
      ];

      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <span>↕️</span>;
    return sortOrder === "asc" ? <span>⬆️</span> : <span>⬇️</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Registration Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and view all event registrations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <form
              onSubmit={handleSearch}
              className="flex gap-4 flex-wrap flex-1"
            >
              <div className="flex-1 min-w-[300px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, college, or event..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSortBy("registrationDate");
                  setSortOrder("desc");
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </form>

            {/* Download Button */}
            <button
              onClick={downloadExcel}
              disabled={downloading || pagination.total === 0}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Excel ({pagination.total})
                </>
              )}
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {registrations.length} of {pagination.total} registrations
          </div>
        </div>

        {/* Rest of your existing JSX remains the same */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("primaryParticipant.name")}
                      >
                        <div className="flex items-center gap-2">
                          Primary Participant
                          <SortIcon field="primaryParticipant.name" />
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("primaryParticipant.email")}
                      >
                        <div className="flex items-center gap-2">
                          Email
                          <SortIcon field="primaryParticipant.email" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Events
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("registrationDate")}
                      >
                        <div className="flex items-center gap-2">
                          Registration Date
                          <SortIcon field="registrationDate" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((registration) => (
                      <tr key={registration._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {registration.primaryParticipant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {registration.primaryParticipant.college}
                            </div>
                            <div className="text-sm text-gray-500">
                              {registration.primaryParticipant.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {registration.primaryParticipant.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {registration.teamMembers.length + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {registration.events.map((event) => (
                              <span
                                key={event.id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {event.title}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(
                            registration.registrationDate
                          ).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(
                            registration.registrationDate
                          ).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() =>
                              setSelectedRegistration(registration)
                            }
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 text-black">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">Show</span>
                  <select
                    value={pagination.limit}
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span className="text-sm text-gray-700">per page</span>
                </div>
                <div className="flex gap-2 text-black">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed text-black"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-700">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Registration Details Modal - Keep your existing modal code */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Your existing modal JSX */}
        </div>
      )}
    </div>
  );
}
