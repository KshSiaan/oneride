
import { base_api } from "../config"
import { howl } from "../utils"

// >>>>>>>>>>> Category <<<<<<<<<<<<<

export const addCategoryApi = async (body: { name: string }, token: string) => {
    return howl("/categories", { method: "POST", body, token })
}

export const editCategoryApi = async (id: string, body: { name: string }, token: string) => {
    return howl(`/categories/${id}`, { method: "PUT", body, token })
}

export const deleteCategoryApi = async (id: string, token: string) => {
    return howl(`/categories/${id}`, { method: "DELETE", token })
}

export const getCategoriesApi = async () => {
    return howl("/categories")
}

// >>>>>>>>>>> Blog <<<<<<<<<<<<<

export const addBlogApi = async (
  body: {
    title: string;
    author: string;
    status: string;
    content: string;
    image: File | null;
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("title", body.title);
  formData.append("author", body.author);
  formData.append("status", body.status);
  formData.append("content", body.content);
  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/blogs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ don't set Content-Type, browser handles it
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to add blog: ${res.statusText}`);
  }

  return res.json();
};


export const editBlogApi = async (
  id: string,
  body: {
    title: string;
    author: string;
    status: string;
    content: string;
    image?: File | null;
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("title", body.title);
  formData.append("author", body.author);
  formData.append("status", body.status);
  formData.append("content", body.content);
  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/blogs/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ don't set Content-Type
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to edit blog: ${res.statusText}`);
  }

  return res.json();
};


export const deleteBlogApi = async (id: string, token: string) => {
    return howl(`/blogs/${id}`, { method: "DELETE", token })
}

export const getBlogsApi = async (token: string) => {
    return howl("/blogs", { method: "GET", token })
}

export const getBlogsAdminApi = async (page:number,status:string,token: string) => {
    return howl(`/blogs?status=${status}&currentPage=${page}`, { method: "GET", token })
}

export const getBlogByIdApi = async (id: string) => {
    return howl(`/blogs/${id}`, { method: "GET"})
}

// >>>>>>>>>>> Ally <<<<<<<<<<<<<

export const addAllyApi = async (
  body: {
    name: string;
    location: string;
    type: 'pub'|'restaurant'|'venue';
    status: 'active'| 'inactive';
    websiteURL: string;
    marketingBlurb: string;
    image?: File | null; // in case you’ll need file upload later
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("location", body.location);
  formData.append("type", body.type);
  formData.append("status", body.status);
  formData.append("websiteURL", body.websiteURL);
  formData.append("marketingBlurb", body.marketingBlurb);

  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/allies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // don’t set Content-Type with FormData
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to add ally: ${res.statusText}`);
  }

  return res.json();
};


export const editAllyApi = async (
  id: string,
  body: {
    name: string;
    location: string;
    type: string;
    status: string;
    websiteURL: string;
    marketingBlurb: string;
    image?: File | null; // optional, in case you allow updating image
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("location", body.location);
  formData.append("type", body.type);
  formData.append("status", body.status);
  formData.append("websiteURL", body.websiteURL);
  formData.append("marketingBlurb", body.marketingBlurb);

  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/allies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // don’t manually set Content-Type
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to edit ally: ${res.statusText}`);
  }

  return res.json();
};


export const deleteAllyApi = async (id: string, token: string) => {
    return howl(`/allies/${id}`, { method: "DELETE", token })
}

export const getAlliesApi = async (
    {page }: { page: number },
) => {
    return howl(`/allies?page=${page}&limit=12`, { method: "GET", })
}

// >>>>>>>>>>> Partnership <<<<<<<<<<<<<

export const createPartnershipApi = async (
    body: {
        organizerName: string
        eventName: string
        organizerEmail: string
        eventDate: string
        eventLocation: string
        transportationNeeds: string
    },
    token: string
) => {
    return howl("/partnerships", { method: "POST", body, token })
}

export const togglePartnershipApi = async (id: string, body: { status: "pending" | "approved" | "rejected" }, token: string) => {
    return howl(`/partnerships/toggle/${id}`, { method: "PATCH", body, token })
}

export const updatePartnershipApi = async (id: string, body: { adminNotes: string }, token: string) => {
    return howl(`/partnerships/${id}`, { method: "PATCH", body, token })
}

