import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

/**
 * Upload a PDF file to the backend.
 * @param {File} file
 * @returns {Promise<{ job_id: string, message: string }>}
 */
export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

/**
 * Poll the status of a background job.
 * @param {string} jobId
 * @returns {Promise<object>} Raw status object from the backend
 */
export async function getJobStatus(jobId) {
  const res = await api.get(`/jobs/${jobId}/status`);
  return res.data;
}
