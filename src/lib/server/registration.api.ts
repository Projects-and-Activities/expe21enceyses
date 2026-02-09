import { 
  GOOGLE_APPS_SCRIPT_URL_COMPANY_TALKS,
  GOOGLE_APPS_SCRIPT_URL_PFJF
} from '$env/static/private';
import { EVENT_IDS, type RegistrationData } from '../types/registration.types';

export async function submitRegistration(eventId: string, data: RegistrationData) {
  let script
  switch (eventId) {
    case EVENT_IDS.COMPANY_TALKS:
      script = GOOGLE_APPS_SCRIPT_URL_COMPANY_TALKS;
      break;
    case EVENT_IDS.PFJF:
      script = GOOGLE_APPS_SCRIPT_URL_PFJF;
      break;
    default:
      throw new Error('Invalid event ID');
  }
  
  const response = await fetch(
    script,
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