export const getPartnershipByIdApi = async (id: string, token: string) => {
    return howl(`/partnerships/${id}`, { method: "GET", token })
}

export const getPartnershipsApi = async (
  {
    status,
    includeStats,
    search,
    page,
    limit,
    dateFilter,
  }: {
    status?: string;
    includeStats?: boolean;
    search?: string;
    page?: number;
    limit?: number;
    dateFilter?: string;
  } = {},
  token: string
) => {
  const query = new URLSearchParams({
    ...(status && { status }),
    ...(includeStats !== undefined && { includeStats: String(includeStats) }),
    ...(search && { search }),
    ...(page !== undefined && { page: String(page) }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(dateFilter && { dateFilter }),
  });

  return howl(`/partnerships?${query.toString()}`, { method: "GET", token });
};


// >>>>>>>>>>> About Us <<<<<<<<<<<<<

export const addAboutUsApi = async (
  body: {
    headerText: string;
    subText: string;
    image?: File | null;
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("headerText", body.headerText);
  formData.append("subText", body.subText);

  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/about-us`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // don't manually set Content-Type
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to add About Us: ${res.statusText}`);
  }

  return res.json();
};


export const getAboutUsApi = async (token: string) => {
    return howl("/about-us", { method: "GET", token })
}

// >>>>>>>>>>> Team Member <<<<<<<<<<<<<

export const addTeamMemberApi = async (
  body: {
    name: string;
    role: string;
    image?: File|null|undefined;
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("role", body.role);
  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/team-members`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // don't set Content-Type manually
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to add team member: ${res.statusText}`);
  }

  return res.json();
};

export const editTeamMemberApi = async (
  id: string,
  body: {
    name: string;
    role: string;
    image?: File | null; // optional in case they don’t change the image
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("role", body.role);

  if (body.image) {
    formData.append("image", body.image);
  }

  const res = await fetch(`${base_api}/team-members/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to edit team member: ${res.statusText}`);
  }

  return res.json();
};


export const deleteTeamMemberApi = async (id: string, token: string) => {
    return howl(`/team-members/${id}`, { method: "DELETE", token })
}

export const getTeamMembersApi = async ({ status, type }: { status?: string; type?: string }, token: string) => {
    return howl(`/team-members?status=${status ?? ""}&type=${type ?? ""}`, { method: "GET", token })
}

// // >>>>>>>>>>> Transport <<<<<<<<<<<<<

// export const createTransportApi = async (
//     body: { type: "busRoute" | "parkAndRide" | "pubPickup"; pickUpPoint: string; duration: number; departureTime: string },
//     token: string
// ) => {
//     return howl("/transports", { method: "POST", body, token })
// }

// export const deleteTransportApi = async (id: string, token: string) => {
//     return howl(`/transports/${id}`, { method: "DELETE", token })
// }

// export const getTransportsApi = async (token: string) => {
//     return howl("/transports", { method: "GET", token })
// }

// >>>>>>>>>>> Event <<<<<<<<<<<<<

export const createEventApi = async (body: FormData, token: string) => {
  // log FormData keys + values
  // for (const [key, value] of body.entries()) {
  //   if (value instanceof File) {
  //     console.log(key, {
  //       name: value.name,
  //       size: value.size,
  //       type: value.type,
  //     });
  //   } else {
  //     console.log(key, value);
  //   }
  // }

  const res = await fetch(`${base_api}/events`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }

  return res.json();
};





export const deleteEventApi = async (id: string, token: string) => {
    return howl(`/events/${id}`, { method: "DELETE", token })
}

type GetEventsParams = {
  category?: string;
  title?: string;
  adminStatus?: string;
  filterByQuarter?: string;
  id?: string;
};

export const getEventsApi = async (
  token: string,
  params?: GetEventsParams
) => {
  const query = params
    ? '?' +
      Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  return howl(`/events${query}`, { token });
};

export const getEventById = async (id:string) => {
    return howl(`/events/${id}`, { method: "GET"})
}


// >>>>>>>>>>> Charter <<<<<<<<<<<<<

export const createCharterApi = async (
    body: {
        name: string
        email: string
        phone: string
        passengerCount: number
        pickupLocation: string
        dropoffLocation: string
        pickupDateAndTime: string
        purpose: string
        specialInstructions: string
    },
    // token: string
) => {
    return howl("/charters", { method: "POST", body})
}

