import axios from "axios";

const api = axios.create({
  baseURL: "https://idf-site.onrender.com",
});

export const getCategories = () => api.get("/taalim/categories/all_categories");
export const createCategory = (data) =>
  api.post("admin/dashboard/category/add_category", data);
export const updateCategory = (id, data) =>
  api.put(`/admin/dashboard/category/update_category/${id}`, data);
export const deleteCategory = (id) =>
  api.delete(`admin/dashboard/category/delete_category/${id}`);

export const getVideos = () => api.get("/taalim/all_ta_alims");
export const createVideo = (data) =>
  api.post("/admin/dashboard/ta_alim/add_ta_alim", data);
export const updateVideo = (id, data) =>
  api.put(`/admin/dashboard/taalim/update_taalim/${id}`, data);
export const deleteVideo = (id) =>
  api.delete(`/admin/dashboard/taalim/delete_ta_alim//${id}`);

export const getImages = () => api.get("/gallery/all_images");
export const createImage = (data) =>
  api.post("/admin/dashboard/add_image", data);
export const updateImage = (id, data) =>
  api.put(`/admin/dashboard/gallery/update_image/${id}`, data);
export const deleteImage = (id) =>
  api.delete(`/admin/dashboard/delete_image/${id}`);

export const getCommittees = () => api.get("/committee/all_committee");
export const createCommittee = (data) =>
  api.post("/admin/dashboard/add_committee", data);
export const updateCommittee = (id, data) =>
  api.put(`/admin/dashboard/committee/update_committee/${id}`, data);
export const deleteCommittee = (id) =>
  api.delete(`/admin/dashboard/committee/delete_committee/${id}`);

export const getEvents = () => api.get("/events/all_events");
export const createEvent = (data) =>
  api.post("/admin/dashboard/add_event", data);
export const updateEvent = (id, data) =>
  api.put(`/admin/dashboard/update_event/${id}`, data);
export const deleteEvent = (id) =>
  api.delete(`/admin/dashboard/delete_event/${id}`);

export const getNews = () => api.get("/news/all_news");
export const createNews = (data) =>
  api.post("/admin/dashboard/news/add_news", data);
export const updateNews = (id, data) =>
  api.put(`/admin/dashboard/news/update_news/${id}`, data);
export const deleteNews = (id) =>
  api.delete(`/admin/dashboard/news/delete_news/${id}`);

export const getFeedback = () => api.get("/feedback/all_feedback");
export const createFeedback = (data) =>
  api.post("/admin/dashboard/feedback/add_feedback", data);
export const updateFeedback = (id, data) =>
  api.put(`/admin/dashboard/feedback/update_feedback/${id}`, data);
export const deleteFeedback = (id) =>
  api.delete(`/admin/dashboard/feedback/delete_feedback/${id}`);
