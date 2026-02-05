import { untrack, type Component } from 'svelte';
import { toast } from 'svelte-sonner';
import { superForm, type SuperValidated } from 'sveltekit-superforms';
import { zod4Client } from 'sveltekit-superforms/adapters';
import type { ZodType } from 'zod';

/**
 * STEP ITEM CONFIGURATION
 * Defines a single step in the wizard.
 * T = The Data Interface (e.g., { teamName: string })
 */
export type StepItem<T> = {
  label: string;
  keys: (keyof T)[]; // The specific fields to validate for this step
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Component<any>; // The Svelte component to render
  props?: Record<string, unknown>; // Optional props to pass to that component
};

export type RegistrationControllerOptions<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getForm: () => SuperValidated<any>; // Getter to prevent Svelte 5 reactivity warnings
  schema: ZodType<T>; // The Zod schema for validation
  storageKey: string; // Unique ID for localStorage (e.g., URL path)
  stepItems: StepItem<T>[]; // The configuration array
};

/**
 * THE REGISTRATION CONTROLLER
 * did I over engineer this form scheisse? di ko matiis yung scatter gage AAHHAHAHAHAH
 *
 * Thought Process:
 * Instead of scattering form logic across multiple files, we centralize it here.
 * This class manages the entire lifecycle of a multi-step form:
 * 1. State (Current step, loading status)
 * 2. Configuration (Mapping steps to validation keys)
 * 3. Execution (The SuperForm instance)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class RegistrationController<T extends Record<string, any>> {
  // --- Reactive State (Runes) ---
  step = $state(1);
  loaded = $state(false);
  submitted = $state(false);

  // --- Static Configuration ---
  public steps: { label: string; value: number }[];
  public config: Record<number, (keyof T)[]>;
  public storageKey: string;

  // --- The Engine ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public form: ReturnType<typeof superForm<any>>;

  constructor({ getForm, schema, storageKey, stepItems }: RegistrationControllerOptions<T>) {
    this.storageKey = storageKey;

    // 1. Generate UI Steps for the Stepper component
    this.steps = stepItems.map((s, i) => ({ label: s.label, value: i + 1 }));

    // 2. Generate Validation Map (Step Number -> Array of Fields)
    // This tells the UI which fields to validate before moving Next.
    this.config = stepItems.reduce(
      (acc, s, i) => {
        acc[i + 1] = s.keys;
        return acc;
      },
      {} as Record<number, (keyof T)[]>
    );

    // 3. Initialize SuperForm
    // We use untrack() to safely read the initial form data without
    // triggering unwanted Svelte 5 effect re-runs.
    this.form = superForm(untrack(getForm), {
      validators: zod4Client(schema),
      dataType: 'json',
      onResult: ({ result }) => {
        if (result.type === 'error') {
          toast.error(result.error.message || 'An unexpected error occurred.');
        }
      },
      onUpdate: ({ form, result }) => {
        if (form.valid && result.type === 'success') {
          // Success: Clear the draft and lock the form
          localStorage.removeItem(this.storageKey);
          this.submitted = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (result.type === 'failure') {
          toast.error(form.message || 'Please fix the errors in the form.');
        }
      }
    });
  }
}
