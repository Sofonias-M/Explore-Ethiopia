"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Save } from "lucide-react";
import {
  createDestination,
  type CreateDestinationState,
} from "@/actions/destination-actions";

const initialState: CreateDestinationState = {
  success: false,
  message: "",
};

export default function NewDestinationPage() {
  const [state, formAction, isPending] = useActionState(
    createDestination,
    initialState,
  );

  return (
    <section className="mx-auto max-w-4xl">
      <Link
        href="/admin/destinations"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to destinations
      </Link>

      <div>
        <p className="text-sm font-medium text-emerald-700">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          Add destination
        </h1>

        <p className="mt-2 text-gray-600">
          Add a destination to the Explore Ethiopia collection.
        </p>
      </div>

      <form
        action={formAction}
        className="mt-8 space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {state.message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border p-4 text-sm ${
              state.success
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-900"
            }`}
          >
            {state.message}
          </div>
        )}

        <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <MapPin size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Destination information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Provide the main details visitors will see.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Destination name"
            name="name"
            placeholder="Lalibela"
            required
            error={state.errors?.name?.[0]}
          />

          <Field
            label="URL slug"
            name="slug"
            placeholder="lalibela"
            required
            error={state.errors?.slug?.[0]}
            help="Lowercase letters and hyphens, for example lalibela."
          />

          <Field
            label="Region"
            name="region"
            placeholder="Amhara"
            required
            error={state.errors?.region?.[0]}
          />

          <Field
            label="Best time to visit"
            name="bestTimeToVisit"
            placeholder="October to March"
            error={state.errors?.bestTimeToVisit?.[0]}
          />

          <Field
            label="Estimated cost (ETB)"
            name="estimatedCost"
            type="number"
            placeholder="2500"
            min="0"
            step="0.01"
            error={state.errors?.estimatedCost?.[0]}
          />

          <Field
            label="Image URL"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            error={state.errors?.imageUrl?.[0]}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description <span aria-hidden="true">*</span>
          </label>

          <textarea
            id="description"
            name="description"
            required
            minLength={20}
            maxLength={10000}
            rows={6}
            placeholder="Describe the destination, its attractions, and what visitors can experience."
            aria-invalid={Boolean(state.errors?.description)}
            aria-describedby={
              state.errors?.description ? "description-error" : undefined
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />

          {state.errors?.description?.[0] && (
            <p
              id="description-error"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.description[0]}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            Publication status
          </legend>

          <div className="mt-3 flex items-start gap-3 rounded-xl border border-gray-200 p-4">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              value="true"
              defaultChecked
              className="mt-1 h-4 w-4 rounded border-gray-300 accent-emerald-700"
            />

            <div>
              <label
                htmlFor="isPublished"
                className="text-sm font-medium text-gray-900"
              >
                Publish this destination
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Published destinations can be shown on public destination
                pages, provided those pages filter for published records.
              </p>
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/admin/destinations"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />
            {isPending ? "Saving..." : "Create destination"}
          </button>
        </div>
      </form>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: string;
  step?: string;
  error?: string;
  help?: string;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  min,
  step,
  error,
  help,
}: FieldProps) {
  const helpId = `${name}-help`;
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [help ? helpId : null, error ? errorId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />

      {help && (
        <p id={helpId} className="mt-1 text-xs text-gray-500">
          {help}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}