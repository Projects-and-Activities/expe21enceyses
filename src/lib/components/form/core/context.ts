import { getContext, setContext } from 'svelte';
import type { SuperForm } from 'sveltekit-superforms';

const FORM_KEY = Symbol('GENERIC_FORM_CONTEXT');
const CONTROLLER_KEY = Symbol('REGISTRATION_CONTROLLER_CONTEXT');

// eslint-disable-next-line
export function setFormContext<T extends Record<string, any>>(form: SuperForm<T>) {
  setContext(FORM_KEY, form);
}

// eslint-disable-next-line
export function useFormContext<T extends Record<string, any>>() {
  const form = getContext<SuperForm<T>>(FORM_KEY);
  if (!form) {
    throw new Error('Form context not found. Wrap your components in <FormProvider>.');
  }
  return form;
}

// eslint-disable-next-line
export function setControllerContext(controller: any) {
  setContext(CONTROLLER_KEY, controller);
}

// eslint-disable-next-line
export function useControllerContext() {
  return getContext<any>(CONTROLLER_KEY);
}
