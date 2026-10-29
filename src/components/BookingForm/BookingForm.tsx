"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBookingRequest } from "@/lib/campers";
import { SpinnerCircularFixed } from "spinners-react";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const validateForm = (name: string, email: string) => {
    const newErrors = {
      name: /^[\p{L}\s'-]+$/u.test(name.trim())
        ? ""
        : "Please enter a valid name.",
      email:
        email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
          ? ""
          : "Please enter your email.",
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email;
  };

  return (
    <form
      className={css.form}
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitted(true);

        const isValid = validateForm(values.name, values.email);

        if (!isValid) {
          return;
        }

        setIsLoading(true);
        setServerMessage("");

        try {
          await createBookingRequest(camperId, {
            name: values.name.trim(),
            email: values.email.trim(),
          });

          router.push(`/booking-success?camperId=${camperId}`);
        } catch {
          setServerMessage("Failed to send booking request. Please try again.");

          setIsLoading(false);
        }
      }}
    >
      <div className={css.header}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.description}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={css.fields}>
        <div className={css.fieldGroup}>
          <div
            className={`${css.inputWrapper} ${errors.name ? css.inputWrapperError : ""}`}
          >
            {errors.name && (
              <label className={css.labelError} htmlFor="name">
                Name*
              </label>
            )}
            <input
              className={`${css.input} ${errors.name ? css.inputError : ""}`}
              id="name"
              type="text"
              name="name"
              placeholder={errors.name ? "Name" : "Name*"}
              autoComplete="name"
              value={values.name}
              onChange={(event) => {
                const name = event.target.value;

                setValues((prev) => ({
                  ...prev,
                  name,
                }));

                if (isSubmitted) {
                  validateForm(name, values.email);
                }
              }}
            />

            {errors.name && (
              <span className={css.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>

          {errors.name && <p className={css.errorText}>{errors.name}</p>}
        </div>

        <div className={css.fieldGroup}>
          <div
            className={`${css.inputWrapper} ${errors.email ? css.inputWrapperError : ""}`}
          >
            {errors.email && (
              <label className={css.labelError} htmlFor="email">
                Email*
              </label>
            )}

            <input
              className={`${css.input} ${errors.email ? css.inputError : ""}`}
              id="email"
              type="email"
              name="email"
              placeholder={errors.email ? "Email" : "Email*"}
              autoComplete="email"
              value={values.email}
              onChange={(event) => {
                const email = event.target.value;

                setValues((prev) => ({
                  ...prev,
                  email,
                }));

                if (isSubmitted) {
                  validateForm(values.name, email);
                }
              }}
            />

            {errors.email && (
              <span className={css.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>

          {errors.email && <p className={css.errorText}>{errors.email}</p>}
        </div>
      </div>

      <button className={css.button} type="submit" disabled={isLoading}>
        {isLoading ? (
          <SpinnerCircularFixed
            size={32}
            thickness={100}
            speed={100}
            color="#ffffff"
            secondaryColor="rgba(255, 255, 255, 0.3)"
          />
        ) : (
          "Send"
        )}
      </button>
      {serverMessage && (
        <p className={css.serverMessage} role="status">
          {serverMessage}
        </p>
      )}
    </form>
  );
}
