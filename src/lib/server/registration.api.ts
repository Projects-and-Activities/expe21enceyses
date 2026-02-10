import { 
  GOOGLE_APPS_SCRIPT_URL_COMPANY_TALKS,
  GOOGLE_APPS_SCRIPT_URL_PFJF,
  GOOGLE_APPS_SCRIPT_URL_HACKFEST
} from '$env/static/private';
import { EVENT_IDS, type RegistrationData } from '../types/registration.types';

async function toBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}

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
    const hackfestData = data as any;
    
    const requirementsBase64 = await toBase64(hackfestData.requirementsZip);
    const paymentBase64 = await toBase64(hackfestData.proofOfPayment);
    
    transformedData = {
      ...hackfestData,
      requirements: requirementsBase64,
      requirementsFileType: hackfestData.requirementsZip.type,
      payment: paymentBase64,
      paymentFileType: hackfestData.proofOfPayment.type,
      requirementsZip: undefined,
      proofOfPayment: undefined
    };
    
    delete (transformedData as any).requirementsZip;
    delete (transformedData as any).proofOfPayment;
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