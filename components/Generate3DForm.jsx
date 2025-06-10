'use client';  // Make sure it's a client-side component

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Suspense } from 'react';  // Import Suspense for handling async data

const Generate3DForm = () => {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const pareq = searchParams.get("pareq");
  const trackId = searchParams.get("trackId");
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    // Check if all required params are available before proceeding
    if (!url || !pareq || !trackId || !returnUrl) return;

    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("name", "redirect");
    form.setAttribute("id", "form1");

    // Add hidden input fields for each parameter
    const PareqInput = document.createElement("input");
    PareqInput.setAttribute("type", "hidden");
    PareqInput.setAttribute("name", "Pareq");
    PareqInput.setAttribute("value", pareq);

    const TrackIDInput = document.createElement("input");
    TrackIDInput.setAttribute("type", "hidden");
    TrackIDInput.setAttribute("name", "TrackID");
    TrackIDInput.setAttribute("value", trackId);

    const TermUrlInput = document.createElement("input");
    TermUrlInput.setAttribute("type", "hidden");
    TermUrlInput.setAttribute("name", "TermUrl");
    TermUrlInput.setAttribute("value", returnUrl);

    form.appendChild(PareqInput);
    form.appendChild(TrackIDInput);
    form.appendChild(TermUrlInput);

    // Append the form to the body and submit
    document.body.appendChild(form);
    form.submit();
  }, [url, pareq, trackId, returnUrl]);

  return <p>Redirecting to secure payment...</p>;
};

const Generate3DFormWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate3DForm />
    </Suspense>
  );
};

export default Generate3DFormWrapper;
