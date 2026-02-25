import {
  GOOGLE_APPS_SCRIPT_URL_COMPANY_TALKS,
  GOOGLE_APPS_SCRIPT_URL_PFJF,
  GOOGLE_APPS_SCRIPT_URL_HACKFEST
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
    case EVENT_IDS.JUNIOR_HACKFEST:
    case EVENT_IDS.SENIOR_HACKFEST:
      script = GOOGLE_APPS_SCRIPT_URL_HACKFEST;
      break;
    default:
      throw new Error('Invalid event ID');
  }

  let transformedData = data;

  if (eventId === EVENT_IDS.JUNIOR_HACKFEST || eventId === EVENT_IDS.SENIOR_HACKFEST) {
    const bracket = eventId === EVENT_IDS.JUNIOR_HACKFEST ? 'junior' : 'collegiate';
    const numberOfRegistrantsResponse = await fetch(
      `${script}?bracket=${bracket}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (!numberOfRegistrantsResponse.ok) {
      throw new Error(`Error fetching number of registrants: ${numberOfRegistrantsResponse.statusText}`);
    }

    const responseData = await numberOfRegistrantsResponse.json();
    const numberOfRegistrants = responseData.value;
    if (numberOfRegistrants >= 20) {
      throw new Error('Registration is full. Please contact the prog@yses.org for more information.');
    }

    const hackfestData = data as any;

    // Files are uploaded directly to Cloudinary from the frontend.
    // Strip raw File objects and send the Cloudinary URLs to GAS.
    transformedData = {
      ...hackfestData,
      bracket: bracket,
      requirementsUrl: hackfestData.requirementsZipUrl,
      paymentUrl: hackfestData.proofOfPaymentUrl,
      requirementsZip: undefined,
      proofOfPayment: undefined,
      requirementsZipUrl: undefined,
      proofOfPaymentUrl: undefined
    };

    delete (transformedData as any).requirementsZip;
    delete (transformedData as any).proofOfPayment;
    delete (transformedData as any).requirementsZipUrl;
    delete (transformedData as any).proofOfPaymentUrl;
  }

  const response = await fetch(
    script,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transformedData)
    }
  );

  if (!response.ok) {
    throw new Error(`Error submitting form: ${response.statusText}`);
  }

  return response;
}