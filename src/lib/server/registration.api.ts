import { GOOGLE_APPS_SCRIPT_URL_COMPANY_TALKS } from '$env/static/private';
import type { CompanyTalksRegistration } from './registration.types';

export async function companyTalksRegistration(data: CompanyTalksRegistration) {
  const response = await fetch(
    GOOGLE_APPS_SCRIPT_URL_COMPANY_TALKS,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  if (!response.ok) {
    throw new Error(`Error submitting form: ${response.statusText}`);
  }
  return response;
}