export const updateCharterStatusApi = async (
    id: string,
    status:"pending"|"approved"|"rejected",
    token: string
) => {
    return howl(`/charters/status/${id}`, { method: "PATCH", body:{status}, token })
}

export const mailCharterUserApi = async (id: string, body: object = {}, token: string) => {
    return howl(`/charters/status/mail-user/${id}`, { method: "POST", body, token })
}

export const deleteCharterApi = async (id: string, token: string) => {
    return howl(`/charters/${id}`, { method: "DELETE", token })
}

export const getChartersApi = async (
    params: { filterByQuarter?: string; name?: string; status?: string; page: number; limit: number },
    token: string
) => {
    const query = new URLSearchParams()
    if (params.filterByQuarter) query.append("filterByQuarter", params.filterByQuarter)
    if (params.name) query.append("name", params.name)
    if (params.status) query.append("status", params.status)
    query.append("page", params.page.toString())
    query.append("limit", params.limit.toString())

    return howl(`/charters?${query.toString()}`, { method: "GET", token })
}

// >>>>>>>>>>> Invitation <<<<<<<<<<<<<

export const createInvitationApi = async (
    body: { fullName: string; email: string; role: string; optionalMessage?: string },
    token: string
) => {
    return howl("/invitations", { method: "POST", body, token })
}

export const getInvitationsApi = async (
    params: { filterByQuarter?: string; name?: string; status?: string } = {},
    token: string
) => {
    const query = new URLSearchParams()
    if (params.filterByQuarter) query.append("filterByQuarter", params.filterByQuarter)
    if (params.name) query.append("name", params.name)
    if (params.status) query.append("status", params.status)

    return howl(`/invitations?${query.toString()}`, { method: "GET", token })
}

// >>>>>>>>>>> Booking <<<<<<<<<<<<<

export const createBookingAuthApi = async (
    body: { event: string; transport: string; ticketCount: number },
    token: string
) => {
    return howl("/bookings/auth-user", { method: "POST", body, token })
}

export const createBookingGuestApi = async (
    body: { firstName: string; lastName: string; phone: string; email: string; gender: string; event: string; transport: string; ticketCount: number },
    token: string
) => {
    return howl("/bookings/guest-user", { method: "POST", body, token })
}

export const getBookingsApi = async (
    params: { filterByQuarter?: string; name?: string; status?: string } = {},

) => {
    const query = new URLSearchParams()
    if (params.filterByQuarter) query.append("filterByQuarter", params.filterByQuarter)
    if (params.name) query.append("name", params.name)
    if (params.status) query.append("status", params.status)

    return howl(`/bookings?${query.toString()}`, { method: "GET"})
}

export const getBookingByIdApi = async (id: string, token: string) => {
    return howl(`/bookings/${id}`, { method: "GET", token })
}

export const deleteBookingApi = async (id: string, token: string) => {
    return howl(`/bookings/${id}`, { method: "DELETE", token })
}

// >>>>>>>>>>> Payment <<<<<<<<<<<<<

export const createPaymentIntentApi = async (
    body: { amount: number; bookingId: string },
    token: string
) => {
    return howl("/payments/intents", { method: "POST", body, token })
}

export const confirmPaymentByIntentApi = async (
    body: { bookingId: string; amount: number; paymentIntentId: string; status: string },
    token: string
) => {
    return howl("/payments/intents/transactions", { method: "POST", body, token })
}

export const getPaymentByIntentApi = async (paymentIntentId: string, token: string) => {
    return howl(`/payments/intents/${paymentIntentId}`, { method: "GET", token })
}

export const getPaymentsByBookingApi = async (bookingId: string, token: string) => {
    return howl(`/payments/intents/bookings/${bookingId}`, { method: "GET", token })
}

export const getAllPaymentsApi = async (token: string) => {
    return howl("/payments/intents", { method: "GET", token })
}

// >>>>>>>>>>> User <<<<<<<<<<<<<

export const getAllUsersApi = async (token: string) => {
    return howl("/users", { method: "GET", token })
}

export const getUsersAndGuestsApi = async (
    params: { page: number; limit: number; search?: string; role?: string; dateFilter?: string },
    token: string
) => {
    const query = new URLSearchParams()
    query.append("page", params.page.toString())
    query.append("limit", params.limit.toString())
    if (params.search) query.append("search", params.search)
    if (params.role) query.append("role", params.role)
    if (params.dateFilter) query.append("dateFilter", params.dateFilter)

    return howl(`/users-guests?${query.toString()}`, { method: "GET", token })
}

