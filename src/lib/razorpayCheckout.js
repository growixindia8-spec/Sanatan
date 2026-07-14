function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => reject(new Error('Razorpay SDK failed to load'));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Razorpay SDK failed to load. Please check your connection.'));
    document.body.appendChild(script);
  });
}

let isCheckoutActive = false;

export async function openRazorpayCheckout({ orderId, amount, keyId, name, description, prefill, config, onSuccess, onFailure }) {
  if (isCheckoutActive) {
    console.warn("Razorpay checkout is already active.");
    return;
  }

  try {
    await loadRazorpayScript();
  } catch (err) {
    onFailure?.(err.message);
    return;
  }

  if (!window.Razorpay) {
    onFailure?.("Razorpay SDK was not found on the window object.");
    return;
  }

  isCheckoutActive = true;

  const options = {
    key: keyId,
    order_id: orderId,
    amount,
    currency: "INR",
    name: "Sanatan Dharm Manav Kalyan Foundation",
    description,
    prefill: {
      name: prefill?.name || "",
      email: prefill?.email || "",
      contact: prefill?.contact || ""
    },
    theme: { color: "#FF6600" },
    config,
    handler: function (response) {
      isCheckoutActive = false;
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        isCheckoutActive = false;
        onFailure?.("Payment cancelled by user");
      },
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      isCheckoutActive = false;
      onFailure?.(response.error.description || "Payment failed");
    });
    rzp.open();
  } catch (err) {
    isCheckoutActive = false;
    onFailure?.(err.message || "Failed to launch Razorpay payment wizard.");
  }
}