export const getUserByIdApi = async (id: string, token: string) => {
    return howl(`/users/${id}`, { method: "GET", token })
}

export const getOwnProfileApi = async (token: string) => {
    return howl("/users/auth/profile", { method: "GET", token })
}

export const updateUserProfileApi = async (body: FormData, token: string) => {
  const res = await fetch(`${base_api}/users/auth/update-profile-by-user`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.statusText}`);
  }

  return res.json();
};

export const toggleUserBanApi = async (body: { userId: string }, token: string) => {
    return howl("/users/auth/toggle-ban", { method: "PATCH", body, token })
}

// >>>>>>>>>>> Appointment Payment <<<<<<<<<<<<<

export const createAppointmentPaymentIntentApi = async (
    body: { appointmentId: string; paymentMethodId: string; amount: number },
    token: string
) => {
    return howl("/payment/create-payment-intent", { method: "POST", body, token })
}

export const confirmAppointmentPaymentByIntentApi = async (
    body: { paymentId: string },
    token: string
) => {
    return howl("/payment/get-payment-intent", { method: "POST", body, token })
}

export const getAllAppointmentPaymentIntentsApi = async (token: string) => {
    return howl("/payment/get-all-payment-intents", { method: "GET", token })
}

// >>>>>>>>>>> Chat <<<<<<<<<<<<<

export const createOrAccessChatApi = async (body: { userId: string }, token: string) => {
    return howl("/chats/access", { method: "POST", body, token })
}

export const getAllChatsApi = async (token: string) => {
    return howl("/chats/fetch", { method: "GET", token })
}

// >>>>>>>>>>> Messages <<<<<<<<<<<<<

export const sendMessageApi = async (body: { chatId: string; content: string }, token: string) => {
    return howl("/messages/send", { method: "POST", body, token })
}

export const getAllMessagesApi = async (chatId: string, token: string) => {
    return howl(`/messages/get-all-messages/${chatId}`, { method: "GET", token })
}

// >>>>>>>>>>> Terms & Service <<<<<<<<<<<<<

export const getTermsOfServiceApi = async (token: string) => {
    return howl("/terms", { method: "GET", token })
}

export const addTermsOfServiceApi = async (body: { content: string }, token: string) => {
    return howl("/terms", { method: "POST", body, token })
}

// >>>>>>>>>>> FAQ <<<<<<<<<<<<<

export const addFaqApi = async (body: { question: string; answer: string }, token: string) => {
    return howl("/faqs", { method: "POST", body, token })
}

export const getFaqsApi = async (token: string) => {
    return howl("/faqs", { method: "GET", token })
}

export const updateFaqApi = async (id: string, body: { question?: string; answer?: string }, token: string) => {
    return howl(`/faqs/${id}`, { method: "PATCH", body, token })
}

export const deleteFaqApi = async (id: string, token: string) => {
    return howl(`/faqs/${id}`, { method: "DELETE",token })
}

// >>>>>>>>>>> DASHBOARD <<<<<<<<<<<<<

export const getDashboardApi = async (token: string) => {
    return howl("/dashboard/overview", { method: "GET", token });
}
export const getStatsApi= async (period:string,token: string) => {
    return howl(`/dashboard/earnings?period=${period}`, { method: "GET", token });
}



// >>>>>>>>>>> TRANSPORTATION <<<<<<<<<<<<<
export const getPickupsApi = async (type?: string) => {
  const params = new URLSearchParams();
  if (type) params.append("type", type);

  const queryString = params.toString();
  const url = `/transports${queryString ? `?${queryString}` : ""}`;

  return howl(url, { method: "GET" });
};

export const getPickupById = async (id:string) => {
  return howl(`/transports/${id}`, { method: "GET" });
};

export const createPickupsApi = async (body:{
  type:string,
  pickUpPoint:{
    name:string,
    lat:string,
    lng:string
  },
  dropOffPoint:{
    name:string,
    lat:string,
    lng:string
  },
  duration:string,
  departureTime:string

},token: string,) => {
    return howl(`/transports`, {body, method: "POST", token });
}

export const deletePickupsApi = async (id:string) => {
  return howl(`/transports/${id}`, { method: "DELETE" });
};